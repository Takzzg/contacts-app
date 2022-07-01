import Image from "next/image"
import React, { useContext } from "react"
import { Draggable } from "react-beautiful-dnd"
import { MyContext } from "../Context"

import styled from "styled-components"

const StyledContact = styled.li`
    display: grid;
    grid-template-columns: auto 1fr;

    .info {
        display: flex;
        flex-direction: column;
        gap: 0.25rem;
        padding: 0.25rem;
    }
`

const formattedAddress = (location) => {
    const { street, city, country } = location
    return `${street.name} ${street.number}, ${city}, ${country}`
}

const Contact = ({ contact, index }) => {
    const { deleteContact, editContact } = useContext(MyContext)

    return (
        <Draggable draggableId={contact.id} index={index}>
            {(provided) => (
                <StyledContact
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    ref={provided.innerRef}
                >
                    <span className="profilePic">
                        <Image
                            src={contact.picture.large}
                            alt=""
                            width={"100%"}
                            height={"100%"}
                        />
                    </span>
                    <span className="info">
                        <span className="name">{`${contact.name.last}, ${contact.name.first}`}</span>
                        <span className="phone">{contact.phone}</span>
                        <span className="address">
                            {formattedAddress(contact.location)}
                        </span>
                        <span className="groups">
                            In {contact.groups?.length} group(s)
                        </span>
                    </span>
                    <span className="buttons">
                        <button onClick={() => editContact(contact.id)}>
                            Edit
                        </button>
                        <button onClick={() => deleteContact(contact.id)}>
                            Delete
                        </button>
                    </span>
                </StyledContact>
            )}
        </Draggable>
    )
}

export default Contact
