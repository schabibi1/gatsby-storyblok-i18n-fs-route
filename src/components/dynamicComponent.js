import React from 'react'
import { sbEditable } from '@storyblok/storyblok-editable'
import Teaser from './teaser'
import Grid from './grid'
import Feature from './feature'
import BlogPost from './blogPost'
import Slide from './slide'
import ArticleTeaser from './articleTeaser'
import FeaturedArticles from './featuredArticles'
import PostsList from './postsList'

const Components = {
  'teaser': Teaser,
  'grid': Grid,
  'feature': Feature,
  'blogpost': BlogPost,
  'slide': Slide,
  'article-teaser': ArticleTeaser,
  'featured-articles': FeaturedArticles,
  'posts-list': PostsList
}
// blok -> page
// story -> blogpost
const DynamicComponent = ({ story }) => {
  // console.log(blok)
  console.log(story)
  // if (typeof Components[blok.component] || Components[story.component] !== 'undefined') {
  //   const Component = Components[blok.component]
  //   return <div {...sbEditable(blok)}><Component blok={blok} /></div>
  // }

  if (typeof Components[story.component] !== 'undefined') {
    const Component = Components[story.component]
    return <div {...sbEditable(story)}><Component story={story} /></div>
  }
  return <p>The component <strong>{story.component}</strong> has not been created yet.</p>
}

export default DynamicComponent