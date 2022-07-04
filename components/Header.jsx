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
            border-radius: 10px;
        }
    }
`

const Header = ({ children }) => {
    return <StyledHeader>{children}</StyledHeader>
}

export default Header
