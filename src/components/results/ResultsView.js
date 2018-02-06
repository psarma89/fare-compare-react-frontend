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
    const {source, destination} = this.props.search
    this.props.getUberPriceEstimates(source, destination)
  }

  componentWillReceiveProps(nextProps){
    const {uberPrice} = nextProps.results

    const data = adapter.uber.formatUberPriceEstimates(uberPrice.prices)
    this.setState({data})

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
              <Table.HeaderCell sorted={column === 'min' ? direction : null} onClick={this.handleSort('min')}>
                Cost-Min
              </Table.HeaderCell>
              <Table.HeaderCell sorted={column === 'max' ? direction : null} onClick={this.handleSort('max')}>
                Cost-Max
              </Table.HeaderCell>
              <Table.HeaderCell sorted={column === 'duration' ? direction : null} onClick={this.handleSort('duration')}>
                Duration (min)
              </Table.HeaderCell>
              <Table.HeaderCell sorted={column === 'distance' ? direction : null} onClick={this.handleSort('distance')}>
                Distance (mi)
              </Table.HeaderCell>
              <Table.HeaderCell sorted={column === 'driver' ? direction : null} onClick={this.handleSort('driver')}>
                Drive Earnings ($)
              </Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {_.map(data, ({ service, min, max, duration, distance, driver }) => (
              <Table.Row key={service}>
                <Table.Cell>{service}</Table.Cell>
                <Table.Cell>{min}</Table.Cell>
                <Table.Cell>{max}</Table.Cell>
                <Table.Cell>{duration}</Table.Cell>
                <Table.Cell>{distance}</Table.Cell>
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
