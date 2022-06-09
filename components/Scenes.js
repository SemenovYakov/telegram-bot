const { Scenes, Markup, session } = require("telegraf");
const validation = require("./validation");
const request = require("./bdrequest");
const commandList = require("../components/comandList");

const options = {
  reply_markup: JSON.stringify({
    inline_keyboard: [
      [{ text: "Мне больше не нужен сертификат", callback_data: "leave" }],
    ],
  }),
};

class SceneGenerator {
  EmailScene() {
    const email = new Scenes.BaseScene("email");
    email.enter(async (ctx) => {
      await ctx.reply("Введите ваш email", options);
    });
    email.on("callback_query", async (ctx) => {
      await commandList(ctx);
      await ctx.scene.leave();
    });
    email.on("text", async (ctx) => {
      if (validation.validateEmail(ctx.message.text)) {
        const data = await request.BDRequest(ctx.message.text);
        if (!data) {
          await ctx.reply(
            "Участник с таким email не зарегистрирован! Возможно вы ошиблись!"
          );
          ctx.scene.reenter();
        }
        await ctx.reply(
          "Ваш сертификат формируется! Это займет не более 10 сек..."
        );
        await ctx.reply(
          `Ваша ссылка для скачивания: https://gramotadel.express/getfile/${data}/pdf`
        );
        await ctx.scene.leave();
      } else {
        await ctx.reply("Неверный формат! Попробуйте снова!");
        await ctx.scene.reenter();
      }
    });
    email.on("message", async (ctx) => await ctx.reply("Нужен только email!"));
    return email;
  }
}

module.exports = SceneGenerator;
