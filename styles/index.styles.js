import styled from "styled-components"

export const StyledIndex = styled.div`
    display: grid;
    grid-template-areas:
        "title title"
        "contacts groups";
    grid-template-columns: 1fr 2fr;
    grid-template-rows: auto 1fr;

    width: 100vw;
    height: 100vh;
    padding: 2rem;
    gap: 1rem;

    .contacts,
    .groups {
        display: flex;
        gap: 1rem;
        flex-direction: column;
        overflow: hidden;
        height: 100%;
    }

    .title {
        grid-area: title;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .contacts {
        grid-area: contacts;
    }
    .groups {
        grid-area: groups;
    }

    .contactsList,
    .groupsList {
        overflow-y: auto;
        max-height: 100%;

        display: flex;
        flex-direction: column;
        gap: 0.5rem;
    }
`
