import * as React from "react"
import { StoryblokComponent, storyblokEditable } from "@storyblok/react";

const Grid = ({ blok }) => {
  return (
    <div {...storyblokEditable(blok)}>
      <ul className="flex flex-wrap p-8 bg-white container mx-auto">
        {blok.columns.map(blok => (
          <li key={blok._uid} className="flex-auto px-2">
            <StoryblokComponent blok={blok} />
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Grid