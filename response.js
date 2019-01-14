
var pic;
const kakaopath = '/storage/emulated/0/Android/data/com.kakao.talk/contents/';
const picpath = '/storage/emulated/0/botpic/';
const searchserver = 'https://saucenao.com/search.php';
var randomstring;
var prepic;
var working = 0;
var roomdict = {};
var roomsimper = {};

function findpic(dirpath, isread)
{
    var root = new java.io.File(dirpath);
    var files = root.listFiles();

    if (!files)
    {
        root.delete();
    }
    else
    {
        for (var i=0;i<files.length;i++)
        {
            if(files[i].isFile())
            {
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







function response(room, msg, sender, isGroupChat, replier, ImageDB) {

    if (!(room in roomdict))
    {
        roomdict[room] = 0;
        roomsimper[room] = 0;
    }

    if (msg.indexOf('라라봇설정') != -1)
    {
        roomsimper[room] = Number(msg.replace(/[^0-9]/g,""));
        replier.reply('[정확도 설정 ' + roomsimper[room] + '%]\n' + '카시코마!');
    }

    if (msg != '사진' && roomdict[room] == 1)
    {
        return;
    }

    if (msg == '라라봇' && roomdict[room] == 0)
    {
        replier.reply('[정확도 설정 ' + roomsimper[room] + '%]\n' + '알겠슘돠!');
        roomdict[room] = 1;
        return;
    }

    if (roomdict[room] == 0)
    {
        findpic(kakaopath, 0);
        return;
    }


    prepic = 0;
    findpic(kakaopath, 1);
    //replier.reply(pic);
    
    

    var httpclient = new org.apache.http.impl.client.DefaultHttpClient();
    var post = new org.apache.http.client.methods.HttpPost(searchserver);
    var file = new java.io.File(picpath + randomstring);

    var serverpicname = 'http://220.79.80.161:12345/' + randomstring + '.jpg';



    arguments = new java.util.ArrayList(1);
    arguments.add(new org.apache.http.message.BasicNameValuePair("url",serverpicname));
    arguments.add(new org.apache.http.message.BasicNameValuePair("api_key",'****************************'));

    post.setEntity(new org.apache.http.client.entity.UrlEncodedFormEntity(arguments));
    var response = httpclient.execute(post);
    entity = response.getEntity();
    responseString = org.apache.http.util.EntityUtils.toString(entity);

    //replier.reply(responseString);
    
    answer = '';

    flink = 0;
    fcreator = 0;
    fpixiv = 0;
    fsmil = 0;
    fgelboo = 0;
    fdandoo = 0;

    var splitedhtml = responseString.split('"');
    for (var i=0;i<splitedhtml.length;i++)
    {
        //replier.reply(splitedhtml[i]);

        
        if (splitedhtml[i].indexOf('iqdb.org') != -1 && flink==0)
        {
            newsite = splitedhtml[i].replace('org?url','org/?url');

            answer += newsite + '\n\n';
            flink = 1;
        }
        
        if (splitedhtml[i].indexOf('resultsimilarityinfo') != -1)
        {
            if (fsmil == 0)
            {
                fsmil = splitedhtml[i+1].replaceAll("[^-\.0-9]","");
                answer += '정확도: ' + fsmil + '%\n';
            }
            else
            {
                fsmil = splitedhtml[i+1].replaceAll("[^-\.0-9]","");
            }

            
            if (Number(fsmil) < roomsimper[room])
            {
                fcreator = 1;
                fpixiv = 1;
                fgelboo = 1;
                fdandoo = 1;
            }
            
        }

        if (splitedhtml[i].indexOf('Creator') != -1 && fcreator == 0)
        {
            var cnames = splitedhtml[i].indexOf('</strong>') + 9;
            var cnamee = splitedhtml[i].indexOf('<br />');

            answer += '작가:' + splitedhtml[i].substring(cnames,cnamee) + '\n';
            fcreator = 1;
        }

        if (splitedhtml[i].indexOf('www.pixiv.net') != -1 && fpixiv == 0)
        {
            answer += '픽시브: ' + splitedhtml[i] + '\n';
            fpixiv = 1;
        }

        if (splitedhtml[i].indexOf('danbooru.donmai') != -1 && fdandoo == 0)
        {
            answer += '단보루: ' + splitedhtml[i] + '\n';
            fdandoo = 1;
        }

        if (splitedhtml[i].indexOf('gelbooru.com') != -1 && fgelboo == 0)
        {
            answer += '갤보루: ' + splitedhtml[i] + '\n';
            fgelboo = 1;
        }

    }


    replier.reply(answer);

    findpic(picpath,0);

    roomdict[room] = 0;

}
