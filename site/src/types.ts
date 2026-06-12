export interface SiteStat {
  label: string
  value: string
  note: string
}

export interface Classmate {
  id: string
  name: string
  tagline: string
  motto: string
  bio: string
  image: string
  tags: string[]
}

export interface MemoryItem {
  id: string
  title: string
  date: string
  category: 'campus' | 'event' | 'study' | 'sports'
  description: string
  image: string
  featured?: boolean
}

export interface TeacherNote {
  id: string
  name: string
  subject: string
  portrait: string
  message: string
}

export interface Blessing {
  id: string
  author: string
  role: string
  message: string
  createdAt: string
}
