import ytdl from 'ytdl-core';
import fs from 'fs';
import replaceSpaceWithDash from './replaceSpaceWithDash.js';

const DownloadAndSendAudio = async (url, ctx) => {
    if (url) {

        const music = ytdl(url, { filter: 'audioonly' });
        const info = await ytdl.getInfo(url);
        const title = info.videoDetails.title;
        const duration = info.videoDetails.lengthSeconds;
        const minutes = Math.floor(duration / 60);
        const image = info.videoDetails.thumbnails[0].url;
        const newTitle = replaceSpaceWithDash(title);

        ctx.replyWithPhoto({ url: image });
        ctx.reply(`مدة الفيديو : ${minutes} دقيقة`);
        ctx.reply(`اسم الفيديو : ${title}`);

        const filePath = `${newTitle}.mp4`;

        const fileStream = fs.createWriteStream(filePath);

        music.pipe(fileStream);

        fileStream.on('finish', () => {
            ctx.replyWithAudio({ source: filePath })
                .then(() => {
                    fs.unlink(filePath, (err) => {
                        if (err) {
                            console.error('Error deleting file: ', err);
                        }
                    });
                });
        });
        
    } else {
        ctx.reply('قم بارسال رابط الاغنية بشكل صحيح');	
    }
};

export default DownloadAndSendAudio;