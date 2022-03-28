import * as React from "react"

import { graphql } from 'gatsby'
import configuration from '../../gatsby-config'

import { storyblokInit, apiPlugin, StoryblokComponent, storyblokEditable } from "@storyblok/react";
import { useStoryblok } from '../lib/storyblok'
import Teaser from '../components/teaser'
import Grid from '../components/grid'
import Feature from '../components/feature'
import BlogPost from '../components/blogPost'
import Slide from '../components/slide'
import ArticleTeaser from '../components/articleTeaser'
import FeaturedArticles from '../components/featuredArticles'
import PostsList from '../components/postsList'

import Layout from "../components/layout"

const sbConfig = configuration.plugins.find((item) => item.resolve === 'gatsby-source-storyblok')

storyblokInit({
  accessToken: sbConfig.options.accessToken,
  use: [apiPlugin],
  components: {
    teaser: Teaser,
    grid: Grid,
    feature: Feature,
    blogpost: BlogPost,
    slide: Slide,
    'article-teaser': ArticleTeaser,
    'featured-articles': FeaturedArticles,
    'posts-list': PostsList
  }
});

export default function StoryblokEntry({ data, location }) {
  let story = data.storyblokEntry
  story = useStoryblok(story)

  const Templates = () => {
    if (story.name === 'Home') {
      return story.content.body.map(blok => <StoryblokComponent blok={blok} key={blok._uid} />)
    }
    return (story.name !== 'Home' ? <StoryblokComponent blok={story.content} key={story.content._uid} /> : null)
  }

  return (
    <Layout location={location}>
      <div {...storyblokEditable(story.content)}>
        <Templates blok={story.content} key={story.content._uid} />
      </div>
    </Layout>
  )
}

export const query = graphql`
  query ($full_slug: String!) {
    storyblokEntry(full_slug: { eq: $full_slug }) {
      id
      name
      full_slug
      content
    }
  }
`

export async function config() {

  return ({ params }) => {
    return {
      defer: params.full_slug !== 'en' ? true : false,
    }
  }
}