import type {PropsWithChildren,} from "react"
import {  useStore } from "../ts/store";
import type { dataType } from "../ts/store";

type CardPropsType=PropsWithChildren<{
    currentData:dataType
}>

export const Content=({currentData}:CardPropsType)=> {

    const removeData=useStore((state)=>state.removeData)
    const {content,id}=currentData
   
    const click=()=> {

        if(id) {
            const i=id.toString()
            removeData(parseInt(i))
        }
    }

    return (
                <p data-id={id} >{content} 
                    <button onClick={click} >X</button> 
                </p>
            )
}