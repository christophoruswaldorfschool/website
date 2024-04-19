import capitalize from '../../utils/capitalize'
import * as css from './header.module.scss'
import classNames from 'classnames'
import { Link } from 'gatsby'
import React from 'react'

const Header = ({ activeMenu, searchEnabled = false }) => (
  <header className={css.header}>
    <div
      className={classNames(css.centered, css[`menu${capitalize(activeMenu)}`])}
    >
      <input
        id="MobileMenuTrigger"
        type="checkbox"
        className={css.triggerCheckbox}
        aria-hidden="true"
      />
      <label
        htmlFor="MobileMenuTrigger"
        className={css.mobileMenuTrigger}
        aria-hidden="true"
      >
        <span>Open Menu</span>
      </label>
      <h1 className={css.logo}>
        <Link
          to="/"
          title="Christophorus Waldorf Általános Iskola, Gimnázium és AMI hivatalos honlapja"
        >
          Christophorus Waldorf Általános Iskola, Gimnázium és AMI hivatalos honlapja
        </Link>
      </h1>
      <nav className={css.navigation}>
        <ul>
          <li
            className={classNames(css.menuItem, {
              [css.selected]: activeMenu === 'school',
            })}
          >
            <Link to="/iskola">Iskola</Link>
            <ul className={css.subMenu}>
              <li>
                <Link to="/iskola#aktualitasok">Aktualitások</Link>
              </li>
              <li>
                <Link to="/iskola#pedagogiank">Pedagógiánk</Link>
              </li>
              <li>
                <Link to="/iskola#pedagogusaink">Pedagógusaink</Link>
              </li>
              <li>
                <Link to="/iskola#kollegaink">Kollégáink</Link>
              </li>
              <li>
                <Link to="/iskola#iskolakertunk">Iskolakertünk</Link>
              </li>
              {/*
              <li>
                <a href="/iskola">Átjelentkezés</a>
              </li>
              <li>
                <a href="/iskola">Felvételi</a>
              </li> */}
            </ul>
          </li>
          <li
            className={classNames(css.menuItem, {
              [css.selected]: activeMenu === 'highschool',
            })}
          >
            <Link to="/gimnazium">Gimnázium</Link>
          </li>
          {/* <li className={css.menuItem}>
            <a href="https://wokk.hu/">Óvoda</a>
          </li> */}
          <li
            className={classNames(css.menuItem, {
              [css.selected]: activeMenu === 'posts',
            })}
          >
            <Link to="/gondolatok">Gondolatok</Link>
          </li>
          <li
            className={classNames(css.menuItem, {
              [css.selected]: activeMenu === 'images',
            })}
          >
            <Link to="/galeria">Galéria</Link>
          </li>
          <li
            className={classNames(css.menuItem, {
              [css.selected]: activeMenu === 'jobs',
            })}
          >
            <Link to="/allasok">Állások</Link>
          </li>
          <li
            className={classNames(css.menuItem, {
              [css.selected]: activeMenu === 'maintainer',
            })}
          >
            <Link to="/fenntarto">Fenntartó</Link>
            <ul className={css.subMenu}>
              <li>
                <Link to="/fenntarto#dokumentumok">Dokumentumok</Link>
              </li>
              <li>
                <Link to="/fenntarto#egyesulet">Egyesület</Link>
              </li>
              <li>
                <Link to="/fenntarto#fundraising">Fundraising</Link>
              </li>
            </ul>
          </li>
          <li
            className={classNames(css.menuItem, {
              [css.selected]: activeMenu === 'apply',
            })}
          >
            <a href="/jelentkezes">Jelentkezés</a>
          </li>

          <li
            className={classNames(css.menuItem, {
              [css.selected]: activeMenu === 'food',
            })}
          >
            <Link to="/etkezes">Étkezés</Link>
          
              <ul className={css.subMenu}>
              <li>
                <Link to="/etkezes#rendeles">Ételrendelés</Link>
              </li>
              <li>
                <Link to="/etkezes#adminisztracio">Lemondás és Újraigénylés</Link>
              </li>
              <li>
                <Link to="/etkezes#amathea">Amathea bemutatkozó levél</Link>
              </li>
              <li>
                <Link to="/etkezes#menuk">Menük</Link>
              </li>
              {/*
              <li>
                <a href="/iskola">Átjelentkezés</a>
              </li>
              <li>
                <a href="/iskola">Felvételi</a>
              </li> */}
            </ul>
          </li>

          <li
            className={classNames(css.menuItem, {
              [css.selected]: activeMenu === 'contact',
            })}
          >
            <Link to="/kapcsolat">Kapcsolat</Link>
          </li>
        </ul>
      </nav>

      <div className={classNames(css.search)}>
        {searchEnabled && <input type={'search'} className={css.searchField} />}
      </div>
    </div>
  </header>
)

export default Header
