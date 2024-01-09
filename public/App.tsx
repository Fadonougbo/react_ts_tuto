import { createRoot } from "react-dom/client"
import { Home } from "../src/components/Home"
import { Modale } from "../src/components/Modale"

const App=()=>{
    return (
        <section id="container" >
            <Home />
            <Modale />
        </section>
        )
}

const root=createRoot(document.querySelector("#app") as HTMLElement)

root.render(<App/>)