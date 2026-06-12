import { useState } from 'react'

import { memories, memoryCategories } from '../data/memories'

export function MemoriesPage() {
  const [category, setCategory] = useState<(typeof memoryCategories)[number]['value']>('all')

  const visibleMemories =
    category === 'all' ? memories : memories.filter((item) => item.category === category)

  return (
    <div className="page-stack">
      <section className="page-hero">
        <p className="section-kicker">时光机</p>
        <h1>那些发着光的片段，不该只留在手机相册和硬盘里。</h1>
        <p className="lead">
          这一页已经开始使用你给的真实素材。后面继续整理照片和视频时，只需要往数据里追加，不用重做页面。
        </p>
        <div className="filter-row">
          {memoryCategories.map((item) => (
            <button
              key={item.value}
              type="button"
              className={item.value === category ? 'filter-chip is-active' : 'filter-chip'}
              onClick={() => setCategory(item.value)}
            >
              {item.label}
            </button>
          ))}
        </div>
      </section>

      <section className="memory-grid">
        {visibleMemories.map((memory) => (
          <article key={memory.id} className="memory-card">
            <img src={memory.image} alt={memory.title} />
            <div className="memory-copy">
              <p className="memory-date">{memory.date}</p>
              <h2>{memory.title}</h2>
              <p className="body-copy">{memory.description}</p>
            </div>
          </article>
        ))}
      </section>
    </div>
  )
}
