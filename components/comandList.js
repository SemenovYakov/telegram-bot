const { Markup } = require("telegraf");

const commandList = async (ctx) => {
  await ctx.reply(
    "Что вы хотите?",
    Markup.keyboard([
      ["Получить сертификат"],
      ["Расписание на сегодня"],
    ])
      .resize(true)
      .oneTime()
  );
};

module.exports = commandList;
