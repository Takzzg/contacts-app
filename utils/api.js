export const fetchAllUsers = () =>
    fetch(`https://randomuser.me/api/?results=10`)
        .then((res) => res.json())
        .then((data) => data.results)
        .then((contacts) =>
            contacts.map((c) => ({
                ...c,
                id: Math.random().toString(36),
                groups: []
            }))
        )

export const fetchOneUser = () =>
    fetch(`https://randomuser.me/api`)
        .then((res) => res.json())
        .then((data) => data.results)
        .then((contact) =>
            contact.map((c) => ({
                ...c,
                id: Math.random().toString(36),
                groups: []
            }))
        )
