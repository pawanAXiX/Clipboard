
document.addEventListener('copy', (event) =>{
  console.log(11)
    navigator.clipboard.readText().then(text => {
      if (text) {
        console.log(22)
        chrome.runtime.sendMessage({
          action: 'saveToClipboard',
          type: 'text',
          content: text
        });
      }
    }).catch(err => console.error('Failed to read clipboard text:', err));
    
    
    const selection = window.getSelection();
    if (selection && selection.rangeCount > 0) {
      const range = selection.getRangeAt(0);
      const container = range.commonAncestorContainer;
      const containsImage = Array.from(range.cloneContents().querySelectorAll('img')).length > 0;
      
      if (containsImage) {
        const images = Array.from(range.cloneContents().querySelectorAll('img'));
        if (images.length > 0) {
          const imgSrc = images[0].src;
          if (imgSrc) {
            if (imgSrc.startsWith('data:')) {
              chrome.runtime.sendMessage({
                action: 'saveToClipboard',
                type: 'image',
                content: imgSrc
              });
            } else {
              const canvas = document.createElement('canvas');
              const ctx = canvas.getContext('2d');
              const img = new Image();
              img.crossOrigin = 'anonymous';
              img.onload = function() {
                canvas.width = img.width;
                canvas.height = img.height;
                ctx?.drawImage(img, 0, 0);
                const dataURL = canvas.toDataURL('image/png');
                chrome.runtime.sendMessage({
                  action: 'saveToClipboard',
                  type: 'image',
                  content: dataURL
                });
              };
              img.src = imgSrc;
            }
          }
        }
      }
    }
  });

