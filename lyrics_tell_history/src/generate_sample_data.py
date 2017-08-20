from pymongo import MongoClient
import json


outputDict = {}
keys = ["var OK = ", "var LNF = ", "var Ins = ", "var OL = ", "var NA = ", "var USE = "]
for key in keys:
    outputDict[key] = []

if __name__ == "__main__":
    weeksPath = '../weeks.json'
    with open(weeksPath) as f:
        weeksList = json.load(f)

    # connect mongodb
    cc = MongoClient()
    db = cc['billboard_charts']
    hot100 = db['hot100_by_week']

    # add lyrics
    for week in weeksList:
        if week == weeksList[-1]: break
        print "-" * 20 + week + "-" * 20
        print
        count = {}
        for key in keys:
            count[key] = 0

        cursor = hot100.find({'_id': week})
        mg = cursor.next()
        trackList = mg['entries']
        for i in range(len(trackList)):
            track = trackList[i]
            code = track["status_code"]
            if code == 200:
                count["var OK = "] += 1
            elif code == 404:
                count["var LNF = "] += 1
            elif code == 550:
                count["var Ins = "] += 1
            elif code == 551:
                count["var OL = "] += 1
            elif code == 552:
                count["var NA = "] += 1
        count["var USE = "] = count["var OK = "] + count["var Ins = "]

        for key in keys:
            outputDict[key].append({"DateTime": str(week), "Value": count[key]})


outputPath = 'data.js'
text = ""
for key in keys:
    text += key
    text += str(outputDict[key])
    text += ";"

with open(outputPath, 'w') as f:
    f.write(text)

effectiveDict = {}
for i in xrange(len(outputDict[keys[0]])):
    effectiveDict[outputDict[keys[0]][i]['DateTime']] = outputDict[keys[0]][i]["Value"] + outputDict[keys[2]][i]["Value"]
import operator
print min(effectiveDict.iteritems(), key=operator.itemgetter(1))[1]