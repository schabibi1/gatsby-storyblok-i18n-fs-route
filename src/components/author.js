import React from "react"
import { storyblokEditable } from "@storyblok/react";
import { useStaticQuery, graphql } from "gatsby"

const Author = ({ blok }) => {
  const { authors } = useStaticQuery(graphql`
      {
        authors: allStoryblokEntry(filter: {field_component: {eq: "author"}}) {
          edges {
            node {
              name
              uuid
              content
            }
          }
        }
      }
    `)

  let thisAuthor = authors.edges.filter(({ node }) => node.uuid === blok.author)
  let authorContent = thisAuthor.length ? JSON.parse(thisAuthor[0].node.content) : {};

  return (
    <div {...storyblokEditable(blok)}>
      <div className="px-6 py-4">
        <div className="font-bold text-xl my-4">{authorContent.name}</div>
        <p className="text-base text-gray-600">{authorContent.description}</p>
      </div>
    </div>
  )
}

export default Author