const TelegramApi = require("node-telegram-bot-api");
const Request = require("sync-request");


const Callback = require('./commands/uptime.js');
//const Tokyo = require('./commands/Request.js');
const fs = require('fs');

const TOKEN = '548250899:AAF4AyJ66VROlABe6DJaBcbbhESUTFpsHo4';
const BOT_NAME = 'TokyoMetro_bot';

const request = require("request");
const cheer = require('cheerio');

const PORT = '80';
const HOST = '127.0.0.1';
const TIMEOUT = 1000;
const bot = new TelegramApi(TOKEN, {
  polling: true,
  interval: 100
});
bot.onText(new RegExp('/tokyo', 'i'), (msg, match) => {
  var start = msg.text.split(" ")[1];
  var end = msg.text.split(" ")[2];
  if (start == null) {
    bot.sendMessage(msg.chat.id, "정확한 명령어를 입력하여주세요");
    return;
  }
  let url = 'https://www.tokyometro.jp/kr/ticket/search/index.php?ticSearchName01_01=' + start + '&ticSearchName01_02=' + end + "&priority=priTime&day=21&month=201803&hour=0&minute=47&searchOrder=departureTime&fareType=typeAdult&search.x=115&search.y=17";
  request(url, function(error, response, body) {
    var $ = cheer.load(body);
    var postElements = $("p.stName");
    //  console.log(postElements.contents().data);
    var str = "";
    postElements.contents().each(function() {
      var d = this;
      //  console.log(d.data);
      if (d.data == null) {
        bot.sendMessage(msg.chat.id, "정확한 명령어를 입력하여주세요");
        return;
      }
      if (start.toString() == d.data.toString()) {
        str += ",";
      }
      str += "<b>" + d.data + "</b> -> ";
    });
    try {
      let option = {
        parse_mode: 'html'
      }
      let mes = str.split(",")[1].substr(0, str.split(",")[1].length - 3);
      console.log(mes);
      bot.sendMessage(msg.chat.id, mes, option);
    } catch (Exception) {
      bot.sendMessage(msg.chat.id, "정확한 명령어를 입력하여주세요");
      return;
    }
  });
});

let helloRegex = new RegExp('/hello@' + BOT_NAME, 'i');
bot.onText(helloRegex, (msg, match) => {
  let chatId = msg.chat.id;
  let message = `hi` + `, i'm TokyoBot`;
  bot.sendMessage(chatId, message);
  console.log(chatId + " 채팅아이디 , ");
});
let uptimeRegex = new RegExp('/uptime@' + BOT_NAME, 'i');
bot.onText(uptimeRegex, (msg, match) => {
  let chatId = msg.chat.id;
  let message = "";
  Callback(function(message) {
    bot.sendMessage(chatId, message);
  });
});
var statusRegex = new RegExp('/status', 'i');
bot.onText(statusRegex, (msg, match) => {
  let chatId = msg.chat.id;
  let message = "";
  message = fs.readFileSync('app.js', 'utf8').toString().split('\n').length;
  bot.sendMessage(chatId, message + " 줄로 구성되어있음");
});

const sampleData = new RegExp(`^/(sample)(@${BOT_NAME})?$`, 'i')
bot.onText(sampleData, (msg, match) => {
  let messageId = msg.message.message_id;
  let chatId = msg.chat.id;
  let option = {
    reply_to_message_id: messageId,
    parse_mode: 'html'
  }
  bot.sendChatAction(chatId, 'typing')
  // let message = Tokyo(function(){
  //
  // })


})

// const quest = new RegExp(`^/(tokyo|metro)(@${BOT_NAME})?$`, 'i');
// bot.onText(quest, (msg, match) => {
//   const time = Date.now() / 1000;
//   if (time - msg.data > TIMEOUT) return;
//   const messageId = msg.message_id;
//   const chatId = msg.chat.id;
//   const option = {
//     reply_to_message_id: messageId
//   }
//
//   const inlineKeyboard = {
//     inline_keyboard: [
//       [{
//           text: "긴자선",
//           callback_data: 'G'
//         },
//         {
//           text: '마루노우치선',
//           callback_data: 'M'
//         },
//         {
//           text: '히비야선',
//           callback_data: 'H'
//         },
//         {
//           text: '도자이선',
//           callback_data: 'T'
//         },
//         {
//           text: '치요다선',
//           callback_data: 'C'
//         },
//         {
//           text: '유라쿠초선',
//           callback_data: 'Y'
//         },
//         {
//           text: '한조몬선',
//           callback_data: 'Z'
//         },
//         {
//           text: '난보쿠선',
//           callback_data: 'N'
//         },
//         {
//           text: '후쿠토신선',
//           callback_data: 'F'
//         }
//       ]
//     ]
//   }
//   const options = {
//     reply_markup: JSON.stringify(startLine),
//     reply_to_message_id: messageId,
//     parse_mode: 'html'
//   }
//   bot.on('callback_query', answer => {
//
//   })
//   bot.sendMessage(chatId, result, options).then(sent => {
//     if (answer.data === 'G') {
//       const inlineKeyboard = {
//         inline_keyboard: [
//           [{
//               text: '긴자역',
//               callback_data: 'ginza'
//             },
//             {
//               text: '후쿠오카역',
//               callback_data: 'hokkoka'
//             }
//           ]
//         ]
//       }
//       const options = {
//         reply_markup: JSON.stringify(inlineKeyboard),
//         chat_id: chatId,
//         message_id: answer.message.message_id,
//         parse_mode: 'html'
//       }
//
//
//     }
//   });
//
// });

console.log(BOT_NAME + 'Login! ACCECT~');
