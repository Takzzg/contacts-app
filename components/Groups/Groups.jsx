import React, { useContext } from "react"

import { MyContext } from "../Context"
import Group from "./Card"

const Groups = () => {
    const { groups, toggleGroupForm, deleteAllGroups } = useContext(MyContext)

    return (
        <div className="groups">
            <span className="title">Groups</span>

            <button onClick={toggleGroupForm}>create new Group</button>
            <button onClick={deleteAllGroups}>delete all groups</button>

            <ul className="groupsList">
                {groups?.map((g) => (
                    <Group key={g.id} group={g} />
                ))}
            </ul>
        </div>
    )
}

export default Groups
