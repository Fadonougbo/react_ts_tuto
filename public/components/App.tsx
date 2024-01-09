import { createRoot } from "react-dom/client"
import { Home } from "./Home"
import { Modale } from "./Modale"

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