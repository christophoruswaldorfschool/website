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
  createImageIndexer,
  embedImageRenderer,
} from '../utils/richTextImage'
import * as css from './etkezes.module.scss'
import { documentToPlainTextString } from '@contentful/rich-text-plain-text-renderer'
import { BLOCKS } from '@contentful/rich-text-types'
import { graphql } from 'gatsby'
import { StaticImage } from 'gatsby-plugin-image'
import { renderRichText } from 'gatsby-source-contentful/rich-text'
import React from 'react'
import truncate from 'truncate'

const Quote = ({ children }) => {
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
  }

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
      peopleListTitle,
      peopleList,
      additionalPeopleTitle,
      additionalPeople,
    } = data.contentfulPage

    const gardenParagprahIndexer = createImageIndexer()
  const gardenImageIndexer = createImageIndexer(2)

  const introRichTextOptions = {
    renderNode: {
      [BLOCKS.EMBEDDED_ASSET]: richTextImage(),
    },
  }

  const gardenRichTextOptions = {
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
  }

  return (
    <Layout menu="food">
      <Seo title={title} description={lead} />
      <Hero title={title} lead={lead} color={'lilac'} />
      <Content>
        {relatedContent && (
          <>
            <SectionTitle
              title={relatedContentTitle}
              align="right"
              color="lilac"
              anchor="aktualitasok"
            />

            <ContentList>
              {relatedContent
                .filter((i) => i.title && i.slug && i.lead?.lead)
                .map((item) => (
                  <ContentBox
                    title={item.title}
                    type="small"
                    color="lilac"
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
          align="right"
          color="lilac"
          anchor="pedagogiank"
        />

        <div className={richText.content}>
          {renderRichText(firstContent, introRichTextOptions)}
        </div>

{/*     <Separator />
        {peopleList && (
          <>
            <SectionTitle
              title={peopleListTitle}
              align="right"
              color="blue"
              anchor="pedagogusaink"
            />
 
            <ContentList type="full">
              {peopleList
                .filter((i) => i.name && i.slug && i.image && i.bio?.raw)
                .map((item) => (
                  <ContentBox
                    title={item.name}
                    type="full"
                    color="blue"
                    buttonText="Tovább"
                    buttonLink={getInternalPath(item)}
                    key={item.slug}
                    image={item.image}
                  >
                    {truncate(
                      documentToPlainTextString(JSON.parse(item.bio.raw)),
                      840
                    )}
                  </ContentBox>
                ))}
            </ContentList>

            <Separator />
          </>
        )}

        {additionalPeople && (
          <>
            <SectionTitle
              title={additionalPeopleTitle}
              align="left"
              color="blue"
              anchor="kollegaink"
            />

            <ContentList type="full">
              {additionalPeople
                .filter((i) => i.name && i.slug && i.image && i.bio?.raw)
                .map((item) => (
                  <ContentBox
                    title={item.name}
                    type="full"
                    color="blue"
                    buttonText="Tovább"
                    buttonLink={getInternalPath(item)}
                    key={item.slug}
                    image={item.image}
                  >
                    {truncate(
                      documentToPlainTextString(JSON.parse(item.bio.raw)),
                      840
                    )}
                  </ContentBox>
                ))}
            </ContentList>

            <Separator />
          </>
        )}

        {secondContent && (
          <>
            <SectionTitle
              title={secondContentTitle}
              align="right"
              color="lilac"
              anchor="iskolakertunk"
            />

            <div className={richText.content}>
              {renderRichText(secondContent, gardenRichTextOptions)}
            </div>
          </>
        )}
       */}
      </Content>
    </Layout>
  )

    }