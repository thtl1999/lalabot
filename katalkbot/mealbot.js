
const nothonmeal = [
    '국수파동',
    '꼬꼬아찌치킨',
    '꾸이꾸이',
    '내가찜한닭',
    '노랑통닭',
    '놀부 부대찌개',
    '도미노피자',
    '동네아저씨치킨',
    '땅땅치킨',
    '매운 갈비찜',
    '멕시카나',
    '명동 찌개 마을',
    '박가네 무한리필 숯불 닭갈비',
    '반갑다 친구야',
    'BBQ',
    '성대 찌개고을',
    '셰프의 부대찌개',
    '썬더치킨',
    '아웃닭',
    '59쌀 피자',
    '옥집',
    '월매랑 삼겹이랑',
    '우리집',
    '육앤샤(숯불 꼬치구이)',
    '일미',
    '지코바',
    '찌개지존',
    '청년다방',
    '충만치킨',
    '콩마을',
    '파불고기',
    '피자스쿨',
    '한두야 밥먹자',
    '한마리 정육식당',
    '항아리보쌈'
];

const honmeal = [
    '가마타케 제면소',
    '고칸',
    '고씨네',
    '고아사',
    '공대식당',
    '국수나무',
    '귀신반점',
    '김밥천국',
    '낮것상 칼국수',
    '더 진국',
    '덮밥의 정석',
    '도스마스',
    '돈키호테',
    '동자 설렁탕',
    '롯데리아',
    '마닭',
    '만다 김밥',
    '맘스터치',
    '매콤 돈가스',
    '맥도날드',
    '명동 돈가스',
    '미가',
    '미스사이공',
    '민손짜장',
    '밀 플랜비',
    '밥은火',
    '백령도 생 바지락 칼국수',
    '보영만두',
    '본찌 돈가스',
    '벨라튀니지아',
    '사우스 스트리트',
    '성대 고깃간',
    '성대밥상',
    '생각나는 순대국',
    '스시뽕',
    '알촌',
    '왕 돈까스',
    '예국향',
    '옛 이야기',
    '오 닭꼬치',
    '육소담',
    '이삭 토스트',
    '1인자 감자탕',
    '진지',
    '짱 식당',
    '천하일면',
    '청년 밥상',
    '청년 짬뽕',
    '청진동 해장국',
    '컵닭',
    '키와마루아지',
    '토마토 도시락',
    '편의점 도시락',
    '학생회관 식당',
    '한솥 도시락',
    '한식당',
    '할매순대',
    '혼다라멘',
    '히토리'
];

const dining = [
    '감스시',
    '고기굽는교실',
    '곱창생각',
    '마왕족발',
    '마포갈비',
    '생고기 제작소',
    '성대목장',
    '싱싱회센타',
    '오징어 나라',
    '찬이네 주먹고기',
    '제주도야지생삼겹',
    '춘천 닭갈비',
    '택이네 조개 전골',
    '포동이네',
    '홍매 스시',
    '황소마을 곱창'
];

var lunch = [
    '마포구이촌',
    '볏짚 통삼겹살',
    '성대 양꼬치',
    '명가 양꼬치'
];

var lunchmarked = [];

for (var i=0;i<lunch.length;i++)
{
    lunchmarked.push(lunch[i] + '(점심특선)');
}

const meal = nothonmeal.concat(honmeal);
const honlunch = honmeal.concat(lunchmarked);
const meallunch = meal.concat(lunchmarked);
const mealnotlunch = meal.concat(lunch);



function response(room, msg, sender, isGroupChat, replier, ImageDB) {

    if (msg == '라라밥')
    {
        var time = new Date();
        var hour = time.getHours();
        if (hour >=12 && hour <=15)
        {
            var selected = Math.floor(Math.random() * (meallunch.length));
            var rname = meallunch[selected];
        }
        else
        {
            var selected = Math.floor(Math.random() * (mealnotlunch.length));
            var rname = mealnotlunch[selected];
        }

        replier.reply('알겠슘돠!\n[' + rname + ']');
        return;
    }

    if (msg == '라라혼밥')
    {
        var time = new Date();
        var hour = time.getHours();
        if (hour >= 12 && hour <= 15)
        {
            var selected = Math.floor(Math.random() * (honlunch.length));
            var rname = honlunch[selected];
        }
        else
        {
            var selected = Math.floor(Math.random() * (honmeal.length));
            var rname = honmeal[selected];
        }
        
        replier.reply('알겠슘돠!\n[' + rname + ']');
        return;
    }

    if (msg == '라라회식')
    {
        var selected = Math.floor(Math.random() * (dining.length));
        replier.reply('알겠슘돠!\n[' + dining[selected] + ']');
        return;
    }

    if (msg == '라라밥 리스트')
    {
        replier.reply(nothonmeal);
        replier.reply(honlunch);
        replier.reply(dining);
    }

}
