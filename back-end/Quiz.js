import { CohereClientV2 } from 'cohere-ai';
import 'dotenv/config';

const cohere = new CohereClientV2({
  token: process.env.API,
});
let input = `
La Revolución Francesa (1789-1799) fue un proceso que, impulsado por crisis económica, desigualdad social e ideas ilustradas, derrocó a la monarquía, instauró la república, atravesó el Terror, terminó con el Directorio y dio paso al ascenso de Napoleón, logrando el fin del absolutismo y difundiendo ideales de libertad e igualdad.`
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

    
    const content = response.message?.content || response.message?.text || JSON.stringify(response);

    console.log('Respuesta de Cohere:', content);
  } catch (error) {
    console.error('Error:', error);
  }
}

main();
