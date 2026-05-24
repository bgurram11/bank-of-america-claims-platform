export interface Claim {
  id: number
  claimNumber: string
  claimantName: string
  type: string
  description: string
  amount: number
  status: 'PENDING' | 'IN_REVIEW' | 'APPROVED' | 'REJECTED'
  submittedBy: string
  createdAt: string
}

export interface AuthResponse {
  token: string
  username: string
}
