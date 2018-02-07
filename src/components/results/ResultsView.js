import _ from 'lodash'
import React, {Component} from 'react';
import {connect} from 'react-redux';
import { withRouter } from 'react-router-dom';
import * as actions from '../../actions';
import { adapter } from '../../services';
import { Table } from 'semantic-ui-react'

class ResultsView extends Component {
  constructor(props) {
    super(props)
    this.state = {
      column: null,
      data: [],
      direction: null
    }
  }

  componentDidMount(){

    const source = JSON.parse(localStorage.getItem('source'))
    const destination = JSON.parse(localStorage.getItem('destination'))
    const {startAddress, endAddress} = this.props.search
    const {postSearchData, getUberPriceEstimates} = this.props

    getUberPriceEstimates(source, destination)
    if (startAddress && startAddress !== 'current location') {
      postSearchData(startAddress)
    }

    if (endAddress) {
      postSearchData(endAddress)
    }

  }

  componentWillReceiveProps(nextProps){
    const {uberPrices, uberProducts} = nextProps.results

    if (uberPrices.prices) {
      const data = adapter.uber.formatUberPriceEstimates(uberPrices.prices, uberProducts.products)
      this.setState({data})
    }
  }

  handleSort = clickedColumn => () => {
    const { column, data, direction } = this.state

    if (column !== clickedColumn) {
      this.setState({
        column: clickedColumn,
        data: _.sortBy(data, [clickedColumn]),
        direction: 'ascending',
      })

      return
    }

    this.setState({
      data: data.reverse(),
      direction: direction === 'ascending' ? 'descending' : 'ascending',
    })
  }

  render() {
    console.log(this.props)
    const { column, data, direction } = this.state
    const {startAddress, endAddress} = this.props.search

    return (
      <div>
        <p>Start: {startAddress}</p>
        <p>Destination: {endAddress}</p>
        <h1>Results</h1>
        <Table sortable celled fixed>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell sorted={column === 'service' ? direction : null} onClick={this.handleSort('service')}>
                Service
              </Table.HeaderCell>
              <Table.HeaderCell sorted={column === 'estimate' ? direction : null} onClick={this.handleSort('estimate')}>
                Estimate
              </Table.HeaderCell>
              <Table.HeaderCell sorted={column === 'driver' ? direction : null} onClick={this.handleSort('driver')}>
                Drive Earnings ($)
              </Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {_.map(data, ({ service, estimate, duration, distance, driver }, i) => (
              <Table.Row key={i}>
                <Table.Cell>{service}</Table.Cell>
                <Table.Cell>{estimate}</Table.Cell>
                <Table.Cell>{driver}</Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  search: state.loc.search,
  results: state.res.results
});

export default withRouter(connect(mapStateToProps, actions)(ResultsView))
