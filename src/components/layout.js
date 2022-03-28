import * as React from "react"
import PropTypes from "prop-types"
import Navigation from './navigation'
import Footer from './Footer'
import { useStaticQuery, graphql } from "gatsby"

const Layout = ({ children, location }) => {
  const { settings } = useStaticQuery(graphql`
    query Settings {
      settings: allStoryblokEntry(filter: {field_component: {eq: "settings"}}) {
        edges {
          node {
            name
            full_slug
            content
          }
        }
      }
    }
  `)

  let { pathname } = location
  let language = pathname.split("/")[1].replace('/', '')
  let activeLanguage = ['de', 'en'].includes(language) ? language : 'en'
  let correctSetting = settings.edges.filter(edge => edge.node.full_slug.indexOf(activeLanguage) > -1)
  let hasSetting = correctSetting && correctSetting.length ? correctSetting[0].node : {}
  let content = typeof hasSetting.content === 'string' ? JSON.parse(hasSetting.content) : hasSetting.content
  let parsedSetting = Object.assign({}, content, { content: content })

  return (
    <div className="bg-gray-300">
      <Navigation settings={parsedSetting} lang={activeLanguage} />
      <main>
        {children}
      </main>
      <Footer />
    </div>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
