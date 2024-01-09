import { Card } from "./Card"

export const Home=()=>{

    const cardName=[{name:'á faire',cardName:'cardA'},{name:'déja fait',cardName:'cardB'}]

    const cards=cardName.map((data,key)=> {
        return <Card {...data}  key={key} />
    })
 
    return (<div id="home" >{cards}</div>)
}
