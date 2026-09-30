---
layout: page
title: Workshops
lead: Workshops, schools and research visits across three continents.
permalink: /workshops/
# Start each section, and each photo, below the previous photo.
extra_css: |
  h2, h3, figure { clear: both; }
---

<p class="jump-links">Jump to: <a href="#at-a-glance">At a glance</a> · <a href="#africa">Africa</a> · <a href="#europe">Europe</a> · <a href="#north-america">North America</a></p>

## At a glance

<ul class="visit-list">
{%- for v in site.data.visits %}
  <li class="visit{% if v.virtual %} visit--virtual{% endif %}">
    <span class="visit__year">{{ v.year }}</span>
    <span class="visit__event">{% if v.link %}<a href="{% if v.link contains '#' %}{{ v.link }}{% else %}{{ v.link | prepend: site.baseurl }}{% endif %}">{{ v.event }}</a>{% else %}{{ v.event }}{% endif %}</span>
    <span class="visit__place">{{ v.place }}</span>
  </li>
{%- endfor %}
</ul>

<p class="visit-list__note">Linked entries have a story further down this page or on the blog.</p>

{% include workshops-map.html %}

## Africa

### South Africa

{% include image.html url="/images/workshops/africa/ska-sa-2015.jpg" caption="SKA SA Conference, 2015" width=400 align="right" %}

<p align="justify">During his Master's degree, he spent around eighteen months in Cape Town, attending a range of conferences and workshops.</p>

<p align="justify">The SKA SA (Square Kilometre Array South Africa) conference is held annually. Students funded through SKA SA bursaries attend to present their research, through both talks and poster sessions.</p>

<p align="justify">The <a href="https://www.skatelescope.org/">Square Kilometre Array</a> (SKA) will be the world's largest radio telescope, with its mid-frequency dishes in South Africa's Karoo and its low-frequency antennas in Western Australia. Bringing together students from across Africa is a key part of developing the scientific and technical skills the project needs throughout the continent.</p>

{% include image.html url="/images/workshops/africa/bodhi-khaya.webp" caption="Bodhi Khaya, South Africa" width=418 align="left" %}

<p align="justify">At <a href="https://www.bodhikhaya.com/">Bodhi Khaya</a>, a nature retreat in the Western Cape, he was part of the team that organised a week-long JEDI workshop on machine learning. As in other JEDI workshops, there was no fixed programme: participants worked intensively on projects of their own choosing. One idea explored was generating music with a deep neural network.</p>

<p align="justify"><a href="https://profiles.imperial.ac.uk/a.jaffe">Prof. Andrew Jaffe</a> also visited from Imperial College London, and together they started a new BIRO (Bayesian Inference for Radio Observations) project, which aimed to use visibilities to infer the separation between two point sources buried in noise.</p>

### Mozambique

{% include image.html url="/images/workshops/africa/jedi-mozambique-2016.webp" caption="JEDI workshop, Mozambique, 2016" width=400 align="right" %}

<p align="justify">In September 2016, he helped organise a week-long JEDI workshop in Mozambique, the first event of its kind held in the country. Nine of the ten participants were Portuguese speakers, and the workshop was run in English.</p>

<p align="justify">Over the course of the week, participants learned about cosmology by attempting to reproduce the results behind the 2011 Nobel Prize in Physics, awarded to Saul Perlmutter, Brian Schmidt and Adam Riess for discovering the accelerating expansion of the Universe through observations of distant supernovae. The programme also included networking sessions, in which each participant spoke with three people they had not met before in about fifteen minutes.</p>

### Mauritius

{% include image.html url="/images/workshops/africa/ml-jedi-mauritius-2015.webp" caption="Machine Learning JEDI, Mauritius, 2015" width=450 align="left" %}

