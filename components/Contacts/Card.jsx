import Image from "next/image"
import React, { useContext } from "react"
import { MyContext } from "../Context"

import styled from "styled-components"
import { useDrag } from "react-dnd"

const StyledContact = styled.div`
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

const Contact = ({ contact }) => {
    const { deleteContact, editContact } = useContext(MyContext)

    const [collected, drag] = useDrag(() => ({
        type: "Contact",
        item: { id: contact.id },
        collect: (monitor) => ({
            isDragging: monitor.isDragging()
        }),
        options: {
            dropEffect: "move"
        }
    }))

    return (
        <StyledContact ref={drag} {...collected}>
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
                <button onClick={() => editContact(contact.id)}>Edit</button>
                <button onClick={() => deleteContact(contact.id)}>
                    Delete
                </button>
            </span>
        </StyledContact>
    )
}

export default Contact
