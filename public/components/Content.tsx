import type {PropsWithChildren,} from "react"
import {  useStore } from "../ts/store";
import type { dataType } from "../ts/store";

type CardPropsType=PropsWithChildren<{
    currentData:dataType,
    s:dataType[]
}>

export const Content=({currentData,s}:CardPropsType)=> {

    const removeData=useStore((state)=>state.removeData)
    const test=useStore((state)=>state.test)
    const {content,id}=currentData
   
    const click=()=> {
       /*  const i=s.findIndex((el)=>el.id===id)
        const res=s.toSpliced(i,1)
        console.log(res);
        test(res,currentData.cardName) */
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