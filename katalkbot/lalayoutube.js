const scriptName="lalayoutube.js";

var result;
var url;


function getres(url)
{
    return Utils.getWebText(url);
}



function response(room, msg, sender, isGroupChat, replier){
    if (msg == '라라테스트')
    {
        url = 'https://google.com';
        result = 'a';
        //result = getres(url);
        result = getres(url);
        replier.reply(result);
    }
     
}