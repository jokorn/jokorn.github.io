---
layout: default
title: Archive
description: This is my projects page

---

## Categories

All blog posts sorted by category.

<div class="categories">
  {% for category in site.categories %}

     <h3>{{ category | first | capitalize }}</h3>

            <ul class="category-list">
               {% for posts in category %}
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

