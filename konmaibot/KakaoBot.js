function listload(filename)
{
    var datapath = String(File.getSdcardPath()) + '/KakaoBot/BotData/konmaibot/songlist' + filename + '.txt';
    var savedtxt = File.read(datapath);
    return JSON.parse(savedtxt);
}

var sdvx = listload('sdvx');
var popn = listload('popn');
var ddr = listload('ddr');

function picksong(game, songlevel, replier)
{
    var selected = Math.floor(Math.random() * (game[songlevel].length));
    replier.reply(game[songlevel][selected]);
}


function response(room, msg, sender, isGroupChat, replier, ImageDB)
{

    if (msg.indexOf('라라사볼') != -1)
    {
        for (k in sdvx)
        {
            if (msg.indexOf(k) != -1)
            {
                picksong(sdvx, k, replier);
                return;
            }
        }
    }

    if (msg.indexOf('라라팝픈') != -1)
    {
        for (k in popn)
        {
            if (msg.indexOf(k) != -1)
            {
                picksong(popn, k, replier);
                return;
            }
        }
    }

    if (msg.indexOf('라라디디알') != -1)
    {
        for (k in ddr)
        {
            if (msg.indexOf(k) != -1)
            {
                picksong(ddr, k, replier);
                return;
            }
        }
    }

}
