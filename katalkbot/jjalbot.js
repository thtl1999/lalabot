const rootpath = '/storage/emulated/0/botpic/';
const danbo_apikey = '****';
const serverip = 'http://lalabot.ga:12345/';
const basichtml = '<html><head></head><body><img src="SOURCE" style="width: 100%; height: auto;"></body></html>';
const requesturl = 'https://danbooru.donmai.us/posts.json?random=1&limit=50&tags=';
const pixivurl = 'https://www.pixiv.net/member_illust.php?mode=medium&illust_id=';

const jjaldir = new java.io.File(rootpath + 'jjal/');
const jjalfilelist = jjaldir.listFiles();
const jjalnumber = jjalfilelist.length;

const girlstag = ['1girl','2girls','3girls','4girls','5girls','6girls','7girls','8girls'];
const limittag = ['loli','shota','toddlercon'];

const customtag = JSON.parse(FileStream.read('/storage/emulated/0/' + 'katalkbot/customtag.json'));

function randompic(replier, filename)
{
    var jjalpath = 'jjal/' + filename;
    var newhtml = basichtml.replace('SOURCE',serverip + jjalpath);
    var newhtmlpath ='html/' + filename + '.html';
    FileStream.write(rootpath + newhtmlpath, newhtml);
    replier.reply(serverip + newhtmlpath);
}

function listinlist(indexlist, targetlist)
{
    for (var i=0;i<indexlist.length;i++)
    {
        if (targetlist.indexOf(indexlist[i]) > -1)
            return true;
    }
    return false;
}


function response(room, msg, sender, isGroupChat, replier) {

    if (msg == '라라짤')
    {
        var selected = Math.floor(Math.random() * (jjalnumber));
        var filename = jjalfilelist[selected].getName();
        randompic(replier,filename);
        return;
    }

    if (msg.indexOf('라라찾아 ') != -1)
    {
        if (msg.indexOf('19라라찾아 ') != -1){
            var picrate = 'e';
            var picrate2 = 'q';
            msg = msg.replace('19라라찾아 ','라라찾아 ');
        }
        else{
            var picrate = 's';
            var picrate2 = 's';
        }


        var tag = msg.replace('라라찾아 ','');
        if (tag in customtag){
            tag = customtag[tag];
        }

        tag = tag.replace(' ','_');

        if (tag == '랜덤'){
            var url = requesturl.replace('&tags=','') + tag;
        }
        else{
            var url = requesturl + tag;
        }
        
        var responsedata = Utils.getWebText(url).replace(/<[^>]*>/g, '');
        var jsonob = JSON.parse(responsedata);

        if (jsonob.length == 0)
        {
            replier.reply('못찾았어요 ㅠ.ㅠ');
            return;
        }
        //replier.reply(responsedata);
        var index = 0;
        var pictags;
        while(index < jsonob.length)
        {
            pictags = String(jsonob[index].tag_string_general).split(' ');
            if (listinlist(girlstag,pictags) && String(jsonob[index].source).indexOf('.zip') == -1 && (String(jsonob[index].rating) == picrate || String(jsonob[index].rating) == picrate2))
            {
                if (listinlist(limittag,pictags))
                {
                    var sourceurl = String(jsonob[index].source);
                    if (sourceurl.indexOf('fanbox') != -1 || sourceurl.indexOf('pixiv') == -1)
                    {
                        index++;
                        continue;
                    }

                    var temp1 = sourceurl.split('/');
                    var temp2 = temp1[temp1.length -1].split('_');
                    var pixivid = temp2[0];
                    replier.reply(pixivurl + pixivid);
                    return;
                }

                break;
            }
            index++;
        }

        //replier.reply(pictags);
        if (jsonob.length == index)
        {
            replier.reply('찾기가 힘드네요 >.<');
            return;
        }
        
        var danbourl = String(jsonob[index].file_url);
        var newhtml = basichtml.replace('SOURCE',danbourl);
        var newhtmlpath ='html/' + danbourl + '.html';
        FileStream.write(rootpath + newhtmlpath, newhtml);
        replier.reply(serverip + newhtmlpath);
    }

}