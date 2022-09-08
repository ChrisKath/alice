import { Role } from '@/constants'

export interface User {
  uid: number
  role: Role
  avatar: string
  displayName: string
  bio?: string
  createdAt: string
  updatedAt: string
}
