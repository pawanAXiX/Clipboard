import { useState } from 'react';
import Button from './Button';

type CopiedData={
    type?:string;
    content?:string;
    id?:string;
}

type CardProps={
    data:CopiedData;
    onDelete:(id:string)=>void;
    id:string
};

const Card:React.FC<CardProps>=({data,onDelete})=>{
    
    return(
        <div>
            {data.type=='text' &&<p>{data.content}</p>}
            {data.type=='image'&& <img src={data.content} />}
            <div>
                
                <Button onClick={()=>onDelete(data.id)} label="Delete"/>
            </div>
        </div>
    )
}

export default Card;    