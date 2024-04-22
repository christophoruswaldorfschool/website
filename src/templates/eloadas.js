import Content from '../components/content'
import Hero from '../components/hero'
import Layout from '../components/layout'
import Quote from '../components/quote'
import Seo from '../components/seo'
import PodiumListPageTemplate from '../pages/podium'
import * as richText from '../richtext.module.scss'
import richTextImage, { createImageIndexer } from '../utils/richTextImage'
import { BLOCKS } from '@contentful/rich-text-types'
import classNames from 'classnames'
import { graphql } from 'gatsby'
import { GatsbyImage } from 'gatsby-plugin-image'
import { renderRichText } from 'gatsby-source-contentful/rich-text'
import React from 'react'

const PodiumPageTemplate = ({ data }) => {
  const {
    contentfulEloadas: { lead, title: EloadasTitle, content, EloadasPicture },
  } = data

  const imageIndexer = createImageIndexer()

  const richTextOptions = {
    renderNode: {
      [BLOCKS.EMBEDDED_ASSET]: richTextImage(imageIndexer),
      [BLOCKS.QUOTE]: (node, children) => <Quote>{children}</Quote>,
    },
  }

  return (
    <Layout menu="podium">
      <Seo title={eloadasTitle} description={lead?.lead ?? ''} />
      <Hero title={eloadasTitle} lead={lead?.lead ?? ' '} color="ocean" />
      <Content>
        <div className={classNames(richText.content, richText.contentPage)}>
          {eloadasPicture && (
            <GatsbyImage
              image={eloadasPicture.gatsbyImage}
              alt={eloadasPicture.alt}
              title={eloadasPicture.title}
              className={classNames(richText.image, richText.image_left)}
            />
          )}
          {renderRichText(content, richTextOptions)}
        </div>
      </Content>
    </Layout>
  )
}

export default PodiumListPageTemplate

export const pageQuery = graphql`
  query PodiumPostBySlug($slug: String!) {
    contentfulEloadas(slug: { eq: $slug }) {
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
      eloadasPicture {
        gatsbyImage(width: 450, placeholder: BLURRED)
        title
        alt: description
      }
    }
  }
`