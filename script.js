function getVideoId(url) {
    const regex = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/;
    const match = url.match(regex);
    return match ? match[1] : null;
}

async function download() {
    const url = document.getElementById('url').value;
    const status = document.getElementById('status');
    
    if (!url) {
        status.textContent = 'Введите ссылку';
        return;
    }
    
    const videoId = getVideoId(url);
    if (!videoId) {
        status.textContent = 'Неверная ссылка';
        return;
    }
    
    status.textContent = 'Обработка...';
    
    try {
        const apiUrl = `https://api.cobalt.tools/api/json`;
        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                url: url,
                vCodec: 'h264',
                vQuality: '720',
                aFormat: 'mp3',
                isAudioOnly: false
            })
        });
        
        const data = await response.json();
        
        if (data.status === 'redirect' || data.status === 'stream') {
            const downloadUrl = data.url;
            const a = document.createElement('a');
            a.href = downloadUrl;
            a.download = 'video.mp4';
            a.target = '_blank';
            a.click();
            status.textContent = 'Готово';
        } else {
            status.textContent = 'Ошибка';
        }
    } catch (error) {
        status.textContent = 'Ошибка';
    }
}

document.getElementById('url').addEventListener('keypress', (e) => {
    if (e.key === 'Enter') download();
});
