---
layout: default
title: Archive
description: All posts sorted by tags
permalink: archive/
redirect_from: [archive/tags/, tags/]
---


# Archive

All blog posts sorted by tags.

<div class="categories">
{% assign sorted_tags = site.tags | reverse %}
  {% for tag in sorted_tags %}

           <h3>{{ tag[0] }}</h3>

            <ul class="category-list">
               {% for posts in tag %}
                {% for post in posts %}
                  {% if post.url %}
                    <li>
                      <a href="{{ post.url }}">
                        <time>{{ post.date | date: "%B %-d, %Y" }}</time>
                        - {{ post.title }}
                      </a>
                    </li>
                  {% endif %}
                {% endfor %}
              {% endfor %}
           </ul>
  {% endfor %}
</div>

