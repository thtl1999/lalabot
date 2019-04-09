const rootpath = '/storage/emulated/0/botpic/';
const danbo_apikey = '****';
const serverip = '****';
const basichtml = '<html><head></head><body><img src="SOURCE" style="width: 100%; height: auto;"></body></html>';
const basichtml2 = '<html><head></head><body></body></html>';
const imagetag = '<a href="HYPERLINK"><img class="lazy" src="PREVIEW" data-original="SOURCE" style="width: 100%; height: auto;"></a></body>';
const requesturl = 'https://danbooru.donmai.us/posts.json?random=1&limit=50&tags=';
const pixivurl = 'https://www.pixiv.net/member_illust.php?mode=medium&illust_id=';
const imagescript = '<script src="//code.jquery.com/jquery.min.js"></script><script src="//cdnjs.cloudflare.com/ajax/libs/jquery.lazyload/1.9.1/jquery.lazyload.min.js"></script><script>$("img.lazy").lazyload({effect : "fadeIn" , threshold : 2});</script>';

const jjaldir = new java.io.File(rootpath + 'jjal/');
const jjalfilelist = jjaldir.listFiles();
const jjalnumber = jjalfilelist.length;
var jjalfilelistarr = [];

for (var i=0;i<jjalfilelist.length;i++)
{
    jjalfilelistarr.push(jjalfilelist[i].getName());
}



const unlimitedbase = FileStream.read(rootpath + 'basehtmls/unlimited.html');
const unlimitedbase2 = unlimitedbase.replace('IMAGEFILES',JSON.stringify(jjalfilelistarr));

const girlstag = ['1girl','2girls','3girls','4girls','5girls','6girls','7girls','8girls'];
const limittag = ['loli','shota','toddlercon'];

const customtag = JSON.parse(FileStream.read('/storage/emulated/0/' + 'katalkbot/customtag.json'));
const romaji = JSON.parse(FileStream.read('/storage/emulated/0/' + 'katalkbot/krtojp.json'));

function randompic(replier, filename)
{
    var jjalpath = 'jjal/' + filename;
    var newhtml = basichtml.replace('SOURCE',serverip + jjalpath);
    var newhtmlpath ='html/' + filename + '.html';
    FileStream.write(rootpath + newhtmlpath, newhtml);
    replier.reply(serverip + newhtmlpath);
}

function addimage(htmlbody, source, preview, hyperlink)
{
    var newimage = imagetag.replace('SOURCE',source).replace('PREVIEW',preview).replace('HYPERLINK',hyperlink);
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
        var htmlbody = unlimitedbase2;
        var htmlname = Math.random().toString(36).substring(7);
        FileStream.write(rootpath + 'temphtmls/' + htmlname + '.html', htmlbody);
        var htmlpath = serverip + 'temphtmls/' + htmlname + '.html';
        replier.reply(htmlpath);
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
            replier.reply(tag + '에 대한 것을 못찾았어요 ㅠ.ㅠ');
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
                    
                }
                else    //add image to html
                {

                    htmlbody = addimage(htmlbody, String(jsonob[index].file_url), String(jsonob[index].preview_file_url), 'https://danbooru.donmai.us/posts/' + String(jsonob[index].id));
                    information += '\n작가: ' + String(jsonob[index].tag_string_artist) + ', postID: ' + String(jsonob[index].id);
                }

                if (found > 8) break;//prevent too many reply
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

        htmlbody = htmlbody.replace('</body>',imagescript + '</body>');

        replier.reply(tag + '에 대한 것을 찾아봤슘돠!\n' + makehtml(htmlbody));
    }

}