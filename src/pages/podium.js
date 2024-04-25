import Content from '../components/content'
import ContentBox from '../components/content-box'
import ContentList from '../components/contentlist'
import Hero from '../components/hero'
import Layout from '../components/layout'
import SectionTitle from '../components/section-title'
import Seo from '../components/seo'
import { documentToPlainTextString } from '@contentful/rich-text-plain-text-renderer'
import { graphql } from 'gatsby'
import React from 'react'
import truncate from 'truncate'

const PodiumPageTemplate = ({ data }) => {
  const {
    page: {
      title,
      lead: { lead },
      relatedContentTitle,
    },
    allContentfulEloadas: { posts },
  } = data

  return (
    <Layout menu="podium">
      <Seo title={title} description={lead} />
      <Hero title={title} lead={lead} color="gold" />
      <Content>
        <SectionTitle title={relatedContentTitle} align="right" color="gold" />
        <ContentList type="full">
          {posts
            .filter((item) => !!item.content)
            .map((item) => (
              <ContentBox
                title={item.title}
                type="full"
                color="gold"
                buttonText="Tovább"
                buttonLink={`/eloadasok/${item.slug}`}
                key={item.slug}
                image={item.image}
              >
                {truncate(
                  documentToPlainTextString(JSON.parse(item.content.raw)),
                  740
                )}
              </ContentBox>
            ))}
        </ContentList>
      </Content>
    </Layout>
  )
}

export default PodiumPageTemplate

export const pageQuery = graphql`
  query EloadasPageQuery {
    page: contentfulPage(slug: { eq: "podium" }) {
      
      lead {
        lead
      }
      
      title
      
      relatedContentTitle

    }
    allContentfulEloadas(sort: { fields: date, order: DESC }) {
      podium: nodes {
        date
        slug
        title
        content {
          raw
        }
        image: eloadasPicture {
          gatsbyImage(width: 488, placeholder: BLURRED, cropFocus: CENTER)
        }
      }
    }
  }
`
