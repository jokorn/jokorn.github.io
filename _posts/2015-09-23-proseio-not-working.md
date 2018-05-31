---
title: Why Prose.io didn’t work for me
description: I tried Prose.io for content creation but decided against it. Here's why.
tags: [Website, Prose.io]
excerpt: When I first created this blog I wanted a simple way to add new content. Ideally, so simple that even non-technical people could create content. After a lot of trial and error I had to abandon the "non-technical" part. It seems there still doesn't exist an easy GUI for creating blog posts in Jekyll -- or at least not for my setup.
image: prose-io-login.png
layout: post
published: true
---

{% include image.html url="prose-io-login.png" caption="" %}

When I first created this blog I wanted a simple way to add new content. Ideally, so simple that even non-technical people could create content. After a lot of trial and error I had to abandon the "non-technical" part. It seems there still doesn't exist an easy GUI for creating blog posts in Jekyll -- or at least not for my setup.

### Prose.io
While searching for this "GUI-blog-creation-tool" I found [Prose.io](http://prose.io/). This seemed promising. The ability to create blog posts on the web using any connected device at hand seemed like a great start. I searched the web and managed to come up with my own configuration file:

{% highlight yaml %}
prose:
  rooturl: '_posts'
  siteurl: 'http://kornholt.com'
  media: 'images'
  ignore:
    - index.md
    - _config.yml
    - /_layouts
    - /_includes
    - /_sass
    - 404.html
    - about.md
    - archive.md
    - contact.md
    - /css
    - /images
    - s3_website.yml
    - upload.sh
  metadata:
    _posts:
      - name: "description"
        field:
            element: "text"
            label: "Description"
            placeholder: "Add a short description of the post"
      - name: "layout"
        field:
          element: "hidden"
          value: "post"
      - name: "category"
        field:
          element: "text"
          label: "Category"
          placeholder: "Add a category"
      - name: "excerpt"
        field:
          element: "text"
          label: "Excerpt"
          placeholder: "Write a small excerpt (or copy paste the beginning of the post)."
      - name: "image"
        field:
          element: "text"
          label: "Image URL"
          placeholder: "Add the filename of the main image, e.g. fun-no-cat.jpg."
{% endhighlight %}

I simply added the above to my Jekyll _config.yml and while it worked okay, I still encountered some barriers.

### Metadata
With this configuration I limited the creation of new posts to the _posts directory -- great. Also the "layout field" was automatically populated, but I still needed to add a lot of metadata to the above metadata fields. This already seemed like a barrier for less technical people. Not really the fault of Prose.io -- the metadata is needed for the way I structured the website and how [Jekyll](http://jekyllrb.com/) works. 

>"It seems there still doesn't exist an easy GUI for creating blog posts in 
Jekyll."

The problem for me was, that for me the metadata is also needed in the edit screen: I manually add the title and an image at the beginning of every post. Changing back and forth between the metadata and edit screen annoyed me.

### Images
It is quite easy to add images in Prose.io using the normal markdown syntax -- you simply press a button and choose among the images located on the server. This was a problem because it means the images should already be uploaded to be available for selection in the GUI, and for displaying correctly in the preview.

Another issue (my own fault) is that I do not use the standard markdown syntax for adding images, because I want the ability to add figure captions. Instead I use an include that looks like this:

{% highlight html %}
{% raw %}
<figure class="img-class">
  <a href="{{site.url}}/images/{{include.url}}">
   <img src="{{site.url}}/images/{{include.url}}" alt="{{include.caption}}">
   </a> 

  {% if include.caption != "" %}
  <figcaption>{{include.caption}}</figcaption>
  {% endif %}
</figure> 
{% endraw %}
{% endhighlight %}

To insert an image I then use this line of code:

{% highlight liquid %}
{% raw %}
{% include image.html url="filename-of-example-image.jpg" caption="Optional caption for the example image." %}
{% endraw %}
{% endhighlight %}

This solution was inspired from this [Stack Overflow question](http://stackoverflow.com/questions/19331362/using-an-image-caption-in-markdown-jekyll). However, there is no way to add a macro or snippet to Prose.io and I could never remember my own syntax.

### Preview
The preview of the posts didn't quite work as expected. Some elements were not styled as they should be, for example blockquotes. The liquid formatting of dates also didn't work (specifically "%-d"). Minor issues but still issues. Some of the problems might be due to the fact that I'm not hosting this site on [GitHub pages](https://pages.github.com/). Which leads me to the last problem.

### Deployment
This site is hosted on [Amazon S3](https://aws.amazon.com/s3/). This means that after committing a new blog post to [GitHub](https://github.com/) from Prose.io, I had to make a pull request from my development computer and then upload to Amazon S3 -- this meant that the "use any device at hand" didn't really work for me. I'm not sure what I expected -- I was quite aware of this before I started tried out Prose.io. I thought maybe it wouldn't matter to me, but it did.

>"It might be that a lot of these issues would be solved if I simply hosted my site on GitHub pages."

### Conclusion
All of the above issues are individually quite minor and many of them inherent to the way Jekyll functions or due to the fact that Prose.io is designed to work with GitHub pages and not Amazon S3. I tried to make it work but taken together these issues started bothering me quite a lot and eventually I gave up on Prose.io. 

It might be that a lot of these issues would be solved if I simply hosted my site on GitHub pages. However, I'm starting to quite like my alternative solution which is writing locally in [Sublime Text](http://www.sublimetext.com/) and then pushing to Amazon S3. I'll soon write about my Sublime Text setup and I'll stick with this until I decide to try out GitHub pages.
