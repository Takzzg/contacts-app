import { useContext } from "react"
import { useDrop } from "react-dnd"
import { MyContext } from "../Context"

const Group = ({ group }) => {
    const {
        contacts,
        groups,
        addContactToGroup,
        editGroup,
        deleteGroup,
        filterContactsByGroup
    } = useContext(MyContext)

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
            <button onClick={() => filterContactsByGroup(group.id)}>
                Filter
            </button>
            <span className="name">{group.name}</span>
            <span className="desc">{group.desc}</span>
            <span className="contacts">
                {group.contacts.length} participants
                <div className="details">
                    {group.contacts.map((c) => (
                        <div className="contact" key={c}>
                            {c}
                        </div>
                    ))}
                </div>
            </span>
        </div>
    )
}

export default Group
