import * as React from "react"
import { graphql } from 'gatsby'

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
// import rewriteSlug from '../lib/rewriteSlug'

import Layout from "../components/layout"

storyblokInit({
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
  // let postData = data.posts
  // postData = useStoryblok(postData.edges, location)

  let story = data.storyblokEntry
  story = useStoryblok(story)

  // const fixedSlugs = postData.forEach((entry) => {
  //   const slug = rewriteSlug(entry.node.full_slug)
  //   const pagePath = `/${slug}`
  //   const pageArr = pagePath.split()
  //   return pageArr
  // })
  // console.log(postData)

  const Templates = () => {
    if (story.name === 'Home') {
      return story.content.body.map(blok => <StoryblokComponent blok={blok} key={blok._uid} />)
    }
    return (story.name !== 'Home' ? <StoryblokComponent blok={story.content} key={story.content._uid} /> : null)
  }

  return (
    <Layout location={location}>
      <div {...storyblokEditable(story.content)}>
        {/* {fixedSlugs} */}
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
    posts: allStoryblokEntry(filter: {field_component: {eq: "blogpost"}}) {
      edges {
        node {
          id
          name
          slug
          field_component
          full_slug
          content
        }
      }
    }
  }
`

export async function config() {
  return () => {
    return {
      defer: true,
    }
  }
}