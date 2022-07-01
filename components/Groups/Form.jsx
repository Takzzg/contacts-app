import React, { useContext, useEffect, useState } from "react"
import { MyContext } from "../Context"
import Modal from "../Modal"

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
        else createGroup({ ...groupForm, contacts: [] })
        closeModal()
    }

    return (
        <Modal>
            <form>
                <label htmlFor="name">name</label>
                <input
                    type="text"
                    name="name"
                    id="name"
                    value={groupForm.name}
                    onChange={handleGroupForm}
                />
                <label htmlFor="desc">desc</label>
                <input
                    type="text"
                    name="desc"
                    id="desc"
                    value={groupForm.desc}
                    onChange={handleGroupForm}
                />
            </form>
            <button onClick={handleSubmit}>Save</button>
        </Modal>
    )
}

export default GroupForm
