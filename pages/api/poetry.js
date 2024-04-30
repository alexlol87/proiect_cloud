import { ObjectId, } from 'mongodb'
import { getCollection } from "@/utils/functions"
import { sendMethodNotAllowed, sendOk } from '@/utils/apiMethods'

const COLLECTION_NAME = 'poems'

const getPoemByAuthor = async (author) => {
    if (author == "all") {
        const response = await fetch(`https://poetrydb.org/author`)
        return await response.json()
    }

    const response = await fetch(`https://poetrydb.org/author/${ author }`)
    return await response.json()
}

const getPoemByTitle = async (title) => {
    if (title == "all") {
        const response = await fetch(`https://poetrydb.org/title`)
        return await response.json()
    }

    const response = await fetch(`https://poetrydb.org/title/${ title }`)
    return await response.json()
}

export default async function handler(req, res) {
    const isAllowedMethod = req.method === 'GET' || req.method === 'POST' || req.method === 'PUT' || req.method === 'DELETE'

    if (!isAllowedMethod) {
        return sendMethodNotAllowed(res, 'Method Not Allowed')
    }

    if (req.method === 'GET' && req.query.author) {
        const records = await getPoemByAuthor(req.query.author)
        return sendOk(res, records)
    }

    if (req.method === 'GET' && req.query.title) {
        const records = await getPoemByTitle(req.query.title)
        return sendOk(res, records)
    }
}