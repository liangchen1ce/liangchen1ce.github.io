# This script is to test the relevance of two parameters -
# time on billboard and highest rank on billboard.


from __future__ import division, unicode_literals
import json
from pymongo import MongoClient
import numpy as np
import os


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


def generate():
    collections = connectDB()
    hot100 = collections[0]
    weeks = getWeeksList()

    songs = set()
    for week in weeks:
        tracks = hot100.find({"_id": week}).next()["entries"]
        for track in tracks:
            if len(track["lyrics_body"]):
                id = track["title"] + track["artist"]
                songs.add(id)

    print len(songs)


def checkFile(fileName):

    if os.path.isfile(fileName):
        print "The relevance file already exists."
        return True
    else:
        print "Calculating relevance file..."
        return False


def getRelevance():
    # check if relevance exists.
    path = '../data/'
    fileName = "relevance_rank_time.txt"
    if checkFile(path + fileName):
        with open(path + fileName) as f:
            result = json.load(f)
        ranks = [str(i) for i in xrange(1, 101)]
    else:
        collections = connectDB()
        hot100 = collections[0]
        weeks = getWeeksList()

        time = {}
        highestRank = {}
        for week in weeks:
            print week
            tracks = hot100.find({"_id": week}).next()["entries"]
            for track in tracks:
                id = track["title"] + track["artist"]
                if id not in time:
                    # init
                    time[id] = 1
                    highestRank[id] = track["rank"]
                else:
                    time[id] += 1
                    highestRank[id] = min(track["rank"], highestRank[id])

        # init result
        ranks = [i for i in xrange(1, 101)]
        result = {rank: [] for rank in ranks}

        # generate a dict with key as ranking and value as list of counts
        # {1: [10, 30, 20, 9], 2: [1, 1, 1] ...}
        for id in highestRank:
            rank = highestRank[id]
            count = time[id]
            result[rank].append(count)

        # write to file
        with open(path + fileName, "w") as f:
            json.dump(result, f)

    # get statistical value of result
    for rank in ranks:
        print str(rank) + ': '
        current = result[rank]
        print "    mean: " + str(np.mean(current))
        print "    std:  " + str(np.std(current))
        print "    min:  " + str(min(current))
        print "    max:  " + str(max(current))
        print "    numb: " + str(len(current))
        print


getRelevance()