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

const PodiumListPageTemplate = ({ data }) => {
  const {
    page: {
      title,
      lead: { lead },
      relatedContentTitle,
    },
    allContentfulPost: { posts },
  } = data

  return (
    <Layout menu="podium">
      <Seo title={title} description={lead} />
      <Hero title={title} lead={lead} color="ocean" />
      <Content>
        <SectionTitle title={relatedContentTitle} align="right" color="ocean" />
        <ContentList type="full">
          {posts
            .filter((item) => !!item.content)
            .map((item) => (
              <ContentBox
                title={item.title}
                type="full"
                color="ocean"
                buttonText="Tovább"
                buttonLink={`/podium/${item.slug}`}
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

export default PodiumListPageTemplate

export const pageQuery = graphql`
  query PodiumListPageQuery {
    page: contentfulPage(slug: { eq: "podium" }) {
      lead {
        lead
      }
      title
      relatedContentTitle
    }
    allContentfulpodium(sort: { fields: date, order: DESC }) {
      posts: nodes {
        date
        slug
        title
        content {
          raw
        }
        image: podiumPicture {
          gatsbyImage(width: 488, placeholder: BLURRED, cropFocus: CENTER)
        }
      }
    }
  }
`