<p align="justify">The Mauritius Machine Learning JEDI took place from 16 to 26 July 2015 at <a href="https://www.villasun.mu/">Villasun</a>, with funding from SKA SA and the Newton Fund. The workshop brought together experts including <a href="https://www.linkedin.com/in/jasper-horrell-64a93937">Dr Jasper Horrell</a> (Science Processing Manager at SKA SA) and <a href="https://www.linkedin.com/in/datamusing">Dr Sudeep Das</a> (Senior Researcher at <a href="https://www.netflix.com/">Netflix</a>, formerly a data scientist at <a href="https://www.opentable.com/start/home">OpenTable</a>), among other researchers.</p>

<p align="justify">The participants, mostly undergraduates from the science and engineering faculties of the University of Mauritius, tackled two imaging problems. The first, from radio astronomy, involved counting the point sources and extended sources in a sky image, for which a friends-of-friends (FoF) algorithm was proposed. The second was diabetic retinopathy detection, based on a <a href="https://www.kaggle.com/c/diabetic-retinopathy-detection">Kaggle</a> competition.</p>

{% include image.html url="/images/workshops/africa/minijedi-mauritius-2016.webp" caption="Astro Data Science miniJEDI, 2016" width=400 align="right" %}

<p align="justify">Many Mauritian students study in South Africa with financial support from SKA SA and other funding agencies. Each year, on returning to Mauritius, they organise a short workshop to share their knowledge with students there. He served on the organising committee of the Astro Data Science miniJEDI, held from 4 to 8 January 2016.</p>

<p align="justify">The first few days introduced participants to Python programming. He gave a session on presentation skills, inspired by the book <i>The Presentation Secrets of Steve Jobs</i>, as well as an introductory talk on Bayesian statistics. In the final two days, participants worked on data analysis and exoplanet detection, gaining hands-on coding experience.</p>

## Europe

### Germany

{% include image.html url="/images/workshops/europe/lindau-press-talk-2016.webp" caption="AI press talk, Lindau, 2016" width=520 align="left" %}

<p align="justify">He was one of 400 young scientists selected to attend the 66<sup>th</sup> <a href="https://www.lindau-nobel.org/">Lindau Nobel Laureate Meeting</a> in 2016, dedicated to physics, which brought together 31 Nobel laureates for informal discussions with participants. He also took part in several side events, including the Africa Outreach Breakfast and a session on Excellence in Science and Sports. In addition, he visited <a href="https://www.continental.com/en/">Continental</a>, where machine learning techniques were being tested for car braking systems, and attended a discussion on the challenges and opportunities of big data.</p>

<p align="justify">He also took part in a press talk with Vint Cerf, co-designer of the internet's TCP/IP protocols and Google's Vice President and Chief Internet Evangelist. Organised by the <a href="https://www.faz.net/">Frankfurter Allgemeine Zeitung</a> (FAZ), the discussion focused on how artificial intelligence may shape everyday life.</p>

### Switzerland

{% include image.html url="/images/workshops/europe/geneva.webp" caption="Geneva, Switzerland" width=400 align="right" %}

<p align="justify">In 2015 and 2016, he visited <a href="https://cosmology.unige.ch/users/martin-kunz">Prof. Martin Kunz</a> at the University of Geneva. Martin co-supervised his Master's research project, on radio astronomy and Bayesian statistics, together with Prof. Bruce Bassett at AIMS in Cape Town.</p>

<p align="justify">The visits were used to advance their joint research. In 2015, at the start of the project, they were still working out why the MCMC analysis was failing in one particular case; by 2016, they were writing the paper together.</p>

{% include image.html url="/images/workshops/europe/idiap-martigny.webp" caption="Idiap Research Institute, Martigny" width=450 align="left" %}

<p align="justify">In 2015, he also visited the <a href="https://www.idiap.ch/">Idiap</a> Research Institute, an independent research institute in Martigny, in the Swiss canton of Valais, affiliated with <a href="https://www.epfl.ch/">EPFL</a> (École Polytechnique Fédérale de Lausanne).</p>

<p align="justify">There he met James Newling, a former Master's student of Prof. Bruce Bassett, who was completing his PhD in machine learning with François Fleuret at Idiap and EPFL, and attended a talk James gave on his research to members of the group.</p>

