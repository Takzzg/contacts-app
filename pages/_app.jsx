import { MyProvider } from "../components/Context"
import GlobalStyles from "../styles/GlobalStyles"

function MyApp({ Component, pageProps }) {
    return (
        <MyProvider>
            <GlobalStyles />
            <Component {...pageProps} />
        </MyProvider>
    )
}

export default MyApp
