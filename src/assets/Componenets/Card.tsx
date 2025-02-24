
import Button from './Button';

type CopiedData={
    type?:string;
    content?:string;
    id:string;
}

type CardProps={
    data:CopiedData;
    onDelete:(id:string)=>void;
    id:string
};

const Card:React.FC<CardProps>=({data,onDelete})=>{
    const handleDelete=()=>{
        if(data.id){
            onDelete(data.id);
        }
        else{
            console.error("Id is undefined");
        }
    };
    
    return(
        <div>
            {data.type=='text' &&<p>{data.content}</p>}
            {data.type=='image'&& <img src={data.content} />}
            <div>
                
                <Button onClick={handleDelete} label="Delete"/>
            </div>
        </div>
    )
}

export default Card;    