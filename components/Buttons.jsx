import { FaEdit, FaRandom, FaSave, FaTrash } from "react-icons/fa"
import styled from "styled-components"

const StyledGenericButton = styled.span`
    display: flex;
    align-items: center;
    gap: 0.25rem;
    padding: 0.5rem;
    cursor: pointer;
    background-color: rgba(255, 255, 255, 0.1);

    &:hover {
        background-color: rgba(64, 224, 208, 0.5);
    }
`

export const Generic = ({ children, onClick }) => {
    return (
        <StyledGenericButton onClick={onClick}>{children}</StyledGenericButton>
    )
}

const StyledIconButton = styled(Generic)`
    display: grid;
    grid-template-columns: auto 1fr;
    width: 100%;
`

export const IconButton = ({ onClick, showText = true, Icon, text }) => {
    return (
        <StyledIconButton onClick={onClick}>
            <Icon /> {showText && text}
        </StyledIconButton>
    )
}

export const Edit = ({ onClick, showText = true }) => {
    return (
        <IconButton
            Icon={FaEdit}
            onClick={onClick}
            showText={showText}
            text="Edit"
        />
    )
}

export const Delete = ({ onClick, showText = true }) => {
    return (
        <IconButton
            Icon={FaTrash}
            onClick={onClick}
            showText={showText}
            text="Delete"
        />
    )
}

export const Save = ({ onClick, showText = true }) => {
    return (
        <IconButton
            Icon={FaSave}
            onClick={onClick}
            showText={showText}
            text="Save"
        />
    )
}

export const Randomize = ({ onClick, showText = true }) => {
    return (
        <IconButton
            Icon={FaRandom}
            onClick={onClick}
            showText={showText}
            text="Randomize"
        />
    )
}
