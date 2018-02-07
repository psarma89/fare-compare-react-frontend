export const testAPI = () => {

  // fetch('https://api.uber.com/v1.2/estimates/price?start_latitude=37.7752315&start_longitude=-122.418075&end_latitude=37.7752415&end_longitude=-122.518075', {method: 'GET', headers: {'Authorization': 'Token tCPHcqEtRrruUOc5VZMFT7BVOafEu2W_dYyM2akV','Accept-Language': 'en_US', 'Content-Type': 'application/json'}}).then(resp => resp.json()).then(uber => console.log('Uber ESTIMATE', uber))
  //
  // fetch('https://api.uber.com/v1.2/estimates/time?start_latitude=40.7050689&start_longitude=-74.0143287', {method: 'GET', headers: {'Authorization': 'Token tCPHcqEtRrruUOc5VZMFT7BVOafEu2W_dYyM2akV','Accept-Language': 'en_US', 'Content-Type': 'application/json'}}).then(resp => resp.json()).then(uber => console.log('Uber ETA', uber))

  // fetch('https://api.uber.com/v1.2/products?latitude=40.7102496&longitude=-74.0092132', {method: 'GET', headers: {'Authorization': 'Token tCPHcqEtRrruUOc5VZMFT7BVOafEu2W_dYyM2akV','Accept-Language': 'en_US', 'Content-Type': 'application/json'}}).then(resp => resp.json()).then(uber => console.log('Uber Products', uber))

  // fetch('https://api.lyft.com/v1/eta?lat=40.7050689&lng=-74.0143287', {method: 'GET', headers: {'Authorization': 'Bearer 6lKymAETJscXPbFbID9+vU32drXfImUyHOkJIUgl/lTzLRg0f0sBk21mQ1oaQYhs/sxjdUqi2d+SG7j2NVtxuT20x6VgvYYe2oW5X9TuzpuWYTtVm1orGRs='}}).then(resp => resp.json()).then(lyft => console.log('Lyft ETA', lyft))
  //
  // fetch('https://api.lyft.com/v1/cost?start_lat=37.7763&start_lng=-122.3918&end_lat=37.7972&end_lng=-122.4533', {method: 'GET', headers: {'Authorization': 'Bearer 6lKymAETJscXPbFbID9+vU32drXfImUyHOkJIUgl/lTzLRg0f0sBk21mQ1oaQYhs/sxjdUqi2d+SG7j2NVtxuT20x6VgvYYe2oW5X9TuzpuWYTtVm1orGRs='}}).then(resp => resp.json()).then(lyft => console.log('Lyft estimates', lyft))
  //
  // fetch('https://api.taxifarefinder.com/fare?key=fEfaswEWrUZ4&origin=42.368025,-71.022155&destination=42.362571,-71.055543').then(resp => resp.json()).then(output => console.log(output))
}
