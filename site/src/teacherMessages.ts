export type TeacherMessage = {
  id: string
  name: string
  subject: string
  message: string
  portrait?: string
}

// Only verified messages belong here. The archive stays hidden while this is empty.
export const teacherMessages: TeacherMessage[] = []
