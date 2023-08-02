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
    }
}

export default Helper;