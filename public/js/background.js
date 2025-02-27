
chrome.runtime.onInstalled.addListener(() => {
    chrome.storage.local.get(['clipboardItems'], (result) => {
      if (!result.clipboardItems) {
        chrome.storage.local.set({ clipboardItems: [] });
      }
    });
  });
  
  chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === 'saveToClipboard') {
      chrome.storage.local.get(['clipboardItems'], (result) => {
        const items = result.clipboardItems || [];
        const newItem = {
          id: Date.now().toString(),
          type: message.type,
          content: message.content,
        };
        
        const updatedItems = [newItem, ...items];
        
        const limitedItems = updatedItems.slice(0, 50);
        
        chrome.storage.local.set({ clipboardItems: limitedItems });
        sendResponse({ success: true });
      });
      return true; // Required for async response
    }
  });