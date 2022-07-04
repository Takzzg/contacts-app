import { useContext } from "react"
import styled from "styled-components"
import { MyContext } from "./Context"

const StyledModal = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100vw;
    height: 100vh;
    z-index: 2;
    top: 0;
    left: 0;
    position: absolute;

    .overlay {
        top: 0;
        left: 0;
        position: absolute;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.9);
        z-index: -1;
    }

    .content {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        background-color: #161616;
        overflow: hidden;
        border-radius: 1rem;
        padding: 1rem;
    }
`

const Modal = ({ children }) => {
    const { closeModal } = useContext(MyContext)
    return (
        <StyledModal>
            <div className="overlay" onClick={closeModal} />
            <div className="content">{children}</div>
        </StyledModal>
    )
}

export default Modal
