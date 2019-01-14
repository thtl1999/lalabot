
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

var teststring = '{"header":{"user_id":0,"account_type":0,"short_limit":"8","long_limit":"150","long_remaining":144,"short_remaining":7,"status":0,"results_requested":5,"index":{"0":{"status":0,"parent_id":0,"id":0,"results":5},"2":{"status":0,"parent_id":2,"id":2,"results":5},"3":{"status":0,"parent_id":3,"id":3,"results":5},"4":{"status":0,"parent_id":4,"id":4,"results":5},"5":{"status":0,"parent_id":5,"id":5,"results":5},"51":{"status":0,"parent_id":5,"id":51,"results":5},"52":{"status":0,"parent_id":5,"id":52,"results":5},"6":{"status":0,"parent_id":6,"id":6,"results":5},"8":{"status":0,"parent_id":8,"id":8,"results":5},"9":{"status":0,"parent_id":9,"id":9,"results":40},"10":{"status":0,"parent_id":10,"id":10,"results":5},"11":{"status":0,"parent_id":11,"id":11,"results":5},"12":{"status":1,"parent_id":9,"id":12},"16":{"status":0,"parent_id":16,"id":16,"results":5},"18":{"status":0,"parent_id":18,"id":18,"results":5},"19":{"status":0,"parent_id":19,"id":19,"results":5},"20":{"status":0,"parent_id":20,"id":20,"results":5},"21":{"status":0,"parent_id":21,"id":21,"results":5},"211":{"status":0,"parent_id":21,"id":211,"results":5},"22":{"status":0,"parent_id":22,"id":22,"results":5},"23":{"status":0,"parent_id":23,"id":23,"results":5},"24":{"status":0,"parent_id":24,"id":24,"results":5},"25":{"status":1,"parent_id":9,"id":25},"26":{"status":1,"parent_id":9,"id":26},"27":{"status":1,"parent_id":9,"id":27},"28":{"status":1,"parent_id":9,"id":28},"29":{"status":1,"parent_id":9,"id":29},"30":{"status":1,"parent_id":9,"id":30},"31":{"status":0,"parent_id":31,"id":31,"results":5},"32":{"status":0,"parent_id":32,"id":32,"results":5},"33":{"status":0,"parent_id":33,"id":33,"results":5},"34":{"status":0,"parent_id":34,"id":34,"results":5},"35":{"status":0,"parent_id":35,"id":35,"results":5},"36":{"status":0,"parent_id":36,"id":36,"results":5},"37":{"status":0,"parent_id":37,"id":37,"results":5}},"search_depth":"128","minimum_similarity":47.41,"query_image_display":"userdata\/1QKItcKr1.jpg.png","query_image":"1QKItcKr1.jpg","results_returned":5},"results":[{"header":{"similarity":"95.20","thumbnail":"https:\/\/img3.saucenao.com\/booru\/4\/1\/4186df6eb7bd2d6660ccf411f897a1ed_0.jpg","index_id":30,"index_name":"Index #9: Danbooru - 4186df6eb7bd2d6660ccf411f897a1ed_0.jpg"},"data":{"ext_urls":["https:\/\/danbooru.donmai.us\/post\/show\/3161141","https:\/\/gelbooru.com\/index.php?page=post\u0026s=view\u0026id=4285353"],"danbooru_id":3161141,"gelbooru_id":4285353,"creator":"shinjiro","source":""}},{"header":{"similarity":"46.41","thumbnail":"https:\/\/img3.saucenao.com\/frames\/?expires=1547486310\u0026init=8cb6f41f5924cd30\u0026data=3363815f2f0ee702dd48a86a43bc843384aad007845e369bdb7ef4dc225ce493320ac59e27ee3a4725823ac5a4adc66082b4754159306189b4cd055f2b51fd862019bbcdb39fae8b62d84d0f09a94789d750bfbb3ff40e5192f2ad427b213d74f40be46529cb1e1d82a0afac0b5b3b0ea019292ae57ac3fdd3a88751b2ccb9ff977d2314959ca0987f38574d11afc225ef71579a70b9509312fa427c936f844c\u0026auth=dce2d8a641d5b0ab4eeff8db02607380d3471d40","index_id":21,"index_name":"Index #21: Anime* - 24977-21-1026384.jpg"},"data":{"ext_urls":["https:\/\/anidb.net\/perl-bin\/animedb.pl?show=anime\u0026aid=2709"],"anidb_aid":2709,"source":"Pinocchio yori Piccolino no Bouken","part":"39","year":"1976-1977","est_time":"00:17:06 \/ 00:25:28"}},{"header":{"similarity":"45.91","thumbnail":"https:\/\/img3.saucenao.com\/dA\/29078\/290788855.jpg","index_id":34,"index_name":"Index #34: deviantArt - 290788855.jpg"},"data":{"ext_urls":["https:\/\/deviantart.com\/view\/290788855"],"title":"Barely Disguised","da_id":290788855,"author_name":"RakuenVI","author_url":"http:\/\/rakuenvi.deviantart.com"}},{"header":{"similarity":"44.62","thumbnail":"https:\/\/img3.saucenao.com\/frames\/?expires=1547486310\u0026init=3dc0e8c0287b8a19\u0026data=a54f05d9c535be60e09a3d78259ae38c6e9598109755e047533d279ad8c4fd48a0f2203405f65cf03c50313dae227b3022df562c7b29484e79cb3c4872bb290ecb1fee441507a2daa0b91925afd4f0a7d97485a6617f6be1f350313df7578ec954446dbbde2564a627fea005545f1534\u0026auth=583a6b1c2fe7ec82af88e4713bb86f2577c33bfd","index_id":21,"index_name":"Index #21: Anime* - 20098-52-741507.jpg"},"data":{"ext_urls":["https:\/\/anidb.net\/perl-bin\/animedb.pl?show=anime\u0026aid=558"],"anidb_aid":558,"source":"Kishin Douji Zenki","part":"48","year":"1995-1995","est_time":"00:12:22 \/ 00:22:56"}},{"header":{"similarity":"44.62","thumbnail":"https:\/\/img1.saucenao.com\/res\/seiga_illust\/299\/2995201.jpg?auth=odb8b4vEoPnAJEzY9OSYrA\u0026exp=1547486310","index_id":8,"index_name":"Index #8: Nico Nico Seiga - 2995201.jpg"},"data":{"ext_urls":["http:\/\/seiga.nicovideo.jp\/seiga\/im2995201"],"title":"\u30a6\u30eb\u30c8\u30e9\u30ad\u30e5\u30a2\u30cf\u30c3\u30d4\u30fc","seiga_id":2995201,"member_name":"shogo","member_id":26928041}}]}';

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
        //var jsontest = JSON.parse(teststring);
        
        //replier.reply(jsontest.results[0].header.similarity);

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
