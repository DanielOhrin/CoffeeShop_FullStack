const url = "https://localhost:5001/api"

//! ----- VERSATILE API METHODS -----
export const dbGetAll = async (endpoint) => {
    const res = await fetch(`${url}/${endpoint}`)
    const data = await res.json()

    return data
}

export const dbGetById = async (endpoint, id) => {
    const res = await fetch(`${url}/${endpoint}/${id}`)
    const data = await res.json()

    return data
}

export const dbPost = async (endpoint, obj) => {
    const res = await fetch(`${url}/${endpoint}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(obj)
    })

    return res.ok
}

export const dbPut = async (endpoint, obj) => {
    const res = await fetch(`${url}/${endpoint}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(obj)
    })

    return res.ok
}

export const dbDelete = async (endpoint) => {
    const res = await fetch(`${url}/${endpoint}/${id}`, { method: "DELETE" })

    return res.ok
}
//! ------------------------------------