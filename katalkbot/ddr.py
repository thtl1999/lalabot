import requests
import sys
import fileinput
import re
import json
from bs4 import BeautifulSoup

def get_html(url):
   _html = ""
   resp = requests.get(url)
   if resp.status_code == 200:
      _html = resp.text
   return _html


musiclevels = ['436','19','18','17','15','14','13','234','335','558','1056']
jsonlist = {}

for levels in range(len(musiclevels)):
    url = 'https://www21.atwiki.jp/asigami/pages/' + musiclevels[levels] + '.html'
    html = get_html(url)
    soup = BeautifulSoup(html, 'html.parser')
    table = soup.find_all('table')
    table_rows = table[2].find_all('tr')
    res = []
    for tr in table_rows:
        td = tr.find_all('td')
        row = [tr.text.strip() for tr in td if tr.text.strip()]
        if row:
            res.append(row)

    jsonlist[19 - levels] = []
    for i in res:
        if not i[0] == '曲名':
            songname = i[0]
            jsonlist[19 - levels].append(songname.replace('\n', ''))
    print(jsonlist[19-levels])


with open('songlistddr.txt', 'w') as outfile:
    json.dump(jsonlist, outfile)

print(jsonlist)