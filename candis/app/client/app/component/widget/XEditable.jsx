import React from 'react'

class XEditable extends React.Component {
  constructor (props) {
    super (props)
  }

  componentDidMount ( ) {
    const that = this

    $(this.refs.editable).editable({
      success: (_, value) => {
        that.props.onChange(value)
      }
    })
  }

  render ( ) {
    return (
      <a ref="editable" href='javascript:void(0);'
        data-type="text" data-title={this.props.title} data-showbuttons="false">
        {this.props.value}
      </a>
    )
  }
}

export default XEditable
