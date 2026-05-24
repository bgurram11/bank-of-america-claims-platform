import axios from 'axios'
import type { Claim, AuthResponse } from '../types'

const api = axios.create({ baseURL: '/api' })

api.interceptors.request.use(config => {
  const token = localStorage.getItem('token')
  if (token) config.headers.Authorization = `Bearer ${token}`
  return config
})

export const login = (username: string, password: string) =>
  api.post<AuthResponse>('/auth/login', { username, password })

export const register = (username: string, password: string) =>
  api.post<AuthResponse>('/auth/register', { username, password })

export const getClaims = () =>
  api.get<Claim[]>('/claims')

export const submitClaim = (data: {
  claimantName: string
  type: string
  description: string
  amount: number
}) => api.post<Claim>('/claims', data)

export const updateClaimStatus = (id: number, status: string) =>
  api.patch<Claim>(`/claims/${id}/status?status=${status}`)
