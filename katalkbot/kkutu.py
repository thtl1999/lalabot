import os
import requests
import sys
import fileinput
import re
import json
import html

json_data=open('db.json').read()

db = json.loads(json_data)

f = open('words.txt', 'r')

lines = f.readlines()
i = 0

for line in lines:
    if line == '' or ')' in line or ']' in line or line == '\n':
        continue

    line = line.replace('\n','')

    m = line[0]

    if not m in db:
        db[m] = []

    if not line in db[m]:
        db[m].append(line)

    i = i+1

    if i % 10000 == 0:
        print(i)


with open('db.json', 'w') as outfile:
    json.dump(db, outfile)
