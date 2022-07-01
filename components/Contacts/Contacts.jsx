import React, { useContext } from "react"
import { Droppable } from "react-beautiful-dnd"
import { MyContext } from "../Context"
import Contact from "./Card"
import styled from "styled-components"

export const StyledContacts = styled.div``

const Contacts = () => {
    const {
        contacts,
        deleteAllContacts,
        fetchMoreContacts,
        toggleContactForm
    } = useContext(MyContext)

    return (
        <StyledContacts className="contacts">
            <span className="title">Contacts</span>

            <button onClick={toggleContactForm}>Create a new Contact</button>
            <button onClick={deleteAllContacts}>Delete all contacts</button>
            <button onClick={fetchMoreContacts}>Fetch more Users</button>

            <Droppable droppableId="contacts">
                {(provided) => (
                    <ul
                        className="contactsList"
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                    >
                        {contacts?.map((c, i) => (
                            <Contact key={c.id} index={i} contact={c} />
                        ))}
                        {provided.placeholder}
                    </ul>
                )}
            </Droppable>
        </StyledContacts>
    )
}

export default Contacts
