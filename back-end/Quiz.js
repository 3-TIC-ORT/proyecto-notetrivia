import { CohereClientV2 } from 'cohere-ai';
import 'dotenv/config';

const cohere = new CohereClientV2({
  token: process.env.API
});

const prompt = "cuando nacio san martin";

async function main() {
  try {
    const response = await cohere.chat({
      model: 'command-a-03-2025',
      maxTokens: 1,
      messages: [
        {
          role: 'user',
          content: prompt
        }
      ]
    });

   
    const contentArray = response.message.content;
    if (Array.isArray(contentArray) && contentArray.length > 0) {
      const text = contentArray[0].text || contentArray[0].content || JSON.stringify(contentArray[0]);
      console.log('Respuesta de Cohere:', text);
    } else {
      console.log('Cohere no generó respuesta');
    }
  } catch (error) {
    console.error('Error:', error);
  }
}

main();
