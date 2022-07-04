import Image from "next/image"
import { useContext } from "react"

import styled from "styled-components"
import { useDrag } from "react-dnd"

import { FaHome, FaPhone, FaUserAlt, FaUsers } from "react-icons/fa"

import { MyContext } from "../Context"
import { Delete, Edit } from "../Buttons"

const StyledContact = styled.div`
    display: grid;
    grid-template-columns: auto 100px 1fr;
    grid-template-rows: 100px;

    .info {
        display: grid;
        grid-template-columns: auto 1fr;
        align-items: center;
        gap: 0.5rem;
        padding: 0.5rem;
        background-color: rgba(255, 255, 255, 0.05);

        span {
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
        }
    }

    .buttons {
        display: grid;
        grid-template-rows: 1fr 1fr;
    }
`
const formattedName = (name) => {
    const { first, last } = name
    return `${last}, ${first}`
}

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
        })
    }))

    return (
        <StyledContact ref={drag} {...collected}>
            <span className="buttons">
                <Edit
                    onClick={() => editContact(contact.id)}
                    showText={false}
                />
                <Delete
                    onClick={() => deleteContact(contact.id)}
                    showText={false}
                />
            </span>

            <span className="profilePic">
                <Image
                    src={contact.picture.large}
                    alt=""
                    width={"100%"}
                    height={"100%"}
                />
            </span>

            <span className="info">
                <FaUserAlt /> <span>{formattedName(contact.name)}</span>
                <FaPhone /> <span>{contact.phone}</span>
                <FaHome /> <span>{formattedAddress(contact.location)}</span>
                <FaUsers /> <span>In {contact.groups?.length} group(s)</span>
            </span>
        </StyledContact>
    )
}

export default Contact
