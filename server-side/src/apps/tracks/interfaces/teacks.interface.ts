export interface Track {
  id: string
  name: string
  albumId: number
  milliseconds: number
  bytes: number
  updatedAt: Date | string
  createdAt: Date | string
}
