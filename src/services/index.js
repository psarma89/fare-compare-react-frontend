import React from 'react'

const API_ROOT = `http://localhost:3000/api/v1`;

const headers = {
  'Content-Type': 'application/json',
  'Accepts': 'application/json'
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
  return fetch(`${API_ROOT}/auth/`, {
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

export const adapter = {
  auth: {
    login,
    signup,
    update,
    getCurrentUser
  }
};
