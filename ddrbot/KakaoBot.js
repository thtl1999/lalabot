const datapath = String(File.getSdcardPath()) + '/KakaoBot/BotData/ddrbot/songlistddr.txt';
var savedtxt = File.read(datapath);
var jsonob = JSON.parse(savedtxt);


function picksong(songlevel, replier)
{
    var selected = Math.floor(Math.random() * (jsonob[songlevel].length + 1));
    replier.reply(jsonob[songlevel][selected]);
}


function response(room, msg, sender, isGroupChat, replier, ImageDB)
{

    if (msg.indexOf('라라디디알') != -1)
    {
        for (k in jsonob)
        {
            if (msg.indexOf(k) != -1)
            {
                picksong(k, replier);
                return;
            }
        }
    }

}
