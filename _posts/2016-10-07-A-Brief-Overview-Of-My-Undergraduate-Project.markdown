---
layout: post
mathjax: true
title:  "A Brief Overview of My Undergraduate Project"
date:   2016-10-07 06:00:00
author: A.Mootoovaloo
permalink:
categories:
  - Research
tags:
  - 
  -
excerpt:
description: "What X-ray cavities in galaxy clusters reveal about AGN feedback."
---
{% include image.html url="/images/blog/x-ray-cavities/overlay-1.webp" caption="Hydra A" width=350 align="right" %}

<p align="justify">X-ray cavities are bubbles inflated by the active galactic nucleus (AGN) at the centre of galaxy clusters, groups and giant elliptical galaxies. Radio/X-ray overlays provide increasing evidence that these cavities are formed at the tips of the jets of the central radio galaxy and are connected back to the nucleus through a channel-like structure. In X-ray images, the cavities appear as depressions in surface brightness. Most are filled with radio emission at 1.4 GHz, although some, known as "ghost" bubbles, are misaligned with respect to the jet and are observed at lower radio frequencies.</p>



<p align="justify">X-ray cavities are a consequence of AGN feedback, which also produces other structures such as shocks and ripples. These structures may offset cooling in galaxy clusters and may offer a solution to the classical cooling flow problem proposed by <a href="https://ned.ipac.caltech.edu/level5/Fabian3/frames.html">Fabian (1994)</a>. </p>



{% include image.html url="/images/blog/x-ray-cavities/overlay-2.webp" caption="RBS 797 " width=400 align="left" %}

<p align="justify">It was originally believed that a cooling flow must be established at the centre of a galaxy cluster: because the central atmosphere is very dense and hot, the gas should lose energy through X-ray emission. However, following the launch of the Chandra and XMM-Newton satellites in 1999, it was observed that relatively little gas actually cools below 2 keV. Using CIAO 4.6 and CALDB 4.5.9, we investigated nine galaxy clusters with redshifts $0.01 < z < 0.35$ that host X-ray cavities. These cavities are around $10^7$ years old. The most commonly used estimates of cavity age are the refill timescale $\left(t_r\right)$, the buoyancy timescale $\left(t_b\right)$ and the sound-crossing timescale $\left(t_s\right)$, with $t_r < t_b < t_s$. The enthalpy of a cavity depends on the nature of the lobes and lies between $2pV$ and $4pV$, as described by <a href="https://arxiv.org/abs/0709.2152">McNamara and Nulsen (2007)</a>.</p>




<p align="justify">The cavity power can be determined from the cavity age and enthalpy, and is of the order of $10^{44}\, \textrm{ergs s}^{−1}$. We also studied the central radio source of each cluster, covering both strong and weak radio galaxies. Their radio luminosities at 1.4 GHz were calculated using symbolic programming in Matlab 2012Ra, with typical radio luminosities $\left(\textrm{L}_{\textrm{rad}}\right)$ ranging from $0.9 − 315 \times 10^{42}\, \textrm{ergs s}^{−1}$. Plotting radio luminosity against cavity power on a logarithmic scale, we found that the cavity power $\textrm{P}_{\textrm{cav}}$ scales as 

$$
\textrm{P}_{\textrm{cav}} = \left(5 \times 10^{38\pm1}\right)\,\textrm{L}_{\textrm{rad}}^{0.13\pm0.13}
$$
</p>

{% include image.html url="/images/blog/x-ray-cavities/overlay-3.webp" caption="Abell 2052" width=410 align="right" %}

<p align="justify"><a href="https://arxiv.org/abs/astro-ph/0605323">Rafferty et al. (2006)</a> argued that the formation of X-ray cavities can be described by a mass accretion model, in which the jet is produced when a fraction of the gravitational binding energy of the accreted material is converted into outburst energy. In an alternative theory developed by <a href="https://arxiv.org/abs/astro-ph/9810352">Meier (1999)</a>, cavities can be formed by the spin of the central black hole, with the spin energy converted into jet power through a torque applied by the poloidal magnetic field.</p>

<p align="justify">Different scenarios are possible. In Hydra A, for example, the jet is aligned with the cavities, whereas in RBS 797 the jet is roughly perpendicular to the two cavities. Abell 2052, meanwhile, shows intricate ongoing activity in its core.</p>

<p align="justify">In conclusion, the coupling between radio galaxies and cavities has yet to be fully explored. Jets and cavities heat the intracluster medium, inhibiting cooling flows and affecting accretion and galaxy growth. Moreover, the non-thermal nature of cavities opens up new avenues for studying magnetism in these environments.</p>
