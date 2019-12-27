import dc_api
import json
import datetime

content = {}
dt = datetime.datetime.now()
today = str(dt.month) + '.' + str(dt.day)

baseurl = 'https://gall.dcinside.com/m/iriya1/'

for doc in dc_api.board(board_id="iriya1", skip_contents=True, num=3000):
    combinations = doc['title'].split(' ')
    for c in combinations:
        if len(c) != 5 or c.isdigit():
            break
        if c not in content:
            content[c] = []

        if ':' in doc['time']:
            doc['time'] = today
        content[c].append(doc)



with open('priconearena.json', 'w') as outfile:
    json.dump(content, outfile)