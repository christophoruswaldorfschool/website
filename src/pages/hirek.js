import Content from '../components/content'
import ContentBox from '../components/content-box'
import ContentList from '../components/contentlist'
import Hero from '../components/hero'
import Layout from '../components/layout'
import SectionTitle from '../components/section-title'
import Seo from '../components/seo'
import { BLOCKS, INLINES } from '@contentful/rich-text-types'
import { graphql } from 'gatsby'
import { renderRichText } from 'gatsby-source-contentful/rich-text'
import React from 'react'

const NewsListPageTemplate = ({ data }) => {
  const {
    page: {
      title,
      lead: { lead },
      relatedContentTitle,
    },
    allContentfulNews: { news },
  } = data

  const richTextOptions = {
    renderNode: {
      [INLINES.ENTRY_HYPERLINK]: (node, children) => {
        return <span></span>
      },
    },
  }

  return (
    <Layout menu="">
      <Seo title={'Hírek, aktualitások'} />
      <Hero title={'Hírek, aktualitások'} lead={' '} color="pink" />
      <Content>
        <ContentList type="full">
          {news
            .filter((item) => !!item.body && !!item.lead)
            .map((item) => (
              <ContentBox
                title={item.title}
                type="full"
                color="peach"
                buttonText="Tovább"
                buttonLink={`/hirek/${item.slug}`}
                key={item.slug}
              >
                {item?.lead?.lead ?? renderRichText(item.body, richTextOptions)}
              </ContentBox>
            ))}
        </ContentList>
      </Content>
    </Layout>
  )
}

export default NewsListPageTemplate

export const pageQuery = graphql`
  query NewsListPageQuery {
    page: contentfulPage(slug: { eq: "allasok" }) {
      lead {
        lead
      }
      title
      relatedContentTitle
    }
    allContentfulNews(
      sort: { fields: date, order: ASC }
      filter: { title: { ne: null }, body: { raw: { ne: null } } }
    ) {
      news: nodes {
        slug
        title
        date
        lead {
          lead
        }
        body {
          raw
          references {
            ... on ContentfulAsset {
              contentful_id
              __typename
              gatsbyImage(width: 450, placeholder: BLURRED)
              description
              title
            }
            ... on ContentfulImageGallery {
              slug
              internal {
                type
              }
            }
          }
        }
      }
    }
  }
`
