import * as React from "react"
import { render } from "storyblok-rich-text-react-renderer"
import { sbEditable } from "@storyblok/storyblok-editable";
import DynamicComponent from "./dynamicComponent"

const Teaser = ({ story }) => {
  const body = story &&
    story.body &&
    story.body.map(childBlok => <DynamicComponent story={childBlok} key={childBlok._uid} />)
  const introText = typeof story.intro_text === 'string' ? story.intro_text : render(story.intro_text)

  return (
    <div {...sbEditable(story)}>
      <div className="bg-white-half">
        <div className="pb-6 pt-16 container mx-auto">
          <h1 class="text-6xl font-bold font-serif text-primary">{story.headline}</h1>
          <div className="text-gray-700 text-lg max-w-lg">{introText}</div>
        </div>
        <div className="container mx-auto overflow-x-scroll flex w-full my-8 snap-x">
          {body}
        </div>
      </div>
    </div>
  )
}

export default Teaser