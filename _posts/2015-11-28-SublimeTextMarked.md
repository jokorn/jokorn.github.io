---
title: Marked2 and Pandoc Citations
description: How to make Marked work with Pandoc citations and crossreferences.
tags: [Sublime Text, Marked, Markdown, Pandoc]
excerpt: 
image: marked2-logo.png
layout: post
published: false
---

{% include image.html url="marked2-logo.png" caption="" %}

[Marked2](http://marked2app.com/) is a great app for previewing markdown files and exporting them to various formats. It is created by [Brett Terpstra](http://brettterpstra.com) and be sure to check out his site for other great applications and scripts.

Marked2 works great with Sublime Text 3 (my new favourite text editor). Simply install [the marked package](https://github.com/icio/sublime-text-marked) and press CMD+SHIFT+M to launch your current markdown file in Marked2.

This worked great for simple blog posts. However, when I'm writing academic documents I write in markdown markup and include references with pandoc-citeref and cross-references with pandoc-crossref. I then use Pandoc to convert these documents to PDF or DOCX or whatever. Marked2 naturally doesn't parse the syntax for pandoc-citeref and pandoc-crossref out of the box and the result looks like this:

{% highlight html %}
Pre-SMA is believed to resolve response conflicts [@rushworth2008b] by inhibiting inappropriate actions and facilitating appropriate actions [@hikosaka2010b], also when the response conflict is triggered by switching S-R mappings [@crone2006a].
{% endhighlight %}

After preprocessing:

{% highlight html %}

<p>Pre-SMA is believed to resolve response conflicts <span class="citation">(Rushworth 2008)</span> by inhibiting inappropriate actions and facilitating appropriate actions <span class="citation">(Hikosaka and Isoda 2010)</span>, also when the response conflict is triggered by switching S-R mappings <span class="citation">(Crone et al. 2006)</span>.</p>
<div id="refs" class="references">
<div id="ref-crone2006a">
<p>Crone, Eveline A, Carter Wendelken, Sarah E Donohue, and Silvia A Bunge. 2006. “Neural evidence for dissociable components of task-switching.” <em>Cerebral Cortex (New York, N.Y. : 1991)</em> 16 (4): 475–86. doi:<a href="http://doi.org/10.1093/cercor/bhi127">10.1093/cercor/bhi127</a>.</p>
</div>
<div id="ref-hikosaka2010b">
<p>Hikosaka, O, and M Isoda. 2010. “Switching from automatic to controlled behavior: cortico-basal ganglia mechanisms.” <em>Trends Cogn Sci</em> 14 (4): 154–61. doi:<a href="http://doi.org/10.1016/j.tics.2010.01.006">10.1016/j.tics.2010.01.006</a>.</p>
</div>
<div id="ref-rushworth2008b">
<p>Rushworth, M F. 2008. “Intention, choice, and the medial frontal cortex.” <em>Ann N Y Acad Sci</em> 1124: 181–207. doi:<a href="http://doi.org/10.1196/annals.1440.014">10.1196/annals.1440.014</a>.</p>
</div>
</div>

{% endhighlight %}
