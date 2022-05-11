const { Telegraf } = require("telegraf");
require("dotenv").config();
const command_text = require("./components/constants");

const bot = new Telegraf(process.env.BOT_TOKEN);
bot.start((ctx) => {
  ctx.replyWithSticker(
    "CAACAgIAAxkBAAEEr-5ieQL1WxfzAqTkp2h4abIxHlLVJQACdAwAAra7OEuOzqfMQMSAJSQE"
  );
  ctx.reply(
    ctx.message.from.first_name && ctx.message.from.last_name
      ? `Привет, ${
          ctx.message.from.first_name + " " + ctx.message.from.last_name
        }!`
      : `Привет, незнакомец!}`
  );
  console.log(ctx.message);
});

bot.help((ctx) => ctx.reply(command_text.commands));

// bot.command("questions", (ctx) => {});

bot.launch(); //start bot
// Enable graceful stop
process.once("SIGINT", () => bot.stop("SIGINT"));
process.once("SIGTERM", () => bot.stop("SIGTERM"));
