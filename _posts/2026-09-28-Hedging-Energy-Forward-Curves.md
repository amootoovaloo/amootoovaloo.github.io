---
layout: post
mathjax: true
title:  "Hedging and Forward Curves in Energy Markets"
date:   2026-09-28 08:00:00
author: A.Mootoovaloo
permalink:
categories:
  - Machine Learning and Statistics
tags:
  -
  -
excerpt:
description: "Deciding how much to hedge, and shaping forward curves."
---

<p align="justify">An energy supplier agrees to deliver gas or electricity to its customers at a fixed price, often months or years in advance, but buys that energy in a wholesale market where prices move every day. If wholesale prices rise before the energy has been bought, the supplier's margin shrinks or disappears. Hedging, buying some of the energy ahead of time at today's prices, reduces that risk. In this post, I give a non-technical overview of two separate problems I have worked on in this area: deciding how much to hedge, and shaping a forward curve.</p>

<h2>How much to hedge</h2>

<p align="justify">The first problem is how much energy to buy in advance. The starting point is the <i>volume profile</i>: how much energy the supplier expects its customers to consume in each future period. The question is then how much of that volume to hedge through the liquid contracts, those that can be traded readily at a fair price.</p>

<p align="justify">Because future prices are uncertain, this decision is made by simulation. Using Monte Carlo methods, we generate many possible future paths for forward prices and for the spot price, the price for immediate delivery. Together with the volume profile, these simulations are all the optimisation needs. For a given choice of hedge volumes, we compute the supplier's total cost of supplying its customers along every path: the hedged volume is bought at forward prices, and the remainder is bought later at the spot price. This gives the full distribution of possible outcomes rather than a single forecast.</p>

<p align="justify">The optimisation then searches for the hedge volumes that give the most favourable distribution, for example by reducing the chance of a very large cost. The appeal of simulation is that it captures the full range of possible price movements, rather than relying on a single forecast of where prices will go.</p>

<h2>Forward curves</h2>

<p align="justify">The second problem is a separate one. Energy for future delivery is traded through standard contracts, such as next month, next quarter, next season or next year, each with a single price covering its whole delivery period. A supplier, however, needs to know the price of energy for each individual day, or even each hour, because that is how its customers consume. A <i>forward curve</i> fills this gap: it assigns a price to every day in the future while remaining consistent with the prices of the contracts that are actually traded.</p>

<p align="justify">Building such a curve is known as forward shaping. A well-established approach is described by <a href="https://ideas.repec.org/h/wsi/wschap/9789812812315_0007.html">Benth, Šaltytė Benth and Koekebakker</a>, originally for electricity markets. Among all the curves whose average over each contract's delivery period matches that contract's price, it chooses the smoothest one, so that prices do not jump artificially from one contract to the next. The curve can also follow a seasonal pattern, so that the known shape of demand through the year is reflected in the prices.</p>

<p align="justify">The same idea carries over naturally to gas. The contracts differ, with gas markets trading months, quarters and the winter and summer seasons, and so does the seasonal pattern: gas demand is dominated by heating, so prices are typically highest in winter. With these adjustments, the method produces a daily gas curve that respects every traded price while varying smoothly from one day to the next.</p>

<h2>Closing thoughts</h2>

<p align="justify">The two problems are quite different. Hedging optimisation turns a vague question, "how exposed are we?", into a concrete decision, by showing how different hedging choices would perform across a wide range of possible futures. Forward shaping provides a consistent view of prices for every future day from the handful of contracts that are actually traded. In both cases, as in many areas of applied statistics, the value lies less in predicting the future than in making the best use of the information available.</p>
