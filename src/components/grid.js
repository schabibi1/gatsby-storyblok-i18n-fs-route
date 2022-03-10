import * as React from "react"
import DynamicComponent from "./dynamicComponent"
import { sbEditable } from '@storyblok/storyblok-editable'

const Grid = ({ blok }) => {
  return (
    <div {...sbEditable(blok)}>
      <ul className="flex flex-wrap p-8 bg-white container mx-auto">
        {blok.columns.map(blok => (
          <li key={blok._uid} className="flex-auto px-2">
            <DynamicComponent blok={blok} />
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Grid