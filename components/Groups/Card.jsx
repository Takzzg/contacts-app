import React, { useContext } from "react"
import { useDrop } from "react-dnd"
import { MyContext } from "../Context"

const Group = ({ group }) => {
    const { contacts, groups, addContactToGroup } = useContext(MyContext)

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
            <span className="name">{group.name}</span>
            <span className="desc">{group.desc}</span>
            <span className="contacts">
                {group.contacts.length} participants
            </span>
        </li>
    )
}

export default Group
