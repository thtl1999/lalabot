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
const weatherurl = 'https://www.suwon.go.kr/component/airPollution/PD_SuwonAPContentTopLists.do';

function dust(replier) {
    var responseString = Utils.getWebText(weatherurl).replace(/<[^>]*>/g, '');
    var jsonob = JSON.parse(responseString);

    var pm10 = Number(String(jsonob[4].caipm10total));
    var pm25 = Number(String(jsonob[4].caipm25total));
    var location = String(jsonob[4].citydong);

    var status = '';
    if (pm10 > 150){
        status = "매우나쁨 ㅠ.ㅠ";
    }else if (pm10 > 80){
        status = "나쁨 ㅜ.ㅜ";
    }else if (pm10 > 30){
        status = "보통 >.<";
    }else {
        status = "좋음 >.^";
    }

    var r = '[' + location + ' 미세먼지]\n';
    r += '미세먼지: ' + pm10 + '㎍/㎥\n';
    r += '초미세먼지: ' + pm25 + '㎍/㎥\n';
    r += '상태: ' + status;

    replier.reply(r);
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
