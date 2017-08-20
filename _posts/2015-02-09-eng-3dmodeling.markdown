---
layout: posteng
category: eng
linka: 3dmodeling
permalink: /eng/3dmodeling/
title: Unsuccessful 3D-Modeling using Rhino + Python and openSCAD
tags: Rhino
tocTopTag: h2
noToc: false
---

I create a donut which is baked in a very weird way. I chose donuts to model because I was eating donuts when I started to think what to create. Donuts are easy to model but I still need a good idea to modify the shape of donuts.

In the beginning, I used Rhino + Python to randomly modify the control points of perfectly baked donuts according to the ScrewUpRate.

Here are the result:

Low ScrewUpRate
![Low ScrewUpRate](/media/img/lowscrew.png)


It seems good, but…


At high ScrewUpRate:
![high ScrewUpRate](/media/img/highscrew.png)


:)


So I wisely choose to move the platform from Rhino to OpenSCAD–Rhino is hard to digest for me.

Fortunately, OpenSCAD is beginner friendly, so I continued my journey to screw up donuts.

Here is the perfect donut:
![Perfect](/media/img/perfect.jpg)


Here is when 0.5 ScrewUpRate is applied:
![0.5](/media/img/halfscrew.jpg)


And here is the complete failure donut:
![1](/media/img/fullscrew.jpg)


At this point, I should say I was not trying to make donuts–what I secretly tried is alien ship.

Here is the [super simple openSCAD code](https://github.com/chenlianMT/SCAD-Model).