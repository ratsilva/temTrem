process.env.CLIENT_ID = '830684567270.820849481649'
process.env.CLIENT_SECRET = '44aa89946a83649b6d764ec6b4a05522'
process.env.PORT = '8765'

function onInstallation(bot, installer) {
    if (installer) {
        bot.startPrivateConversation({user: installer}, function (err, convo) {
            if (err) {
                console.log(err);
            } else {
                convo.say('I am a bot that has just joined your team');
                convo.say('You must now /invite me to a channel so that I can be of use!');
            }
        });
    }
}

var app = require('./lib/apps');
    var controller = app.configure(process.env.PORT, process.env.CLIENT_ID, process.env.CLIENT_SECRET, onInstallation);

controller.on('bot_channel_join', function (bot, message) {
    bot.reply(message, "Olá! Você pode me enviar `hello` ou `status`")
});

controller.hears('hello', 'direct_message,direct_mention,mention', function (bot, message) {
    bot.reply(message, 'Hello Human!');
});

controller.hears('status', 'direct_message,direct_mention,mention', function (bot, message) {
    bot.reply(message, 'Estamos atualmente no `trem #3` de Android!');
});