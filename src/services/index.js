import React from 'react'
import UberModal from '../components/results/UberModal'

const API_ROOT = `http://localhost:3000/api/v1`;
const UBER_ROOT = `https://api.uber.com/v1.2`;

const headers = {
  'Content-Type': 'application/json',
  'Accepts': 'application/json'
};

const uberHeaders = {
  'Authorization': 'Token tCPHcqEtRrruUOc5VZMFT7BVOafEu2W_dYyM2akV',
  'Accept-Language': 'en_US',
  'Content-Type': 'application/json'
};

const getWithToken = url => {
  const token = localStorage.getItem('token');
  return fetch(url, {
    headers: { Authorization: token }
  }).then(res => res.json());
};

const getCurrentUser = () => {
  return getWithToken(`${API_ROOT}/current_user`);
};

const login = data => {
  return fetch(`${API_ROOT}/auth`, {
    method: 'POST',
    headers,
    body: JSON.stringify(data)
  }).then(res => res.json());
};

const update = data => {
  return fetch(`${API_ROOT}/users`, {
    method: 'PATCH',
    headers,
    body: JSON.stringify(data)
  }).then(res => res.json());
};

const signup = data => {
  return fetch(`${API_ROOT}/users`, {
    method: 'POST',
    headers,
    body: JSON.stringify(data)
  }).then(res => res.json());
};

const postSearch = data => {
  const token = localStorage.getItem('token');
  return fetch(`${API_ROOT}/searches`, {
    method: 'POST',
    headers: { Authorization: token, 'Content-Type': 'application/json',
    'Accepts': 'application/json'},
    body: JSON.stringify(data)
  }).then(res => res.json());
};

const getSearches = () => {
  const token = localStorage.getItem('token');
  return fetch(`${API_ROOT}/searches`, {
    method: 'GET',
    headers: { Authorization: token },
  }).then(res => res.json());
};

const getUberPriceData = (source, destination) => {
  return fetch(`${UBER_ROOT}/estimates/price?start_latitude=${source.lat}&start_longitude=${source.lng}&end_latitude=${destination.lat}&end_longitude=${destination.lng}`, {
    method: 'GET',
    headers: uberHeaders
  }).then(res => res.json());
}

const getUberProductData = (source) => {
  return fetch(`${UBER_ROOT}/products?latitude=${source.lat}&longitude=${source.lng}`, {
    method: 'GET',
    headers: uberHeaders
  }).then(res => res.json());
}

const formatUberPriceEstimates = (prices, products) => {
  return prices.map(price => {
    const product = products.find(product => product.display_name === price.display_name)
    const modal = <UberModal price={price} product={product}/>
    return {
      service: modal,
      estimate: price.estimate,
      duration: (price.duration/60).toFixed(),
      distance: price.distance,
      driver: `$${(price.low_estimate * .75).toFixed(2)} - ${(price.high_estimate * .75).toFixed(2)}`
    }
  })
}

export const adapter = {
  auth: {
    login,
    signup,
    update,
    getCurrentUser
  },
  post: {
    postSearch,
    getSearches
  },
  uber: {
    getUberPriceData,
    getUberProductData,
    formatUberPriceEstimates
  }
};
