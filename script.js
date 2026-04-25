async function download() {
    const url = document.getElementById('url').value;
    const status = document.getElementById('status');
    
    if (!url) {
        status.textContent = 'Введите ссылку';
        return;
    }
    
    if (!url.includes('youtube.com') && !url.includes('youtu.be')) {
        status.textContent = 'Неверная ссылка';
        return;
    }
    
    status.textContent = 'Перенаправление...';
    
    const videoId = url.match(/(?:v=|youtu\.be\/)([^&\s]+)/)?.[1];
    if (!videoId) {
        status.textContent = 'Неверная ссылка';
        return;
    }
    
    window.open(`https://www.y2mate.com/youtube/${videoId}`, '_blank');
    status.textContent = 'Готово';
}

document.getElementById('url').addEventListener('keypress', (e) => {
    if (e.key === 'Enter') download();
});
