import React         from 'react'
import classNames    from 'classnames'

class FilePanel extends React.Component {
  constructor (props) {
    super (props)
  }

  componentDidMount ( ) {
    $('.selectpicker').selectpicker();
  }

  render ( ) {
    return (
      <div className={classNames("panel panel-default", this.props.classNames)}>
        <div className="panel-body">
          <div className="row">
            <div className="col-xs-9">
              <div className="form-group">
                <select className="selectpicker" data-width="100%">
                  
                </select>
              </div>
            </div>
            <div className="col-xs-3">
              <button className="btn btn-block btn-default" name="refresh">
                <i className="fa fa-fw fa-refresh"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default FilePanel
