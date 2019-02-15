#python 3.5.3
import os
import requests
import sys
import fileinput
import re
import json

musiclevels = ['14','15','16','17','18','19','20']

for i in musiclevels:
    req = requests.get('http://sdvx.in/sort/sort_' + i + '.js')
    f = open(i + '.txt', 'w', encoding='utf8')
    f.write(req.text)
    f.close()

jsonlist = {}

for i in musiclevels:
    f = open(i + '.txt', 'r', encoding='utf8')
    jsonlist[i] = []
    lines = f.readlines()
    for line in lines:
        if '//' in line:
            songname = line.split('//')
            jsonlist[i].append(songname[1].replace('\n',''))
    f.close()
    os.remove(i + '.txt')

print(jsonlist)

with open('songlistsdvx.txt', 'w') as outfile:
    json.dump(jsonlist, outfile)