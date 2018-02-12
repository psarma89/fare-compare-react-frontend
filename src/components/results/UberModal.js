import React from 'react';
import { Button, Header, Modal, Image } from 'semantic-ui-react'
import _ from 'lodash';

const UberModal = (props) => {
  const { price, product } = props
  // console.log(product)
  return(
    <Modal size={'mini'} trigger={<a href="javascript:;">{price.display_name}</a>} closeIcon>
      <Header icon={<Image src={product.image} />} content={price.display_name} as='h1'/>
      <Modal.Description>
        <p>{product.description}</p>
      </Modal.Description>

      <Modal.Content>
        <h2>Ride Info</h2>
        <p>Distance: {price.distance} miles</p>
        <p>Duration: {Math.round(price.duration/60)} minutes</p>
        <p>Shared: {product.shared ? "Yes" : "No"}</p>
        <p>Capacity: {product.capacity}</p>
        <p>Surge: {price.surge_multiplier > 1.0 ? "Yes" : "No"}</p>
      </Modal.Content>
      <Modal.Content>
        <h2>Fare Info</h2>
        <p>Base Fare: {product.price_details.base}</p>
        <p>Cost Per Distance: {product.price_details.cost_per_distance}</p>
        <p>Cost Per Mile: {product.price_details.cost_per_minute}</p>
        <p>Cancellation Fee: {`$${product.price_details.cancellation_fee}`}</p>
        <p>Total: {`$${Math.round((price.low_estimate + price.high_estimate)/2)}`}</p>
      </Modal.Content>

      <Modal.Actions>
        <Button positive icon='arrow right' labelPosition='left' content="Get Uber" onClick={this.close} />
      </Modal.Actions>
    </Modal>

  )
}

export default UberModal;
