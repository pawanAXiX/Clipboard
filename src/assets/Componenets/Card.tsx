import { useState } from 'react';
import Button from './Button';

type CopiedData={
    text?:string;
    image?:string;
    id:string;
}

type CardProps={
    data:CopiedData;
    onDelete:(id:string)=>void;
    onEdit:(id:string)=>void;
    onCopy:(data:CopiedData)=>void;
};

const Card:React.FC<CardProps>=({data,onDelete,onEdit,onCopy})=>{
    
    return(
        <div>
            {data.text &&<p>{data.text}</p>}
            {data.image&& <img src={data.image} />}
            <div>
                <Button onClick={()=>onCopy(data)} label="Copy"/>
                <Button onClick={()=>onCopy(data.id)} label="Edit"/>
                <Button onClick={()=>onCopy(data.id)} label="Delete"/>
            </div>
        </div>
    )
}

export default Card;    