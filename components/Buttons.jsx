import { FaEdit, FaRandom, FaSave, FaTrash } from "react-icons/fa"
import styled, { css } from "styled-components"

const StyledGenericButton = styled.button`
    display: flex;
    align-items: center;
    gap: 0.25rem;
    padding: 0.5rem;
    cursor: pointer;

    border: none;
    color: whitesmoke;
    background-color: rgba(255, 255, 255, 0.1);

    font-size: 1rem;

    &:hover {
        background-color: rgba(64, 224, 208, 0.5);
    }

    &:disabled {
        background-color: transparent;
        color: gray;
    }
`

export const Generic = ({ children, onClick, disabled, className }) => {
    return (
        <StyledGenericButton
            className={className}
            disabled={disabled}
            onClick={onClick}
        >
            {children}
        </StyledGenericButton>
    )
}

const StyledIconButton = styled(Generic)`
    display: grid;
    align-items: center;
    justify-content: center;

    ${({ columns }) =>
        columns &&
        css`
            grid-template-columns: auto 1fr;
        `}
`

export const IconButton = ({
    onClick,
    showText = true,
    Icon,
    text,
    disabled,
    className
}) => {
    return (
        <StyledIconButton
            disabled={disabled}
            className={className}
            onClick={onClick}
            columns={showText && text}
        >
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

export const Save = ({ onClick, showText = true, disabled }) => {
    return (
        <IconButton
            disabled={disabled}
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
