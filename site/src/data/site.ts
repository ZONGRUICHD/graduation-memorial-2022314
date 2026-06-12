import type { SiteStat } from '../types'

export const siteContent = {
  schoolName: '高峰学校',
  className: '2025届九年级 8班 · 9班 · 10班',
  headline: '毕业纪念册',
  intro:
    '把三年里最热烈的操场、最安静的教室、最耀眼的舞台，都收进这本可以反复翻看的线上纪念册。',
  footerNote:
    '愿高峰学校 2025 届九年级 8班、9班、10班的少年，带着彼此给过的光，奔向下一段旅程。',
}

export const siteStats: SiteStat[] = [
  { label: '班级单元', value: '3', note: '8班、9班、10班共同收录' },
  { label: '同行时间', value: '1095 天', note: '从初一到毕业典礼' },
  { label: '素材存档', value: '6048 张照片', note: '另有 844 段视频待整理' },
]

export const featuredMemoryIds = ['graduation-group', 'pledge-stage', 'sports-aerial']
