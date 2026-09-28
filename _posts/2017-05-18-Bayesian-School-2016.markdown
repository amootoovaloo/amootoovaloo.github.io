---
layout: post
mathjax: true
title:  "Bayesian School 2016"
date:   2017-05-18 08:00:00
author: A.Mootoovaloo
permalink:
categories:
  - Workshop and Conference 
tags:
  - 
  -
excerpt:
description: "Highlights from the 2016 Bayesian School: KL divergence and BHMs."
---

<p align="justify">The 2016 Bayesian School was held at Stellenbosch University from 21 to 25 November. The school focused on three main topics: Introductory Bayesian Methods, Monte Carlo Methods and Advanced Bayesian Methods, the last of which was taught by <a href="https://profiles.imperial.ac.uk/a.heavens">Prof. Alan Heavens</a> from Imperial College.</p>

<p align="justify">Beyond the lectures, another interesting part of the school was the "Research Hacks", which allowed participants to meet in small groups, ask questions, exchange ideas and initiate collaborations. The hacks largely served these purposes and also led to the publication of three papers (see <a href="https://arxiv.org/abs/1704.03472">arXiv:1704.03472</a>, <a href="https://arxiv.org/abs/1704.03467">arXiv:1704.03467</a> and <a href="https://arxiv.org/abs/1704.07830">arXiv:1704.07830</a>). </p>

<p align="justify">I learned a great deal from Prof. Heavens' lectures and attempted some of the problems he set during the school. There were also several other interesting lectures on Bayesian methods. Below, I discuss two topics: the KL divergence and Bayesian Hierarchical Modelling.</p>

<h2>Kullback-Leibler (KL) Divergence</h2>

<p align="justify">In a Bayesian analysis, a prior distribution, $\pi(\boldsymbol{\theta})$, is updated by the data into a posterior distribution, $q(\boldsymbol{\theta})$. A natural question is how much we have learned from the experiment. The Kullback-Leibler (KL) divergence answers it:</p>

$$
\textrm{D}_{\textrm{KL}}(q\,\Vert\,\pi) = \int q\,\log\left(\frac{q}{\pi}\right)d\boldsymbol{\theta}
$$

<p align="justify">Also known as the <i>relative entropy</i>, it is measured in <i>bits</i> when logarithms are taken to base 2, and in <i>nats</i> when they are taken to base $e$. For two Gaussians, it has a simple closed form, and two effects stand out. The information gain grows as the posterior becomes narrower than the prior, and it grows further when the posterior mean has moved away from the prior mean: we learn the most from an experiment that both tightens and shifts our beliefs.</p>

<div style="background-color: #FFF8C6; margin-left: 20px; margin-right: 20px; padding-bottom: 8px; padding-left: 8px; padding-right: 8px; padding-top: 8px;">

<p align="justify">One of the exercises made this concrete:</p><br/>

<p align="justify" style="margin-left: 40px; margin-right: 40px"><i>We have an experiment where a single datum $x$ is assumed to be drawn from a Gaussian likelihood of mean $\mu$ and variance $\sigma^{2}$. Compute the KL divergence between an assumed Gaussian prior on $\mu$ (with mean zero and variance $\Sigma$) and the posterior.</i></p><br/>

<p align="justify">Working through the algebra, the information gain depends on how wide the prior is compared with the measurement error, and on how surprising the datum is. The interesting limit is a prior of zero width, a Dirac delta, which amounts to claiming we already know $\mu$ exactly. The information gain is then zero: no experiment can teach us anything. In my view, this example highlights the importance of stating priors honestly, which in turn makes the case for the Bayesian formalism.</p>

</div>

<h2>Bayesian Hierarchical Modelling</h2>

<p align="justify">This topic helped me answer a question I had long wondered about: how should we perform parameter inference when both the dependent and independent variables have error bars? The idea behind Bayesian Hierarchical Modelling (BHM) is to split the problem into steps, so that the full model consists of a series of linked sub-models, with uncertainties propagated from one to the next.</p>

<p align="justify">Consider a simple example: fitting a straight line, $y=mx$, to a single measured point, $(X,\,Y)$, where both coordinates have errors. How do we infer $m$?</p>

<p align="justify">The trick is to introduce the true, unobserved values, $x$ and $y$, as latent variables. The model then has three layers: the slope, $m$, determines the true $y$ from the true $x$; the measurements $X$ and $Y$ scatter around the true values according to their errors; and since we do not care about the true values themselves, we integrate them out at the end. With Gaussian errors of unit variance on both coordinates and uniform priors, the integral can be done analytically, giving the posterior distribution of the slope:</p>

$$
\mathcal{P}(m\,|\,X,\,Y) \propto \frac{1}{\sqrt{1+m^{2}}}\,\exp\left[-\frac{1}{2}\left(\frac{Y-mX}{\sqrt{1+m^{2}}}\right)^{2}\right]
$$

<p align="justify">The factor $\sqrt{1+m^{2}}$ is where the error in $X$ shows up: a steeper line magnifies any uncertainty in $x$ into a larger uncertainty in $y$. Alternatively, rather than integrating out $x$, we can keep it and sample the joint posterior of $x$ and $m$ directly, for example with Gibbs sampling.</p>

<p align="justify">Consider the case $X=10$ and $Y=15$. The left panel of the figure below shows the posterior distribution of $m$ from the formula above, and the right panel shows the joint posterior distribution of $x$ and $m$ obtained with Gibbs sampling.</p>

{% include image.html url="/images/blog/bayesian-school-2016/posterior-m.webp" caption="The left panel shows the posterior distribution of $m$ while the right panel shows the joint posterior distribution of $x$ and $m$ using Gibbs Sampling."  width=800 align="center" %}
