chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.type === "COPY_TEXT") {
        chrome.storage.local.get({ copiedItems: [] }, (result) => {
            const updatedItems = [...result.copiedItems, { type: "text", content: message.content, id: Date.now() }];
            chrome.storage.local.set({ copiedItems: updatedItems });
            
        });
    }
    if(message.type=='COPY_IMAGE'){
        chrome.storage.local.get({ copiedItems: [] }, (result) => {
            const updatedItems = [...result.copiedItems, { type: "image", content: message.content, id: Date.now() }];
            chrome.storage.local.set({ copiedItems: updatedItems });
            
        });
    }
});
