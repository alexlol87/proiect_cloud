import { ObjectId, } from 'mongodb'
import { getCollection } from "@/utils/functions"
import { sendMethodNotAllowed, sendOk } from '@/utils/apiMethods'

const COLLECTION_NAME = 'reviews'

const getReviews = async () => {
    const collection = await getCollection(COLLECTION_NAME)
    return await collection.find({}).toArray()
}

const getReview = async (id) => {
    const collection = await getCollection(COLLECTION_NAME)
    return await collection.findOne({ _id: ObjectId.createFromHexString(id) })
}

const createReview = async (data) => {
    const collection = await getCollection(COLLECTION_NAME)
    return await collection.insertOne(data)
}

const updateReview = async (data) => {
    const collection = await getCollection(COLLECTION_NAME)
    const id = data._id
    delete data._id
    return collection.updateOne({ _id: new ObjectId(id) }, { $set: data })
}

const deleteReview = async (id) => {
    const collection = await getCollection(COLLECTION_NAME)
    return await collection.deleteOne({ _id: ObjectId.createFromHexString(id) })
}

export default async function handler(req, res) {
    const isAllowedMethod = req.method === 'GET' || req.method === 'POST' || req.method === 'PUT' || req.method === 'DELETE'

    if (!isAllowedMethod) {
        return sendMethodNotAllowed(res, 'Method Not Allowed')
    }

    if (req.method === 'GET' && req.query.id) {
        const review = await getReview(req.query.id)
        return sendOk(res, review)
    }

    if (req.method === 'GET') {
        const reviews = await getReviews()
        return sendOk(res, reviews)
    }

    if (req.method === 'POST') {
        const review = await createReview(req.body)
        return sendOk(res, review)
    }

    if (req.method === 'PUT') {
        const review = await updateReview(req.body)
        return sendOk(res, review)
    }

    if (req.method === 'DELETE') {
        const review = await deleteReview(req.query.id)
        return sendOk(res, review)
    }
}