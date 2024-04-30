export const getReviews = async () => {
  try {
    const response = await fetch("/api/reviews", {
      method: "GET",
    })

    const data = await response.json()

    if (!data) {
      return []
    }

    return data
  } catch (error) {
    console.log(error)
  }
}

export const getReview = async (id) => {
  try {
    const response = await fetch(`/api/reviews?id=${ id }`, {
      method: "GET",
    })

    const data = await response.json()

    return data
  } catch (error) {
    console.log(error)
  }
}

export const createReview = async (entry) => {
  try {
    const response = await fetch("/api/reviews", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(entry),
    })

    const data = await response.json()

    return data
  } catch (error) {
    console.log(error)
  }
}

export const updateReview = async (entry) => {
  try {
    const response = await fetch('/api/reviews', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(entry)
    })

    const data = await response.json()

    return data
  } catch (error) {
    console.log(error)
  }
}

export const deleteReview = async (id) => {
  try {
    const response = await fetch(`/api/reviews?id=${ id }`, {
      method: "DELETE",
    })

    const data = await response.json()

    return data
  } catch (error) {
    console.log(error)
  }
}
