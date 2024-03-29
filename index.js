require('dotenv').config();
const { Telegraf } = require('telegraf');
const { message } = require('telegraf/filters');
const bot = new Telegraf(process.env.TOKEN);

const rand = () => Math.random() * 100;
const getText = () => `Ты террорист на ${rand().toFixed(0).toString()}%`;

bot.start(async ctx => ctx.reply('Welcome'));

bot.command('howmuchterroristareyou', async ctx => {
    const message_text = getText();
    await ctx.reply(message_text);
});

bot.on('inline_query', async (ctx) => {
    const message_text = getText();
    const results = [
        {
            type : 'article',
            id : 0,
            title : 'Насколько ты террорист?',
            description : 'Давай поскорее узнаем',
            message_text
        }
    ]
    await ctx.answerInlineQuery(results, { cache_time : 0 });
});

bot.launch();

// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));