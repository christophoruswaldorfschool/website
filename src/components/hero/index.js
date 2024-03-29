import capitalize from '../../utils/capitalize'
import * as css from './hero.module.scss'
import classNames from 'classnames'
import React, { Children, cloneElement, useState } from 'react'

const Hero = ({ children, title = '', lead = '', color = 'warmRainbow' }) => {
  const pages = Children.toArray(children)
  const [page, setPage] = useState(0)

  const prevPage = () => {
    if (page - 1 < 0) {
      return setPage(pages.length - 1)
    }
    setPage(page - 1)
  }
  const nextPage = () => {
    if (page + 1 > pages.length - 1) {
      return setPage(0)
    }
    setPage(page + 1)
  }

  return (
    <section
      className={classNames(
        css.hero,
        css[`color${capitalize(color)}`],
        pages.length === 0 ? css.nonPaged : ''
      )}
    >
      <div className={css.centered}>
        {title && lead && (
          <>
            <h2 className={css.title}>{title}</h2>
            <p className={css.lead}>{lead}</p>
          </>
        )}
        {pages.length > 0 && (
          <>
            <div
              onClick={prevPage}
              className={classNames(css.pager, css.pagerLeft)}
            ></div>
            <div
              onClick={nextPage}
              className={classNames(css.pager, css.pagerRight)}
            ></div>
          </>
        )}
        {pages.length > 0 &&
          Children.map(pages, (item, i) => {
            const cls = classNames(css.page, page === i && css.show)
            return <div className={cls}>{cloneElement(item, { key: i })}</div>
          })}
      </div>
    </section>
  )
}

export default Hero
