import React from 'react'
import { sbEditable } from "@storyblok/storyblok-editable";
import ArticleTeaser from './articleTeaser'

const FeaturedArticles = ({ story }) => {
  return (
    <div {...sbEditable(story)}>
      <div className="py-8 mb-6 container mx-auto text-left" key={story._uid}>
        <div className="relative">
          <h2 className="relative font-serif text-4xl z-10 text-primary">{story.title}</h2>
          <div className="absolute top-0 w-64 h-10 mt-6 -ml-4 bg-yellow-300 opacity-50" />
        </div>
        <ul className="flex">
          {story.articles.map((article) => (
            <li key={article._uid} className="pr-8 w-1/3">
              <ArticleTeaser story={article} />
            </li>
          )
          )}
        </ul>
      </div>
    </div>
  )
}

export default FeaturedArticles
