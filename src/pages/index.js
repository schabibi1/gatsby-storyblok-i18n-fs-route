import * as React from "react"

import { graphql } from 'gatsby'
import { sbEditable } from '@storyblok/storyblok-editable'
import DynamicComponent from "../components/dynamicComponent"
import useStoryblok from "../lib/storyblok"

import Layout from "../components/layout"
import Seo from "../components/seo"

const IndexPage = ({ data, location }) => {
  let story = data.storyblokEntry
  story = useStoryblok(story, location)
  console.log(data)

  const components = story.content.body.map(story => {
    return (<DynamicComponent story={story} key={story._uid} />)
  })

  return (
    <Layout location={location}>
      <div {...sbEditable(story.content)}>
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
    }
  }
`