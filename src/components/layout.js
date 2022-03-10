import * as React from "react"
import PropTypes from "prop-types"
import Navigation from './navigation'
import Footer from './Footer'

const Layout = ({ children }) => {
  return (
    <div className="bg-gray-300">
      <Navigation />
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
