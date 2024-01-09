import {useState, type PropsWithChildren, useEffect } from "react"
import { dataType, useStore } from "../ts/store";
import { Content } from "./Content";
import { ReactSortable,Sortable } from "react-sortablejs";

type CardPropsType=PropsWithChildren<{
    cardName:string,
}> 

export const Data=({cardName}:CardPropsType)=> {

    let dataList:dataType[];

    if(cardName==='cardA') {
       dataList=useStore((state)=>state.dataListA);
    }else {
      dataList=useStore((state)=>state.dataListB);
    }
 
    const removeData=useStore((state)=>state.removeData)
    const findDeletedData=useStore((state)=>state.findDeletedData)
    const swapDataCard=useStore((state)=>state.swapDataCard)
    const test=useStore((state)=>state.test)

    const [state,setState]=useState<dataType[]>([])
/*     const y=['doe',111,'gaut']
    const r=y.findIndex((el)=>el==='gaut')
    console.log(r); */  
    //const currentCardList=dataList?.filter((data)=>data.cardName===cardName);
    const lists=state?.map((data)=><Content currentData={data} key={data.id} s={state} />)
    
    useEffect(()=> {
      setState(()=>dataList)
    },[dataList])
     
    const onEnd=(evt: Sortable.SortableEvent)=> {
      /**
       * Index de l'element dans le tableau son nouveau groupe(card) 
       */
      const newIndex=evt?.newIndex

      /**
       * classe de nouveau card
       */
      const newCard=evt.to.className
      if(newCard!==cardName) {

        const dataId=evt.item.dataset.id
        let res;
        /**
         * Supprime l'element de son ancien groupe
         */
        if(dataId) {
           const id=parseInt(dataId)
           res=findDeletedData(id,cardName)

            /* const i=state.findIndex((el)=>el.id===id)
            const x=state.toSpliced(i,1)
            console.log(cardName,x);
            test(x,cardName) */

           removeData(id)
         
        }

        /**
         * ajoute l'element a son nouveau groupe
         */
        if(res) {
          const {content,id}=res
          const i=newIndex as number
          swapDataCard({content,id,cardName:newCard},newCard,i)
        }
          
          
      }


    }

    //console.log(`${cardName}`,state);

    //console.log(`${cardName}`,state);
    //console.log(`data ${cardName}`,currentCardList);

    
    return (
        <section  className="data_container" id={cardName} >
          <ReactSortable 
              group='shared'
              onEnd={onEnd}
              list={state} 
              setList={setState}
              className={cardName}
          >
            {lists}
          </ReactSortable>
        </section>
    )
}