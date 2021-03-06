import { useContext } from "react"
import { FaPlus, FaTrash, FaUsers, FaUsersSlash } from "react-icons/fa"
import styled from "styled-components"
import { Generic } from "../Buttons"

import { MyContext } from "../Context"
import Header from "../Header"
import Group from "./Card"

const StyledGroups = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1rem;
    overflow: hidden;
    height: 100%;

    .groupsList {
        overflow-y: auto;
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
    }
`

const Groups = () => {
    const { groups, toggleGroupForm, deleteAllGroups } = useContext(MyContext)

    return (
        <StyledGroups>
            <Header>
                <div className="title">Groups</div>

                <div className="buttons">
                    <Generic onClick={toggleGroupForm}>
                        <FaPlus /> <FaUsers />
                    </Generic>
                    <Generic onClick={deleteAllGroups}>
                        <FaTrash /> <FaUsersSlash />
                    </Generic>
                </div>
            </Header>

            <div className="groupsList">
                {!groups.length && "No groups saved yet"}

                {groups?.map((g) => (
                    <Group key={g.id} group={g} />
                ))}
            </div>
        </StyledGroups>
    )
}

export default Groups
