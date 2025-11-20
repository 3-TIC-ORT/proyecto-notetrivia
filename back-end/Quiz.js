import { CohereClientV2 } from 'cohere-ai';
import 'dotenv/config';
import fs from 'fs';
export function funcionn(socket, input) {

const cohere = new CohereClientV2({
  token: process.env.API,
});
const prompt = input + `: sos un generador de trivias adecuadas a este contenido. Tu objetivo es Genera una trivia de 5 preguntas con 4 opciones cada una en formato JSON. 
La estructura debe ser:
{
  "trivia": [
    {
      "pregunta": "string",
      "opciones": [
        { "texto": "string", "correcta": true/false },
        ...
      ]
    }
  ]
}
IMPORTANTE: Devuelve únicamente el JSON, sin explicaciones ni formato extra.`;


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
