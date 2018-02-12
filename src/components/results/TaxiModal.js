import React from 'react';
import { Button, Header, Modal } from 'semantic-ui-react'

const TaxiModal = (props) => {
  const { price } = props
  // console.log(price)
  return(
    <Modal size={'mini'} trigger={<a href="javascript:;">Taxi Cab</a>} closeIcon>
      <Header icon='car' content={"Taxi Cab"} as='h1'/>
      <Modal.Description>
        <p>This is a local taxi service in your locality</p>
      </Modal.Description>

      <Modal.Content>
        <h2>Ride Info</h2>
        <p>Distance: {Math.round(price.distance/1609.344)} miles</p>
        <p>Duration: {Math.round(price.duration/60)} minutes</p>
        <p>Shared: No</p>
        <p>Capacity: Varies</p>
      </Modal.Content>
      <Modal.Content>
        <h2>Fare Info</h2>
        <p>Base Fare: {`$${price.initial_fare}`}</p>
        <p>Metered Fare: {`$${price.metered_fare}`}</p>
        <p>Estimate: {`$${Math.round(price.total_fare - price.tip_amount)}`}</p>
      </Modal.Content>
    </Modal>

  )
}

export default TaxiModal;
