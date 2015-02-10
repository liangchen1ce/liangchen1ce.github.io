---
layout: posteng
category: eng
linka: 3dmodeling
permalink: /eng/3dmodeling/
title: Unsuccessful 3D-Modeling using Rhino + Python and openSCAD
---

I create a donut which is baked in a very weird way. I chose donuts to model because I was eating donuts when I started to think what to create. Donuts are easy to model but I still need a good idea to modify the shape of donuts.

In the beginning, I used Rhino + Python to randomly modify the control points of perfectly baked donuts according to the ScrewUpRate.

Here are the result:

Low ScrewUpRate
![Low ScrewUpRate](http://golancourses.net/2015/wp-content/uploads/2015/02/oie_1034940t2F8Iuxr.png)


It seems good, but…


At high ScrewUpRate:
![high ScrewUpRate](http://golancourses.net/2015/wp-content/uploads/2015/02/oie_1034913YK3XRwNj.png)


:)


So I wisely choose to move the platform from Rhino to OpenSCAD–Rhino is hard to digest for me.

Fortunately, OpenSCAD is beginner friendly, so I continued my journey to screw up donuts.

Here is the perfect donut:
![Perfect](https://farm9.staticflickr.com/8676/16489445362_cd0267e259_z.jpg)


Here is when 0.5 ScrewUpRate is applied:
![0.5](https://farm9.staticflickr.com/8594/16489445332_9d29f51c68_z.jpg)


And here is the complete failure donut:
![1](https://farm9.staticflickr.com/8573/16488695571_2b5ea2e9a2_z.jpg)


At this point, I should say I was not trying to make donuts–what I secretly tried is alien ship.

Here is the [super simple openSCAD code](https://github.com/chenlianMT/SCAD-Model).