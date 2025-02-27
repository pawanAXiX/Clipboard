
import React, { useEffect, useState } from 'react';
import Card from './Card';



type ClipboardItem={
  type:"text"|"image"|string;
  content:string;
  id:string;
}


const Clipboard: React.FC = () => {
  const [clipboardItems, setClipboardItems] = useState<ClipboardItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    chrome.storage.local.get(['clipboardItems'], (result) => {
      if (result.clipboardItems) {
        setClipboardItems(result.clipboardItems);
      }
      setLoading(false);
    });

    chrome.storage.onChanged.addListener((changes) => {
      if (changes.clipboardItems) {
        setClipboardItems(changes.clipboardItems.newValue);
      }
    });
  }, []);

  const handleDelete = (id: string) => {
    const updatedItems = clipboardItems.filter(item => item.id !== id);
    chrome.storage.local.set({ clipboardItems: updatedItems });
  };

  const handleCopy = async (item: ClipboardItem) => {
    if (item.type === 'text') {
      await navigator.clipboard.writeText(item.content);
    } else if (item.type === 'image') {
      try {
        const blob = await fetch(item.content).then(r => r.blob());
        await navigator.clipboard.write([
          new ClipboardItem({
            [blob.type]: blob
          })
        ]);
      } catch (err) {
        console.error('Failed to copy image:', err);
      }
    }
  };

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="clipboard">
      <div className="clipboard-list">
        {clipboardItems.length === 0 ? (
          <div className="empty-state">No items saved yet</div>
        ) : (
          clipboardItems.map(item => (
            <Card
              key={item.id}
              item={item}
              onCopy={() => handleCopy(item)}
              onDelete={() => handleDelete(item.id)}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default Clipboard;