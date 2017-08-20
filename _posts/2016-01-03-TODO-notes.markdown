---
layout: postcn
category: cn
linka: todo
permalink: /cn/todo-notes
title: ‘我今天做了啥？’的笔记
tags: todo visualization Flotr2
tocTopTag: h3
noToc: false
---

### 1 初衷

希望通过简单的文本文档分析，得到带有时间戳的任务列表。

### 2 实现步骤

#### 2.1 建立TODO LIST规则
- 所有任务放在一个文本文档
- 每一行代表一个任务
- 每一行的第一个单词作为任务名称
- 每天对任务进度进行更新

##### 2.1.1 更新规则
- ‘＋’：今天进行了这项任务
- ‘－’：这项任务取消了
- ‘d’：这项任务完成了
- ‘#life’：标签为life，默认为’work + study’

##### 2.1.2 例子
```todo-webpage 			+d      ```
```read-attending-model```

##### 2.1.3 说明
任务1‘todo-webpage’ 已更新，已完成
任务2‘read-attending-model’ 已初始化

#### 2.2 记录文件更新
- 使用Mac下的[stat](https://developer.apple.com/library/mac/documentation/Darwin/Reference/ManPages/man1/stat.1.html)记录文件修改时间
- 使用[git diff](https://git-scm.com/docs/git-diff)记录文件修改内容
- 用一个Python脚本把当前更新写入一个本地json文件

>目前时间分辨率为‘一天’

#### 2.3 Visualization
使用[Flotr2](http://www.humblesoftware.com/flotr2/)的timeline图形   
然后改一改网页的CSS

##### 2.3.1 要处理的问题有：
- 它的文档好简陋，看一看timeline是怎么实现的
- 本地时间和UTC时间戳的转换
- 读取json文件

### 3 总结
非常简单的应用。感谢Flotr2库。一共花费5小时。时间主要用在了工具选择和Flotr2文档阅读上。如果学一学js的话速度可能会提高。接下来要把时间花在读paper上。不要做这种小应用拖时间了。