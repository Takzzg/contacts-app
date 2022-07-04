import { createContext, useEffect, useState } from "react"
import { fetchAllUsers, fetchOneUser } from "../utils/api"
import { getLocalSotage, setLocalStorage } from "../utils/localStorage"

const initialStorage = { contacts: [], groups: [] }
const initialModal = null
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
const initialFilters = {
    contacts: { filteredIds: [], byGroup: null },
    groups: { filteredIds: [], byContact: null }
}

export const MyContext = createContext(null)

export const MyProvider = ({ children }) => {
    const [storage, setStorage] = useState(initialStorage)
    const [modal, setModal] = useState(initialModal)
    const [contactForm, setContactForm] = useState(initialContactForm)
    const [groupForm, setGroupForm] = useState(initialGroupForm)
    const [filters, setFilters] = useState(initialFilters)

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

    const handleContactForm = (newFrom) => {
        setContactForm({ ...newFrom })
    }

    const randomizePicture = async () => {
        let user = await fetchOneUser()
        setContactForm({ ...contactForm, picture: user[0].picture.large })
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

    const handleGroupForm = (newFrom) => {
        setGroupForm({ ...newFrom })
    }

    const randomizeContactForm = async () => {
        let contact = await fetchOneUser()
        contact = contact[0]
        const newForm = {
            ...contactForm,
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
    }

    // Filters

    const filterContactsByGroup = (id) => {
        let contacts = [...storage.contacts]
        let oldFilters = { ...filters }

        if (!id) {
            oldFilters.contacts.byGroup = null
            oldFilters.contacts.filteredIds = []
            return setFilters(oldFilters)
        }

        oldFilters.contacts.byGroup = id
        oldFilters.contacts.filteredIds = contacts
            .filter((c) => c.groups.includes(id))
            .map((c) => c.id)

        setFilters(oldFilters)
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
        let newContacts = [...storage.contacts].map((c) =>
            c.id === id
                ? {
                      ...c,
                      name: {
                          ...c.name,
                          first: contactForm.firstName,
                          last: contactForm.lastName
                      },
                      location: {
                          ...c.location,
                          street: {
                              name: contactForm.street,
                              number: contactForm.number
                          },
                          city: contactForm.city,
                          country: contactForm.country
                      },
                      phone: contactForm.phone,
                      picture: { ...c.picture, large: contactForm.picture }
                  }
                : c
        )

        handleUpdateState({ ...storage, contacts: newContacts })
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
        if (filters.contacts.byGroup === id) filterContactsByGroup(null)
        handleUpdateState({ contacts, groups })
    }

    const updateGroup = (id) => {
        let newGroups = [...storage.groups].map((g) =>
            g.id === id
                ? { ...g, name: groupForm.name, desc: groupForm.desc }
                : g
        )
        handleUpdateState({ ...storage, groups: newGroups })
    }

    const addContactToGroup = (idContact, idGroup) => {
        let contacts = [...storage.contacts]
        let groups = [...storage.groups]

        let contact = contacts.find((c) => c.id === idContact)
        let group = groups.find((g) => g.id === idGroup)

        !contact.groups.includes(idGroup) && contact.groups.push(idGroup)
        !group.contacts.includes(idContact) && group.contacts.push(idContact)

        handleUpdateState({ contacts, groups })
        if (filters.contacts.byGroup)
            filterContactsByGroup(filters.contacts.byGroup)
    }

    const removeContactFromGroup = (idContact, idGroup) => {
        let contacts = [...storage.contacts]
        let groups = [...storage.groups]

        let contact = contacts.find((c) => c.id === idContact)
        let group = groups.find((g) => g.id === idGroup)

        contact.groups.includes(idGroup) &&
            (contact.groups = contact.groups.filter((g) => g !== idGroup))
        group.contacts.includes(idContact) &&
            (group.contacts = group.contacts.filter((c) => c !== idContact))

        handleUpdateState({ contacts, groups })
        filterContactsByGroup(group.id)
    }

    return (
        <MyContext.Provider
            value={{
                // Forms
                modal,
                contactForm,
                groupForm,
                closeModal,
                toggleContactForm,
                editContact,
                randomizePicture,
                randomizeContactForm,
                toggleGroupForm,
                handleContactForm,
                editGroup,
                handleGroupForm,
                // Contacts
                contacts: storage.contacts,
                fetchMoreContacts,
                deleteAllContacts,
                createContact,
                deleteContact,
                updateContact,
                // Groups
                groups: storage.groups,
                deleteAllGroups,
                createGroup,
                deleteGroup,
                updateGroup,
                addContactToGroup,
                removeContactFromGroup,
                // Filters
                filters,
                filterContactsByGroup
            }}
        >
            {children}
        </MyContext.Provider>
    )
}
