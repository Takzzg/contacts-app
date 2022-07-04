import Image from "next/image"
import { useContext, useEffect, useState } from "react"
import { MyContext } from "../Context"
import Modal from "../Modal"
import styled from "styled-components"

const StyledContactForm = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    .profile {
        display: flex;
        /* flex-direction: column; */
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
        padding: 1rem;
    }
`

const ContactForm = () => {
    const [formErrors, setformErrors] = useState([])
    const {
        contactForm,
        handleContactForm,
        randomizePicture,
        randomizeContactForm,
        closeModal,
        createContact,
        updateContact
    } = useContext(MyContext)

    useEffect(() => {
        let errors = []

        Object.entries(contactForm).forEach(([key, value]) => {
            if (!value) errors.push(`${key} Can't be empty`)
        })

        setformErrors(errors)
    }, [contactForm])

    const handleSubmit = () => {
        if (formErrors.length) return
        if (contactForm.id) updateContact(contactForm.id)
        else createContact(contactForm)
        closeModal()
    }

    const handleChange = (e) => {
        handleContactForm({ ...contactForm, [e.target.name]: e.target.value })
    }

    return (
        <Modal>
            <StyledContactForm>
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
                    <button onClick={randomizePicture}>Random Image</button>
                </span>
                <div className="form">
                    <label htmlFor="firstName">First name</label>
                    <input
                        type="text"
                        name="firstName"
                        id="firstName"
                        value={contactForm.firstName}
                        onChange={handleChange}
                    />

                    <label htmlFor="lastName">Last name</label>
                    <input
                        type="text"
                        name="lastName"
                        id="lastName"
                        value={contactForm.lastName}
                        onChange={handleChange}
                    />

                    <label htmlFor="phone">Phone</label>
                    <input
                        type="text"
                        name="phone"
                        id="phone"
                        value={contactForm.phone}
                        onChange={handleChange}
                    />

                    <label htmlFor="street">Street</label>
                    <input
                        type="text"
                        name="street"
                        id="street"
                        value={contactForm.street}
                        onChange={handleChange}
                    />

                    <label htmlFor="number">Number</label>
                    <input
                        type="text"
                        name="number"
                        id="number"
                        value={contactForm.number}
                        onChange={handleChange}
                    />

                    <label htmlFor="city">City</label>
                    <input
                        type="text"
                        name="city"
                        id="city"
                        value={contactForm.city}
                        onChange={handleChange}
                    />

                    <label htmlFor="country">Country</label>
                    <input
                        type="text"
                        name="country"
                        id="country"
                        value={contactForm.country}
                        onChange={handleChange}
                    />
                </div>
                <button onClick={handleSubmit} disabled={formErrors.length}>
                    Save
                </button>
                <button onClick={randomizeContactForm}>Randomize</button>
            </StyledContactForm>
        </Modal>
    )
}

export default ContactForm
