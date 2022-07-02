import Image from "next/image"
import { useContext, useEffect, useState } from "react"
import { fetchOneUser } from "../../utils/api"
import { MyContext } from "../Context"
import Modal from "../Modal"
import styled from "styled-components"

const StyledContactForm = styled.div`
    form {
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
        changePicture,
        closeModal,
        createContact,
        updateContact
    } = useContext(MyContext)

    useEffect(() => {
        const checkFormErrors = () => {
            let errors = []

            if (!contactForm.firstName) errors.push("Must have a first name")
            if (!contactForm.lastName) errors.push("Must have a last name")
            if (!contactForm.phone) errors.push("Must have a phone number")
            if (!contactForm.picture) errors.push("Must have a profile picture")

            setformErrors(errors)
        }
        checkFormErrors()
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

    const fetchRandomImage = async () => {
        let user = await fetchOneUser()
        changePicture(user[0].picture.large)
    }

    return (
        <Modal>
            <StyledContactForm>
                <span className="profile">
                    {contactForm.picture && (
                        <Image
                            src={contactForm.picture}
                            alt=""
                            width={"100%"}
                            height={"100%"}
                        />
                    )}
                    <button onClick={fetchRandomImage}>Random Image</button>
                </span>
                <form>
                    <label htmlFor="firstName">firstName</label>
                    <input
                        type="text"
                        name="firstName"
                        id="firstName"
                        value={contactForm.firstName}
                        onChange={handleChange}
                    />

                    <label htmlFor="lastName">lastName</label>
                    <input
                        type="text"
                        name="lastName"
                        id="lastName"
                        value={contactForm.lastName}
                        onChange={handleChange}
                    />

                    <label htmlFor="phone">phone</label>
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

                    <label htmlFor="number">number</label>
                    <input
                        type="text"
                        name="number"
                        id="number"
                        value={contactForm.number}
                        onChange={handleChange}
                    />

                    <label htmlFor="city">city</label>
                    <input
                        type="text"
                        name="city"
                        id="city"
                        value={contactForm.city}
                        onChange={handleChange}
                    />

                    <label htmlFor="country">country</label>
                    <input
                        type="text"
                        name="country"
                        id="country"
                        value={contactForm.country}
                        onChange={handleChange}
                    />
                </form>
                <button onClick={handleSubmit}>Save</button>
            </StyledContactForm>
        </Modal>
    )
}

export default ContactForm
