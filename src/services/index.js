import React from 'react';
import UberModal from '../components/results/UberModal';
import LyftModal from '../components/results/LyftModal';
import TaxiModal from '../components/results/TaxiModal';

const API_ROOT = `http://localhost:3000/api/v1`;
const UBER_ROOT = `https://api.uber.com/v1.2`;
const LYFT_ROOT = `https://api.lyft.com/v1`;
const TAXI_ROOT = 'http://localhost:3000/api/v1/taxi_fare';


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
  'Authorization': 'Bearer 6lKymAETJscXPbFbID9+vU32drXfImUyHOkJIUgl/lTzLRg0f0sBk21mQ1oaQYhs/sxjdUqi2d+SG7j2NVtxuT20x6VgvYYe2oW5X9TuzpuWYTtVm1orGRs=',
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
      driver: `$${(price.low_estimate * .75).toFixed()}-${(price.high_estimate * .75).toFixed()}`
    }
  })
}

const getLyftPriceData = (source, destination) => {
  return fetch(`${LYFT_ROOT}/cost?start_lat=${source.lat}&start_lng=${source.lng}&end_lat=${destination.lat}&end_lng=${destination.lng}`, {
    method: 'GET',
    headers: lyftHeaders
  }).then(res => res.json());
}

const getLyftProductData = (source) => {
  return fetch(`${LYFT_ROOT}/ridetypes?lat=${source.lat}&lng=${source.lng}`, {
    method: 'GET',
    headers: lyftHeaders
  }).then(res => res.json());
}

const formatLyftPriceEstimates = (prices, products) => {
  return prices.map(price => {
    const product = products.find(product => product.display_name === price.display_name)
    const modal = <LyftModal price={price} product={product}/>
    return {
      service: modal,
      estimate: `$${(price.estimated_cost_cents_min/100).toFixed()}-${(price.estimated_cost_cents_max/100).toFixed()}`,
      duration: (price.estimated_duration_seconds/60).toFixed(),
      distance: price.estimated_distance_miles,
      driver: `$${(price.estimated_cost_cents_min * .8/100).toFixed()}-${(price.estimated_cost_cents_max * .8/100).toFixed()}`
    }
  })
}

const getTaxiPriceData = (source, destination) => {
  return fetch(TAXI_ROOT, {
    method: 'POST',
    headers: taxiHeaders,
    body: JSON.stringify({source, destination})
  }).then(resp => resp.json());
}

const formatTaxiPriceEstimates = (prices) => {
  const modal = <TaxiModal price={prices} />
  return {
    service: modal,
    estimate: `$${(prices.total_fare - prices.tip_amount).toFixed()}-${(prices.total_fare - prices.tip_amount).toFixed()}`,
    duration: (prices.duration/60).toFixed(),
    distance: (prices.distance/1609.344).toFixed(),
    driver: `$${((prices.total_fare - prices.tip_amount)*.66).toFixed()}-${((prices.total_fare - prices.tip_amount)*.66).toFixed()}`
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
    formatUberPriceEstimates
  },
  lyft: {
    getLyftPriceData,
    getLyftProductData,
    formatLyftPriceEstimates
  },
  taxi: {
    getTaxiPriceData,
    formatTaxiPriceEstimates
  }
};
