import React from 'react';
import { Button, Header, Modal, Image } from 'semantic-ui-react'

const UberModal = (props) => {
  const { price, product } = props
  // console.log(product)
  return(
    <Modal trigger={<a href="#">{price.display_name}</a>} closeIcon>
      <Header icon='car' content={price.display_name} as='h1'/>
      <Modal.Description>
        <p>{product.description}</p>
        <Image wrapped size='medium' src={product.image} />
      </Modal.Description>

      <Modal.Content>
        <h2>Ride Info</h2>
        <p>Distance: {price.distance} miles</p>
        <p>Duration: {(price.duration/60).toFixed()} minutes</p>
        <p>Shared: {product.shared ? "Yes" : "No"}</p>
        <p>Capacity: {product.capacity}</p>
      </Modal.Content>
      <Modal.Content>
        <h2>Fare Info</h2>
        <p>Base Fare: {product.price_details.base}</p>
        <p>Cost Per Distance: {product.price_details.cost_per_distance}</p>
        <p>Cost Per Mile: {product.price_details.cost_per_minute}</p>
        <p>Cancellation Fee: {product.price_details.cancellation_fee}</p>
        <p>Total: {price.estimate}</p>
      </Modal.Content>

      <Modal.Actions>
        <Button positive icon='arrow right' labelPosition='right' content="Get Uber" onClick={this.close} />
      </Modal.Actions>
    </Modal>

  )
}

export default UberModal;