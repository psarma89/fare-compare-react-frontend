import _ from 'lodash'
import React, {Component} from 'react';
import {connect} from 'react-redux';
import { withRouter } from 'react-router-dom';
import * as actions from '../../actions';
import { adapter } from '../../services';
import { Table } from 'semantic-ui-react';
import {renderComponents} from '../../services/renderComponents';

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
    const {postSearchData, getRidePriceEstimates} = this.props

    getRidePriceEstimates(source, destination)

    if (startAddress && startAddress !== 'current location') {
      postSearchData(startAddress)
    }

    if (endAddress) {
      postSearchData(endAddress)
    }

  }

  componentWillReceiveProps(nextProps){
    const {uberPrices, uberProducts, lyftPrices, lyftProducts, taxiPrices, taxiProducts} = nextProps.results
    const {lyftEtaDisplay, uberEtaDisplay} = nextProps.etas

    const uberData = adapter.uber.formatUberPriceEstimates(uberPrices.prices, uberProducts.products, uberEtaDisplay)
    const lyftData = adapter.lyft.formatLyftPriceEstimates(lyftPrices.cost_estimates, lyftProducts.ride_types, lyftEtaDisplay)
    const taxiData = adapter.taxi.formatTaxiPriceEstimates(taxiPrices, taxiProducts)
    const data = [...lyftData, taxiData, ...uberData]

    this.setState({data})

  }

  handleSort = clickedColumn => () => {
    const { column, data, direction } = this.state

    // const sortedData = _.orderBy(data, [d => d.clickedColumn.toLowerCase()], ['asc'])

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
    // console.log(this.props)
    const { column, data, direction } = this.state
    const {startAddress, endAddress} = localStorage

    return (
      <div>
        <p>Start: {startAddress}</p>
        <p>Destination: {endAddress}</p>
        {renderComponents.map.directionComponent()}
        <h1>Results</h1>
        <Table sortable celled fixed>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>
                Service
              </Table.HeaderCell>
              <Table.HeaderCell sorted={column === 'estimate' ? direction : null} onClick={this.handleSort('estimate')}>
                Estimate ($)
              </Table.HeaderCell>
              <Table.HeaderCell sorted={column === 'eta' ? direction : null} onClick={this.handleSort('eta')}>
                ETA (mins)
              </Table.HeaderCell>
              <Table.HeaderCell sorted={column === 'duration' ? direction : null} onClick={this.handleSort('duration')}>
                Duration (mins)
              </Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {_.map(data, ({ service, estimate, eta, duration }, i) => (
              <Table.Row key={i}>
                <Table.Cell>{service}</Table.Cell>
                <Table.Cell>{estimate}</Table.Cell>
                <Table.Cell>{eta}</Table.Cell>
                <Table.Cell>{duration}</Table.Cell>
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
  results: state.res.results,
  etas: state.res.etas
});

export default withRouter(connect(mapStateToProps, actions)(ResultsView))
