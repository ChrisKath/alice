import { NextApiRequest, NextApiResponse } from 'next'
import { formatISO } from 'date-fns'
import { Role } from '@/constants'
import type { User } from '@/types'

export default async function handler(req: NextApiRequest, res: NextApiResponse<User>) {
  switch (req.method) {
    case 'GET':
      res.json({
        uid: 1,
        role: Role.MEMBER,
        avatar: '/static/media/default-avatar.png',
        displayName: 'display name',
        bio: 'Lorem ipsum dolor sit amet',
        createdAt: formatISO(new Date()),
        updatedAt: formatISO(new Date())
      })
      break

    default:
      res.setHeader('Allow', ['GET'])
      res.status(405)
      res.end(`Method ${req.method} Not Allowed`)
  }
}
