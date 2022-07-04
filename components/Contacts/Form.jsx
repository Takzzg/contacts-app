import Image from "next/image"
import { useContext, useEffect, useState } from "react"
import { MyContext } from "../Context"
import styled from "styled-components"
import { Randomize, Save } from "../Buttons"

const StyledContactForm = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 1rem;

    .title {
        font-size: 1.5rem;
    }

    .profile {
        display: grid;
        grid-template-columns: 100px auto;
        align-items: center;
        gap: 1rem;

        .imagePlaceholder {
            width: 100px;
            height: 100px;
            display: flex;
            align-items: center;
            justify-content: center;
            border: 1px dashed whitesmoke;
        }
    }

    .form {
        display: grid;
        grid-template-columns: auto 1fr;
        gap: 0.5rem;
    }

    .buttons {
        display: flex;
        gap: 0.5rem;
    }
`

const CustomInput = ({ prop, text }) => {
    const { contactForm, handleContactForm } = useContext(MyContext)

    const handleChange = (e) => {
        handleContactForm({ ...contactForm, [e.target.name]: e.target.value })
    }

    return (
        <>
            <label htmlFor={prop}>
                {text ||
                    prop[0].toUpperCase() + prop.substring(1).toLowerCase()}
            </label>
            <input
                type="text"
                name={prop}
                id={prop}
                value={contactForm[prop]}
                onChange={handleChange}
            />
        </>
    )
}

const ContactForm = () => {
    const [formErrors, setformErrors] = useState({})
    const {
        contactForm,
        randomizePicture,
        randomizeContactForm,
        closeModal,
        createContact,
        updateContact
    } = useContext(MyContext)

    useEffect(() => {
        let errors = {}

        Object.entries(contactForm).forEach(([key, value]) => {
            if (!value) errors[key] = `${key} Can't be empty`
        })

        setformErrors(errors)
    }, [contactForm])

    const handleSubmit = () => {
        if (formErrors.length) return
        if (contactForm.id) updateContact(contactForm.id)
        else createContact(contactForm)
        closeModal()
    }

    return (
        <StyledContactForm>
            <span className="title">New Contact</span>
            <span className="profile">
                {contactForm.picture ? (
                    <Image
                        src={contactForm.picture}
                        alt=""
                        width={"100%"}
                        height={"100%"}
                    />
                ) : (
                    <div className="imagePlaceholder">No Image</div>
                )}
                <Randomize onClick={randomizePicture} showText={false} />
            </span>
            <div className="form">
                <CustomInput prop="firstName" text="First Name" />
                <CustomInput prop="lastName" text="Last Name" />
                <CustomInput prop="phone" />
                <CustomInput prop="street" />
                <CustomInput prop="number" />
                <CustomInput prop="city" />
                <CustomInput prop="country" />
            </div>
            <div className="buttons">
                <Randomize onClick={randomizeContactForm} />
                <Save
                    disabled={Object.entries(formErrors).length}
                    onClick={handleSubmit}
                />
            </div>
        </StyledContactForm>
    )
}

export default ContactForm
