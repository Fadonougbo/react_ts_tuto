//import { MouseEvent } from "react"
import {useStore} from '../ts/store'
import type { PropsWithChildren } from "react"


type AddPropsType=PropsWithChildren<{
    cardName:string
}>

export const Add=({cardName}:AddPropsType)=> {

    const showModale=useStore((state)=>state.showModale);
    const modaleStatus=useStore((state)=>state.modaleStatus);
    const setCurrentCardName=useStore((state)=>state.setCurrentCardName);

    const show=()=> {

        if(!modaleStatus) {
            showModale();
        }
        setCurrentCardName(cardName)
    }

    return (
            <div className="add_button_container" >
               <button className="add_button" data-name={cardName} onClick={show} >Add</button> 
            </div>
          )
}