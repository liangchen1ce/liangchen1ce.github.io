---
layout: postcn
category: cn
linka: guichu-plan
permalink: /cn/guichu-plan
title: 关于鬼畜视频制作的一个想法
tocTopTag: h2
noToc: false
---

## 总结
目的：
鬼畜视频自动生产

适用范围：
人力歌曲合成

研究方向：
英文慢歌双语空耳字幕

## IO
输入：
MIDI + 与MIDI index对齐的歌词

输出：
鬼畜视频（以输入MIDI作为背景音乐）

## 数据库
鬼畜素材（需要预处理）

## 参数
1. 对于每句歌词的歌手选择：包含独唱模式，全明星随机分配模式，和普通分配模式
2. 每句音视频对齐flag（只对原视频有效）：true则完全对齐，false则使用当前歌手连续视频
3. 对于每句歌词的视频选择（video，startTime，endTime）：override default原视频，使用新视频从startTime至endTime时段。如果音视频时长不匹配，则对视频进行warp
4. 对于每个字设定不同的速度比，使用slider。同时可以设定全局速度比。视频行为随之改变。
5. 说/唱选择

## 数据库预处理
素材输入参数：
- 原始素材视频
- 视频所述文本

输出：
- 每个发音的模糊拼音标注。模糊拼音 -> 你 -> NI、NU、NV、NE（实施过程中需对模糊拼音的定义和范围进行调整）
- 每个发音的元音标注。原因 -> 你 -> I
- 开始时间和结束时间

计算流程：
方案一：使用现有NLP forced alignment工具，如[CMUSphinx](http://cmusphinx.sourceforge.net/2010/09/sphinx4-1-0-beta-4-released-2/)或[FAVEalign](http://fave.ling.upenn.edu/usingFAAValign.html)或[speechmatics](https://speechmatics.com/)或[IBM](https://www.ibm.com/smarterplanet/us/en/ibmwatson/developercloud/doc/speech-to-text/using.shtml#timestamps)
方案二：使用现有NLP语音识别工具，要求返回每帧的识别结果，或者某一连续识别结果的开始结束时间。然后将此结果与transcript做string matching，或HMM的matching，或DTW。
问题：使用HTK或CMUSphinx，需要重新训练中文语音模型。
解决：寻找中文语料库进行训练，或寻找训练好的模型，或找中文NLP工具，比如科大讯飞
方案三！！！
刚刚发现了一个新的研究领域，叫做score predictive model, 用来refine phoneme boundary的！可以看看这个论文[台大做的基于中文语料的](https://www.researchgate.net/profile/Cheng_Yuan_Lin/publication/3457924_Automatic_Phonetic_Segmentation_by_Score_Predictive_Model_for_the_Corpora_of_Mandarin_Singing_Voices/links/02e7e51b912ef71303000000.pdf)，简直完美切合！就是为了”corpus-based singing voice synthesis”!!!

最终形态：
分为发音库：每个发音使用ffmpeg分割，可以通过歌手、模糊拼音、元音进行索引。
以及视频库：原始素材 + 发音库reference在一段时间的label

## 输入MIDI处理
调节MIDI速度，生成背景音乐。vocal line暂时不予合成。

## 输入歌词处理
计算每个发音对应MIDI时长，以及开始时间，乘以全局速度比。
汉字歌词的模糊拼音标注
汉字歌词的元音标注
根据本句歌词的歌手设定，通过模糊拼音以及元音搜索，模糊拼音优先级大于元音搜索
通过面板参数，调整时长、开始时间、速度比
另：由于科大讯飞的离线语音合成功能，可增加一个机器女声歌手

## 歌曲的演唱
使用pitch shift将各个独立的发音调整到MIDI中vocal line的音高

## 歌曲的并轨
背景音乐和歌手联唱的并轨
（不知是否必有。需查询ffmpeg的手册）

## 视频处理
根据独立发音在视频中的位置和面板参数，截取视频
同时可以使用外部视频，外部静态图像
合成与音轨等长的视频
后期特效？maybe？动画模板？
添加字幕 -> 使用一般字幕组时间轴工具
使用ffmpeg压制音视频，提供下载

## GUI
像一个安装引导程序一样，一步一步走，从而降低操作复杂度，提升界面整洁度

## bottleneck
素材库的forced alignment准确度

## 局限性与改进

局限性：
由于对粤语不熟悉，暂时不考虑粤语素材
由于对英文鬼畜素材不熟悉，暂时不考虑英文素材

改进：
参数的调试是否可以改进
比如在面板添加一个本句试听，同时试听双轨，从而发现错拍
比如在面板添加一个本句试看，及早发现动画衔接问题
