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

const GimiseletPageTemplate = ({ data }) => {
  const {
    page: {
      title,
      lead: { lead },
      relatedContentTitle,
    },
    allContentfulGimiselet: { gimiselet },
  } = data

  return (
    <Layout menu="highschool">
      <Seo title={title} description={lead} />
      <Hero title={title} lead={lead} color="pink" />
      <Content>
        <SectionTitle title={relatedContentTitle} align="right" color="peach" />
        <ContentList type="full">
          {eloadasok
            .filter((item) => !!item.content)
            .map((item) => (
              <ContentBox
                title={item.title}
                type="full"
                color="brick"
                buttonText="Tovább"
                buttonLink={`/gimiselet/${item.slug}`}
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

export default GimiseletPageTemplate

export const pageQuery = graphql`
  query EletkepPageQuery {
    page: contentfulPage(slug: { eq: "gimiselet" }) {
      
      lead {
        lead
      }
      
      title
      
      relatedContentTitle

    }
    allContentfulEletkep(sort: { fields: date, order: DESC }) {
      eletkep: nodes {
        date
        slug
        title
        content {
          raw
        }
        image: eletkepPicture {
          gatsbyImage(width: 488, placeholder: BLURRED, cropFocus: CENTER)
        }
      }
    }
  }
`
