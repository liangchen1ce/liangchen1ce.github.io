import json


def getWeeksList():
    weeksPath = '../../jaywalker01124-billboar_charts_pos-401ce941e30a/weeks.json'
    with open(weeksPath) as f:
        weeksList = json.load(f)

    return weeksList

print len(getWeeksList())

def gen_date():
    weeksList = getWeeksList()
    result = {"name": "All Dates", "children": []}

    decades = [u'1950s'] + [str(decade).decode('utf-8') + 's' for decade in range(1960, 2020, 10)]
    for decade in decades:
        result["children"].append({"name": decade, "children": []})

        if decade == '1950s':
            years = [u'1958', u'1959']
        elif decade == '2010s':
            years = [u'2010', u'2011', u'2012', u'2013', u'2014', u'2015']
        else:
            years = [(str(decade)[:3] + str(i)).decode('utf-8') for i in xrange(10)]
        for year in years:
            result["children"][-1]["children"].append({"name": year, "children": []})

            for week in weeksList:
                if week[:4] == year:
                    result["children"][-1]["children"][-1]["children"].append({"name": "Week of " + week, "size": 1})

    print result
    return result

# outputPath = "../data/date_structure.json"
# result = gen_date()
# with open(outputPath, 'w') as f:
#     json.dump(result, f)