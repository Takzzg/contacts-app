import React from "react"

const Group = ({ group }) => {
    return (
        <li>
            <span className="name">{group.name}</span>
            <span className="desc">{group.desc}</span>
            <span className="contacts">
                {group.contacts.length} participants
            </span>
        </li>
    )
}

export default Group
