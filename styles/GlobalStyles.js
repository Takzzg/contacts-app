import { createGlobalStyle } from "styled-components"

const GlobalStyles = createGlobalStyle`
    html,
    body {
        padding: 0;
        margin: 0;
        font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen,
            Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
        color: whitesmoke;
        background-color: #161616;
    }

    input {
        color: whitesmoke;
        background-color: #161616;
        border: none;
        border-bottom: 1px solid whitesmoke;

        :focus {
            outline-color: whitesmoke;
        }
    }

    a {
        color: inherit;
        text-decoration: none;
    }

    * {
        box-sizing: border-box;
    }
`

export default GlobalStyles
