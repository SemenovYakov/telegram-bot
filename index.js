require("dotenv").config();

const { Telegraf, Markup, Scenes, session } = require("telegraf");
const SceneGenerator = require("./components/Scenes");
const commandList = require("./components/comandList");

const currentScene = new SceneGenerator();
const emailScene = currentScene.EmailScene();
const stage = new Scenes.Stage([emailScene]);
const bot = new Telegraf(process.env.BOT_TOKEN);

bot.use(session(), stage.middleware());
bot.hears("Получить сертификат", (ctx) => ctx.scene.enter("email"));
bot.start(async (ctx) => {
  await ctx.replyWithSticker(
    "CAACAgIAAxkBAAEEr-5ieQL1WxfzAqTkp2h4abIxHlLVJQACdAwAAra7OEuOzqfMQMSAJSQE"
  );
  await ctx.reply(
    ctx.message.from.first_name && ctx.message.from.last_name
      ? `Привет, ${
          ctx.message.from.first_name + " " + ctx.message.from.last_name
        }!`
      : `Привет, незнакомец!}`
  );
  commandList(ctx);
});

bot.launch(); //start bot
process.once("SIGINT", () => bot.stop("SIGINT"));
process.once("SIGTERM", () => bot.stop("SIGTERM"));
module.exports = bot;
