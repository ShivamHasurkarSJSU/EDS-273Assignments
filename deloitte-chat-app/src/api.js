import axios from 'axios';

const OPENAI_API_ENDPOINT = 'https://api.openai.com/v1/engines/davinci/completions';
const OPENAI_API_KEY = process.env.REACT_APP_API_KEY;

const headers = {
    'Authorization': `Bearer ${OPENAI_API_KEY}`,
    'Content-Type': 'application/json',
};

export const getAIResponse = async (prompt) => {
    try {
        const systemPrompt = "You are a knowledgeable assistant with expertise in U.S. tax law. Provide concise and clear answers without repetition.";
        const userPrompt = `${systemPrompt} ${prompt}`;
        const response = await axios.post(OPENAI_API_ENDPOINT, {
            prompt: userPrompt,
            max_tokens: 150,
            temperature: 0.2,
        }, { headers: headers });

        return response.data.choices[0].text.trim();
    } catch (error) {
        console.error('Error getting response from OpenAI:', error);
        return 'Error getting response.';
    }
};
