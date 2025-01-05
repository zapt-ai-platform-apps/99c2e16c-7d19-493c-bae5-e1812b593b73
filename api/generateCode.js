import { authenticateUser } from './_apiUtils.js';
import { createEvent } from '@zapt/zapt-js';

export default async function handler(req, res) {
  try {
    const user = await authenticateUser(req);
    const { prompt, language } = req.body;

    const result = await createEvent('chatgpt_request', {
      prompt: `Generate a simple ${language} project based on the following description:\n${prompt}`,
      response_type: 'json'
    });

    res.status(200).json(result);
  } catch (error) {
    console.error('Error generating code:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}