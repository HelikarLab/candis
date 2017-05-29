import React from 'react'
import Fuse  from 'fuse.js'

class TypeAhead extends React.Component {
  constructor ( ) {
    super ( )

    this.onChange = this.onChange.bind(this)
    this.state    = TypeAhead.defaultStates
  }

  onChange (event) {
    let query  = event.target.value
    let filter = this.fuse.search(query)

    this.setState({
      filter: filter
    })
  }

  render ( ) {
    this.fuse  = new Fuse(this.props.data, {
              shouldSort: true,
               threshold: 0.6,
                location: 0,
                distance: 100,
        maxPatternLength: 32,
      minMatchCharLength: 1,
                    keys: ["title", "content"]
    })

    return (
      <div>
        <div className="form-group">
          <input className="form-control"
            placeholder={this.props.placeholder} onChange={this.onChange}/>
        </div>
        <ul className="list-group">
          {
            this.state.filter.slice(0, this.props.maximum)
                             .map((data, index) => {
              return (
                <li key={index} className="list-group-item">
                  <a href="#" data-toggle="tooltip" data-placement="top"
                    title={data.content}>
                    <div className="media">
                      {
                        data.icon ?
                          <div className="media-left">
                            <img className="media-object" width="20px"
                              height="20px" src={data.icon}/>
                          </div> : false
                      }
                      <div className="media-body">
                        <div className="media-heading no-margin">
                          {data.title}
                          <div>
                            <small>
                              {data.content}
                            </small>
                          </div>
                        </div>
                      </div>
                    </div>
                  </a>
                </li>
              )
            })
          }
        </ul>
      </div>
    )
  }
}

TypeAhead.defaultProps  =
{
  maximum: 3
}

TypeAhead.defaultStates =
{
   filter: [ ]
}

export default TypeAhead
