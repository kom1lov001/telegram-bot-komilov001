require("dotenv").config();
const TelegramBot = require("node-telegram-bot-api");
const token = process.env.BOT_TOKEN;

const bot = new TelegramBot(token, { polling: true });

bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;
  const user = msg.from;

  const info = `
🧾 Sizning ma'lumotlaringiz:

👤 Ism: ${user.first_name || "-"}
🧑‍💼 Familiya: ${user.last_name || "-"}
🔗 Username: @${user.username || "-"}
🆔 ID: ${user.id}
🌐 Til: ${user.language_code || "-"}

📲 Telefon raqamingizni yuborish uchun tugmadan foydalaning 👇`;

  bot.sendMessage(chatId, info, {
    reply_markup: {
      keyboard: [
        [
          {
            text: "📞 Telefon raqamni yuborish",
            request_contact: true,
          },
        ],
      ],
      resize_keyboard: true,
      one_time_keyboard: true,
    },
  });
});

bot.on("contact", (msg) => {
  const chatId = msg.chat.id;
  const contact = msg.contact;
  console.log(msg);
  const telInfo = `
✅ Raqamingiz qabul qilindi!

👤 Ism: ${contact.first_name}
📱 Telefon: ${contact.phone_number}
🆔 Telegram ID: ${contact.user_id}
`;

  bot.sendMessage(chatId, telInfo);
});
