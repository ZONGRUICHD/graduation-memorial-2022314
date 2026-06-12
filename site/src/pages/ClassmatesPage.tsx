import { useDeferredValue, useState } from 'react'

import { classmates } from '../data/classmates'

export function ClassmatesPage() {
  const [query, setQuery] = useState('')
  const deferredQuery = useDeferredValue(query)

  const visibleClassmates = classmates.filter((item) => {
    const haystack = `${item.name} ${item.tagline} ${item.tags.join(' ')} ${item.bio}`
    return haystack.toLowerCase().includes(deferredQuery.trim().toLowerCase())
  })

  return (
    <div className="page-stack">
      <section className="page-hero">
        <p className="section-kicker">同学录</p>
        <h1>同学录已经留好骨架，下一步就能继续填进真实名单与照片。</h1>
        <p className="lead">
          这一版先按 8班、9班、10班做结构占位，页面的搜索、标签和卡片样式已经到位，后面替换真实资料会很顺。
        </p>
        <label className="search-field">
          <span>搜索班级或关键词</span>
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="输入班级、标签或说明"
          />
        </label>
      </section>

      <section className="card-grid">
        {visibleClassmates.map((classmate) => (
          <article key={classmate.id} className="person-card">
            <img src={classmate.image} alt={classmate.name} />
            <div className="person-copy">
              <div className="person-header">
                <div>
                  <h2>{classmate.name}</h2>
                  <p>{classmate.tagline}</p>
                </div>
                <span className="badge">{classmate.tags[0]}</span>
              </div>
              <p className="quote">{classmate.motto}</p>
              <p className="body-copy">{classmate.bio}</p>
              <div className="tag-row">
                {classmate.tags.map((tag) => (
                  <span key={tag} className="tag-pill">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </article>
        ))}
      </section>
    </div>
  )
}