{% include image.html url="/images/workshops/europe/eth-zurich.webp" caption="ETH Zurich, Switzerland" width=400 align="right" %}

<p align="justify">The 2016 trip to Switzerland also included a visit to the <a href="https://ml.inf.ethz.ch/">Institute for Machine Learning</a>, part of the Department of Computer Science at ETH Zurich. There he met PhD students <a href="https://olivierbachem.ch/">Olivier Bachem</a>, <a href="https://ch.linkedin.com/in/baharan-mirzasoleiman-0858b991">Baharan Mirzasoleiman</a>, <a href="https://ch.linkedin.com/in/nico-gorbach-69045b38">Nico Gorbach</a> and <a href="https://people.inf.ethz.ch/ybian/">Yatao Bian</a>. Nico had completed his undergraduate and Master's studies at the University of Cape Town.</p>

<p align="justify">Their conversations covered the students' research and what a machine learning PhD at ETH Zurich involves, including the teaching that PhD students contribute to the department.</p>

{% include image.html url="/images/workshops/europe/eth-zurich-desc-2024.webp" caption="ETH Zurich, Hönggerberg campus, 2024" width=400 align="left" %}

<p align="justify">In July 2024, he returned to Zurich for the <a href="https://lsstdesc.org/pages/meetinginfo/2024_july_collab_ETH.html">LSST DESC Collaboration Meeting</a>, held from 8 to 12 July on ETH Zurich's Hönggerberg campus. The meeting brought together members of the Dark Energy Science Collaboration (DESC), which is preparing to study dark energy with the Legacy Survey of Space and Time at the Vera C. Rubin Observatory. The week combined the Dark Energy School, collaborative working sessions and a closing sprint day.</p>

<p align="justify">He gave a talk covering two of his projects: <a href="{% post_url 2024-01-15-emuflow-Normalising-Flows %}">emuflow</a>, which uses normalising flows to combine constraints from different experiments without re-running their expensive likelihoods, and an <a href="https://arxiv.org/abs/2406.04725">assessment of gradient-based samplers</a> for cosmological inference. He also led a discussion on how emulation can be used to accelerate the computations behind cosmological analyses.</p>

### United Kingdom

<p align="justify">In London, he visited Dr Michelle Lochner, then a postdoctoral researcher in the <a href="https://www.ucl.ac.uk/star">UCL Astrophysics Group</a>. Michelle completed her PhD with Prof. Bruce Bassett and was among the first students to work on the BIRO project, which originated at a JEDI workshop. They discussed statistical methods, including those she applied in the <a href="https://arxiv.org/abs/astro-ph/0611004">BEAMS</a> (Bayesian Estimation Applied to Multiple Species) paper.</p>

<p align="justify">In 2016, before attending the summer school in Chania, he visited <a href="https://profiles.imperial.ac.uk/a.jaffe">Prof. Andrew Jaffe</a> at Imperial College London, where they continued their work on Bayesian methods in radio astronomy. Andrew later became one of his PhD supervisors at Imperial.</p>

### Greece

{% include image.html url="/images/workshops/europe/cosmo21-chania-2016.webp" caption="COSMO21 workshop, Chania, 2016" width=390 align="right" %}

<p align="justify">In May 2016, he attended the <a href="https://cosmo21.cosmostat.org/">COSMO21</a> workshop, Statistical Challenges in 21st Century Cosmology, held in Chania, Crete, immediately after the <a href="https://ada.cosmostat.org/">ADA8</a> Astronomical Data Analysis Summer School, which covered Bayesian methods and sparsity. It was at COSMO21 that he first met Prof. Alan Heavens, who later supervised his PhD at Imperial.</p>

<p align="justify">The conference included talks and a poster session, and the prize for best poster went to a machine learning project. In the closing session, it was agreed that the next summer school would include a dedicated tutorial on machine learning.</p>

### Spain

{% include image.html url="/images/workshops/europe/valencia-2018.webp" caption="Valencia, 2018" width=400 align="left" %}

