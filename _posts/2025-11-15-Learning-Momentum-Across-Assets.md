---
layout: post
mathjax: true
title:  "Learning Momentum Across Time and Assets"
date:   2025-11-15 08:00:00
author: A.Mootoovaloo
permalink:
categories:
  - Machine Learning and Statistics
tags:
  -
  -
excerpt:
description: "Momentum strategies, turnover control and honest backtesting."
---

<p align="justify">Over the past few months, I have been studying how machine learning can be used to build systematic trading strategies, and in particular how to make them robust once trading costs are taken into account. A useful reference point is the paper <a href="https://arxiv.org/abs/2302.10175">Spatio-Temporal Momentum</a> by Tan, Roberts and Zohren. In this post, I give a non-technical overview of its idea, followed by two topics that matter as much as the model itself: controlling turnover and backtesting honestly.</p>

<h2>Momentum</h2>

<p align="justify">Momentum is one of the most widely documented patterns in financial markets: assets that have performed well recently tend to continue performing well for a while, and those that have performed poorly tend to continue to lag. It comes in two main forms.</p>

<ul>
  <li><p align="justify"><b>Time-series momentum</b> looks at each asset on its own. If an asset's price has been rising, we buy it; if it has been falling, we sell it.</p></li>
  <li><p align="justify"><b>Cross-sectional momentum</b> compares assets with one another. We rank them by recent performance, buy the strongest and sell the weakest, regardless of whether the market as a whole is rising or falling.</p></li>
</ul>

<p align="justify">Traditionally, these two strategies are designed and studied separately, even though they draw on the same information.</p>

<h2>The idea</h2>

<p align="justify">The paper's central idea is to learn both at once. Rather than deciding each asset's position from its own history alone, the model looks at the recent behaviour of all the assets together and produces positions for all of them in one step. It can therefore learn, for example, that a move in one asset carries information about another.</p>

<p align="justify">Perhaps the most striking finding is how simple the model can be. The authors show that a neural network with a single layer, essentially a learned weighting of the input features, is enough to generate useful signals for every asset simultaneously. The approach was tested on US equities and on equity index futures, and it remained competitive with standard benchmarks once realistic transaction costs were included.</p>

<h2>Turnover control</h2>

<p align="justify">A strategy that looks profitable on paper can lose money in practice if it trades too often, because every trade incurs costs. <i>Turnover</i> measures how much of the portfolio changes from one period to the next. A good way to keep it in check is to build it into training: one penalty encourages smaller positions unless the evidence is strong, and another discourages large changes in positions from one day to the next. The paper finds that combining the two gives the best results once costs are included.</p>

<h2>Backtesting honestly</h2>

<p align="justify">A backtest simulates how a strategy would have performed on historical data, and it is easy to be fooled by one. The essentials are to use only information that was available at the time, to evaluate on a later period than the model was trained on, to include assets that were delisted or failed, to report results after realistic costs, and to remember that if enough ideas are tried, some will look good purely by chance.</p>

<h2>Closing thoughts</h2>

<p align="justify">What I find most appealing about this line of work is its restraint. A simple model that shares information across assets, trained with an explicit awareness of trading costs and evaluated with a careful backtest, is often more valuable than a complex model evaluated optimistically. In quantitative research, how a strategy is tested is as important as how it is built.</p>
