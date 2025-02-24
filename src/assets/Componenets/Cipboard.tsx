import { useState, useEffect } from 'react';
import Card from './Card';
import './App.css';
import { v4 as uuidv4 } from 'uuid';

const uniqueId = uuidv4();
console.log(uniqueId);  

type CopiedData = {
  type: 'text' | 'image';
  content: string;
  id:string;
};

const Clipboard = () => {
  const [savedHistory, setSavedHistory] = useState<string[]>(() => {
    const savedHistory = localStorage.getItem('savedHistory');
    return savedHistory ? JSON.parse(savedHistory) : [];
  });

  const [copiedHistory, setCopiedHistory] = useState<CopiedData[]>([]);

  const handleCopy = async (event: ClipboardEvent) => {
    const _id=uuidv4()
    const clipboardData = event.clipboardData;
    if (clipboardData) {
      let copiedContent: CopiedData | null = null;

      const copiedText = clipboardData.getData('text');
      if (copiedText) {
        copiedContent = { type: 'text', content: copiedText ,id:_id};
      }

      const clipboardItems = clipboardData.items;
      for (let i = 0; i < clipboardItems.length; i++) {
        const item = clipboardItems[i];
        if (item.type.startsWith('image')) {
          const file = item.getAsFile();
          if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
              const imageUrl = reader.result as string;
              copiedContent = { type: 'image', content: imageUrl , id:_id };

              const randomKey = _id;
              if (copiedContent) {
                localStorage.setItem(randomKey, JSON.stringify(copiedContent));
                setSavedHistory((prevKeys) => [...prevKeys, randomKey]);
                setCopiedHistory((prevHistory) => {
                  if (copiedContent) {
                    return [...prevHistory, copiedContent]; 
                  }
                  return prevHistory; 
                });
              }
            };
            reader.readAsDataURL(file);
          }
        }
      }
      if (copiedText && !copiedContent) {
        copiedContent = { type: 'text', content: copiedText ,id:_id};
        const randomKey = _id
        localStorage.setItem(randomKey, JSON.stringify(copiedContent));
        setSavedHistory((prevKeys) => [...prevKeys, randomKey]);
        setCopiedHistory((prevHistory) => {
          if (copiedContent) {
            return [...prevHistory, copiedContent]; 
          }
          return prevHistory; 
        });
      }
    }
  };

  function removeCopiedItem(id:string){
    setCopiedHistory((prevHistory)=>prevHistory.filter((item)=>item.id!==id))
    localStorage.removeItem(id)
    setSavedHistory((prevHistory)=>prevHistory.filter((item)=>item!==id))
    
  }

  useEffect(() => {
    const loadHistory = savedHistory.map((key) => {
      const copiedData = JSON.parse(localStorage.getItem(key) || '{}');
      return copiedData;
    });
    setCopiedHistory(loadHistory.filter((data) => data !== null) as CopiedData[]); 
  }, [savedHistory]);

  useEffect(() => {
    document.addEventListener('paste', handleCopy);

    return () => {
      document.removeEventListener('paste', handleCopy);
    };
  }, []);

  return (
    <div>
      {copiedHistory.map((item, index) => {
        return <Card key={index} data={item} id={item.id} onDelete={removeCopiedItem}/>;
      })}
    </div>
  );
};

export default Clipboard;
