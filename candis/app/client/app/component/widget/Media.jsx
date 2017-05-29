import React from 'react';

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
            {this.props.heading}
          </div>
          {this.props.body}
        </div>
      </div>
    )
  }
}

export default Media
