---
layout: post
mathjax: true
title:  "Editing Images by Editing Sentences"
date:   2023-07-15 08:00:00
author: A.Mootoovaloo
permalink:
categories:
  - Machine Learning and Statistics
tags:
  -
  -
excerpt:
description: "Changing one word in a caption to edit an image with a diffusion model."
---

<p align="justify">Over the past few months, I have been exploring sequential image editing: making a series of changes to an image, one after another, by describing each change in words. In this post, I give a non-technical overview of the idea and of two papers that shaped it.</p>

<h2>The goal</h2>

<p align="justify">Text-to-image models can turn a sentence such as <i>"a basket of apples"</i> into a convincing picture. Editing that picture is harder. If we simply ask the model for <i>"a basket of eggs"</i>, we get a new image altogether: a different basket, a different table, different lighting. What we usually want is the same picture with only the apples replaced by eggs, and then, perhaps, a second and third change on top of that.</p>

<h2>How diffusion models create images</h2>

<p align="justify">Diffusion models learn to generate images by learning to remove noise. During training, noise is gradually added to real images until nothing recognisable remains, and the model learns to reverse each step. To create a new image, the model starts from pure noise and removes it step by step until a clean picture emerges.</p>

<p align="justify">When a sentence is provided, it is first converted into a numerical representation, a list of numbers that captures its meaning. This representation guides every denoising step, steering the emerging image towards the description. Much of an image's overall layout is decided in the early, noisy steps, while the later steps fill in finer details.</p>

<h2>Two reference papers</h2>

<p align="justify"><a href="https://arxiv.org/abs/2108.01073">SDEdit</a> (Meng et al.) showed that an existing image can be edited without retraining the model. Instead of starting from pure noise, we add a moderate amount of noise to the image we already have, then let the model remove it again. Because the noise does not erase everything, the broad structure of the original survives, while the model is free to redraw the details. The amount of noise sets the balance: too little and nothing changes, too much and the original is lost.</p>

<p align="justify"><a href="https://arxiv.org/abs/2208.01626">Prompt-to-Prompt</a> (Hertz et al.) looked at how each word in a sentence influences each part of the image. Inside the model, a mechanism called cross-attention links every word to the regions of the image it affects, so the word <i>"apples"</i> is tied mainly to the pixels where the apples appear. The authors showed that if these links are kept from the original image while one word in the sentence is changed, the layout and composition are preserved and only the relevant region changes.</p>

<h2>The idea</h2>

<p align="justify">The approach I have been exploring brings these two ideas together. An image is generated, or taken as a starting point, together with the sentence that describes it, such as <i>"a basket of apples"</i>. To edit it, we write the new description, <i>"a basket of eggs"</i>, and replace the representation of the original sentence with that of the new one inside the diffusion model. Starting from the original image rather than from scratch, the model then denoises under the guidance of the new sentence. Because only one word has changed, the two representations are very similar, so the model keeps the basket, the table and the lighting, and redraws only what the new word requires.</p>

<p align="justify">The same step can be repeated, which is what makes the editing sequential. The edited image and its new sentence become the starting point for the next change: <i>"a basket of eggs"</i> can become <i>"a wicker basket of eggs"</i>, and then <i>"a wicker basket of eggs on a wooden table"</i>. Each edit is expressed in plain language, and each builds on the result of the previous one rather than starting again.</p>

<h2>Challenges</h2>

<p align="justify">Sequential editing brings its own difficulties. Small imperfections can accumulate over several edits, so an image may gradually drift away from the original. Some changes are also harder than others: replacing one object with another of similar size and shape, such as apples with eggs, is far easier than a change that alters the whole composition. Finally, editing a real photograph, rather than an image the model generated itself, first requires finding the noise and sentence that would reproduce it, which is an active research problem in its own right.</p>

<p align="justify">What makes this line of work appealing is that the interface is language. Rather than masking regions or adjusting sliders, a user describes the change they want, and the model works out where and how to apply it.</p>
