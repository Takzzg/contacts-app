import styled from "styled-components"

const StyledHeader = styled.div`
    display: flex;
    justify-content: space-between;
    gap: 1rem;
    font-size: 1.75rem;

    .buttons {
        font-size: 1rem;
        display: flex;
        gap: 1rem;

        span {
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 0.25rem;
            padding: 0.5rem;
            border-radius: 5px;

            &:hover {
                background-color: rgba(64, 224, 208, 0.5);
            }
        }
    }
`

const Header = ({ children }) => {
    return <StyledHeader>{children}</StyledHeader>
}

export default Header
