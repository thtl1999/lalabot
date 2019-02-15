function listload(filename)
{
    var datapath = '/storage/emulated/0' + '/katalkbot/songlist' + filename + '.txt';
    var savedtxt = FileStream.read(datapath);
    return JSON.parse(savedtxt);
}

var sdvx = listload('sdvx');
var popn = listload('popn');
var ddr = listload('ddr');
const YTkey = '****';
var lastname = '';
var lastlist;
var lastindex = 0;

const ytkeyword = {
    '사볼':'sdvx',
    '디디알':'ddr',
    '팝픈':'popn'
};

function youtubesearch(replier, url, index)
{
    if (index == 5){
        replier.reply('이제 그만 보내주자구 ㅠ.ㅠ');
        lastname = '';
        return;
    }
    var responseString = Utils.getWebText(url).replace(/<[^>]*>/g, '');
    //replier.reply(responseString);
    var jsonob = JSON.parse(responseString);
    //replier.reply(String(jsonob.items[0].id.videoId));
    if (jsonob.items[index].id.kind == 'youtube#channel' ){ index += 1; lastindex += 1;}
    var vtitle = jsonob.items[index].snippet.title;
    var vurl = 'https://youtu.be/' + String(jsonob.items[index].id.videoId);
    var vcreator = jsonob.items[index].snippet.channelTitle;
    replier.reply(vtitle + ' by ' + vcreator + '\n' + vurl);
    return;
}

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
                if (msg.indexOf('ㅇ') != -1)
                {
                    var searchstring = String(game[k][selected]) + ' ' + ytkeyword[gamename];
                    url = encodeURI('https://www.googleapis.com/youtube/v3/search?q=KEYWORD&part=snippet&key='.replace('KEYWORD',searchstring) + YTkey);
                    youtubesearch(replier,url,0);
                }
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

    if (msg.indexOf('라라유튜브 ') != -1)
    {
        
        var searchstring = msg.replace('라라유튜브 ','');
        url = encodeURI('https://www.googleapis.com/youtube/v3/search?q=KEYWORD&part=snippet&key='.replace('KEYWORD',searchstring) + YTkey);
        lastlist = url;
        youtubesearch(replier,url,0);
        lastname = sender;
        lastindex = 0;
        return;
    }

    if(msg == '다음' && lastname == sender)
    {
        lastindex += 1;
        youtubesearch(replier,lastlist,lastindex);
    }
}
