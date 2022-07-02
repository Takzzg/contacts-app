import React, { useContext } from "react"
import { useDrop } from "react-dnd"
import { MyContext } from "../Context"

const Group = ({ group }) => {
    const { contacts, groups, addContactToGroup, editGroup } =
        useContext(MyContext)

    const [collected, drop] = useDrop(
        () => ({
            accept: "Contact",
            collect: (monitor) => ({
                isOver: monitor.isOver(),
                canDrop: monitor.canDrop()
            }),
            drop: (item) => {
                addContactToGroup(item.id, group.id)
            }
        }),
        [contacts, groups]
    )

    return (
        <li ref={drop}>
            <button onClick={() => editGroup(group.id)}>Edit</button>
            <button>Delete</button>
            <span className="name">{group.name}</span>
            <span className="desc">{group.desc}</span>
            <span className="contacts">
                {group.contacts.length} participants
            </span>
        </li>
    )
}

export default Group
