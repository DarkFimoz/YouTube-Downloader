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
    
    status.textContent = 'Обработка...';
    
    try {
        const response = await fetch('/download', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ url })
        });
        
        if (!response.ok) throw new Error('Ошибка загрузки');
        
        const blob = await response.blob();
        const downloadUrl = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = downloadUrl;
        a.download = 'video.mp4';
        a.click();
        
        status.textContent = 'Готово';
    } catch (error) {
        status.textContent = 'Ошибка';
    }
}

document.getElementById('url').addEventListener('keypress', (e) => {
    if (e.key === 'Enter') download();
});
