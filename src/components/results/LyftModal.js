import React from 'react';
import { Button, Header, Modal, Image } from 'semantic-ui-react'

const LyftModal = (props) => {
  const { price, product } = props
  // console.log(product)
  return(
    <Modal trigger={<a href="#">{price.display_name}</a>} closeIcon>
      <Header icon='car' content={price.display_name} as='h1'/>
      <Modal.Description>
        <Image wrapped size='medium' src={product.image_url} />
      </Modal.Description>

      <Modal.Content>
        <h2>Ride Info</h2>
        <p>Distance: {price.distance} miles</p>
        <p>Duration: {(price.duration/60).toFixed()} minutes</p>
        <p>Shared: {product.ride_type === "lyft_line" ? "Yes" : "No"}</p>
        <p>Capacity: {product.seats}</p>
      </Modal.Content>
      <Modal.Content>
        <h2>Fare Info</h2>
        <p>Base Fare: {product.pricing_details.base_charge}</p>
        <p>Cost Per Mile: {product.pricing_details.cost_per_mile}</p>
        <p>Cost Per Minute: {product.pricing_details.cost_per_minute}</p>
        <p>Cancellation Fee: {product.pricing_details.cancel_penalty_amount}</p>
        <p>Total: {`$${(price.estimated_cost_cents_min/100).toFixed()}-${(price.estimated_cost_cents_max/100).toFixed()}`}</p>
      </Modal.Content>

      <Modal.Actions>
        <Button positive icon='arrow right' labelPosition='right' content="Get Lyft" onClick={this.close} />
      </Modal.Actions>
    </Modal>

  )
}

export default LyftModal;
