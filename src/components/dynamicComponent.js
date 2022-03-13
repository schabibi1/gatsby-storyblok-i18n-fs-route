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

const DynamicComponent = ({ blok }) => {
  console.log(blok)
  if (typeof Components[blok.component] !== 'undefined') {
    const Component = Components[blok.component]
    return (<div {...sbEditable(blok)}><Component blok={blok} /></div>)
  }
  if (typeof Components[blok.node.field_component] !== 'undefined') {
    const Component = Components[blok.node.field_component]
    return (<div {...sbEditable(blok)}><Component blok={blok} /></div>)
  }
  return (<p>The component <strong>{blok.component || blok.node.field_component}</strong> has not been created yet.</p>)
}

export default DynamicComponent