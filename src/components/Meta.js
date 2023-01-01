import React from 'react'
import { Helmet } from 'react-helmet'

const Meta = ({ title, description, keywords }) => {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description}></meta>
      <meta name="keywords" content={keywords}></meta>
    </Helmet>
  )
}

Meta.defaultProps = {
  title: 'TechPoint | Home',
  description: 'We sell the best Products for cheap.',
  keywords: 'Technology, Tech, electronics, buy electronics',
}

export default Meta
