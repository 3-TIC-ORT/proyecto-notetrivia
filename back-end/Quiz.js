import { CohereClientV2 } from 'cohere-ai';
import 'dotenv/config';

const cohere = new CohereClientV2({
  token: process.env.API,
});

const prompt = "cuando nacio san martin";

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
