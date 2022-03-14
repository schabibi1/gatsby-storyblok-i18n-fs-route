import * as React from "react"
import { graphql } from 'gatsby'
import useStoryblok from "../lib/storyblok"
import { sbEditable } from "@storyblok/storyblok-editable"
import DynamicComponent from "../components/dynamicComponent"
// import rewriteSlug from '../lib/rewriteSlug'

import Layout from "../components/layout"

export default function StoryblokEntry({ data, location }) {
  // let postData = data.posts
  // postData = useStoryblok(postData.edges, location)

  let story = data.storyblokEntry
  story = useStoryblok(story, location)

  // const fixedSlugs = postData.forEach((entry) => {
  //   const slug = rewriteSlug(entry.node.full_slug)
  //   const pagePath = `/${slug}`
  //   const pageArr = pagePath.split()
  //   return pageArr
  // })
  // console.log(postData)

  const Templates = () => {
    if (story.name === 'Home') {
      return story.content.body.map(story => <DynamicComponent story={story} key={story._uid} />)
    }
    if (story.name !== 'Home') {
      return <DynamicComponent story={story.content} key={story.content._uid} />
    }
  }

  return (
    <Layout location={location}>
      <div {...sbEditable(story.content)}>
        {/* {fixedSlugs} */}
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
