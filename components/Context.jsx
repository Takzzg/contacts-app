import { createContext, useEffect, useState } from "react"
import { fetchAllUsers } from "../utils/api"
import { getLocalSotage, setLocalStorage } from "../utils/localStorage"

const initialContactForm = {
    firstName: "",
    lastName: "",
    street: "",
    number: "",
    city: "",
    country: "",
    phone: "",
    picture: ""
}

const initialGroupForm = { name: "", desc: "" }

export const MyContext = createContext(null)

export const MyProvider = ({ children }) => {
    const [storage, setStorage] = useState({ contacts: [], groups: [] })
    const [modal, setModal] = useState(null)
    const [contactForm, setContactForm] = useState(initialContactForm)
    const [groupForm, setGroupForm] = useState(initialGroupForm)

    useEffect(() => {
        let local = getLocalSotage()
        if (local.contacts && local.groups) handleUpdateState(local)
    }, [])

    const handleUpdateState = (state) => {
        setStorage(state)
        setLocalStorage(state)
    }

    // Forms

    const toggleContactForm = () => {
        setModal(modal ? null : "contact")
    }

    const toggleGroupForm = () => {
        setModal(modal ? null : "group")
    }

    const closeModal = () => {
        setModal(null)
        setContactForm(initialContactForm)
        setGroupForm(initialGroupForm)
    }

    const editContact = (id) => {
        const contact = storage.contacts.find((c) => c.id === id)
        const newForm = {
            id: contact.id,
            groups: contact.groups,
            firstName: contact.name.first,
            lastName: contact.name.last,
            street: contact.location.street.name,
            number: contact.location.street.number,
            city: contact.location.city,
            country: contact.location.country,
            phone: contact.phone,
            picture: contact.picture.large
        }
        setContactForm(newForm)
        toggleContactForm()
    }

    const handleContactForm = (e) => {
        setContactForm({ ...contactForm, [e.target.name]: e.target.value })
    }

    const changePicture = (picture) => {
        setContactForm({ ...contactForm, picture })
    }

    const editGroup = (id) => {
        const group = storage.groups.find((g) => g.id === id)
        const newForm = {
            id: group.id,
            name: group.name,
            desc: group.desc
        }
        setGroupForm(newForm)
        toggleGroupForm()
    }

    const handleGroupForm = (e) => {
        setGroupForm({ ...groupForm, [e.target.name]: e.target.value })
    }

    // Contacts

    const fetchMoreContacts = async () => {
        let contacts = await fetchAllUsers()
        handleUpdateState({
            ...storage,
            contacts: [...storage.contacts, ...contacts]
        })
    }

    const createContact = () => {
        let contact = {
            id: Math.random().toString(36),
            groups: [],
            name: {
                first: contactForm.firstName,
                last: contactForm.lastName
            },
            location: {
                street: {
                    name: contactForm.street,
                    number: contactForm.number
                },
                city: contactForm.city,
                country: contactForm.country
            },
            phone: contactForm.phone,
            picture: { large: contactForm.picture }
        }
        let contacts = [contact, ...storage.contacts]
        let groups = [...storage.groups]
        handleUpdateState({ contacts, groups })
    }

    const deleteAllContacts = () => {
        let groups = [...storage.groups]
        groups = groups.map((g) => ({ ...g, contacts: [] }))
        handleUpdateState({ contacts: [], groups })
    }

    const deleteContact = (id) => {
        let contacts = storage.contacts.filter((c) => c.id !== id)
        let groups = storage.groups.map((g) => ({
            ...g,
            contacts: g.contacts.filter((c) => c !== id)
        }))
        handleUpdateState({ contacts, groups })
    }

    const updateContact = (id) => {
        let contacts = [...storage.contacts]

        let contact = contacts.find((c) => c.id === id)
        contacts = contacts.filter((c) => c.id != id)

        contact = {
            ...contact,
            name: {
                ...contact.name,
                first: contactForm.firstName,
                last: contactForm.lastName
            },
            location: {
                ...contact.location,
                street: {
                    name: contactForm.street,
                    number: contactForm.number
                },
                city: contactForm.city,
                country: contactForm.country
            },
            phone: contactForm.phone,
            picture: { ...contact.picture, large: contactForm.picture }
        }

        handleUpdateState({ ...storage, contacts: [contact, ...contacts] })
    }

    // Groups

    const createGroup = () => {
        let group = {
            ...groupForm,
            id: Math.random().toString(36),
            contacts: []
        }
        let contacts = [...storage.contacts]
        let groups = [group, ...storage.groups]
        handleUpdateState({ contacts, groups })
    }

    const deleteAllGroups = () => {
        let contacts = [...storage.contacts]
        contacts = contacts.map((c) => ({ ...c, groups: [] }))
        handleUpdateState({ contacts, groups: [] })
    }

    const deleteGroup = (id) => {
        let contacts = storage.contacts.map((c) => ({
            ...c,
            groups: c.groups.filter((g) => g !== id)
        }))
        let groups = storage.groups.filter((g) => g.id !== id)
        handleUpdateState({ contacts, groups })
    }

    const updateGroup = (id) => {
        let groups = [...storage.groups]
        let group = groups.find((g) => g.id === id)
        groups = groups.filter((g) => g.id !== id)

        group = { ...group, name: groupForm.name, desc: groupForm.desc }

        handleUpdateState({ ...storage, groups: [group, ...groups] })
    }

    const addContactToGroup = (idContact, idGroup) => {
        let contacts = [...storage.contacts]
        let groups = [...storage.groups]

        let contact = contacts.find((c) => c.id === idContact)
        let group = groups.find((g) => g.id === idGroup)

        !contact.groups.includes(idGroup) && contact.groups.push(idGroup)
        !group.contacts.includes(idContact) && group.contacts.push(idContact)

        handleUpdateState({ contacts, groups })
    }

    const removeContactFromGroup = (idContact, idGroup) => {
        let contacts = [...storage.contacts]
        let groups = [...storage.groups]

        let contact = contacts.find((c) => c.id === idContact)
        let group = groups.find((g) => g.id === idGroup)

        contact.groups.includes(idGroup) &&
            contact.groups.filter((g) => g !== idGroup)
        group.contacts.includes(idContact) &&
            group.contacts.filter((c) => c !== idContact)

        handleUpdateState({ contacts, groups })
    }

    return (
        <MyContext.Provider
            value={{
                modal,
                toggleContactForm,
                toggleGroupForm,
                closeModal,
                editContact,
                editGroup,
                contactForm,
                groupForm,
                handleContactForm,
                handleGroupForm,
                changePicture,
                contacts: storage.contacts,
                groups: storage.groups,
                fetchMoreContacts,
                deleteAllContacts,
                deleteAllGroups,
                createContact,
                deleteContact,
                updateContact,
                createGroup,
                deleteGroup,
                updateGroup,
                addContactToGroup,
                removeContactFromGroup
            }}
        >
            {children}
        </MyContext.Provider>
    )
}
