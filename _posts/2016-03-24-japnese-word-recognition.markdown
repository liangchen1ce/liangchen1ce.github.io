---
layout: postcn
category: cn
linka: japanese-word-recognition
permalink: /cn/japanese-word-recognition
title: 一个包含随机模型的DTW
tags: DTW HMM paperReading
tocTopTag: h2
noToc: false
---

## 来源

[Nakagawa, Seiichi, and Hirobumi Nakanishi. "Speaker-independent English consonant and Japanese word recognition by a stochastic dynamic time warping method." IETE Journal of Research 34.1 (1988): 87-95.](http://www.slp.ics.tut.ac.jp/shiryou/number-2/E1988-16.pdf)

## 目的

日语单词识别

## 思路

DTW。但不是standard DTW。希望引入一些随机模型。

## 灵感

HMM

## 成品

在对比了HMM Viterbi Decoding的公式后，发现DTW的cumulative distance公式可以近似仿写成这个形式。于是模仿着引入了output distribution和transfer probability。见文章中“General equation of stochastic dynamic time warping method” section。

## 参数

1. output distribution -> multivariant Gaussian
2. transfer probability -> count based on averaged template

## 实验

### feature

LPC + energy

### 实验一：英语辅音识别
23男性，每人7-10句，每局平均8个词，2.6秒
1. Training -> 16人
2. Testing -> 7人

### 实验二：日语单词识别

1. Training -> 30男性，共216词
2. Testing -> 10男性，共200词
共15分钟左右数据

## 值得关注的点

1. How to create a reference pattern?
2. How to calculate transfer probability?
3. How to form the stochastic DTW and what’s the relating topology of HMM?