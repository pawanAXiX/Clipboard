chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.type === "COPY_TEXT") {
        chrome.storage.local.get({ copiedItems: [] }, (result) => {
            const updatedItems = [...result.copiedItems, { type: "text", content: message.content, id: Date.now() }];
            chrome.storage.local.set({ copiedItems: updatedItems });
        });
    }
});
