import type { PropsWithChildren } from "react"
import { Add } from "./Add"
import { Data } from "./Data"



type CardPropsType=PropsWithChildren<{
    name:string,
    cardName:string
}>

export const Card=({name,cardName}:CardPropsType)=> {
  

    return (
            <section className={'card'} >
                <h1 className="card_name" >{name}</h1>
                <Add cardName={cardName} />
                <Data cardName={cardName}/>
            </section>
        
    )
}