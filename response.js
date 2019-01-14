
var pic;
const kakaopath = '/storage/emulated/0/Android/data/com.kakao.talk/contents/';
const picpath = '/storage/emulated/0/botpic/';
const searchserver = 'https://saucenao.com/search.php?';
const api_key = '******************';
const serverip = '****'
var randomstring;
var prepic;             //use for identifying best match pic in kakao cache
var roomdict = {};      //room bot condition
var roomsimper = {};    //room bot option
var findingpic = 0;     //lock

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
                    pic = new java.io.File(files[i]);

                    if (pic.length() > prepic)
                    {
                        prepic = pic.length();
                        randomstring = Math.random().toString(36).substring(7);
                        pic.renameTo(new java.io.File(picpath + randomstring + '.jpg'));
                    }
                }

                files[i].delete();

            }
            else
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

    var httpclient = new org.apache.http.impl.client.DefaultHttpClient();
    var get = new org.apache.http.client.methods.HttpGet(url);
    var response = httpclient.execute(get);
    var entity = response.getEntity();
    var responseString = org.apache.http.util.EntityUtils.toString(entity);
    //replier.reply(url);
    //replier.reply(responseString);
    var jsonob = JSON.parse(responseString);

    var similarity = jsonob.results[0].header.similarity;
    var creator = '';
    var creatorparamtable = {
        5:'member_name',    //pixiv
        8:'member_name',    //niconico
        24:'author_name',   //deviantart
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
        exturl = jsonob.results[0].data.ext_urls;
    }
    var title = '';
    if ('title' in jsonob.results[0].data)
    {
        title = jsonob.results[0].data.title;
    }

    secondsearchurl = 'https://iqdb.org/?url=' + serverip + picfile;

    var replystring = secondsearchurl + '\n정확도: ' + similarity + '\n작가: ' + creator + '\n링크: ' + exturl + '\n' + title;

    replier.reply(replystring);
}




function response(room, msg, sender, isGroupChat, replier, ImageDB) {

    if (!(room in roomdict))
    {
        roomdict[room] = 0;
        roomsimper[room] = 0;
    }

    if (1 && msg == '디버그')
    {
        //replier.reply(room);
    }

    if (msg.indexOf('라라봇설정') != -1)
    {
        roomsimper[room] = Number(msg.replace(/[^0-9]/g,""));
        replier.reply('[정확도 설정 ' + roomsimper[room] + '%]\n' + '카시코마!');
    }
    

    if (msg == '라라봇' && roomdict[room] == 0)
    {
        replier.reply('[정확도 설정 ' + roomsimper[room] + '%]\n' + '알겠슘돠!');
        roomdict[room] = 1;
        return;
    }

    if (msg == '사진')
    {
        if (roomdict[room] == 0)
        {
            findpic(kakaopath,0);
            return;
        }
        else if (roomdict[room] == 1)
        {
            prepic = 0;
            //findingpic = 1;
            findpic(kakaopath,1);
            sendpic(room,replier,randomstring);
            roomdict[room] = 0;
        }
        
    }

}
