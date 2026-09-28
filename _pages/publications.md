---
layout: page
mathjax: true
title: Publications
permalink: /publications/
---

<p align="justify">His academic research, at the University of Oxford and Imperial College London, focused on building emulators for weak lensing analyses. Traditional Markov Chain Monte Carlo (MCMC) methods require a large number of computationally expensive forward simulations to obtain reliable posterior distributions for both cosmological and systematic parameters. While <b>neural networks</b> were explored in early work, his main focus has been on <b>Gaussian Processes</b>, which allow uncertainty to be propagated fully through the likelihood analysis. He has also worked with the MOPED compression algorithm (<a href="https://academic.oup.com/mnras/article/317/4/965/1039456">Heavens et al. 2000</a>), showing that, combined with a Gaussian Process emulator, it recovers the full posterior distribution of cosmological and nuisance parameters.</p>

## Papers and preprints

{% capture chips %}<button class="filter-chip" type="button" data-filter-chip="selected" aria-pressed="false">&#9733; Selected</button><button class="filter-chip" type="button" data-filter-chip="journal" aria-pressed="false">Journal</button><button class="filter-chip" type="button" data-filter-chip="workshop" aria-pressed="false">Conference &amp; workshop</button><button class="filter-chip" type="button" data-filter-chip="preprint" aria-pressed="false">Preprint</button>{% endcapture %}
{% include filter-bar.html label="Search publications" placeholder="Search by title, author, topic or year…" noun="publications" chips=chips %}

<ol class="pub-list">
{% for pub in site.data.publications %}
  {% include publication.html pub=pub %}
{% endfor %}
</ol>
