import React from "react"
import { sbEditable } from "@storyblok/storyblok-editable";
import { render } from "storyblok-rich-text-react-renderer"
// import { useStaticQuery, graphql } from "gatsby"
import Author from "./author"

const BlogPost = ({ story }) => {
  // if (typeof blok.node.content === "string") blok.node.content = JSON.parse(blok.node.content)
  console.log(story)

  // const { posts } = useStaticQuery(graphql`
  //     {
  //       posts: allStoryblokEntry(filter: {field_component: {eq: "blogpost"}}) {
  //         edges {
  //           node {
  //             id
  //             uuid
  //             name
  //             slug
  //             field_component
  //             full_slug
  //             content
  //           }
  //         }
  //       }
  //     }
  //   `)

  // let thisPost = posts.edges.filter(({ node }) => {
  //   if (typeof node.content === "string") node.content = JSON.parse(node.content)
  //   return node.id === blok.node.id
  // })
  // let postContent = thisPost.length ? thisPost[0].node.content : {};

  return (
    <div {...sbEditable(story)}>
      <div className="bg-white-half w-full">
        <div className="max-w-3xl mx-auto text-center pt-20 flex flex-col items-center">
          <h1 className="text-5xl font-bold font-serif text-primary tracking-wide">
            {story.title}
          </h1>
          <p className="text-gray-500 text-lg max-w-lg">{story.intro}</p>
          <img className="w-full bg-gray-300 my-16" src={story.image} alt={story.title} />
        </div>
      </div>
      <div className="max-w-3xl mx-auto text-center pt-20 flex flex-col items-center">
        <div className="leading-relaxed text-xl text-left text-gray-800 drop-cap">
          {render(story.long_text)}
        </div>

        <div className="py-16 max-w-sm p-2 sm:p-10 text-center flex flex-col">
          <div className="p-4 bg-primary rounded-full mx-auto">
          </div>
          <Author story={story} />
        </div>
      </div>
    </div>
  )
}

export default BlogPost