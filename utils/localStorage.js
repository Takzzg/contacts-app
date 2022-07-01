export const getLocalSotage = () => {
    let contacts = JSON.parse(
        window.localStorage.getItem("contacts-app-contacts")
    )
    let groups = JSON.parse(window.localStorage.getItem("contacts-app-groups"))

    // console.log("local contacts => ", contacts, "local groups => ", groups)

    return { contacts, groups }
}

export const setLocalStorage = ({ contacts = [], groups = [] }) => {
    // console.log(
    //     `setting localStorage to: \n - Users => ${contacts} \n - Groups => ${groups}`
    // )
    window.localStorage.setItem(
        "contacts-app-contacts",
        JSON.stringify(contacts)
    )
    window.localStorage.setItem("contacts-app-groups", JSON.stringify(groups))
}

export const deleteContact = (id) => {
    let oldContacts = JSON.parse(
        window.localStorage.getItem("contacts-app-contacts")
    )
    let newContacts = oldContacts.filter((u) => u.id !== id)
    window.localStorage.setItem(
        "contacts-app-contacts",
        JSON.stringify(newContacts)
    )
}
