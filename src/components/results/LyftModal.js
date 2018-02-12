import React from 'react';
import { Button, Header, Modal, Image } from 'semantic-ui-react'
import _ from 'lodash';

const LyftModal = (props) => {
  const { price, product } = props
  // console.log(product)
  return(
    <Modal size={'mini'} trigger={<a href="javascript:;">{price.display_name}</a>} closeIcon>
      <Header icon={<Image src={product.image_url} />} content={price.display_name} as='h1'/>
      <Modal.Description>
      </Modal.Description>

      <Modal.Content>
        <h2>Ride Info</h2>
        <p>Distance: {price.estimated_distance_miles} miles</p>
        <p>Duration: {_.round(price.estimated_duration_seconds/60)} minutes</p>
        <p>Shared: {product.ride_type === "lyft_line" ? "Yes" : "No"}</p>
        <p>Capacity: {product.seats}</p>
        <p>Surge: {price.primetime_percentage !== "0%" ? `Y, ${price.primetime_percentage}` : "N"}</p>
      </Modal.Content>
      <Modal.Content>
        <h2>Fare Info</h2>
        <p>Base Fare: {_.round(product.pricing_details.base_charge/100, 2)}</p>
        <p>Cost Per Mile: {_.round(product.pricing_details.cost_per_mile/100,2)}</p>
        <p>Cost Per Minute: {_.round(product.pricing_details.cost_per_minute/100,2)}</p>
        <p>Cancellation Fee: {`$${_.round(product.pricing_details.cancel_penalty_amount/100,2)}`}</p>
        <p>Estimate: {`$${Math.round(price.estimated_cost_cents_min/100)}`}</p>
      </Modal.Content>

      <Modal.Actions>
        <Button positive icon='arrow right' labelPosition='left' content="Get Lyft" onClick={this.close} />
      </Modal.Actions>
    </Modal>

  )
}

export default LyftModal;
