var pic;
const kakaopath = '/storage/emulated/0/Android/data/com.kakao.talk/contents/';
const picpath = '/storage/emulated/0/botpic/';
const searchserver = 'https://saucenao.com/search.php?';
const api_key = '****';
const serverip = '****';
const basichtml = FileStream.read(picpath + 'html/' + 'basehtml.html');
const jjalpath = '/storage/emulated/0/botpic/jjal/';

var randomstring;
var prepic;             //use for identifying best match pic in kakao cache
var roomdict = {};      //room bot condition
var roomsimper = {};    //room bot option
var findingpic = 0;     //lock
var debugstring = '';
var piccount = 0;


function findpic(dirpath, isread)
{
    var root = new java.io.File(dirpath);
    var files = root.listFiles();

    if (!files) //if it is empty directory
    {
        root.delete();
    }
    else
    {
        for (var i=0;i<files.length;i++)
        {
            //if it is file
            if(files[i].isFile())
            {
                //search mode activated
                if (isread == 1)
                {
                    piccount += 1;
                    var temppic = new java.io.File(files[i]);

                    if (temppic.length() > prepic)  //if largest, pick
                    {
                        if(pic != 0){   //if there is previous picked file, delete it
                            pic.delete();
                        }
                        
                        pic = temppic;
                        prepic = pic.length();
                    }
                    else    //if not largest, delete
                    {
                        files[i].delete();
                    }
                }
                else        //if not search mod, delete
                {
                    files[i].delete();
                }

                

            }
            else        //if dir, recursive
            {
                findpic(files[i], isread);
                files[i].delete();
            }
        }
    }

}


function sendpic(room, replier, picfile)
{
    picfile = picfile + '.jpg';
    var url = searchserver + 'output_type=2&numres=5&url=' + serverip + picfile;
    //replier.reply(url);
    var responseString = Utils.getWebText(url).replace(/<[^>]*>/g, '');
    //replier.reply(responseString);
    var jsonob = JSON.parse(responseString);

    var similarity = jsonob.results[0].header.similarity;
    var creator = '';
    var creatorparamtable = {
        5:'member_name',    //pixiv
        8:'member_name',    //niconico
        24:'author_name',   //deviantart
        18:'creator',       //
        30:'creator'        //dandooru,sankaku
    }
    if (jsonob.results[0].header.index_id in creatorparamtable)
    {
        var creatorparam = creatorparamtable[jsonob.results[0].header.index_id];
        creator = jsonob.results[0].data[creatorparam];
    }
    var exturl = '';
    if ('ext_urls' in jsonob.results[0].data)
    {
        exturl = String(jsonob.results[0].data.ext_urls);
        exturl = exturl.replace(',',' , ');
    }
    var title = '';
    if ('title' in jsonob.results[0].data)
    {
        title = jsonob.results[0].data.title;
    }

    secondsearchurl = 'https://iqdb.org/?url=' + serverip + picfile;

    var replystring = secondsearchurl + '\n정확도: ' + similarity + '%\n작가: ' + creator + '\n링크: ' + exturl + '\n' + title;

    replier.reply(replystring);

    debugstring = responseString + '\n\n' + replystring + '\n\npiccount:' + piccount;
    return;
}

function savepic(replier, picfile)
{
    var webpicpath = serverip + 'savedpic/' + picfile + '.jpg';
    var newhtml = basichtml.replace('SOURCE',webpicpath);
    var newhtmlpath = picpath + 'html/' + picfile + '.html';
    FileStream.write(newhtmlpath ,newhtml);
    replier.reply(serverip + 'html/' + picfile + '.html');
}

function response(room, msg, sender, isGroupChat, replier, ImageDB) {

    if (!(room in roomdict))
    {
        roomdict[room] = 0;
        roomsimper[room] = 0;
    }

    if ( true && msg == '디버그')
    {
        replier.reply(debugstring);
    }

    if (msg.indexOf('라라봇설정') != -1)
    {
        roomsimper[room] = Number(msg.replace(/[^0-9]/g,""));
        replier.reply('[정확도 설정 ' + roomsimper[room] + '%]\n' + '카시코마!');
        return;
    }

    if (msg == '라라봇' && roomdict[room] == 0)
    {
        
        replier.reply('[정확도 설정 ' + roomsimper[room] + '%]\n' + '알겠슘돠!');
        findpic(kakaopath,0);
        randomstring = '';
        roomdict[room] = 1;
        return;
    }

    if (msg == '라라저장' && roomdict[room] == 0)
    {
        replier.reply('알겠슘돠!');
        findpic(kakaopath,0);
        randomstring = '';
        roomdict[room] = 2;
        return;
    }

    if (msg == '사진')
    {
        if (roomdict[room] == 0)
        {
            findpic(kakaopath,0);
            return;
        }
        else if (roomdict[room] == 1)   //pic search mode activated
        {
            pic = 0;
            prepic = 0;
            piccount = 0;
            findpic(kakaopath,1);
            if (piccount > 4)
            {
                replier.reply('에러 발생 ㅠ.ㅠ\n사진을 다시 올려 주세요');
                pic.delete();
                return;
            }
            
            randomstring = Math.random().toString(36).substring(7);
            pic.renameTo(new java.io.File(picpath + randomstring + '.jpg'));
            sendpic(room,replier,randomstring);
            roomdict[room] = 0;

            findpic(picpath + 'temphtmls/',0);      //from jjalbot.js
        }
        else if (roomdict[room] == 2)   //savepic mode
        {
            pic = 0;
            prepic = 0;
            piccount = 0;
            findpic(kakaopath,1);
            if (piccount > 4)
            {
                replier.reply('에러 발생 ㅠ.ㅠ\n사진을 다시 올려 주세요');
                pic.delete();
                return;
            }
            randomstring = Math.random().toString(36).substring(7);
            pic.renameTo(new java.io.File(picpath + 'savedpic/' + randomstring + '.jpg'));
            savepic(replier,randomstring);
            roomdict[room] = 0;

            findpic(picpath + 'temphtmls/',0);      //from jjalbot.js
        }
        
    }
    
    

}