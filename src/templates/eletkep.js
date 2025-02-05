import Content from '../components/content'
import Hero from '../components/hero'
import Layout from '../components/layout'
import Quote from '../components/quote'
import Seo from '../components/seo'
import * as richText from '../richtext.module.scss'
import richTextImage, { createImageIndexer } from '../utils/richTextImage'
import { BLOCKS } from '@contentful/rich-text-types'
import classNames from 'classnames'
import { graphql } from 'gatsby'
import { GatsbyImage } from 'gatsby-plugin-image'
import { renderRichText } from 'gatsby-source-contentful/rich-text'
import React from 'react'

const EletkepPageTemplate = ({ data }) => {
  const {
    contentfulEletkep: { lead, title: eletkepTitle, content, eletkepPicture },
  } = data

  const imageIndexer = createImageIndexer()

  const richTextOptions = {
    renderNode: {
      [BLOCKS.EMBEDDED_ASSET]: richTextImage(imageIndexer),
      [BLOCKS.QUOTE]: (node, children) => <Quote>{children}</Quote>,
    },
  }

  return (
    <Layout menu="highschool">
      <Seo title={eletkepTitle} description={lead?.lead ?? ''} />
      <Hero title={eletkepTitle} lead={lead?.lead ?? ' '} color="gold" />
      <Content>
        <div className={classNames(richText.content, richText.contentPage)}>
          {eletkepPicture && (
            <GatsbyImage
              image={eletkepPicture.gatsbyImage}
              alt={eletkepPicture.alt}
              title={eletkepPicture.title}
              className={classNames(richText.image, richText.image_left)}
            />
          )}
          {renderRichText(content, richTextOptions)}
        </div>
      </Content>
    </Layout>
  )
}

export default EletkepPageTemplate

export const pageQuery = graphql`
  query EletkepBySlug($slug: String!) {
    contentfulEletkep(slug: { eq: $slug }) {
      lead {
        lead
      }
      content {
        raw
        references {
          ... on ContentfulAsset {
            contentful_id
            __typename
            gatsbyImage(width: 450, placeholder: BLURRED)
            description
            title
          }
        }
      }
      slug
      title
      eletkepPicture {
        gatsbyImage(width: 450, placeholder: BLURRED)
        title
        alt: description
      }
    }
  }
`
