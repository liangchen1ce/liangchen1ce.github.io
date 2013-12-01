---
layout: posteng
category: projects
another-category: Singing Research
linka: glottalflow
permalink: /eng/projects/glottalflow
title: Accuracy Improved Glottal Source Signal Separated from High-pitch Sound
---



#### Why exact glottal flow
You may want to modulate glottal flow parameters to change fundamental frequency or change voice quality.
>**Example:** original sound -> glottal flow -> modulated glottal flow -> creacky voice

And here is the difference between varied voice quality.
>**Example:** different quality when pronouncing **a**
> 
> - Modal: [lat](http://lollichock.tumblr.com/post/68396242678/audio_player_iframe/lollichock/tumblr_mwzrzfEuFz1snsvcq?audio_file=http%3A%2F%2Fwww.tumblr.com%2Faudio_file%2Flollichock%2F68396242678%2Ftumblr_mwzrzfEuFz1snsvcq&amp;color=black&amp;simple=1) 
> - Breathy: [lat](http://lollichock.tumblr.com/post/68396169833/audio_player_iframe/lollichock/tumblr_mwzry6Ymq71snsvcq?audio_file=http%3A%2F%2Fwww.tumblr.com%2Faudio_file%2Flollichock%2F68396169833%2Ftumblr_mwzry6Ymq71snsvcq&amp;color=black&amp;simple=1)
> - Creaky: [lats](http://lollichock.tumblr.com/post/68396210531/audio_player_iframe/lollichock/tumblr_mwzryvtW3q1snsvcq?audio_file=http%3A%2F%2Fwww.tumblr.com%2Faudio_file%2Flollichock%2F68396210531%2Ftumblr_mwzryvtW3q1snsvcq&amp;color=black&amp;simple=1) 

#### Method used
Linear prediction fails to get accurate glottal flow in high pitch sound, so I use weight in conventional linear prediction when calculating residuals to change the effect of glottal flow at glottal closure instants (GCI), and apply this weighed linear prediction(WLP) into iterative adaptive inverse filtering(IAIF).

You may want to scan the [presentation](/glottal/groupdiscussion.pdf) I made to describe this method to my group members. 
#### Rough result
- [Original Song](http://lollichock.tumblr.com/post/68396309267/audio_player_iframe/lollichock/tumblr_mwzs0mksag1snsvcq?audio_file=http%3A%2F%2Fwww.tumblr.com%2Faudio_file%2Flollichock%2F68396309267%2Ftumblr_mwzs0mksag1snsvcq&amp;color=black&amp;simple=1)
- [Improved Glottal Flow](http://lollichock.tumblr.com/post/68396443868/audio_player_iframe/lollichock/tumblr_mwzs30UNlC1snsvcq?audio_file=http%3A%2F%2Fwww.tumblr.com%2Faudio_file%2Flollichock%2F68396443868%2Ftumblr_mwzs30UNlC1snsvcq&amp;color=black&amp;simple=1)
- [Non-Improved Glottal Flow](http://lollichock.tumblr.com/post/68396380877/audio_player_iframe/lollichock/tumblr_mwzs1vABDX1snsvcq?audio_file=http%3A%2F%2Fwww.tumblr.com%2Faudio_file%2Flollichock%2F68396380877%2Ftumblr_mwzs1vABDX1snsvcq&amp;color=black&amp;simple=1)

**Rough spectrogram comparasion** showed in the my another [presentation](/glottal/fieldpractice.pdf), and the upper spectrogram is from non-improved glottal flow while the lower one is from improved glottal flow.

![rough](http://31.media.tumblr.com/ddaf3f68001197d3a47d48321d9b45ba/tumblr_mwzsnzzCHr1snsvcqo1_1280.jpg "Fig1. Rough spectrogram comparasion")

#### Further evaluation
- [Synthesized Sound](http://lollichock.tumblr.com/post/68626975674/audio_player_iframe/lollichock/tumblr_mx3xmcjffz1snsvcq?audio_file=http%3A%2F%2Fwww.tumblr.com%2Faudio_file%2Flollichock%2F68626975674%2Ftumblr_mx3xmcjffz1snsvcq&amp;color=black&amp;simple=1) whose fundamental frequency is 400Hz.
- **Formant Distortion** was calculated using Matlab.
![distortion](http://25.media.tumblr.com/56373f419f06e926064e56e54746e8cc/tumblr_mwzu2hrU9F1snsvcqo1_1280.jpg "Fig2. Formant distortion")

#### Conclusion & Future Work
The rough result indicates that the lower frequency has been improved, while the higher part has been slightly mitigated.Although the results don't indicate a remarkable improvment of glottal flow, the method is effective to some extent.

The formant distortion figure shows no big difference between two methods, however, the numeric result indicates there exists slight improvement using weighed linear prediction. However, the synthesized sound used in this experiment is not perfectly suitable, which may result in inaccurate conclusion, so I am struggling with other methods to generate suitable sounds. 

#### Source notification
Examples for different kinds of voice quailty come from Linguistic Voice Quality talk by Patricia Keating and Christina Esposito, http://www.assta.org/