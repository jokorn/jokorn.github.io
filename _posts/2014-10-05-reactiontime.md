---
layout: post
title: "Reaction time differences in fMRI event-related designs"
description: "How I controlled for mean differences in reaction time in my event-related fMRI study"
category: Matlab
published: true
excerpt: How to adjust your GLM for reaction time differences between conditions using SPM and MATLAB.
image: mri-brain.jpg
---

{% include image.html url="mri-brain.jpg" caption="Example MRI image" %}

1. Create model with regressor with onset for all events.
2. Create parametric modulation with reaction time for 1.
3. Create this model.
4. Extract the parametric modulation from SPM struct.
5. Create the model you want to analyze.
6. Before running 5. insert 4. as user specified regressor.


