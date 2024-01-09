import { useRef, useState} from "react"
import type { FormEvent,MouseEvent} from "react"
import {useStore } from "../ts/store"
import {ZodError, z} from "zod"


export const Modale=()=> {

    const [errorMessage,setErrorMessage]=useState(false);

    const modaleStatus=useStore((state)=>state.modaleStatus)
    const showModale=useStore((state)=>state.showModale);
    const addData=useStore((state)=>state.addData)
    const currentCardName=useStore((state)=>state.currentCardName);

    const formSubmit=(e:FormEvent)=> {
        e.preventDefault()

        const form=e.currentTarget as HTMLFormElement;

        const formData= new FormData(form);

        const data=Object.fromEntries(formData);

        const rules=z.object({
            content:z.string().min(1)
        });


        try {
             const validationResponse=rules.parse(data);

            if(validationResponse && currentCardName) {
                setErrorMessage(false);
                addData({...validationResponse,cardName:currentCardName});
            }

        }catch(e) {
            if(e instanceof ZodError) {
                setErrorMessage(true);
            }
        }
        
    }

    const inputRef=useRef<HTMLInputElement>(null)

    const close=(e:MouseEvent)=> {
        e.preventDefault()
        showModale()
        if(inputRef.current) {
            inputRef.current.value=''
        }
        
    }

    return  (
            
            <form  id="tasks_form" className={modaleStatus?'show':''} onSubmit={formSubmit}>
                    <section>
                        <input type="text" name="content" ref={inputRef} id="content" />
                        <button className="btn" id="submitBtn" >ok</button>
                        <button className="btn" id="closeBtn" onClick={close} >X</button>
                    </section> 
                    {errorMessage?<p id="message" ><em>Ce champ ne peux pas etre vide</em></p>:''}
            </form>
            )
    
}