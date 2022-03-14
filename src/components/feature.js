import * as React from "react"
import { sbEditable } from "@storyblok/storyblok-editable";
import DynamicIcon from './icons/DynamicIcon'

const Feature = ({ story }) => {
  return (
    <div {...sbEditable(story)}>
      <div className="py-16 max-w-sm p-2 sm:p-10 text-center flex flex-col items-center">
        <DynamicIcon type={story.icon} />
        <div className="px-6 py-4">
          <div className="font-bold text-xl my-4">{story.name}</div>
          <p className="text-base text-gray-600">
            {story.description}
          </p>
        </div>
      </div>
    </div>
  )
}

export default Feature