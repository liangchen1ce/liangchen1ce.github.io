# get the count of specific words for every year from 1958-2015
# 2 kinds of words should be counted:
# 1. those top words that to be shown in web page.
# 2. words that are interesting, which we want to see their trends.

from __future__ import division, unicode_literals
import json
from pymongo import MongoClient
from textblob import TextBlob as tb
import unicodedata


# get words to be shown in webpage
inputPath = '../data/topwords.json'
with open(inputPath) as f:
    topwords = json.load(f)

wordSet = {"peace", "war", "army", "military",
           "people", "king", "queen",
           "revolution", "independence",
           "computer", "internet",
           "racism", "sexism", "feminism", "lgbt", "gay", "lesbian",
           "heaven", "paradise", "hell", "inferno",
           "today", "yesterday", "tomorrow",
           "poverty", "inequality", "money", "economy",
           "wizard", "vampire", "apocalypse", "zombie", "werewolf",
           "dog", "cat", "horse", "monkey", "fish",
           "sleep", "eat", "drink",
           "he", "his", "him", "she", "her", "man", "woman", "lady", "gentleman", "mom", "dad",
           "love", "friendship"}
wordSet = wordSet.union(genres)
for date in topwords:
    currentWords = [item['word'] for item in topwords[date]]
    wordSet = wordSet.union(set(currentWords))

if "military" in wordSet:
    print "have military."

# connect to database
def connectDB():
    # connect mongodb
    cc = MongoClient()
    db = cc['billboard_charts']
    hot100 = db['hot100_by_week']

    return hot100


result = {}
wordCount = {}
hot100 = connectDB()
years = [str(year).decode('utf-8') for year in range(1958, 2016)]
with open("../data/weeks.json") as f:
    weeks = json.load(f)


dd = 0
songIDSet = {}
for word in wordSet:
    # init
    result[word] = []
    wordCount[word] = {}
    for year in years:
        result[word].append({"date": year, "count": 0})
        wordCount[word][year] = 0
        songIDSet[year] = set()  # every year has its own song set

for week in weeks:
    print week
    year = week[:4]
    cursor = hot100.find({"_id": week})
    mg = cursor.next()

    for track in mg["entries"]:
        name = track["title"]
        artist = track["artist"]
        id = name + artist
        if id not in songIDSet[year]:
            songIDSet[year].add(id)
            lyrics = track["lyrics_body"]
            lyrics = unicodedata.normalize('NFKD', lyrics).encode('ascii', 'ignore')
            lyrics = lyrics.lower()
            for word_in_lyrics in tb(lyrics).words:
                try:
                    wordCount[word_in_lyrics][year] += 1
                except KeyError:
                    pass


# post-processing
for word in wordSet:
    for i in xrange(len(years)):
        item = result[word][i]
        item["count"] = wordCount[word][item["date"]]

if "military" in result:
    print "good"

# output to file
outpath = "../data/wordchart.json"
with open(outpath, 'w') as f:
    json.dump(result, f)