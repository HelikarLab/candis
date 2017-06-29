import React       from 'react'
import { connect } from 'react-redux'
import classNames  from 'classnames'

class FlowGraphEditor extends React.Component {
  componentDidMount ( ) {
    this.props.graph.nodes().map((ID) => {
      jsplumb.ready(() => {
        jsplumb.draggable(`node-${ID}`)
      })
    })
  }

  render ( ) {
    const graph = this.props.graph

    return (
      <div className={classNames("panel panel-default", this.props.classNames.root)}>
        <div className="panel-body">
          {
            graph.nodes().map((ID, index) => {
              let meta = graph.node(ID)
              meta     = JSON.parse(meta)

              return (
                <a id={`node-${ID}`} key={index} href="javascript:void(0);"
                  onClick={() => {
                    this.props.dispatch(meta.onClick)
                  }}>
                  <span>
                    <h2 className="no-margin">
                      <span className="label label-default">
                        {meta.label}
                      </span>
                    </h2>
                  </span>
                </a>
              )
            })
          }
        </div>
      </div>
    )
  }
}

const mapStateToProps   = (state) => {
  const flowGraphEditor = state.flowGraphEditor

  return {
    graph: flowGraphEditor.graph
  }
}

export default connect(mapStateToProps)(FlowGraphEditor)

import React           from 'react'

import config          from '../../../config'

import XEditable       from '../XEditable'
import ToolBar         from '../ToolBar'
import FlowGraphEditor from '../FlowGraphEditor'

class DocumentEditor extends React.Component {
  constructor (props) {
    super (props)

    this.onChange = this.onChange.bind(this)

    this.tools    = [
      {
           name: 'Capture',
           icon: `${config.routes.icons}/photo-camera.png`,
        tooltip: 'Capture Flow Graph'
      }
    ]

    this.state    = DocumentEditor.defaultStates
  }

  onChange (event) {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  render ( ) {
    const that = this

    return (
      <div className="panel panel-default">
        <div className="panel-heading">
          <div className="panel-title">
            <XEditable
              value={this.state.title}
              onChange={(value) => {
                that.setState({
                  title: value
                })
              }}/>
          </div>
        </div>
        <div className="panel-body">
          <ToolBar/>
          <FlowGraphEditor
            classNames={{
              root: ["no-margin"]
            }}
            tools={this.tools}/>
        </div>
      </div>
    )
  }
}

DocumentEditor.defaultStates = { title: "Untitled document" }

export default DocumentEditor

import ActionType from '../constant/ActionType'

const addNode  = (node) => {
  const action = {
       type: ActionType.ADD_NODE,
    payload: node
  }

  return action
}

export { addNode }

import shortid    from 'shortid'
import graphlib   from 'graphlib'
import cloneDeep  from 'lodash.clonedeep'

import ActionType from '../constant/ActionType'

const initialState    = { graph: new graphlib.Graph() }
const flowGraphEditor = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.ADD_NODE: {
      const ID    = shortid.generate()
      const node  = action.payload
      let   graph = cloneDeep(state.graph)

      graph.setNode(ID, JSON.stringify(node))

      return {...state, graph: graph}
    }
  }

  return state
}

export default flowGraphEditor

import axios      from 'axios'

import config     from '../config'

import Dialog     from '../component/dialog/Dialog'

import DialogType from '../constant/DialogType'
import { showDialog, hideDialog } from '../action/DialogAction'
import { getResource } from '../action/AsynchronousAction'

const Compartments = [
  {
       name: 'Data',
       icon: `${config.routes.icons}/database.png`,
    tooltip: 'Tools for Source Selection',
      tools: [
        {
             name: 'Create',
             icon: `${config.routes.icons}/edit.png`,
          tooltip: 'Create a new dataset',
          onClick: (dispatch) => {
            // const node   = {
            //     label: 'Create',
            //   onClick: (dispatch) => {
            //      const action = showDialog({
            //         type: DialogType.CREATE,
            //        title: 'Create',
            //         size: Dialog.LARGE,
            //        props: {
            //          classNames: {
            //              root: ['no-background', 'no-border', 'no-shadow', 'no-margin'],
            //            footer: ['no-background', 'no-border']
            //          },
            //          onCreate: (dispatch) => {
            //            let action = null
            //
            //            action     = hideDialog({
            //              type: DialogType.CREATE
            //            })
            //
            //            dispatch(action)
            //          },
            //          onCancel: (dispatch) => {
            //            const action = hideDialog({
            //              type: DialogType.CREATE
            //            })
            //
            //            dispatch(action)
            //          }
            //        }
            //      })
            //
            //      dispatch(action)
            //   }
            // }
            // const action = addNode(node)
            //
            // dispatch(action)
           }
        },
        {
             name: 'File',
             icon: `${config.routes.icons}/document.png`,
          tooltip: 'Load a CDATA/CSV file',
          onClick: (dispatch) => {
            const action = showDialog({
               type: DialogType.FILE,
               size: Dialog.LARGE,
              title: 'File',
              props: {
                classNames: {
                    root: ['no-background', 'no-border', 'no-shadow', 'no-margin'],
                  footer: ['no-background', 'no-border']
                },
                onSelect: (dispatch) => {
                  let action   = null

                  action       = hideDialog({
                    type: DialogType.FILE
                  })

                  dispatch(action)
                },
                onCancel: (dispatch) => {
                  const action = hideDialog({
                    type: DialogType.FILE
                  })

                  dispatch(action)
                }
              }
            })

            dispatch(action)
          }
        },
        {
             name: 'Download',
             icon: `${config.routes.icons}/cloud-computing.png`,
          tooltip: 'Download data from a remote host',
          onClick: (dispatch) => {

          }
        }
      ]
  },
  {
       name: 'Visualize',
       icon: `${config.routes.icons}/pie-chart.png`,
    tooltip: 'Tools for Data Visualization'
  },
  {
       name: 'Preprocess',
       icon: `${config.routes.icons}/gears.png`,
    tooltip: 'Tools for Data Preprocessing',
      tools: [ ],
    fetcher: () => {
      return axios.get(config.routes.preprocess.methods).then((response) => {
        response       = response.data

        if ( response.status == "success" ) {
          const data   = response.data

          const tools  = data.map((method) => {
            const tool = {
                 name: method.name,
              onClick: (dispatch) => {

              }
            }

            return tool
          })

          return tools
        } else {
          return [ ]
        }
      })
    }
  },
  {
       name: 'Feature Selection',
       icon: `${config.routes.icons}/column-select.png`,
    tooltip: 'List of Feature Selection Methods'
  },
  {
       name: 'Model',
       icon: `${config.routes.icons}/network.png`,
    tooltip: 'List of Models',
      tools: [
        {
               name: 'k Nearest Neighbor'
        },
        {
               name: 'Decision Tree',
               icon: `${config.routes.icons}/tree-structure.png`,
            tooltip: 'Classifier, Regressor'
        },
        {
               name: 'Naive Bayes'
        },
        {
               name: 'Random Forest'
        },
        {
               name: 'Support Vector Machine',
            tooltip: 'Classifier, Regressor'
        },
      ]
  },
  {
       name: 'Evaluate',
       icon: `${config.routes.icons}/clipboard.png`,
    tooltip: 'Tools for Model Evaluation',
      tools: [
        {
          name: 'Predict'
        }
      ]
  }
]

export default Compartments
