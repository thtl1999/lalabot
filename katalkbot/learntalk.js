const datapath = '/storage/emulated/0' + '/katalkbot/worddb.json';
var savedtxt = FileStream.read(datapath);
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
            var temp2 = '';
            for (var i=1;i<com.length;i++)
            {
                temp2 += '=' + com[i];
            }
            temp2 = temp2.replace('=','');
            if (temp1.length > 255 || temp2.length > 255)
            {
                replier.reply('너무 길어욧! >.<');
                roomflag[room] = 0;
                return;
            }

            jsonob[room][temp1] = temp2;
            replier.reply('아하! "' + com[0] + '"는 "' + temp2 + '" 이군요!');
            roomflag[room] = 0;
            savedtxt = JSON.stringify(jsonob);
            FileStream.write(datapath,savedtxt);
            return;
        }
    }

    if (msg == '!?현재톡방 디버그' && sender == '김민성')
    {
        var temptext = JSON.stringify(jsonob[room]);
        replier.reply(temptext);
    }

    if (msg == '!?전체톡방 디버그' && sender == '김민성')
    {
        replier.reply(savedtxt);
    }

}
