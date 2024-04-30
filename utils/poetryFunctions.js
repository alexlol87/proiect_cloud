export const getAuthors = async () => {
    try {
        const response = await fetch("/api/poetry?author=all", {
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

export const getPoemsByAuthor = async (author) => {
    try {
        const response = await fetch(`/api/poetry?author=${ author }`, {
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

export const getPoemsByTitle = async (title) => {
    try {
        const response = await fetch(`/api/poetry?title=${ title }`, {
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

export const getPoems = async () => {
    try {
        const response = await fetch("/api/poetry?title=all", {
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