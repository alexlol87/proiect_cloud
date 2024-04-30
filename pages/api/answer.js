import openai from "@/lib/openai";
import { sendBadRequest, sendOk } from "@/utils/apiMethods";
import { MAX_MEMORY } from "@/utils/constants";

const SYSTEM_PROMPTS = {
    SIMPLE_ASSISTANT : {
        MESSAGE: {
            'role': 'system',
            'content': 'You are a simple assistant. You are helping the user with their tasks.'
        },
        TEMPERATURE : 1,
        MAX_TOKENS: 50,
        TYPE: 'simple_assistant'
    },
    USER: {
        MESSAGE: {
            'role': 'user',
            'content': 'You are a user. You are asking the assistant for help.'
        },
        TEMPERATURE : 1,
        MAX_TOKENS: 50,
        TYPE: 'user'
    }
}

const chatCompletion = async (messages, max_tokens, temperature) => {
    const rawResponse = await openai.chat.completions.create({
        model: 'gpt-3.5-turbo',
        messages: messages,
        max_tokens: max_tokens,
        temperature: temperature
    });

    return rawResponse?.choices[0];
}

const converseChat = async (res, messages, role) => {
    try {
        let newMessages = [];

        if (messages.length > MAX_MEMORY) {
            newMessages = messages.slice(-MAX_MEMORY);
        } else {
            newMessages = messages;
        }

        const messagesArr = [
            role.MESSAGE,
            ...newMessages
        ]
        
        const response = await chatCompletion(messagesArr, role.MAX_TOKENS, role.TEMPERATURE);

        return sendOk(res, response);
    } catch (error) {
        console.log(error)
    }
}

const converse = (res, messages, type) => {
    switch (type) {
        case SYSTEM_PROMPTS.SIMPLE_ASSISTANT.TYPE:
            return converseChat(res, messages, SYSTEM_PROMPTS.SIMPLE_ASSISTANT);
        case SYSTEM_PROMPTS.USER.TYPE:
            return converseChat(res, messages, SYSTEM_PROMPTS.USER);
        default: 
            return sendBadRequest(res, 'Wrong type of user');
    }
}

export default async function handler(req, res) {
    const isAllowedMethod = req.method === 'POST';

    if (!isAllowedMethod) {
        return sendMethodNotAllowed(res, 'Method Not Allowed');
    }

    const { messages, type } = req.body;

    if (!messages || !type) {
        return sendBadRequest(res, 'Bad Request');
    }

    try {
        return converse(res, messages, type);
    } catch (error) {
        console.log(error)
    }
}