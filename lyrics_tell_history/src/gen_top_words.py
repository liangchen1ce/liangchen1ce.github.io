from __future__ import division, unicode_literals
import json
from pymongo import MongoClient


def connectDB():
    # connect mongodb
    cc = MongoClient()
    db = cc['billboard_charts']
    hot100 = db['hot100_by_week']
    topwordsByWeekCollection = db['topwords_by_week']
    topwordsByYearCollection = db['topwords_by_year']
    topwordsByDecadeCollection = db["topwords_by_decade"]

    return [hot100, topwordsByWeekCollection, topwordsByYearCollection, topwordsByDecadeCollection]


def getWeeksList():
    weeksPath = '../../jaywalker01124-billboar_charts_pos-401ce941e30a/weeks.json'
    with open(weeksPath) as f:
        weeksList = json.load(f)

    return weeksList


def generate(numOfTop=10):
    collections = connectDB()
    hot100 = collections[0]
    result = {}

    # for weeks
    weekPrefix = "Week of "
    topwordsByWeekCollection = collections[1]
    topwordsByYearCollection = collections[2]
    topwordsByDecadeCollection = collections[3]

    weeks = getWeeksList()
    years = [str(year).decode('utf-8') for year in range(1958, 2016)]
    decades = [u'1950s'] + [str(decade).decode('utf-8') + 's' for decade in range(1960, 2020, 10)]

    for date in weeks + years + decades:
        if date in weeks:
            cursor = topwordsByWeekCollection.find({"_id": date})
            mg = cursor.next()
            key = weekPrefix + date
        elif date in years:
            cursor = topwordsByYearCollection.find({"_id": date})
            mg = cursor.next()
            key = date
        elif date in decades:
            kk = u'1958' if date == u'1950s' else date[:4]
            cursor = topwordsByDecadeCollection.find({"_id": kk})
            mg = cursor.next()
            key = date

        result[key] = []

        wordEntries = mg["entries_in_dict"][:numOfTop] + mg["entries_not_in_dict"][:numOfTop]
        for i in range(len(wordEntries)):
            entry = wordEntries[i]
            if i < numOfTop:
                tag = "in_dict"
            else:
                tag = "not_in_dict"

            track_date = entry["related_track"]["date"]
            track_index = entry["related_track"]["index"]
            try:
                track = hot100.find({"_id": track_date}).next()["entries"][track_index]["track_info"]
            except:
                try:
                    track = hot100.find({"_id": track_date["date"]}).next()["entries"][track_index]["track_info"]
                except:
                    print track_date, track_index
                    raise
            result[key].append({"word": entry["word"],
                                "spotify_id": track["track_spotify_id"],
                                "title": entry["related_track"]["title"],
                                "artist": track["artist_name"],
                                "cover_link": track["album_coverart_100x100"],
                                "word_rank": entry["rank"] + 1,
                                "tag": tag})
            # if len(track["track_spotify_id"]) != 22:
            #     print track_date, track_index

        print key
    return result


result = generate()
outputPath = '../data/topwords.json'
with open(outputPath, 'w') as f:
    json.dump(result, f)