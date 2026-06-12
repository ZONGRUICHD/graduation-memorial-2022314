import type { Classmate } from '../types'

export const classmates: Classmate[] = [
  {
    id: 'class-8',
    name: '8班',
    tagline: '热烈、直接、总有回应',
    motto: '把每一次并肩站在一起的时刻，都记成以后还会想起的名字。',
    bio:
      '这一页先用班级卡片承接真实内容，后续可以逐步替换为 8 班每位同学的姓名、头像、关键词和毕业留言。',
    image: '/media/graduation-award.webp',
    tags: ['8班', '名录预留', '可扩展'],
  },
  {
    id: 'class-9',
    name: '9班',
    tagline: '安静里有力量，日常里有光',
    motto: '很多看起来普通的课间和晚自习，后来都成了最舍不得删掉的记忆。',
    bio:
      '当前先展示班级级别的占位卡，下一步可以按真实名单拆成个人卡片，支持搜索、标签和一句话介绍。',
    image: '/media/graduation-group.webp',
    tags: ['9班', '名录预留', '搜索支持'],
  },
  {
    id: 'class-10',
    name: '10班',
    tagline: '在跑道、教室和舞台之间一起长大',
    motto: '有些同窗情谊不是突然发生的，是在三年里一点点累积起来的。',
    bio:
      '这里已经保留好了最终结构，后面只需要把真实同学资料填进来，不需要再改页面骨架。',
    image: '/media/sports-aerial.webp',
    tags: ['10班', '毕业册', '资料待补'],
  },
]
