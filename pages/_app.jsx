import { resetServerContext } from "react-beautiful-dnd"
import { MyProvider } from "../components/Context"

function MyApp({ Component, pageProps }) {
    return (
        <MyProvider>
            <Component {...pageProps} />
        </MyProvider>
    )
}

export default MyApp

export async function getServerSideProps() {
    resetServerContext()
}
