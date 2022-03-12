import * as React from "react"
import { graphql } from 'gatsby'
import useStoryblok from "../lib/storyblok"
import { sbEditable } from "@storyblok/storyblok-editable"
import DynamicComponent from "../components/dynamicComponent"
import rewriteSlug from '../lib/rewriteSlug'

import Layout from "../components/layout"

export default function StoryblokEntry({ data, location }) {
  let postData = data.posts
  postData = postData.edges

  let pageData = data.pages
  pageData = pageData.edges

  let story = data.storyblokEntry
  story = useStoryblok(story, location)

  const fixedSlugs = postData.forEach((entry) => {
    const slug = rewriteSlug(entry.node.full_slug)
    const pagePath = `/${slug}`
    const pageArr = pagePath.split()
    return pageArr
  })

  const Templates = () => {
    if (story.name == 'Home') {
      // pageData.forEach((edge) => {
      //   const page = edge.node.field_component
      //   return page
      // })
      const pageComponents = story.content.body.map(blok => {
        return (<DynamicComponent blok={blok} key={blok._uid} />)
      })
      return <>{pageComponents}</>
    } else if (story.name != 'Home') {
      // postData.forEach((edge) => {
      //   const blogpost = edge.node.field_component
      //   return blogpost
      // })
      const blogpostComponent = postData.map(blok => {
        return (<DynamicComponent blok={blok} key={blok._uid} />)
      })
      return <>{blogpostComponent}</>
    }
  }

  return (
    <Layout location={location}>
      <div {...sbEditable(story.content)}>
        {fixedSlugs}
        <Templates story={story.content} key={story.content._uid} />
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
    },
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
    },
    pages: allStoryblokEntry(filter: {field_component: {eq: "page"}}) {
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
