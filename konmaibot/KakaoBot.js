function listload(filename)
{
    var datapath = String(File.getSdcardPath()) + '/KakaoBot/BotData/konmaibot/songlist' + filename + '.txt';
    var savedtxt = File.read(datapath);
    return JSON.parse(savedtxt);
}

var sdvx = listload('sdvx');
var popn = listload('popn');
var ddr = listload('ddr');

function msgprocess(msg,gamename,game,replier)
{
    if (msg.indexOf('라라' + gamename) != -1)
    {
        if (msg.indexOf('리스트') != -1)
        {
            for (k in game)
            {
                if (msg.indexOf(k) != -1)
                {
                    replier.reply(game[k]);
                    return;
                }
            }

        }

        //multiple
        if (msg.indexOf('.') != -1)
        {
            msglist = msg.split('.');

            if (msglist.length > 10)
            {
                replier.reply('너무 많아욧! >.<');
                return;
            }

            for(var i=1;i<msglist.length;i++)
            {
                for (k in game)
                {
                    if (msglist[i] == k)
                    {
                        var selected = Math.floor(Math.random() * (game[k].length));
                        replier.reply(game[k][selected]);
                    }
                }

            }
            return;
        }

        //single
        for (k in game)
        {
            if (msg.indexOf(k) != -1)
            {
                var selected = Math.floor(Math.random() * (game[k].length));
                replier.reply(game[k][selected]);
                return;
            }
        }
    }
}

function response(room, msg, sender, isGroupChat, replier, ImageDB)
{
    msgprocess(msg,'사볼',sdvx,replier);
    msgprocess(msg,'팝픈',popn,replier);
    msgprocess(msg,'디디알',ddr,replier);

}
