import React from "react"
import { sbEditable } from "@storyblok/storyblok-editable";
import { render } from "storyblok-rich-text-react-renderer"
import { useStaticQuery, graphql } from "gatsby"
// import DynamicComponent from './dynamicComponent'

const BlogPost = ({ blok }) => {
  if (typeof blok.node.content === "string") blok.node.content = JSON.parse(blok.node.content)
  console.log(blok)

  // const relatedArticles = blok.node.content.related[0].articles[0]
  // console.log(relatedArticles)
  // const related = relatedArticles && relatedArticles.length ? (<DynamicComponent content={relatedArticles} key={relatedArticles._uid} />) : null

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

  let thisAuthor = authors.edges.filter(({ node }) => node.uuid === blok.node.content.author)
  let authorContent = thisAuthor.length ? JSON.parse(thisAuthor[0].node.content) : {};

  // filter one blogpost from blok (full_slug?) -> render only matched blogpost

  return (
    <div {...sbEditable(blok)}>
      <div className="bg-white-half w-full">
        <div className="max-w-3xl mx-auto text-center pt-20 flex flex-col items-center">
          <h1 className="text-5xl font-bold font-serif text-primary tracking-wide">
            {blok.node.content.title}
          </h1>
          <p className="text-gray-500 text-lg max-w-lg">{blok.node.content.intro}</p>
          <img className="w-full bg-gray-300 my-16" src={blok.node.content.image} alt={blok.node.content.title} />
        </div>
      </div>
      <div className="max-w-3xl mx-auto text-center pt-20 flex flex-col items-center">
        <div className="leading-relaxed text-xl text-left text-gray-800 drop-cap">
          {render(blok.node.content.long_text)}
        </div>

        <div className="py-16 max-w-sm p-2 sm:p-10 text-center flex flex-col">
          <div className="p-4 bg-primary rounded-full mx-auto">
          </div>
          <div className="px-6 py-4">
            <div className="font-bold text-xl my-4">{authorContent.name}</div>
            <p className="text-base text-gray-600">{authorContent.description}</p>
          </div>
        </div>

        {/* {related} */}
      </div>
    </div>
  )
}

export default BlogPost