---
layout: post
mathjax: true
title:  "Linear Regression with Maximum Likelihood"
date:   2017-03-02 06:00:00
author: A.Mootoovaloo
permalink:
categories:
  - Machine Learning and Statistics
tags:
  - 
  -
excerpt:
extra_css: |
  table {width: auto;}
description: "Maximum likelihood fitting, applied to an A-Level physics experiment."
---

<p align="justify">A common problem in statistics is learning the functional relationship between independent variables and a dependent variable. For example, we may want to know how house prices vary with the area of the land, the total size of the house and other criteria. Here, the house price is the dependent variable, often called the response variable, while the land area and total size of the house are the independent variables, also known as attribute variables.</p>

<p align="justify">We begin with linear modelling: given a set of attributes, we want to infer a linear relationship between the attributes and the response. The function we want to fit is typically governed by a set of parameters, say $\theta_{i}$. Before going further, however, it is worth distinguishing between linear and non-linear models.</p>

<div style="background-color: #FFF8C6; margin-left: 20px; margin-right: 20px; padding-bottom: 8px; padding-left: 8px; padding-right: 8px; padding-top: 8px;">
<b>Linear and Non-Linear Models</b><br/>
The equation

\begin{align}
y=\theta_{0} + \theta_{1}x + \theta_{2}x^2
\end{align}

is a linear model because it is linear in the parameters $\theta_{i}$. In contrast, the model 

\begin{align}
y=\textrm{sin}\left(\omega x + \phi\right)
\end{align}

is a non-linear model, since it is non-linear in the parameters $\left(\omega,\,\phi\right)$.
 
</div>

<h2>Maximum Likelihood Method</h2>

<p align="justify">Suppose we want to fit a straight line, $f(x) = \theta_{0} + \theta_{1}x$, to some observed data points $(x_{i},\,y_{i})$, each with a known Gaussian measurement error, $\sigma_{i}$. The likelihood measures how probable the observed data are for a given choice of parameters. For Gaussian errors, maximising it amounts to finding the line that minimises the familiar weighted sum of squared residuals, often called $\chi^{2}$, in which each point counts in proportion to its precision: points with small error bars pull the line harder than points with large ones.</p>

<p align="justify">For a linear model, this problem has an exact solution. Writing the scaled data as a vector $\mathbf{b}$ (each $y_{i}$ divided by its error) and the model as a design matrix $\mathbf{D}$ (with one column per parameter, likewise scaled), setting the gradient of the likelihood to zero gives</p>

$$
\boldsymbol{\theta}_{\textrm{MLE}} = \left(\mathbf{D}^{\textrm{T}}\mathbf{D}\right)^{-1}\mathbf{D}^{\textrm{T}}\mathbf{b}
$$

<p align="justify">The matrix $\mathbf{C} = \left(\mathbf{D}^{\textrm{T}}\mathbf{D}\right)^{-1}$ is just as useful: it is the covariance matrix of the fitted parameters. Its diagonal elements are the variances of the parameters, so their square roots give the error bars, and its off-diagonal elements tell us how the parameters are correlated.</p>

<h2>Example - A Physics Problem</h2>

<img src="/images/blog/linear-regression/circuit.webp" alt="Circuit with a potentiometer, an LED and a voltmeter" align="left" width = "420"/>

<p align="justify">We now apply this method to a physics problem (Physics 9702, November 2016, Paper 52). A student is investigating the characteristics of different light-emitting diodes (LEDs). Each LED
needs a minimum potential difference across it to emit light. The circuit is set up as shown on the left. </p>


<p align="justify">The potentiometer is adjusted until the LED just emits light. The potential difference $V$ across the LED is measured. The experiment is repeated for LEDs that emit light of different wavelength $\lambda$. It is suggested that $V$ and $\lambda$ are related by the equation

\begin{align}
V=p\lambda^{q}
\end{align}

where $p$ and $q$ are constants. Taking logarithms turns this into a straight line: if we plot $\textrm{lg }V$ against $\textrm{lg }\lambda$, the gradient is $q$ and the $y$-intercept is $\textrm{lg }p$, so the method above applies directly.</p>

<img src="/images/blog/linear-regression/data.webp" alt="Measured lg V against lg wavelength, each point drawn as a Gaussian" align="right" width = "420"/>

