import React, { useContext } from "react"
import styled from "styled-components"
import { useDrop } from "react-dnd"

import { MyContext } from "../Context"
import Contact from "./Card"

export const StyledContacts = styled.div``

const Contacts = () => {
    const {
        contacts,
        deleteAllContacts,
        fetchMoreContacts,
        toggleContactForm
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
            <span className="title">Contacts</span>

            <button onClick={toggleContactForm}>Create a new Contact</button>
            <button onClick={deleteAllContacts}>Delete all contacts</button>
            <button onClick={fetchMoreContacts}>Fetch more Users</button>

            <ul className="contactsList">
                {contacts?.map((c) => (
                    <Contact key={c.id} contact={c} />
                ))}
            </ul>
        </StyledContacts>
    )
}

export default Contacts
