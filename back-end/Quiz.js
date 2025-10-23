import { CohereClientV2 } from 'cohere-ai';
import 'dotenv/config';
import fs from 'fs';

const cohere = new CohereClientV2({
  token: process.env.API,
});
let input = `
La ingeniería genética es una rama de la biotecnología que permite modificar el ADN de un organismo para cambiar sus características o agregarle nuevas funciones.

Se basa en extraer, cortar y unir genes de diferentes organismos usando enzimas y vectores como los plásmidos. El proceso incluye identificar el gen de interés, aislarlo, insertarlo en otro organismo y comprobar que funcione correctamente.

Tiene muchas aplicaciones, como la producción de medicamentos (por ejemplo, insulina), cultivos resistentes a plagas y microorganismos que fabrican productos industriales.

Sus ventajas incluyen avances médicos y mejoras en la agricultura, aunque también presenta riesgos como posibles efectos en el ambiente y debates éticos sobre la manipulación genética.`
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
  fs.writeFileSync('Quiz.json', content);
  JSON.stringify(fs.readFileSync('Quiz.json', 'utf-8'));
    console.log('Respuesta de Cohere:', content);
  } catch (error) {
    console.error('Error:', error);
  }
}

main();
