import { Card } from "./Card"

export const Home=()=>{

    const cardName=[{name:'list 1',cardName:'cardA'},{name:'list 2',cardName:'cardB'}]

    const cards=cardName.map((data,key)=> {
        return <Card {...data}  key={key} />
    })
 
    return (<div id="home" >{cards}</div>)
}
