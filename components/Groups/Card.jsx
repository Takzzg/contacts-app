import React, { useContext } from "react"
import { useDrop } from "react-dnd"
import { MyContext } from "../Context"

const Group = ({ group }) => {
    const { contacts, groups, addContactToGroup, editGroup, deleteGroup } =
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
        <div ref={drop}>
            <button onClick={() => editGroup(group.id)}>Edit</button>
            <button onClick={() => deleteGroup(group.id)}>Delete</button>
            <span className="name">{group.name}</span>
            <span className="desc">{group.desc}</span>
            <span className="contacts">
                {group.contacts.length} participants
            </span>
        </div>
    )
}

export default Group
