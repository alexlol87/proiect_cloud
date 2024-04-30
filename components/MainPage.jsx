import React, { useEffect, useState } from "react"
import Spinner from "./Spinner"
import { getReviews, createReview, updateReview, deleteReview } from "@/utils/reviewsFunctions"

const MainPage = () => {
  const [ reviews, setReviews ] = useState([])
  const [ isLoading, setIsLoading ] = useState(true)
  const [ newReview, setNewReview ] = useState("")
  const [ newTitle, setNewTitle ] = useState("")

  const fetchReviews = async () => {
    try {
      // Fetch reviews from your backend API or local storage
      const response = await fetch("/api/reviews")
      const data = await response.json()
      setReviews(data)
      setIsLoading(false)
    } catch (error) {
      console.log(error)
      setIsLoading(false)
    }
  }
  let reloadPage = 0
  const handleAddReview = () => {
    createReview({
      description: newReview,
      placeName: newTitle,
      likes: 0,
    })

    sleep(2000)
    setTimeout(() => {
      fetchReviews()
    }, 1000)

    setNewReview("")
    setNewTitle("")
  }

  const handleLikeReview = async (id) => {
    const review = reviews.find((review) => review._id === id)
    review.likes += 1
    await updateReview(review)
    fetchReviews()
  }

  const handleDeleteButton = async (id) => {
    await deleteReview(id)
    reloadPage++
    fetchReviews()
  }

  const handleChangeReview = (e) => {
    setNewReview(e.target.value)
  }

  const handleChangeTitle = (e) => {
    setNewTitle(e.target.value)
  }

  useEffect(() => {
    fetchReviews()
  }, [])

  if (isLoading) return <Spinner />

  return (
    <div className="p-4 flex flex-wrap gap-4">
      { reviews.map((review) => (
        <div
          key={ review._id }
          className="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
        >
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            { review.placeName }
          </h5>
          <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
            { review.description }
          </p>

          <button
            type="button"
            onClick={ () => handleLikeReview(review._id) }
            className="text-white bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"  >
            <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
              { review.likes != undefined ? review.likes : null } likes
            </p>
            Like
          </button>
          <button
            type="button"
            onClick={ () => handleDeleteButton(review._id) }
            className="text-black bg-gradient-to-r from-red-400 via-orange-500 to-orange-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"  >

            Delete
          </button>
        </div>
      )) }
      <div className="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
        <input type="text" value={ newTitle } onChange={ handleChangeTitle }
          className="w-full p-2 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500" placeholder="Place Name" />
        <textarea
          value={ newReview }
          onChange={ handleChangeReview }
          className="w-full h-32 p-2 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
          placeholder="Write your review..."
        />
        <button
          type="button"
          onClick={ handleAddReview }
          className="text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
        >
          Add Review
        </button>
      </div>
    </div>
  )
}

export default MainPage
