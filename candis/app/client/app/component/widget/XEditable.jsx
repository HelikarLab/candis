import React from 'react'

class XEditable extends React.Component {
  constructor (props) {
    super (props)

    this.state = { value: props.value }
  }

  componentDidMount ( ) {    
    const that = this

    $(this.refs.editable).editable({
         type: 'text',
        title: this.state.editable,
      success: (_, value) => {
        that.setState({
          editable: value
        })

        that.props.onChange(value)
      }
    })
  }

  render ( ) {
    return (
      <a ref="editable" href='javascript:void(0);'>
        {this.state.value}
      </a>
    )
  }
}

export default XEditable
