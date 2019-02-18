const rootpath = '/storage/emulated/0/botpic/';
const danbo_apikey = '****';
const serverip = 'http://example.com:12345/';
const basichtml = '<html><head></head><body><img src="SOURCE" style="width: 100%; height: auto;"></body></html>';
const basichtml2 = '<html><head></head><body></body></html>';
const imagetag = '<img src="SOURCE" style="width: 100%; height: auto;"></body>';
const requesturl = 'https://danbooru.donmai.us/posts.json?random=1&limit=50&tags=';
const pixivurl = 'https://www.pixiv.net/member_illust.php?mode=medium&illust_id=';

const jjaldir = new java.io.File(rootpath + 'jjal/');
const jjalfilelist = jjaldir.listFiles();
const jjalnumber = jjalfilelist.length;

const girlstag = ['1girl','2girls','3girls','4girls','5girls','6girls','7girls','8girls'];
const limittag = ['loli','shota','toddlercon'];

const customtag = JSON.parse(FileStream.read('/storage/emulated/0/' + 'katalkbot/customtag.json'));
const romaji = JSON.parse(FileStream.read('/storage/emulated/0/' + 'katalkbot/krtojp.json'));

function addimage(htmlbody, source)
{
    var newimage = imagetag.replace('SOURCE',source);
    var newhtmlbody = htmlbody.replace('</body>',newimage + '</body>');
    return newhtmlbody;
}

function makehtml(htmlbody)
{
    var htmlname = Math.random().toString(36).substring(7);
    FileStream.write(rootpath + 'html/' + htmlname + '.html', htmlbody);
    var htmlpath = serverip + 'html/' + htmlname + '.html';
    return htmlpath;
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

function krtojp(tag)
{
    var result = '';
    for(var i=0;i<tag.length;i++)
    {
        if(tag[i] in romaji)
        {
            result += romaji[tag[i]];
        }
        else
        {
            result += tag[i];
        }
    }

    return result;
}


function response(room, msg, sender, isGroupChat, replier) {

    if (msg == '라라짤')
    {
        var htmlbody = basichtml2;
        for (var i=0;i<10;i++)
        {
            var selected = Math.floor(Math.random() * (jjalnumber));
            var source = serverip + 'jjal/' + jjalfilelist[selected].getName();
            htmlbody = addimage(htmlbody, source);
        }

        replier.reply(makehtml(htmlbody));
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

        if (tag == '랜덤'){
            var url = requesturl.replace('&tags=','') + tag;
        }
        else{
            tag = krtojp(tag);
            //replier.reply(tag);
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
        var found = 0;
        var htmlbody = basichtml2;
        var information = '';
        while(index < jsonob.length)
        {
            pictags = String(jsonob[index].tag_string_general).split(' ');
            if (listinlist(girlstag,pictags) && String(jsonob[index].source).indexOf('.zip') == -1 && (String(jsonob[index].rating) == picrate || String(jsonob[index].rating) == picrate2))
            {
                //found image
                found++;

                if (listinlist(limittag,pictags))//if cannot load image
                {
                    var sourceurl = String(jsonob[index].source);
                    if (sourceurl.indexOf('fanbox') != -1 || sourceurl.indexOf('pixiv') == -1)
                    {
                        index++;
                        continue;
                    }

                    var temp1 = sourceurl.split('/');
                    var temp2 = temp1[temp1.length -1].split('_');
                    var pixivid = temp2[0].split('.');
                    replier.reply(pixivurl + pixivid[0]);
                    index += 10;    //prevent too many reply
                }
                else    //add image to html
                {

                    htmlbody = addimage(htmlbody, String(jsonob[index].file_url));
                    information += '\n작가: ' + String(jsonob[index].tag_string_artist) + ', postID: ' + String(jsonob[index].id);
                    index += 5;    //prevent too many reply
                }
            }
            index++;
        }

        //replier.reply(pictags);
        if (found == 0)
        {
            replier.reply('찾기가 힘드네요 >.<');
            return;
        }

        if (htmlbody == basichtml2) return;

        replier.reply(makehtml(htmlbody) + information);
    }

}