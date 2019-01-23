const datapath = String(File.getSdcardPath()) + '/KakaoBot/BotData/learntalk/data.txt';
var savedtxt = File.read(datapath);
var jsonob = JSON.parse(savedtxt);
var roomflag = {};
var roomflag2 = {};


function response(room, msg, sender, isGroupChat, replier, ImageDB)
{
    if (!(room in roomflag))
    {
        roomflag[room] = 0;
        roomflag2[room] = 0;
    }

    if (room in jsonob)
    {
        if (msg in jsonob[room])
        {
            replier.reply(jsonob[room][msg]);
        }

        
    }
    else
    {
        jsonob[room] = {};
    }

    if (roomflag2[room] == 1)
    {
        if (msg in jsonob[room])
        {
            delete jsonob[room][msg];
            roomflag2[room] = 0;
            replier.reply('"' + msg + '"를 잊었어요!');
            return;
        }
    }
    
    if (msg == '라라 잊어')
    {
        replier.reply('무엇을 잊을까요?');
        roomflag2[room] = 1;
        return;
    }

    

    if (msg == '라라 배워')
    {
        roomflag[room] = 1;
        replier.reply('무엇을 알려줄건가요?')
        return;
    }

    if (roomflag[room] == 1)
    {
        if (msg.indexOf('=') != -1)
        {
            var com = msg.split('=');
            var temp1 = com[0];
            var temp2 = com[1];
            jsonob[room][temp1] = temp2;
            replier.reply('아하! "' + com[0] + '"는 "' + com[1] + '" 이군요!');
            roomflag[room] = 0;
            savedtxt = JSON.stringify(jsonob);
            File.save(datapath,savedtxt);
            return;
        }
    }

    if (msg == '현재톡방 디버그')
    {
        var temptext = JSON.stringify(jsonob[room]);
        replier.reply(temptext);
    }

    if (msg == '전체톡방 디버그')
    {
        replier.reply(savedtxt);
    }

}
