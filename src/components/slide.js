import React from 'react'
import { sbEditable } from "@storyblok/storyblok-editable";

const Slider = ({ story }) => {
  return (
    <div {...sbEditable(story)}>
      <div className="snap-start w-full flex-shrink-0 bg-gray-300">
        <img className="object-cover w-full h-full" src={story.image} id={story._uid} />
      </div>
    </div>
  )
}

export default Slider
