import { loremIpsum } from "lorem-ipsum"
import { useContext, useEffect, useState } from "react"
import styled from "styled-components"
import { Randomize, Save } from "../Buttons"
import { MyContext } from "../Context"

const StyledGroupForm = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 1rem;

    .title {
        font-size: 1.5rem;
    }

    .form {
        display: grid;
        grid-template-columns: auto 1fr;
        gap: 0.5rem;
        min-width: 20rem;
    }

    .buttons {
        display: flex;
        gap: 0.5rem;
    }
`

const CustomInput = ({ prop, text }) => {
    const { groupForm, handleGroupForm } = useContext(MyContext)

    const handleChange = (e) => {
        handleGroupForm({ ...groupForm, [e.target.name]: e.target.value })
    }

    return (
        <>
            <label htmlFor={prop}>{text}</label>
            <input
                type="text"
                name={prop}
                id={prop}
                value={groupForm[prop]}
                onChange={handleChange}
            />
        </>
    )
}

const GroupForm = () => {
    const [formErrors, setformErrors] = useState([])
    const { groupForm, handleGroupForm, updateGroup, createGroup, closeModal } =
        useContext(MyContext)

    useEffect(() => {
        const checkFormErrors = () => {
            let errors = []

            if (!groupForm.name) errors.push("Must have a name")
            if (!groupForm.desc) errors.push("Must have a description")

            setformErrors(errors)
        }
        checkFormErrors()
    }, [groupForm])

    const handleSubmit = () => {
        if (formErrors.length) return
        if (groupForm.id) updateGroup(groupForm.id)
        else
            createGroup({
                id: Math.random().toString(36),
                ...groupForm,
                contacts: []
            })
        closeModal()
    }

    const randomizeGroup = () => {
        let name = loremIpsum({ count: 3, units: "words" })
        let desc = loremIpsum({ count: 10, units: "words" })
        handleGroupForm({ ...groupForm, name, desc })
    }

    return (
        <StyledGroupForm>
            <span className="title">New Group</span>
            <div className="form">
                <CustomInput prop="name" text="Name" />
                <CustomInput prop="desc" text="Description" />
            </div>
            <div className="buttons">
                <Randomize onClick={randomizeGroup} />
                <Save onClick={handleSubmit} />
            </div>
        </StyledGroupForm>
    )
}

export default GroupForm
