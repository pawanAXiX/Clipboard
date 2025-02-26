import { useState, useEffect } from 'react';
import Card from './Card';


interface CopiedData  {
  type: 'text' | 'image';
  content: string;
  id:number;
}

const Clipboard = () => {

  const [copiedItems, setCopiedItems] = useState<CopiedData[]>([]);

  useEffect(()=>{
    chrome.storage.local.get({copiedItems:[]},(result)=>{
      setCopiedItems(result.copiedItems);
    });
  });

  chrome.storage.onChanged.addListener((changes)=>{
    if(changes.copiedItems){
      setCopiedItems(changes.copiedItems.newValue);
    }
  })


function removeCopiedItem(id:number){
  setCopiedItems((prev)=>{
    return prev.filter((item)=>item.id!=id)
  });
  chrome.storage.local.get("copiedItems", (result) => {
    const copiedItems = result.copiedItems || [];
    const updatedItems = copiedItems.filter((item:CopiedData) => item.id !== id); 
    chrome.storage.local.set({ copiedItems: updatedItems }, () => {
      console.log('Item removed and updated in storage');
    });
  });
}


  return (
    
      <div>
      {copiedItems.map((item, index) => {
        return <Card key={index} data={item} onDelete={removeCopiedItem}/>;
      })}
    </div>
  );
};

export default Clipboard;
