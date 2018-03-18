import React from 'react';
import UberModal from '../components/results/UberModal';
import LyftModal from '../components/results/LyftModal';
import TaxiModal from '../components/results/TaxiModal';

const API_ROOT = `http://localhost:3000/api/v1`;
const UBER_ROOT = `https://api.uber.com/v1.2`;
const LYFT_ROOT = `http://localhost:3000/api/v1`;
const TAXI_ROOT = `http://localhost:3000/api/v1`;

const headers = {
  'Content-Type': 'application/json',
  'Accepts': 'application/json'
};

const uberHeaders = {
  'Authorization': 'Token tCPHcqEtRrruUOc5VZMFT7BVOafEu2W_dYyM2akV',
  'Accept-Language': 'en_US',
  'Content-Type': 'application/json'
};

const lyftHeaders = {
  'Authorization': localStorage.getItem('token'),
  'Accepts': 'application/json',
  'Content-Type': 'application/json'
};

const taxiHeaders = {
  'Authorization': localStorage.getItem('token'),
  'Accepts': 'application/json',
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

const getNearestUberEta = (source) => {
  return fetch(`${UBER_ROOT}/estimates/time?start_latitude=${source.lat}&start_longitude=${source.lng}`, {
    method: 'GET',
    headers: uberHeaders
  }).then(res => res.json());
}

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

const formatUberPriceEstimates = (prices, products, etas) => {
  // console.log(prices, products)

  return prices.map(price => {
    const product = products.find(product => product.display_name === price.display_name)
    const eta = etas.find(eta => eta.display_name === price.display_name)
    const modal = <UberModal price={price} product={product} eta={eta}/>
    return {
      color: 'black',
      service: modal,
      name: "Uber",
      min: Math.round(price.low_estimate),
      max: Math.round(price.low_estimate),
      shared: product.shared ? true : false,
      surge: price.surge_multiplier > 1.0 ? true : false,
      estimate: price.estimate,
      duration: Math.round(price.duration/60),
      eta: Math.round(eta.estimate/60),
      distance: price.distance,
    }
  })
}

const getNearestLyftEta = (source) => {
  return fetch(`${LYFT_ROOT}/lyft_estimate`, {
    method: 'POST',
    headers: lyftHeaders,
    body: JSON.stringify({source})
  }).then(res => res.json());
}

const getNearestLyftLocations = (source) => {
  return fetch(`${LYFT_ROOT}/lyft_location`, {
    method: 'POST',
    headers: lyftHeaders,
    body: JSON.stringify({source})
  }).then(res => res.json());
}

const getLyftPriceData = (source, destination) => {
  return fetch(`${LYFT_ROOT}/lyft_fare`, {
    method: 'POST',
    headers: lyftHeaders,
    body: JSON.stringify({source, destination})
  }).then(res => res.json());
}

const getLyftProductData = (source) => {
  return fetch(`${LYFT_ROOT}/lyft_product`, {
    method: 'POST',
    headers: lyftHeaders,
    body: JSON.stringify({source})
  }).then(res => res.json());
}

const formatLyftPriceEstimates = (prices, products, etas) => {
  // console.log(prices, products)
  return prices.map(price => {
    const product = products.find(product => product.display_name === price.display_name)
    const eta = etas.find(eta => eta.display_name === price.display_name)
    const modal = <LyftModal price={price} product={product} eta={eta}/>
    return {
      color: 'pink',
      service: modal,
      name: "Lyft",
      max: Math.round(price.estimated_cost_cents_max/100),
      min: Math.round(price.estimated_cost_cents_min/100),
      shared: product.ride_type === "lyft_line" ? true : false,
      surge: price.primetime_percentage !== "0%" ? true : false,
      estimate: `$${Math.round(price.estimated_cost_cents_min/100)}-${Math.round(price.estimated_cost_cents_min/100)}`,
      duration: Math.round(price.estimated_duration_seconds/60),
      eta: Math.round(eta.eta_seconds/60),
      distance: price.estimated_distance_miles,
    }
  })
}

const getTaxiPriceData = (source, destination) => {
  return fetch(`${TAXI_ROOT}/taxi_fare`, {
    method: 'POST',
    headers: taxiHeaders,
    body: JSON.stringify({source, destination})
  }).then(resp => resp.json());
}

const getTaxiBusinessData = (source) => {
  return fetch(`${TAXI_ROOT}/businesses`, {
    method: 'POST',
    headers: taxiHeaders,
    body: JSON.stringify({source})
  }).then(resp => resp.json());
}

const formatTaxiPriceEstimates = (prices, products) => {
  // console.log(products)

  const modal = <TaxiModal price={prices} product={products} eta={'--'}/>
  return {
    color: 'yellow',
    service: modal,
    name: "Taxi",
    min: Math.round(prices.total_fare - prices.tip_amount),
    max: Math.round(prices.total_fare - prices.tip_amount),
    estimate: `$${Math.round(prices.total_fare - prices.tip_amount)}`,
    surge: false,
    shared: false,
    duration: Math.round(prices.duration/60),
    eta: '--',
    distance: Math.round(prices.distance/1609.344),
  }
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
    formatUberPriceEstimates,
    getNearestUberEta
  },
  lyft: {
    getLyftPriceData,
    getLyftProductData,
    formatLyftPriceEstimates,
    getNearestLyftEta,
    getNearestLyftLocations
  },
  taxi: {
    getTaxiPriceData,
    getTaxiBusinessData,
    formatTaxiPriceEstimates
  }
};
