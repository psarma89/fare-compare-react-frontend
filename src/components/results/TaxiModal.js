import React from 'react';
import { Button, Header, Modal } from 'semantic-ui-react'

const TaxiModal = (props) => {
  const { price } = props
  // console.log(price)
  return(
    <Modal trigger={<a href="#">Taxi Cab</a>} closeIcon>
      <Header icon='car' content={"Taxi Cab"} as='h1'/>
      <Modal.Description>
        <p>This is a local taxi service in your locality</p>
      </Modal.Description>

      <Modal.Content>
        <h2>Ride Info</h2>
        <p>Distance: {price.distance} miles</p>
        <p>Duration: {(price.duration/60).toFixed()} minutes</p>
        <p>Shared: No</p>
        <p>Capacity: Varies</p>
      </Modal.Content>
      <Modal.Content>
        <h2>Fare Info</h2>
        <p>Base Fare: {price.initial_fare}</p>
        <p>Metered Fare: {price.metered_fare}</p>
        <p>Total: `$${(price.total_fare - price.tip_amount).toFixed()}-${(price.total_fare - price.tip_amount).toFixed()}`</p>
      </Modal.Content>

      <Modal.Actions>
        <Button positive icon='arrow right' labelPosition='right' content="Get Taxi" onClick={this.close} />
      </Modal.Actions>
    </Modal>

  )
}

export default TaxiModal;
