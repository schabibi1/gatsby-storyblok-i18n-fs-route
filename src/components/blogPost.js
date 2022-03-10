import * as React from "react"
import { render } from "storyblok-rich-text-react-renderer"
import { sbEditable } from "@storyblok/storyblok-editable"

const BlogPost = ({ blok }) => {
  const longText = typeof blok.long_text === 'string' ? blok.long_text : render(blok.long_text)

  return (
    <div {...sbEditable(blok)}>
      <div className="bg-white-half w-full">
        <div className="max-w-3xl mx-auto text-center pt-20 flex flex-col items-center">
          <h1 className="text-5xl font-bold font-serif text-primary tracking-wide">
            {blok.title}
          </h1>
          <p className="text-gray-500 text-lg max-w-lg">{blok.intro}</p>
          <img className="w-full bg-gray-300 my-16" src={blok.image.filename} alt={blok.image.alt} />
        </div>
      </div>
      <div className="max-w-3xl mx-auto text-center pt-20 flex flex-col items-center">
        <div className="leading-relaxed text-xl text-left text-gray-800 drop-cap">
          <p>{longText}</p>
        </div>
        <div className="py-16 max-w-sm p-2 sm:p-10 text-center flex flex-col">
          <div className="p-4 bg-primary rounded-full mx-auto">
          </div>
          <div className="px-6 py-4">
            <div className="font-bold text-xl my-4">{blok.author}</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default BlogPost