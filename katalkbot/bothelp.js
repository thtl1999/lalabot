var priparacooltime = 0;
const pripara = [
    '오늘도 프리파라~ 내일도 프리파라~ 그러고보니 어제도 프리파라~',
    '프리파라는 정말 최고야!',
    '프리파라는 좋아해 프리?',
    '카시코마!',
    '알겠슘돠!'
];

const datapath = '/storage/emulated/0' + '/katalkbot/readme.txt';
const helpmsg = FileStream.read(datapath);
const weatherurl = 'http://kweather.co.kr/air/data/area_realtime/MAP_PAST.php?code=4111113300';

function dust(replier) {
    var responseString = Utils.getWebText(weatherurl).replace(/<[^>]*>/g, '');
    var jsonob = JSON.parse(responseString);
    var pm10m = Number(String(jsonob.min_pm10.val));
    var pm10M = Number(String(jsonob.max_pm10.val));
    var pm25m = Number(String(jsonob.min_pm25.val));
    var pm25M = Number(String(jsonob.max_pm25.val));
    var average = pm10m + pm10M + pm25m + pm25M;
    var status = '';
    if (average > 400){
        status = "매우나쁨 ㅠ.ㅠ";
    }else if (average > 280){
        status = "나쁨 ㅜ.ㅜ";
    }else if (average > 140){
        status = "보통 >.<";
    }else {
        status = "좋음 >.^";
    }
    var replystring = '미세먼지: ' + pm10m + '~' + pm10M + '\n';
    replystring += '초미세먼지: ' + pm25m + '~' + pm25M + '\n';
    replystring += '종합상태: ' + status;

    replier.reply(replystring);
}


function response(room, msg, sender, isGroupChat, replier) {

    if (msg == '라라도움말')
    {
        replier.reply(helpmsg);
        return;
    }

    if (priparacooltime == 0)
    {
        if (msg.indexOf('프리파라') != -1)
        {
            var selected = Math.floor(Math.random() * (pripara.length));
            replier.reply(pripara[selected]);
            priparacooltime = 50;
            return;
        }
    }
    else
    {
        priparacooltime -= 1;
    }

    if (msg == '미세먼지')
    {
        dust(replier);
        return;
    }
    

}
