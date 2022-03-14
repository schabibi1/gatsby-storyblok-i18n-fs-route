import * as React from "react"
import DynamicComponent from "./dynamicComponent"
import { sbEditable } from '@storyblok/storyblok-editable'

const Grid = ({ story }) => {
  return (
    <div {...sbEditable(story)}>
      <ul className="flex flex-wrap p-8 bg-white container mx-auto">
        {story.columns.map(story => (
          <li key={story._uid} className="flex-auto px-2">
            <DynamicComponent story={story} />
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Grid