import React       from 'react'
import PropTypes   from 'prop-types'
import shortid     from 'shortid'
import classNames  from 'classnames'

import Media       from './widget/Media'
import { getBSTTProps } from '../util'

class TabBar extends React.Component {
  render ( ) {
    const props = this.props

    return props.tabs.length ? 
      (
        <ul className="nav nav-pills">
          {
            props.tabs.map((tab, index) => {
              return (
                <TabBar.Tab key={index} {...tab}/>
              )
            })
          }
        </ul>
      ) : false
  }
}

TabBar.Tab          = class extends React.Component {
  render ( ) {
    const props     = this.props

    return (
      <li>
        <a href="javascript:void(0);">
          {props.title}
        </a>
      </li>
    )
  }
}

TabBar.Tab.propTypes    = 
{
     ID: PropTypes.string,
  title: PropTypes.string.isRequired
}
TabBar.Tab.defaultProps = 
{
     ID: shortid.generate()
}

TabBar.propTypes        =
{
  tabs: PropTypes.array,
  menu: PropTypes.array
}
TabBar.defaultProps     =
{
  tabs: [ ],
  menu: [ ]
}

export default TabBar
