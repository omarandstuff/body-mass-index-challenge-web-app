import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import DocumentTitle from 'react-document-title'
import {connect} from 'react-redux'
import * as actionCreators from '../action_creators'
import Immutable from 'immutable'

export class IndexPage extends React.Component {

  constructor(props) {
    super(props)
    this.mixins = [PureRenderMixin]

    this.handleChange = this.handleChange.bind(this)
    this.addRecord = this.addRecord.bind(this)
  }

  componentWillMount() {
    if(this.props.SESSION_STATUS === 'NOT_LOGGED_IN') this.context.router.push('/login')

    if (this.props.SESSION_STATUS === 'LOGGED_IN' && this.props.LISTS_STATUS !== 'LOADED')
      this.props.loadRecords()
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.SESSION_STATUS === 'NOT_LOGGED_IN') this.context.router.push('/login')

    if(this.props.SESSION_STATUS !== 'LOGGED_IN' && nextProps.SESSION_STATUS === 'LOGGED_IN')
      this.props.loadRecords()
  }

  handleChange(e) {
    let form = this.props.RECORD_FORM || Immutable.Map()
    var newIndex = null

    if(e.target.name === "weigth") {
      newIndex = Number(e.target.value) / (Number(form.get('height')) * Number(form.get('height')))
    } else {
      newIndex = Number(form.get('weigth')) / (Number(e.target.value) * Number(e.target.value))
    }

    this.props.changeRecordForm(e.target.name, e.target.value)
    this.props.changeRecordForm('mass_index', newIndex)
    this.props.changeRecordForm('category', this.getCategory(newIndex))
  }

  addRecord(e) {
    if (e.preventDefault) e.preventDefault()

    let form = this.props.RECORD_FORM || Immutable.Map()

    let massIndex = form.get('mass_index')

    if(massIndex) {
      this.props.createRecord({ record: { body_mass_index: massIndex }})
    }
  }

  deleteRecord(id, e) {
    if (e.preventDefault) e.preventDefault()
    this.props.deleteRecord(id)
  }

  getCategory(mass_index) {
    if(mass_index < 15) {
      return { category: "Very severely underweight", range: "0-15", bmi: "0-0.60" }
    } else if(mass_index >= 15 && mass_index < 16) {
      return { category: "Severely underweight", range: "15-16", bmi: "0.60-0.64" }
    } else if(mass_index >= 16 && mass_index < 18.5) {
      return { category: "Underweight", range: "16-18.5", bmi: "0.64-0.74" }
    } else if(mass_index >= 18.5 && mass_index < 25) {
      return { category: "Normal (healthy weight)", range: "18.5-25", bmi: "0.74-1.0" }
    } else if(mass_index >= 25 && mass_index < 30) {
      return { category: "Overweight", range: "25-30", bmi: "1.0-1.2" }
    } else if(mass_index >= 30 && mass_index < 35) {
      return { category: "Obese Class I (Moderately obese)", range: "30-35", bmi: "1.2-1.4" }
    } else if(mass_index >= 35 && mass_index < 40) {
      return { category: "Obese Class II (Severely obese)", range: "35-40", bmi: "1.4-1.6" }
    } else if(mass_index >= 40) {
      return { category: "Obese Class III (Very severely obese)", range: ">40", bmi: ">1.6" }
    }
  }

  render() {
    let form = this.props.RECORD_FORM || Immutable.Map()
    let massIndex = form.get('mass_index')
    var title = "Enter your data"
    var results = ""
    var addButton = (
      <button className="ui red button">
        <i className="heart icon"></i>
        To add enter your data
      </button>
    )
    var totalRecords = this.props.RECORDS ? this.props.RECORDS.size : '0'

    if(massIndex) {
      title = "Results"
      results = (
        <div>
          <h4 className="ui header">Index: { massIndex.toFixed(2) }</h4>
          { form.get('category').range }
          <br/>
          <b>{ form.get('category').category }</b>
          <br/>
          BMI Prime: { form.get('category').bmi }
        </div>
      )
      addButton = (
        <button className="ui red button" onClick={ this.addRecord }>
          <i className="heart icon"></i>
          Add record
        </button>
      )
    }

    let records = this.props.RECORDS || Immutable.List()
    var recordList = []
    records.forEach(record => {
      let currentMassIndex = record.get('body_mass_index')
      let category = this.getCategory(currentMassIndex)

      recordList.push(
        <div key={ "record" + record.get('id') } className="item">
          <div className="right floated content">
            <button className="ui circular google plus icon button" onClick={ this.deleteRecord.bind(this, record.get('id')) }>
              <i className="trash icon"></i>
            </button>
          </div>
          <i className="large heart red middle aligned icon"></i>
          <div className="content">
            <a className="header">{ category.category }</a>
            <div className="description"><span>Index: { Number(currentMassIndex).toFixed(2) }</span> <i className="bar chart icon"> </i><span>Range: { category.range }</span> <i className="world icon"> </i><span>BMI: { category.bmi }</span></div>
          </div>
        </div>
      )
    })

    return (
      <DocumentTitle title={'Home'}>
        <div className="ui container">
          <div className="ui two column centered grid">
            <h2 className="ui center">
            </h2>
            <div className="ui card">
              <div className="content">
                <div className="header">{ title }</div>
              </div>
              <div className="content">
                { results }
              </div>
            </div>
          </div>
          <div className="ui two column centered grid">
            <div className="column">
              <form className="ui form">
                <div className="field">
                  <label>Weigth(Kg)</label>
                  <input name='weigth' type='text' value={ form.get('weigth') || '' } placeholder="Weigth" onChange={ this.handleChange }/>
                </div>
                <div className="field">
                  <label>Height(m)</label>
                  <input name='height' type='text' value={ form.get('height') || '' } placeholder="Height" onChange={ this.handleChange }/>
                </div>
              </form>
            </div>
          </div>
          <div className="ui container">
            <div className="ui dividing header">
              <br/>
            </div>
            <br/>
            <div className="ui two column centered grid">
              <div className="ui left labeled button" tabIndex="0">
                <a className="ui basic red right pointing label">
                  { totalRecords }
                </a>
                { addButton }
              </div>
            </div>
          </div>
          <br/>
          <div className="ui relaxed divided list">
            { recordList }
          </div>
        </div>

      </DocumentTitle>
    )
  }
}

IndexPage.contextTypes = { router: React.PropTypes.object.isRequired }

function mapStateToProps(state) {
  return {
    SESSION_STATUS: state.get('SESSION_STATUS'),
    RECORD_FORM: state.get('RECORD_FORM'),
    RECORDS: state.get('RECORDS'),
  }
}

export const IndexPageContainer = connect(mapStateToProps, actionCreators)(IndexPage)
