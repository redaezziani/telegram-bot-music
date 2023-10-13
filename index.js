import { Telegraf } from 'telegraf';
import env from 'dotenv';

import DownloadAndSendAudio from './utils/downloadAndSendAudio.js';
env.config();

const bot = new Telegraf(process.env.BOT_TOKEN_TELEGRAM);

let userMessages = [];

// Start command
bot.start((ctx) => {
    const userId = ctx.message.from.id;
    const messageContent = 'start';
    userMessages.push({ userId, messageContent, timestamp: new Date() });
    ctx.reply('مرحبا بك في بوت تحميل الاغاني من اليوتيوب');
});

// Command to request MP3 download
bot.command('downloadmp3', (ctx) => {
    const userId = ctx.message.from.id;
    if ( userId==6628767608) {
        ctr.reply('مرحبا بكي في هذا البوت الرائعو انتي عزيزتي الوحيدة اللي تستخدمينه')
    }
    const messageContent = 'downloadmp3';
    userMessages.push({ userId, messageContent, timestamp: new Date() });
    ctx.reply('قم بارسال رابط الاغنية');

});
// lets make the await the user to send the url

bot.on('text', async (ctx) => {
    const userId = ctx.message.from.id;
    const messageContent = ctx.message.text;
    userMessages.push({ userId, messageContent, timestamp: new Date() });
    const url = messageContent;
    DownloadAndSendAudio(url, ctx);
});

bot.launch();
