import { StatusEnum, GenderEnum } from '@/infrastructure/enum'
export const API_VERSION = {
  V1: '/public/v1',
  V2: '/public/v2'
}

export const API_SERVICES = {
  POSTS: '/posts',
  USERS: '/users',
  COMMENTS: '/comment'
}

export const GENDER_OPTIONS = [
  { label: 'Male', value: GenderEnum.MALE },
  { label: 'Famale', value: GenderEnum.FAMALE }
]

export const STATUS_OPTIONS = [
  { label: 'Active', value: StatusEnum.ACTIVE },
  { label: 'Inactive', value: StatusEnum.INACTIVE }
]