<p align="justify">The values of $V$ and $\lambda$ are given in the table below, together with $\textrm{lg }\lambda$ and $\textrm{lg }V$ and its associated error, which is the fractional error in $V$. We calculate $\textrm{lg }\lambda$ and $\textrm{lg }V$ to two decimal places, and assume that each data point is Gaussian distributed with mean $\mu=\textrm{lg }V$ and standard deviation $\sigma = \sigma_{\textrm{lg }V}$, as illustrated on the right. Plotting $\textrm{lg }V$ against $\textrm{lg }\lambda$, we find a gradient of $-2.60$ and a $y$-intercept of $7.56$.</p>





<div style="clear: both"></div>

<table class="tableizer-table" style="margin: 1em auto;">
<thead><tr class="tableizer-firstrow"><th>$\lambda/10^{-9}$ m </th><th>$V/\,\textrm{V}$</th><th>$\textrm{lg}\left(\lambda/10^{-9}\,\textrm{m}\right)$</th><th>$\textrm{lg}\left(V/\,\textrm{V}\right)$</th></tr></thead><tbody>
 <tr><td align="center">630</td><td align="center">$1.9\pm0.1$</td><td align="center">2.80</td><td align="center">$ 0.28\pm0.05$ </td></tr>
 <tr><td align="center">620</td><td align="center">$2.0\pm0.1$</td><td align="center">2.79</td><td align="center">$0.30\pm0.05$ </td></tr>
 <tr><td align="center">590</td><td align="center">$2.3\pm0.1$</td><td align="center">2.77</td><td align="center">$0.36\pm0.04$</td></tr>
 <tr><td align="center">520</td><td align="center">$3.1\pm0.1$</td><td align="center">2.72</td><td align="center">$0.49\pm0.03$</td></tr>
 <tr><td align="center">490</td><td align="center">$3.7\pm0.1$</td><td align="center">2.69</td><td align="center">$0.57\pm0.03$</td></tr>
 <tr><td align="center">470</td><td align="center">$4.1\pm0.1$</td><td align="center">2.67</td><td align="center">$0.61\pm0.02$</td></tr>
</tbody></table>

<p align="justify">The square roots of the diagonal of the covariance matrix give the uncertainties on the two parameters, so that $q=-2.60\pm0.31$ and $\textrm{lg }p = 7.56\pm0.82$. The off-diagonal element, $-0.258$, is negative, which already tells us that the two estimates are anti-correlated.</p>

<div style="display: flex; flex-wrap: wrap; gap: 1.5em; justify-content: center; margin: 1.5em 0;">
  <figure class="figure" style="flex: 1 1 260px; margin: 0;">
    <img src="/images/blog/linear-regression/fit.webp" alt="Straight-line fit to lg V against lg wavelength with error bars" loading="lazy">
    <figcaption>The best-fit straight line through the data.</figcaption>
  </figure>
  <figure class="figure" style="flex: 1 1 260px; margin: 0;">
    <img src="/images/blog/linear-regression/correlation.webp" alt="Joint distribution of lg p and q showing their negative correlation" loading="lazy">
    <figcaption>Joint distribution of the two parameters, with 1&sigma;, 2&sigma; and 3&sigma; contours.</figcaption>
  </figure>
</div>

<p align="justify">In summary, the estimates of $p$ and $q$ are $3.61\times10^{7}$ and $-2.60$, respectively. Because the off-diagonal elements of the covariance matrix are negative, the parameters are negatively correlated: an increase in one corresponds to a decrease in the other, as the tilted contours in the right-hand figure show. The joint distribution of $\left(\textrm{lg }p,\,q\right)$ is Gaussian, since we are working with a linear model. Finally, the values of $p$ and $q$ can be used to estimate the minimum potential difference required for a different diode, for example, one emitting at a wavelength of $950$ nm.</p>

<h2>Summary and Conclusion</h2>

<p align="justify">In this post, we have covered one method of inferring parameters, the Maximum Likelihood Estimator, and illustrated it with an example. The method provides good estimates of the parameters and their associated errors, and the covariance matrix also reveals the correlations between the parameters.</p>

<p align="justify">If we had prior information on the parameters, we would turn to Bayesian statistics. The approach is similar, except that each parameter would have a prior probability distribution, and instead of the MLE we would obtain the MAP, or Maximum a Posteriori, estimates of the parameters. With uniform priors, the MAP and MLE coincide.</p>
