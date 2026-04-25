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
    window.open(`https://loader.to/api/button/?url=${encodeURIComponent(url)}&format=mp4&color=green`, '_blank');
    status.textContent = 'Готово';
}

document.getElementById('url').addEventListener('keypress', (e) => {
    if (e.key === 'Enter') download();
});
