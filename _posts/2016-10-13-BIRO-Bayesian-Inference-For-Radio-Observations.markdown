---
layout: post
mathjax: true
title:  "BIRO: Bayesian Inference for Radio Observations"
date:   2016-10-13 07:00:00
author: A.Mootoovaloo
permalink:
categories:
  - Research
tags:
  - 
  -
excerpt:
extra_css: |
  .bottom-three {
  margin-bottom: 0.5cm;
  }
description: "Doing science directly on radio visibilities with Bayesian inference."
---


{% include image.html url="/images/blog/biro/superjedi.webp" caption="superJEDI in 2013 at Flic En Flac" width=420 align="right" %}

<p align="justify">The superJEDI was held in 2013 at Flic en Flac, Mauritius. I did not attend, as I was then in the second year of my undergraduate studies; however, Sheean and Suraj took part. What makes JEDIs distinctive is that they are exactly the kind of meeting where new ideas emerge and go on to become publications. In my view, the main reason is the active participation of everyone involved, from undergraduates to the most senior researchers.</p>

<p align="justify">One day during the event, while Nadeem and Bruce were walking along the seaside, Bruce proposed developing a Bayesian formalism for radio interferometry. This led to the BIRO (Bayesian Inference for Radio Observations) project.</p>


<div style="text-align: center;">
<iframe src="https://player.vimeo.com/video/117391380" width="640" height="360" frameborder="0" allowfullscreen="allowfullscreen"> </iframe> 
</div>

<p class="bottom-three">

<p align="justify">The aim of the project was to infer the scientific parameters, and where possible the systematic parameters, directly from the visibility data. Conventionally, a radio image is produced first, and all subsequent science is done on that image. This seems counter-intuitive: why produce an image when we have the raw data? One might argue that the data are dominated by noise, making it difficult to work in Fourier space, that is, with the visibilities directly. This is precisely why the best alternative is to obtain the full distribution of the parameters of interest, along with summary statistics.</p>

<p align="justify">Michelle, then a PhD student with Bruce, took on the BIRO project as part of her doctoral research, and Iniyan also joined the project. Michelle focused mainly on Bayesian parameter estimation, while Iniyan worked on Bayesian model selection. Michelle was able to infer both the scientific and the systematic parameters within a fully Bayesian framework, using MCMC (Markov Chain Monte Carlo) methods to map the full posterior distributions of the parameters. Iniyan used <a href="https://johannesbuchner.github.io/PyMultiNest/"> PyMultinest</a> to compute the Bayesian evidence, the quantity that tells us how strongly one model is favoured over another; PyMultinest also returns the posterior distributions of the parameters. The video above illustrates their work. Compared with <a href="https://ui.adsabs.harvard.edu/abs/1974A%26AS...15..417H/abstract">CLEAN</a>, BIRO performs considerably better.</p>


<p align="justify">The technique is, of course, not without limitations. One is that the sky model must be known before Bayesian inference can proceed. BIRO projects therefore typically assume a known sky model, which in turn implies a second assumption: that the source positions are known. In addition, nested sampling is known to perform unreliably in high dimensions. Nevertheless, Bruce's idea has proved highly fruitful, leading to the following publications: <a href="https://arxiv.org/abs/1501.05304">BIRO</a>, <a href="https://arxiv.org/abs/1501.07719">MontBlanc</a> and <a href="https://arxiv.org/abs/1610.03773">Resolving the blazar CGRaBS J0809+5341</a>. We are currently extending the BIRO formalism to various other topics in radio astronomy.</p>

</p>