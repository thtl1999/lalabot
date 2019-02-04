#python 3.5.3
import os
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


musiclevels = ['1908','1907','1906','1905','1904','1903','1902','268','256','228','195','162','128','84','40','2058']
#195 = 40
jsonlist = {}

for levels in range(len(musiclevels)):
    url = 'https://hellwork.jp/popn/wiki/' + musiclevels[levels] + '.html'
    html = get_html(url)
    soup = BeautifulSoup(html, 'html.parser')
    table = soup.find('table', {'class': 'table table-bordered'})
    table_rows = table.find_all('tr')
    res = []
    for tr in table_rows:
        td = tr.find_all('td')
        row = [tr.text.strip() for tr in td if tr.text.strip()]
        if row:
            res.append(row)


    jsonlist[50 - levels] = []
    for i in res:
        if not i[0] == 'ジャンル名 (タイプ)':
            if i[2] in i[1]:
                i[2] = ''
            songname = i[1] + ' ' + i[2]
            print(songname)
            jsonlist[50 - levels].append(songname.replace('\n', ''))


with open('songlistpopn.txt', 'w') as outfile:
    json.dump(jsonlist, outfile)