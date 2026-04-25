const express = require('express');
const ytdl = require('ytdl-core');
const app = express();

app.use(express.json());
app.use(express.static('.'));

app.post('/download', async (req, res) => {
    const { url } = req.body;
    
    if (!ytdl.validateURL(url)) {
        return res.status(400).send('Invalid URL');
    }
    
    try {
        res.header('Content-Disposition', 'attachment; filename="video.mp4"');
        ytdl(url, { quality: 'highest' }).pipe(res);
    } catch (error) {
        res.status(500).send('Download failed');
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
