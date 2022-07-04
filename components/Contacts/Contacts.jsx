import { useContext } from "react"
import styled from "styled-components"
import { useDrop } from "react-dnd"

import { FaTrash, FaPlus, FaUserAlt, FaUserAltSlash } from "react-icons/fa"

import { MyContext } from "../Context"
import Contact from "./Card"
import Header from "../Header"

export const StyledContacts = styled.div`
    display: flex;
    gap: 1rem;
    flex-direction: column;
    overflow: hidden;
    height: 100%;

    .contactsList {
        overflow-y: auto;
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
        height: 100%;
    }
`

const Contacts = () => {
    const {
        contacts,
        deleteAllContacts,
        fetchMoreContacts,
        toggleContactForm,
        filters
    } = useContext(MyContext)

    const [collected, drop] = useDrop(() => ({
        accept: "Contact",
        collect: (monitor) => ({
            isOver: monitor.isOver(),
            canDrop: monitor.canDrop()
        })
    }))

    return (
        <StyledContacts {...collected} ref={drop} className="contacts">
            <Header>
                <span className="title">Contacts</span>

                <div className="buttons">
                    <span onClick={toggleContactForm}>
                        <FaPlus /> <FaUserAlt />
                    </span>
                    <span onClick={deleteAllContacts}>
                        <FaTrash /> <FaUserAltSlash />
                    </span>
                    <span onClick={fetchMoreContacts}>
                        <FaPlus /> 10
                        <FaUserAlt />
                    </span>
                </div>
            </Header>

            <div className="contactsList">
                {(filters.contacts.filteredIds.length
                    ? contacts.filter((c) =>
                          filters.contacts.filteredIds.includes(c.id)
                      )
                    : contacts
                )?.map((c) => (
                    <Contact key={c.id} contact={c} />
                ))}
            </div>
        </StyledContacts>
    )
}

export default Contacts
