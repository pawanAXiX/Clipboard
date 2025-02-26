document.addEventListener("copy", (event) => {
    const copiedText = document.getSelection()?.toString();
    if (copiedText) {
        chrome.runtime.sendMessage({ type: "COPY_TEXT", content: copiedText });

    }
    const clipboardData = event.clipboardData;
    if (clipboardData) {
        const items = clipboardData.items;
        for (let i = 0; i < items.length; i++) {
            const item = items[i];
            if (item.type.startsWith("image")) {
                const file = item.getAsFile();
                if (file) {
                    const reader = new FileReader();
                    reader.onloadend = () => {
                        const imageData = reader.result
                        chrome.runtime.sendMessage({ type: "COPY_IMAGE", content: imageData });
                    };
                    reader.readAsDataURL(file);  
                }
            }
        }
    }
});
