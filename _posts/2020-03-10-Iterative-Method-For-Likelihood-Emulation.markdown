---
layout: post
mathjax: true
title:  "An Iterative Method for Likelihood Emulation"
date:   2020-03-10 15:30:00
author: A.Mootoovaloo
permalink:
categories:
  - Machine Learning and Statistics
tags:
  - 
  -
excerpt:
extra_css: |
  table {width: 30%;}
description: "Likelihood emulation with Gaussian Processes and Bayesian optimisation."
---
<p align="justify">The paper '<b><font size="2.5">Cosmological parameter estimation via iterative emulation of likelihoods</font></b>' was recently posted on <a href="https://arxiv.org/abs/1912.08806">arXiv</a>. The idea is to use a Gaussian Process to emulate the log-likelihood and to progressively augment the training set using Bayesian Optimisation. In this post, I illustrate the technique with a simple straight-line fitting example, which should be easy to follow.</p>

<img src="/images/blog/likelihood-emulation/acquisition.webp" alt="Gaussian Process emulator of the log-likelihood with its acquisition function" align="right" width = "400" style = "margin-left: 10px; margin-bottom: 10px"/>

<p><b><font size="3">Analytical Posterior</font></b></p>

<p align="justify">We begin by drawing 50 points uniformly at random from $x\in[0, 1]$ and compute $\mathbf{y}$, which is given by

$$
\mathbf{y} = \theta\mathbf{x} + \boldsymbol{\epsilon}
$$
</p>

<p align="justify">We fix $\theta = 1$, add Gaussian noise with a standard deviation of 0.04, and place a Gaussian prior on $\theta$ with mean 1 and variance 1. Because the model is linear and both the noise and the prior are Gaussian, the posterior distribution of $\theta$ is also Gaussian and can be written down exactly. This gives us a reference answer against which to check the emulator.</p>

<p><b><font size="3">Gaussian Process and Bayesian Optimisation</font></b></p>

<p align="justify">A Gaussian Process (GP) is a distribution over functions (see <a href="/blog/2016/10/Gaussian-Process">this post</a> for an introduction). Trained on a handful of evaluations of the log-likelihood, it predicts the log-likelihood everywhere else, together with an uncertainty that is small near the training points and large far from them.</p>

<p align="justify">Bayesian Optimisation is a strategy for finding the optimum of a function that is expensive to evaluate. A typical example arises in cosmology, where a series of integrations and other costly calculations (for example, to account for systematics) must be performed before the log-likelihood can be computed. Rather than evaluating the function on a dense grid, we use the GP to decide where the next evaluation will be most useful.</p>

<p><b><font size="2">Acquisition Functions</font></b></p>

<p align="justify">That decision is made by an acquisition function, which scores every candidate point using the GP's prediction and uncertainty. Several choices exist. The <i>probability of improvement</i> picks the point most likely to beat the best value found so far. The <i>expected improvement</i> also accounts for how large that improvement is likely to be. The <i>upper confidence bound</i> (UCB) simply adds a multiple of the uncertainty to the prediction:</p>

$$
\textrm{UCB}(\theta) = \mu(\theta) + \alpha\,\sigma(\theta)
$$

<p align="justify">The parameter $\alpha$, set by the user, controls the trade-off between exploitation (sampling where the predicted log-likelihood is high) and exploration (sampling where the GP is most uncertain).</p>

<p><b><font size="3">Our Implementation</font></b></p>

<p align="justify">
We start with just four training points (generated using Latin Hypercube Sampling, <a href="https://en.wikipedia.org/wiki/Latin_hypercube_sampling">LHS</a>), shown in the first four rows of the table below. We then use the Upper Confidence Bound (UCB) acquisition function (with $\alpha=15$) to iteratively add two points (the last two rows, in red) to the Gaussian Process model. See the algorithm below for further details.
</p>



<table class="tableizer-table" align = "left">
<thead><tr class="tableizer-firstrow"><th>$\theta$ </th><th>$\textrm{log } L$</th></tr></thead><tbody>
 <tr><td align="center">0.9662</td><td align="center">-26.1204</td></tr>
 <tr><td align="center">1.0064</td><td align="center">-17.2318</td></tr>
 <tr><td align="center">1.0223</td><td align="center">-18.1605</td></tr>
 <tr><td align="center">1.0511</td><td align="center">-26.2248</td></tr>
 <tr><td align="center"><font color="red">0.9860</font></td><td align="center"><font color="red">-19.7343</font></td></tr>
 <tr><td align="center"><font color="red">1.0369</font></td><td align="center"><font color="red">-21.2069</font></td></tr>
</tbody></table>

<img src="/images/blog/likelihood-emulation/algorithm.webp" alt="Bayesian Optimisation algorithm for iteratively adding training points" align="right" width = "600" style = "margin-right: 10px; margin-bottom: 10px"/>

<p><b><font size="3">Results and Conclusions</font></b></p>

<p align="justify">
In this setup, we can reconstruct the log-likelihood almost perfectly after augmenting the data set in just two iterations. As the right-hand panel below shows, the resulting posterior distribution of $\theta$ is identical to the exact, analytically derived one. The vertical dashed line marks the value $\theta=1$ used to generate the data.
</p>

<img src="/images/blog/likelihood-emulation/posterior.webp" alt="Emulated log-likelihood and resulting posterior compared with the exact posterior" align="center" width = "800" style = "margin-bottom: 0.1px"/>

<p align="justify">
In high dimensions, however, the volume of the parameter space grows, and reconstructing a function perfectly (if that is the main objective) becomes difficult. Moreover, the acquisition functions themselves have multiple local optima (as seen in the figure at the top), and the choice of acquisition function is an interesting research question in its own right. Acquisition functions can be greedy, favouring exploitation over exploration, so the choice of $\alpha$ also matters.
</p>

<p><b><font size="3">References</font></b></p>
<ol type="1">
<li>A Tutorial on Bayesian Optimization (arXiv, <a href="https://arxiv.org/abs/1012.2599"><i style="font-size:12px" class="fa">&#xf08e;</i></a>) </li>
<li>Cosmological parameter estimation via iterative emulation of likelihoods (arXiv, <a href="https://arxiv.org/abs/1912.08806"><i style="font-size:12px" class="fa">&#xf08e;</i></a>) </li>
</ol>
