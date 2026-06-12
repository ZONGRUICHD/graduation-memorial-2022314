import type { TeacherNote } from '../types'

export const teachers: TeacherNote[] = [
  {
    id: 'teacher-team',
    name: '班主任与任课老师',
    subject: '恩师寄语展示区',
    portrait: '/media/graduation-teacher.webp',
    message:
      '这一栏已经预留好正式版样式，后续只需要补充老师姓名、学科与真实寄语，就能直接替换上线。',
  },
  {
    id: 'teacher-stage',
    name: '毕业典礼舞台时刻',
    subject: '真实素材已接入',
    portrait: '/media/graduation-award.webp',
    message:
      '当前首版先接入真实现场照片，让页面从示例稿进入可用状态；老师内容可以在下一轮继续补完。',
  },
  {
    id: 'grade-team',
    name: '九年级教师组',
    subject: '后续可继续细化',
    portrait: '/media/graduation-group.webp',
    message:
      '如果你后面提供老师名单或寄语文档，这里可以继续扩展为更完整的恩师墙和教师专题页。',
  },
]
