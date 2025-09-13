import { useContext } from "react"
import styled from "styled-components"
import { useDrop } from "react-dnd"

import { FaTrash, FaPlus, FaUserAlt, FaUserAltSlash } from "react-icons/fa"

import { MyContext } from "../Context"
import Contact from "./Card"
import Header from "../Header"
import { Generic } from "../Buttons"

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
                    <Generic onClick={toggleContactForm}>
                        <FaPlus /> <FaUserAlt />
                    </Generic>
                    <Generic onClick={fetchMoreContacts}>
                        <FaPlus /> 10 <FaUserAlt />
                    </Generic>
                    <Generic onClick={deleteAllContacts}>
                        <FaTrash /> <FaUserAltSlash />
                    </Generic>
                </div>
            </Header>

            <div className="contactsList">
                {!contacts.length && "No contacts saved yet"}

                {(filters.contacts.filteredIds.length
                    ? contacts.filter((c) => filters.contacts.filteredIds.includes(c.id))
                    : contacts
                )?.map((c) => (<Contact key={c.id} contact={c} />))}
            </div>
        </StyledContacts>
    )
}

export default Contacts
