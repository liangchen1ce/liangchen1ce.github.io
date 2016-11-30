import subprocess, json, os.path, time

gitaddCmd = "git add todo.txt"
subprocess.Popen(gitaddCmd.split())

moddataCmd = '''stat -t %D -f %Sm todo.txt'''
process = subprocess.Popen(moddataCmd.split(), stdout=subprocess.PIPE)
dateModified = process.communicate()[0].strip()
print "=======Data:", dateModified + "======="
dateModified = time.strptime(dateModified, '%m/%d/%y')
dateModified = int(time.mktime(dateModified) * 1000)

diffCmd = "git diff --cached todo.txt"
process = subprocess.Popen(diffCmd.split(), stdout=subprocess.PIPE)
diffLog = process.communicate()[0]

commitCmd = "git commit -m 'task_updated'"
process = subprocess.Popen(commitCmd.split())

added = dict()
deleted = dict()
for line in diffLog.splitlines()[5:]:
    line = line.split('//')[0]
    if line.startswith('+'):
        line = line[1:].split(' ', 1)
        key = line[0]
        value = "".join(line[1:])
        added[key] = value
    elif line.startswith('-'):
        line = line[1:].split(' ', 1)
        key = line[0]
        value = "".join(line[1:])
        deleted[key] = value

logged = dict()
for task in added:
    if task:  # if task is not an empty line
        logged[task] = added[task]
        # if added[task]:
        #     logged[task] = added[task][-1]
        # else:
        #     logged[task] = ''

print "=======Tasks Operations======="
print logged

jsonPath = 'tasks.json'
if not os.path.isfile(jsonPath):
    tasks = dict()
else:
    with open(jsonPath, 'r') as f:
        tasks = json.load(f)
for task in logged:
    if task not in tasks:
        tasks[task] = {'Dates': [], 'Status': 'empty', 'Init': dateModified,
                       'Tag': 'work + study'}
        if "#life" in logged[task]:
            tasks[task]['Tag'] = 'life'
    opt = logged[task].split('#')[0].strip()
    if opt.endswith('d'):
        tasks[task]['Dates'].append(dateModified)
        tasks[task]['Dates'] = list(set(tasks[task]['Dates']))
        tasks[task]['Status'] = 'done'
    elif opt.endswith('+'):
        tasks[task]['Dates'].append(dateModified)
        tasks[task]['Dates'] = list(set(tasks[task]['Dates']))
        tasks[task]['Status'] = 'running'
    elif opt.endswith('-'):
        tasks[task]['Dates'].append(dateModified)
        tasks[task]['Dates'] = list(set(tasks[task]['Dates']))
        tasks[task]['Status'] = 'stopped'
with open(jsonPath, 'w') as f:
    json.dump(tasks, f)