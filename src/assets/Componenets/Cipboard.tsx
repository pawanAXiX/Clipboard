import { useState ,useEffect} from 'react'
import Card from './Card'
import './App.css'

type CopiedData={
    type:'text'|'image'
    content:string;
};


const Clipboard=() =>{

    const [copiedHistory,setCopiedHistory]=useState<CopiedData[]>(([])=>{
        const savedHistory:CopiedData=localStorage.getItem('key');
        return savedHistory?savedHistory:;
    });

    const[saveHistory,setSaveHistory]=useState<CopiedData>(()=>{
        
    });

    const handleCopy=async (event:ClipboardEvent)=>{
        const clipboardData=event.clipboardData;
        if (clipboardData){
            let copiedContent:CopiedData|null=null;

            const copiedText=clipboardData.getData('text')
            if(copiedText){
                copiedContent={type:'text',content:copiedText}
            }
            const clipboardItems=clipboardData.items;
            for(let i=0;i<clipboardItems.length;i++){
                const item=clipboardItems[i];
                if(item.type.startsWith('image')){
                    const file=item.getAsFile();
                    if(file){
                        const reader=new FileReader();
                        reader.onloadend=()=>{
                            const imageUrl=reader.result as string;
                            setCopiedHistory(()=>;
                        };
                        reader.readAsDataURL(file)
                    }
                }
            }
        }
        
    };

    useEffect(()=>{
        document.addEventListener('copy',handleCopy);
        return ()=>{
            document.removeEventListener('copy',handleCopy);
        };
    },[]);

    // return (
    //     <div>
    //         <div>
    //             {copiedHistory.map((item,index)=>(
    //                 <div key={index}>
    //                     <Card />
    //                 </div>
    //             )
    //             )}
    //         </div>
    //     </div>
    // )

    return copiedHistory.map((item,index)=>{
        return <Card key={index} data={item}/>
    })
    
    
};

export default Clipboard;


