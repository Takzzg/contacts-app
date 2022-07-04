export const getLocalSotage = () => {
    let contacts = JSON.parse(
        window.localStorage.getItem("contacts-app-contacts")
    )
    let groups = JSON.parse(window.localStorage.getItem("contacts-app-groups"))
    return { contacts, groups }
}

export const setLocalStorage = ({ contacts = [], groups = [] }) => {
    window.localStorage.setItem(
        "contacts-app-contacts",
        JSON.stringify(contacts)
    )
    window.localStorage.setItem("contacts-app-groups", JSON.stringify(groups))
}
