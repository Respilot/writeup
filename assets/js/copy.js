// Add copy buttons to all code blocks
window.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('pre').forEach(pre => {
    const code = pre.querySelector('code');
    const text = code ? code.innerText : pre.innerText;
    const button = document.createElement('button');
    button.className = 'copy-btn';
    button.type = 'button';
    button.innerHTML = '&#128203;';
    button.addEventListener('click', () => {
      navigator.clipboard.writeText(text).then(() => {
        button.textContent = 'copied';
        setTimeout(() => button.innerHTML = '&#128203;', 2000);
      });
    });
    pre.appendChild(button);
  });
});
