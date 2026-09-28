---
layout: post
mathjax: true
title:  "An Emulator for the 3D Matter Power Spectrum"
date:   2021-11-16 07:11:00
author: A.Mootoovaloo
permalink:
categories:
  - Machine Learning and Statistics
tags:
  - 
  -
excerpt:
description: "A Gaussian Process emulator for the power spectrum and its gradients."
---

<p align="justify">The 3D matter power spectrum, which describes how matter clumps on different scales and at different times, is a key quantity that underpins most cosmological data analyses, including galaxy clustering, weak lensing and 21 cm cosmology. Crucially, other (derived) power spectra can be calculated quickly once it has been precomputed. In practice, the matter power spectrum is the most expensive component: it is calculated either with Boltzmann solvers such as CLASS or CAMB, or with simulations, which can be computationally expensive depending on the resolution required.</p>

<img src="/images/blog/power-spectrum-emulator/power-spectrum.webp" alt="The 3D matter power spectrum as a function of wavenumber and redshift" align="left" width = "400" style = "margin-right: 10px; margin-bottom: 10px"/>

<p align="justify">This work was published in <a href="https://doi.org/10.1016/j.ascom.2021.100508">Astronomy and Computing</a>. Our contributions are threefold. First, we show that emulation does not always require a zero-mean Gaussian Process; additional basis functions can be included before defining the kernel matrix. This is useful when an approximate model of the function is already available. Moreover, if we know how a particular function behaves, we can adopt a stringent prior on the regression coefficients of the parametric model, encoding our degree of belief in that model. Second, because the Radial Basis Function (RBF) kernel we use is infinitely differentiable, we can estimate the first and second derivatives of the 3D matter power spectrum. The derived expressions for the derivatives involve only element-wise matrix multiplication, with no matrix inverse to compute, making the gradient calculations very fast. Finally, we show that the emulator can output several key power spectra: the linear matter power spectrum at a reference redshift, and the non-linear 3D matter power spectrum with or without an analytic baryon feedback model. Using the emulated 3D power spectrum together with the tomographic redshift distributions, we also show that the weak lensing and intrinsic alignment (II and GI) power spectra can be generated very quickly using existing numerical techniques. To make the problem tractable, the 3D matter power spectrum is split into three simpler pieces: the linear power spectrum at a reference redshift, a growth factor describing how it evolves with redshift, and a correction for non-linear effects on small scales. Each piece is modelled by its own semi-parametric Gaussian Process, with a second-order polynomial for the parametric part.</p>

{% include image.html url="/images/blog/power-spectrum-emulator/gradients.webp" caption="The gradients of the power spectrum with respect to each cosmological parameter at a fixed redshift."  width=800 align="center" %}

<p align="justify">The figure above shows the gradients at a fixed set of cosmological parameters (a test point) and a fixed redshift, $z=0$. The red curves show the gradients calculated by CLASS using the central difference method, and the blue curves show those output by the emulator. In general, the emulator returns the gradient for every combination of scale, redshift and cosmological parameter at once: by default, 1000 scales, 100 redshifts and 5 parameters.</p>

{% include image.html url="/images/blog/power-spectrum-emulator/posterior.webp" caption="The full posterior distribution of all parameters using the emulator on a toy dataset."  width=600 align="center" %}

<p align="justify">We also tested the emulator on simulated weak-lensing bandpowers. The mock survey has five redshift bins and ten bandpowers per pair of bins, giving 150 data points, with simple independent Gaussian errors of 50%. For simplicity, intrinsic alignments are switched off, although they can easily be included and marginalised over. The cosmological parameters used to generate the data are shown by the black dots in the figure above. We use a Gaussian likelihood and uniform priors on all cosmological parameters, matching the input range of the emulator. The figure above shows the results of sampling the cosmological parameters on this toy data set: the red contours correspond to the emulator, and the pale blue contours to the posterior distributions obtained with CLASS. We ran three separate MCMC chains of 150 000 samples each, two with the emulator and one with CLASS, and computed the Gelman-Rubin convergence statistic for each of the three resulting pairs of runs. The worst value is 1.002, consistent with all three chains being drawn from the same distribution and corroborating the agreement shown in the figure. The emulator developed in this work therefore robustly recovers the posterior distributions of all the cosmological parameters, in agreement with the accurate solver, CLASS.</p>


