---
layout: postcn
category: cn
linka: coursera-download
permalink: /cn/coursera-download
title: Coursera课程批量下载程序安装指南
---

&#8195;&#8195;相信很多在用Coursera的同学对Python和Github都没有了解，看到果壳上的教程[Coursera网站课程批量下载程序](http://mooc.guokr.com/post/427070/)也是一头雾水。嗯，我在安装的时候遇到了不少困难，但作为一个光荣的工科生，在百度和谷歌的帮助下我试验成功了。于是我想到写一篇详细一些的安装说明，帮助大家获得批量下载Coursera课程以及课件这个福利。

&#8195;&#8195;对安装过程中出现问题的解决肯定有不完善的地方，敬请指正。

**项目链接：** https://github.com/jplehmann/coursera

**我的环境：** Windows + Python3.3 + Beautiful Soup 4

**安装过程：**

1. 安装Python。

2. 设置环境变量。（此处是为了直接在命令行中使用python命令）

&#8195;&#8195;在控制面板\系统和安全\系统中选择系统属性->高级->环境变量中，编辑Path变量，添加```
;D:\Python33
```（假设Python安装路径在D:\Python33）

3.安装easy install。

&#8195;&#8195;如果你用的是Python3+的话，可以从[这里](http://www.lfd.uci.edu/~gohlke/pythonlibs/#distribute)下载

4.安装[requests](https://pypi.python.org/pypi/requests#downloads)。（没有安装的话会在运行的时候显示"no module named requests"）

&#8195;&#8195;如果是Windows机器的话，可以通过Win+R，输入cmd打开命令行，执行```> Path\easy_install.exe requests```安装。此时需要Path是easy install的路径，easy install安装在你的Python\Scripts文件夹里面。

5.安装[six](https://pypi.python.org/pypi/six/)。

6.安装[Beautiful Soup 4](http://www.crummy.com/software/BeautifulSoup/#Download),

&#8195;&#8195;cd到下载的文件夹下，执行```python setup.py install```。

7.下载Coursera课程批量下载程序

&#8195;&#8195;链接在[这里](https://github.com/coursera-dl/coursera)。点击右方"Download ZIP"之后解压。然后再命令行中cd到coursera-master/coursera之后执行```python coursera_dl.py -u <username> -p <password> "<coursename>"```。下载https://class.coursera.org/chuck101-001/class/index的课程，coursename是链接中的“chuck101-001”。若用户名为1@hotmail.com，密码为password，则命令为：```
python coursera_dl.py -u 1@hotmail.com -p password "chuck101-001"```。

8.若过程中报错"system error parent module ' ' not loaded"，问题远离[这里](http://stackoverflow.com/questions/16981921/python-3-relative-imports)。

&#8195;&#8195;解决办法是将```from .mymodule import myfunction```，改成```from mymodule import myfunction```。

**------------这里是与上文无关的分割线------------**

&#8195;&#8195;竟然就到了2014年。之前对大家对元旦热忱这么高，我还觉得元旦不过是Sherlock回归的日子，真正到了元旦早晨，看到电脑右下角的2014/1/1，突然有非常多的感慨郁于胸中，还是只能感叹一句“逝者如斯夫”。

&#8195;&#8195;2013年最大的遗憾就是书读的少，读的时候也太功利，为了别人而读。今年还是静下心来多读几本解气的诗集剧本，少读几本小说。

&#8195;&#8195;今年一定要谨记---勿懒散。懒散这两个字，自从小学班主任如此点评我的时候，我就把它当成了我的一部分。一定要甩掉它！➹➹➹