var priparacooltime = 0;
const pripara = [
    '오늘도 프리파라~ 내일도 프리파라~ 그러고보니 어제도 프리파라~',
    '프리파라는 정말 최고야!',
    '프리파라는 좋아해 프리?',
    '카시코마!',
    '알겠슘돠!'
];

const datapath = '/storage/emulated/0' + '/katalkbot/readme.txt';
const helpmsg = FileStream.read(datapath);



function response(room, msg, sender, isGroupChat, replier) {

    if (msg == '라라도움말')
    {
        replier.reply(helpmsg);
        return;
    }

    if (priparacooltime == 0)
    {
        if (msg.indexOf('프리파라') != -1)
        {
            var selected = Math.floor(Math.random() * (pripara.length));
            replier.reply(pripara[selected]);
            priparacooltime = 50;
            return;
        }
    }
    else
    {
        priparacooltime -= 1;
    }
    

}
