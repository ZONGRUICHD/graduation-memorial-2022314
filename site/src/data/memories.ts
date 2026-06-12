import type { MemoryItem } from '../types'

export const memories: MemoryItem[] = [
  {
    id: 'graduation-group',
    title: '毕业典礼大合影',
    date: '2025.07.01',
    category: 'event',
    description:
      '灯光亮起、幕布拉开，三年里熟悉的老师和同学都站到了同一个舞台上，像是在认真和青春合影。',
    image: '/media/graduation-group.webp',
    featured: true,
  },
  {
    id: 'graduation-award',
    title: '舞台上的高光时刻',
    date: '2025.07.01',
    category: 'event',
    description:
      '接过属于自己的纪念与掌声时，很多平常说不出口的情绪，都在这个夏天被看见了。',
    image: '/media/graduation-award.webp',
  },
  {
    id: 'graduation-teacher',
    title: '老师把祝福说给我们听',
    date: '2025.07.01',
    category: 'campus',
    description:
      '那些站在讲台前说过无数次“再坚持一下”的人，最后一次站上舞台，把不舍和祝福都留给了我们。',
    image: '/media/graduation-teacher.webp',
  },
  {
    id: 'pledge-stage',
    title: '百日誓师的倒计时',
    date: '2025.03.17',
    category: 'study',
    description:
      '距离中考只剩一百天时，整个年级把紧张、勇气和目标都写在了同一块大屏上。',
    image: '/media/pledge-stage.webp',
    featured: true,
  },
  {
    id: 'sports-aerial',
    title: '运动会里的校园全景',
    date: '2025.02.27',
    category: 'sports',
    description:
      '从高处看下去，熟悉的教学楼、跑道和操场都在发光，原来我们真的在这里一起长大了。',
    image: '/media/sports-aerial.webp',
    featured: true,
  },
]

export const memoryCategories = [
  { value: 'all', label: '全部记忆' },
  { value: 'campus', label: '校园瞬间' },
  { value: 'event', label: '典礼活动' },
  { value: 'study', label: '学习时刻' },
  { value: 'sports', label: '运动会场' },
] as const
