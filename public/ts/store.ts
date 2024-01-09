import { create } from "zustand";
import { devtools,persist } from "zustand/middleware";


/**
 * lorsqu'on veux ajouter un element dans le store l'id est optionnel
 */
export type addDataType={
    content:string,
    cardName:string,
    id?:number,
}

/**
 * Dans dataList l'id exist et l'id doit etre de type string|number pour que la librairy sortableJs marche
*/
export type dataType={
    content:string,
    cardName:string,
    id:number|string,
}

type StateType={
    modaleStatus:boolean,
    currentCardName:string|null,
    dataListA:dataType[]
    dataListB:dataType[]
    id:number 
}

type ActionType={
    showModale:()=>void,
    setCurrentCardName:(cardName:string)=>void,
    addData:(data:addDataType)=>void,
    swapDataCard:(data:dataType,cardName:string,newIndex:number)=>void,
    removeData:(id:number)=>void,
    test:(data:dataType[],cardName:string)=>void
    refresh:(data:dataType[],cardName:string)=>void,
    findDeletedData:(id:number,cardName:string)=>dataType|undefined
}


export const useStore=create<StateType&ActionType>()(devtools( (set,get)=>(

    {
        modaleStatus:false,
        currentCardName:null,
        dataListA:[],
        dataListB:[],
        id:0,
        setCurrentCardName:(cardName)=>set({currentCardName:cardName}),
        showModale:()=>set({ modaleStatus: !get().modaleStatus }),
        /**
         * Ajoute un nouveau element dans dataListA ou dans dataListB
         * @param data
         */
        addData(data){
            const incrementId=get().id+=1; 
            if(data.cardName==='cardA') {
                set({dataListA:[...get().dataListA,{...data,id:incrementId}] })
            }else {
                set({dataListB:[...get().dataListB,{...data,id:incrementId}] })
            }
        },
        /**
         * Change de groupe a un element lorsqu'on fait un drag
         * @param data 
         * @param cardName 
         * @param newIndex nouveau index de l'element dans le tableau du nouveau groupe
         */
        swapDataCard(data, cardName,newIndex) {
            if(cardName==='cardB') {
                get().dataListB.splice(newIndex,0,data)
            }else {
                get().dataListA.splice(newIndex,0,data)
            } 
        },
        /**
         * cherche dans dataListA et dataListB l'element qui a l'id=id
         * 
         * @param id id de l'element qu'on essai de supprimer
         * @param cardName cardName de l'element qu'on essai de supprimer
         * @returns {dataType|undefined} 
         */
        findDeletedData(id,cardName):dataType|undefined {
 
            let data;
            if(cardName==='cardA') {
                data=get().dataListA.find((el)=>el.id===id)
            }else {
                data=get().dataListB.find((el)=>el.id===id)
            }
      
            return data;
        },
        /**
         *   Supprime un element dans un groupe en utilisant l'id 
         *   cette function supprime l'element sans prendre en compte l'ordre des element presan sur la card
         * @param id 
         */
        removeData(id) {

     
            const newDataList1=get().dataListA.filter((data)=>data.id!==id);
            if(newDataList1.length>=0) {
                set({dataListA:newDataList1} )  
            } 

            const newDataList2=get().dataListB.filter((data)=>data.id!==id);
            if(newDataList2.length>=0) {
                set({dataListB:newDataList2} )
            }

        },
        test(data, cardName) {

            if(cardName==='cardA') {
                set({dataListA:data} ) 
            }else {
                set({dataListB:data} )
            }

        },
        refresh(data, cardName) {
            if(cardName==='cardA') {
               set({dataListA:data})
            }else {
                set({dataListB:data})
            }
        }

    }

)))

//useStore.subscribe((state)=>console.log(state))