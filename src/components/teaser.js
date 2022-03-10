import * as React from "react"
import { render } from "storyblok-rich-text-react-renderer"
import { sbEditable } from "@storyblok/storyblok-editable";
import DynamicComponent from "./dynamicComponent"

const Teaser = ({ blok }) => {
  const body = blok &&
    blok.body &&
    blok.body.map(childBlok => <DynamicComponent blok={childBlok} key={childBlok._uid} />)
  const introText = typeof blok.intro_text === 'string' ? blok.intro_text : render(blok.intro_text)

  return (
    <div {...sbEditable(blok)}>
      <div className="bg-white-half">
        <div className="pb-6 pt-16 container mx-auto">
          <h1 class="text-6xl font-bold font-serif text-primary">{blok.headline}</h1>
          <div className="text-gray-700 text-lg max-w-lg">{introText}</div>
          <div className="container mx-auto overflow-x-scroll flex w-full my-8 snap-x">
            <div className="snap-start w-full flex-shrink-0 bg-gray-300">
              <img src={blok.image.filename} alt={blok.image.alt} />
            </div>
          </div>
        </div>
        <div className="container mx-auto overflow-x-scroll flex w-full my-8 snap-x">
          {body}
        </div>
      </div>
    </div>
  )
}

export default Teaser