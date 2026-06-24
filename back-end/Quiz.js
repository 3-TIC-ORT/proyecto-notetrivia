import { CohereClientV2 } from 'cohere-ai';
import 'dotenv/config';
import fs from 'fs';
export function funcionn(socket, input) {

const cohere = new CohereClientV2({
  token: process.env.API,
});
const prompt = `Sos un generador de trivias educativas. Basándote en el siguiente contenido, generá una trivia de 5 preguntas con 4 opciones cada una.

CONTENIDO:
${input}

REGLAS OBLIGATORIAS:
1. Cada pregunta debe tener un TIPO diferente. Usá exactamente estos 5 tipos, uno por pregunta:
   - DEFINICIÓN: "¿Qué es / Qué significa...?"
   - EJEMPLO: "¿Cuál de estos es un ejemplo de...?"
   - RELACIÓN: "¿Qué relación existe entre X e Y?" o "¿Cómo se vincula X con Y?"
   - APLICACIÓN: "¿En qué situación se aplicaría...?" o "¿Para qué sirve...?"
   - VERDADERO/FALSO AMPLIADO: Una afirmación sobre el contenido donde hay que identificar si es correcta o incorrecta y por qué.
2. Las preguntas deben cubrir ideas distintas del texto, no repetir el mismo concepto.
3. Las opciones incorrectas deben ser plausibles, no obviamente falsas.
4. Solo una opción debe ser correcta.

Formato de respuesta (SOLO el JSON, sin explicaciones ni markdown):
{
  "trivia": [
    {
      "pregunta": "string",
      "opciones": [
        { "texto": "string", "correcta": true },
        { "texto": "string", "correcta": false },
        { "texto": "string", "correcta": false },
        { "texto": "string", "correcta": false }
      ]
    }
  ]
}`;


async function main() {
  try {
    const response = await cohere.chat({
      model: 'command-a-03-2025',
      messages: [
        {
          role: 'user',
          content: prompt,
        },
      ],
    });

    
  const content = response.message.content[0].text;
  socket.emit("trivia-generada", { trivia: content });
  console.log(content + " este es el contenido");
  } catch (error) {
  
  }
}

main()
}
