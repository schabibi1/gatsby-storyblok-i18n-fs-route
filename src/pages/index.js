import * as React from "react"

import { graphql } from 'gatsby'
import config from '../../gatsby-config'

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
import Seo from "../components/seo"

const sbConfig = config.plugins.find((item) => item.resolve === 'gatsby-source-storyblok')

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

const IndexPage = ({ data, location }) => {
  let story = data.storyblokEntry
  story = useStoryblok(story)

  const components = story.content.body.map(blok => (<StoryblokComponent blok={blok} key={blok._uid} />))

  return (
    <Layout location={location}>
      <div {...storyblokEditable(story.content)}>
        <Seo title="Home" />
        {components}
      </div>
    </Layout>
  )
}

export default IndexPage

export const query = graphql`
  query HomeQuery {
    storyblokEntry(full_slug: { eq: "en/" }) {
      content
      name
      id
    }
  }
`