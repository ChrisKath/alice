export type { Dialog, DialogContent, DialogOptions, DialogResults } from './dialog'
export type { Modal, ModalContent, ModalOptions } from './modal'
export type { Notice, NoticeContent, NoticeOptions, NoticeTypes } from './notice'
export type { User } from './user'
export type { ISignatureParams, IRespNonce, IRespToken } from './xhr'

export interface IMedia {
  url: string
  isImage?: boolean
  isVideo?: boolean
  isAudio?: boolean
}

export interface Album {
  id: string
  name: string
  posters: string[]
  directory: AlbumDirectory
}

export interface AlbumDirectory {
  base: string
  episode: string[]
}

export interface Track {
  id: string
  albumId: string
  fileName: string
}