<p align="justify">In May 2018, he returned to the COSMO21 series, this time in Valencia, where the conference was held together with the <a href="https://ada.cosmostat.org/">ADA IX</a> summer school from 20 to 25 May. The summer school was hands-on, introducing researchers to modern data analysis tools, including machine learning, Bayesian statistics and Python, in preparation for the very large datasets expected from the next generation of astronomical surveys.</p>

<p align="justify">The <a href="https://cosmo21.cosmostat.org/">COSMO21</a> conference that followed brought together researchers working where statistics, machine learning and cosmology meet. Several talks showed how deep learning was beginning to be used to analyse maps of the Universe and to classify astronomical objects, reflecting the growing role of machine learning in the field.</p>

### France

{% include image.html url="/images/workshops/europe/les-houches-2015.webp" caption="Astrostatistics school, Les Houches, 2015" width=400 align="right" %}

<p align="justify">In 2015, he attended the <a href="https://stat4astro2015.sciencesconf.org/">School of Astrostatistics</a> at the École de Physique des Houches, in the French Alps near Chamonix, which has hosted physics schools since 1951. The school focused on clustering and classification, with the aim of bridging the gap between astronomers and statisticians, a long-standing topic of debate in the astronomy community.</p>

<p align="justify">The programme included talks and tutorials on Bayesian statistics and machine learning in R. The group also visited the summit of the Aiguille du Midi, overlooking the Mont Blanc massif.</p>

### Croatia

{% include image.html url="/images/workshops/europe/porec-2023.webp" caption="Poreč, Croatia, 2023" width=400 align="left" %}

<p align="justify">From 25 to 29 September 2023, he attended <a href="https://www.lssteu5.eu/">LSST@Europe5</a>, "Towards LSST Science, Together!", held in Poreč on Croatia's Istrian coast. The meeting brought together European researchers preparing for the Legacy Survey of Space and Time (LSST) at the Vera C. Rubin Observatory.</p>

<p align="justify">The programme covered the status of the observatory's construction, its data products and timelines, and Europe's contributions to the survey, with the aim of developing LSST science collaboratively ahead of the start of observations.</p>

## North America

### United States

{% include image.html url="/images/workshops/north-america/chicago-2024.jpg" caption="Chicago, 2024" width=420 align="right" %}

<p align="justify">In October 2024, he travelled to Chicago to give a talk at the <a href="https://lsstdiscoveryalliance.org/lsst-discovery-alliance-programs/catalyst-fellowship/lsst-da-catalyst-symposium-2024/">LSST Discovery Alliance Catalyst Symposium</a>, held at CIERA, Northwestern University, from 21 to 23 October. The symposium introduces the research of the Catalyst Fellows to the wider astrophysics community and strengthens connections within the Rubin LSST community. During the same visit, he also gave a talk at Benedictine University, where he was co-supervising two students on their final-year undergraduate projects.</p>

{% include image.html url="/images/workshops/north-america/flatiron-new-york-2024.webp" caption="Flatiron Institute, New York, 2024" width=420 align="left" %}

<p align="justify">From Chicago, he travelled to New York to visit Dr Francisco Villaescusa-Navarro at the <a href="https://www.simonsfoundation.org/flatiron/center-for-computational-astrophysics/">Center for Computational Astrophysics</a> (CCA), part of the <a href="https://www.simonsfoundation.org/flatiron/">Flatiron Institute</a>, the research division of the Simons Foundation. Francisco's research uses machine learning to extract cosmological information from simulations, including the Quijote and CAMELS simulation suites.</p>

<p align="justify">During the visit, he gave a talk at the CCA on using normalising flows for joint cosmological analyses, based on his work on <a href="{% post_url 2024-01-15-emuflow-Normalising-Flows %}">emuflow</a>. The approach learns each experiment's posterior distribution with a normalising flow, so that constraints from different surveys can be combined quickly, without re-running their expensive likelihoods.</p>
