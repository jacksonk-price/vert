const Helper = {
    insertHTML(parent, html) {
        parent.insertAdjacentHTML("beforeend", html);
    },
    truncateText(text, maxLength) {
        if (text.length <= maxLength) {
          return text;
        } else {
          return text.slice(0, maxLength) + "...";
        }
    },
    uniqueId() {
      return 'element-' + Date.now();
    },
    base64ToUint8Array(base64) {
      const binaryString = window.atob(base64);
      const bytes = new Uint8Array(binaryString.length);
      for (let i = 0; i < binaryString.length; i++) {
        bytes[i] = binaryString.charCodeAt(i);
      }
      return bytes;
    },
    uint8ArrayToBlob(uint8Array) {
      const arrayBuffer = uint8Array.buffer;
      return new Blob([arrayBuffer], { type: 'audio/wav' });
    }
}

export default Helper;