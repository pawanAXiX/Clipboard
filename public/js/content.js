document.addEventListener("copy", (event) => {
    const copiedText = document.getSelection()?.toString();
    if (copiedText) {
        chrome.runtime.sendMessage({ type: "COPY_TEXT", content: copiedText });
    }
});
