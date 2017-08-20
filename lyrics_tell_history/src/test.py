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

def swap(array, i, j):
    temp = array[i]
    array[i] = array[j]
    array[j] = temp
    return array

def quickSort(input):
    if type(input) != list:
        raise

    if len(input) < 2:
        return input

    # if len(input) == 2:
    #     return input if input[0] < input[1] else input[::-1]

    pivot = 0
    i = 0
    j = len(input)

    while i < j - 1:
        if input[i + 1] > input[pivot]:
            input = swap(input, i + 1, j - 1)
            j -= 1
        elif input[i + 1] <= input[pivot]:
            i += 1

        elif input[j - 1] < input[pivot]:
            input = swap(input, j - 1, i + 1)
            i += 1
        else:
            j -= 1

    input = swap(input, pivot, i)
    print "after pivot"
    print input

    left = quickSort(input[:i + 1])
    print "left:"
    print left
    right = quickSort(input[i + 1:])
    print "right:"
    print right
    return left + right

print quickSort([6, 44])
