import PropTypes from 'prop-types'
import React from 'react'
import clsx from 'clsx'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import { makeStyles } from '@material-ui/core/styles'
import Image from '../Image'

export const styles = theme => ({
  /**
   * Styles applied to the root element.
   */
  thumbs: {
    display: 'flex',
    justifyContent: 'center',
  },
  /**
   * Styles applied to each thumbnail element.
   */
  thumb: {
    width: 50,
    height: 50,
    boxSizing: 'content-box',
  },
  /**
   * Styles passed through to the [`Tabs`](https://material-ui.com/api/tabs/#css) element's
   * `indicator` CSS rule.
   */
  tabsIndicator: {
    display: 'none',
    backgroundColor: theme.palette.primary.main,
    height: '3px',
    transition: 'left 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
  },
  /**
   * Styles applied to the root element of the Tabs element
   */
  tabsRoot: {
    marginTop: theme.spacing(2),
  },
  /**
   * Styles passed through to each [`Tab`](https://material-ui.com/api/tabs/#css) element's
   * `root` CSS rule.
   */
  tabRoot: {
    minWidth: 'auto',
    padding: 0,
    outline: 'none',
    opacity: 0.7,
    transition: 'opacity linear 100ms',
    '&:hover': {
      opacity: 0.9,
    },
  },
  /**
   * Styles passed through to each [`Tab`](https://material-ui.com/api/tabs/#css) element's
   * `selected` CSS rule.
   */
  selectedTab: {
    opacity: 1,
  },
  /**
   * Styles passed through to each [`Tab`](https://material-ui.com/api/tabs/#css) element's
   * `wrapper` CSS rule.
   */
  tabWrapper: {
    margin: '0 2px',
    border: '1px solid transparent',
    '$selectedTab &': {
      border: `1px solid rgba(0,0,0,0.3)`,
    },
  },
})

const useStyles = makeStyles(styles, { name: 'RSFCarouselThumbnails' })

/**
 * A set of thumbnails to show below a [`Carousel`](/apiReference/carousel%f2Carousel). Thumbnails can
 * be clicked to switch to the given slide. Internally, `CarouselThumbnails` uses MaterialUI's
 * [`Tabs`](https://material-ui.com/api/tabs) component to indicate which slide is selected
 */
function CarouselThumbnails({ thumbnails, selected, setSelected, classes, className }) {
  const styles = useStyles({ classes })

  return (
    <div className={clsx(className, styles.thumbs)}>
      <Tabs
        value={selected}
        variant="scrollable"
        onChange={(_, index) => setSelected(index)}
        classes={{
          root: styles.tabsRoot,
          indicator: styles.tabsIndicator,
        }}
      >
        {thumbnails.map(({ src, alt }, i) => {
          const icon = <Image contain className={styles.thumb} src={src} alt={alt} />
          return (
            <Tab
              classes={{
                root: styles.tabRoot,
                wrapper: styles.tabWrapper,
                selected: styles.selectedTab,
              }}
              key={i}
              icon={icon}
            />
          )
        })}
      </Tabs>
    </div>
  )
}

CarouselThumbnails.propTypes = {
  /**
   * Override or extend the styles applied to the component. See [CSS API](#css) below for more details.
   */
  classes: PropTypes.object,

  /**
   * CSS class to apply to the root element.
   */
  className: PropTypes.string,

  /**
   * Index of the currently selected slide in the [`Carousel`](/apiReference/carousel%2fCarousel).
   */
  selected: PropTypes.number,

  /**
   * Function to change the value of [`selected`](#prop-selected).
   */
  setSelected: PropTypes.func,

  /**
   * Array of objects containing the data for an image to be used for each thumbnail
   */
  thumbnails: PropTypes.arrayOf(
    PropTypes.shape({
      src: PropTypes.string,
      alt: PropTypes.string,
    }),
  ),
}

export default React.memo(CarouselThumbnails)