import fs from "fs";

const docsPath = "./docs";

let rooms = {};
let usuarios = JSON.parse(fs.readFileSync("usuarios.json"));
function cargarDoc(docId) {
  const file = docsPath + "/" + docId + ".json";
  let doc;
  if (fs.existsSync(file)) {
    const contenido = fs.readFileSync(file, "utf8");
    doc = JSON.parse(contenido);
  } else {
    doc = { t: "", u: [] };
    fs.writeFileSync(file, JSON.stringify(doc, null, 2));
  }
  return doc;
}

function guardarDoc(docId, doc) {
  const file = docsPath + "/" + docId + ".json";
  fs.writeFileSync(file, JSON.stringify(doc, null, 2));
}

export function setupcolaborativo(io) {
  io.on("connection", (socket) => {
    socket.on("unirse", (data) => {
      if (!data || !data.docId) return;
      const docId = data.docId;
      const user = data.user;
      socket.join(docId);
   if (!usuarios[user].rooms.includes(docId)){
    usuarios[user].rooms.push(docId);
    fs.writeFileSync("usuarios.json", JSON.stringify(usuarios, null, 2));
   }
      if (!rooms[docId]) rooms[docId] = [];
      if (user !== undefined && !rooms[docId].includes(user)) {
        rooms[docId].push(user);
      }

      const doc = cargarDoc(docId);
      if (user !== undefined && !doc.u.includes(user)) {
        doc.u.push(user);
      }
      guardarDoc(docId, doc);

      socket.emit("loadDocument", doc.t || "");

      socket.on("editDocument", (data) => {
        if (!data || !data.docId) return;
        const docId = data.docId;
        const content = data.content;
        const user = data.user;

        const doc = cargarDoc(docId);
        doc.t = content;
        if (!doc.u) doc.u = [];
        if (user !== undefined && !doc.u.includes(user)) {
          doc.u.push(user);
        }

        guardarDoc(docId, doc);
        socket.to(docId).emit("updateDocument", content);
        socket.emit("loadDocument", doc.t);
      });
    });
  });
}