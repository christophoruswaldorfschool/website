import Content from '../components/content'
import ContentBox from '../components/content-box'
import ContentList from '../components/contentlist'
import Hero from '../components/hero'
import Layout from '../components/layout'
import SectionTitle from '../components/section-title'
import Seo from '../components/seo'
import Separator from '../components/separator'
import * as richText from '../richtext.module.scss'
import getInternalPath from '../utils/getInternalPath'
import richTextImage, {
 /* createImageIndexer,
  embedImageRenderer,*/
} from '../utils/richTextImage'
/*import * as css from './etkezes.module.scss'*/
/*import { documentToPlainTextString } from '@contentful/rich-text-plain-text-renderer'*/
import { BLOCKS } from '@contentful/rich-text-types'
import { graphql } from 'gatsby'
/*import { StaticImage } from 'gatsby-plugin-image'*/
import { renderRichText } from 'gatsby-source-contentful/rich-text'
import React from 'react'
/*import truncate from 'truncate'*/

/*const Quote = ({ children }) => {
    const data = React.Children.toArray(children)
  
    return (
      <div className={css.quote}>
        <figure>
          {data.length > 1 ? (
            <blockquote>{data.slice(0, -1)}</blockquote>
          ) : (
            <blockquote>{data.slice(0, 1)}</blockquote>
          )}
  
          {data.length > 1 && <figcaption>{data.slice(-1)}</figcaption>}
        </figure>
      </div>
    )
  } */

  const EtkezesPageTemplate = ({ data }) => {
    const {
      title,
      lead: { lead },
      relatedContentTitle,
      relatedContent,
      firstContentTitle,
      firstContent,
      secondContentTitle,
      secondContent,
      thirdContentTitle,
      thirdContent,
      /*peopleListTitle,
      peopleList,
      additionalPeopleTitle,
      additionalPeople, */
    } = data.contentfulPage

    /*const gardenParagprahIndexer = createImageIndexer()
    const gardenImageIndexer = createImageIndexer(2) */

  const introRichTextOptions = {
    renderNode: {
      [BLOCKS.EMBEDDED_ASSET]: richTextImage(),
    },
  }

  /*const gardenRichTextOptions = {
    renderNode: {
      [BLOCKS.PARAGRAPH]: (node, children, ...args) => {
        if (gardenParagprahIndexer() === 1) {
          return (
            <>
              <p>{children}</p>
              <div className={richText.image_fullwidth}>
                <StaticImage
                  src="../static/iskolakert-tamogatok.png"
                  alt="Az iskolakert támogatói"
                />
              </div>
            </>
          )
        }
        return <p>{children}</p>
      },
      [BLOCKS.EMBEDDED_ASSET]: (node) => {
        const index = gardenImageIndexer()
        let className = ''
        if (index === 1) {
          className = richText.image_fullwidth
        }
        return embedImageRenderer(node, index, className)
      },
      [BLOCKS.QUOTE]: (node, children) => <Quote>{children}</Quote>,
    },
  } */

  return (
    <Layout menu="food">
      <Seo title={title} description={lead} />
      <Hero title={title} lead={lead} color={'gold'} />
      <Content>
        {relatedContent && (
          <>
            <SectionTitle
              title={relatedContentTitle}
              align="left"
              color="gold"
              anchor="menuk"
            />

            <ContentList>
              {relatedContent
                .filter((i) => i.title && i.slug && i.lead?.lead)
                .map((item) => (
                  <ContentBox
                    title={item.title}
                    type="small"
                    color="gold"
                    buttonText="Tovább"
                    buttonLink={getInternalPath(item)}
                    key={item.slug}
                  >
                    {item.lead?.lead ?? ''}
                  </ContentBox>
                ))}
            </ContentList>

            <Separator />
          </>
        )}

        <SectionTitle
          title={firstContentTitle}
          align="left"
          color="gold"
          anchor="rendeles"
        />

        <div className={richText.content}>
          {renderRichText(firstContent, introRichTextOptions)}
        </div>

    <Separator />

        {secondContent && (
          <>
            <SectionTitle
              title={secondContentTitle}
              align="left"
              color="gold"
              anchor="adminisztracio"
            />

            <div className={richText.content}>
              {renderRichText(secondContent, introRichTextOptions)}
            </div>
          </>
        )}

    <Separator />

        {thirdContent && (
          <>
            <SectionTitle
              title={thirdContentTitle}
              align="left"
              color="gold"
              anchor="amathea"
            />

            <div className={richText.content}>
              {renderRichText(thirdContent, introRichTextOptions)}
            </div>
          </>
        )}
       
      </Content>
    </Layout>
  )

    }

    export default EtkezesPageTemplate

    export const pageQuery = graphql`
    query etkezesPageQuery {
      contentfulPage(slug: { eq: "etkezes" }) {
        lead {
          lead
        }
        title
        firstContentTitle
        firstContent {
          raw
          references {
            ... on ContentfulAsset {
              contentful_id
              __typename
              gatsbyImage(width: 340, placeholder: BLURRED, aspectRatio: 1)
              description
              title
            }
          }
        }
  
        secondContentTitle
        secondContent {
          raw
          references {
            ... on ContentfulAsset {
              contentful_id
              __typename
              gatsbyImage(height: 230, placeholder: BLURRED, aspectRatio: 1)
              description
              title
            }
          }
        }

        thirdContentTitle
        thirdContent {
          raw
          references {
            ... on ContentfulAsset {
              contentful_id
              __typename
              gatsbyImage(height: 230, placeholder: BLURRED, aspectRatio: 1)
              description
              title
            }
          }
        }



        relatedContentTitle
        relatedContent {
          ... on Node {
            ... on ContentfulPost {
              id
              title
              lead {
                lead
              }
              date
              slug
              internal {
                type
              }
            }
            ... on ContentfulNews {
              id
              title
              lead {
                lead
              }
              date
              slug
              internal {
                type
              }
            }
            ... on ContentfulJob {
              id
              title
              lead {
                lead
              }
              date
              slug
              internal {
                type
              }
            }
            ... on ContentfulPage {
              id
              title
              lead {
                lead
              }
              date
              slug
              internal {
                type
              }
            }
          }
        }
        peopleListTitle
        peopleList {
          bio {
            raw
          }
          image {
            gatsbyImage(placeholder: BLURRED, cropFocus: TOP, width: 840)
          }
          name
          slug
          internal {
            type
          }
        }
        additionalPeopleTitle
        additionalPeople {
          bio {
            raw
          }
          image {
            gatsbyImage(placeholder: BLURRED, cropFocus: TOP, width: 840)
          }
          name
          slug
          internal {
            type
          }
        }
      }
    }
  `