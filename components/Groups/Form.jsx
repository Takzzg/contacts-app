import { loremIpsum } from "lorem-ipsum"
import { useContext, useEffect, useState } from "react"
import styled from "styled-components"
import { MyContext } from "../Context"
import Modal from "../Modal"

const StyledGroupForm = styled.div`
    display: grid;
    grid-template-columns: auto 1fr 1fr;
`

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

    const handleChange = (e) => {
        handleGroupForm({ ...groupForm, [e.target.name]: e.target.value })
    }

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

    const randomizeName = () => {
        let name = loremIpsum({ count: 3, units: "words" })
        handleGroupForm({ ...groupForm, name })
    }

    const randomizeDesc = () => {
        let desc = loremIpsum({ count: 7, units: "words" })
        handleGroupForm({ ...groupForm, desc })
    }

    return (
        <Modal>
            <StyledGroupForm>
                <label htmlFor="name">name</label>
                <input
                    type="text"
                    name="name"
                    id="name"
                    value={groupForm.name}
                    onChange={handleChange}
                />
                <button onClick={randomizeName}>Random name</button>
                <label htmlFor="desc">desc</label>
                <input
                    type="text"
                    name="desc"
                    id="desc"
                    value={groupForm.desc}
                    onChange={handleChange}
                />
                <button onClick={randomizeDesc}>Random desc</button>
            </StyledGroupForm>
            <button onClick={handleSubmit}>Save</button>
        </Modal>
    )
}

export default GroupForm
