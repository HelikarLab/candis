import React     from 'react';
import PropTypes from 'prop-types'

class Media extends React.Component {
  render ( ) {
    return (
      <div className="media">
        {
          this.props.icon ?
            <div className="media-left">
              <img className="media-object" width="20px" height="20px"
                src={this.props.icon}/>
            </div> : false
        }
        <div className="media-body">
          <div className="media-heading no-margin">
            {this.props.title}
          </div>
          <small>
            {this.props.body}
          </small>
        </div>
      </div>
    )
  }
}

Media.propTypes    =
{
   icon: PropTypes.string,
  title: PropTypes.string.isRequired
}
Media.defaultProps = 
{
   icon: null
}

export default Media
