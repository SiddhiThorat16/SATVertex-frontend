// SATVertex/SATVertex-frontend/src/api/messages.js

import api from '../lib/apiClient'

export async function fetchMessages() {
  const res = await api.get('/contact')
  return res.data.messages || []  // Extract array from { messages: [...], total: X }
}
