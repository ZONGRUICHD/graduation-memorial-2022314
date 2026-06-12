import { Link } from 'react-router-dom'

import { featuredMemoryIds, siteContent, siteStats } from '../data/site'
import { memories } from '../data/memories'

const featuredMemories = memories.filter((item) => featuredMemoryIds.includes(item.id))

export function HomePage() {
  return (
    <div className="page-stack">
      <section className="hero-panel">
        <div className="hero-copy">
          <p className="section-kicker">{siteContent.schoolName}</p>
          <h1>{siteContent.headline}</h1>
          <h2>{siteContent.className}</h2>
          <p className="lead">{siteContent.intro}</p>
          <div className="hero-actions">
            <Link className="primary-button" to="/classmates">
              翻开同学录
            </Link>
            <Link className="ghost-button" to="/blessings">
              留下一句祝福
            </Link>
          </div>
        </div>

        <div className="hero-photo-grid">
          {featuredMemories.map((memory) => (
            <article key={memory.id} className="photo-card">
              <img src={memory.image} alt={memory.title} />
              <div className="photo-card-copy">
                <h3>{memory.title}</h3>
                <p>{memory.date}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="stats-grid" aria-label="纪念数字">
        {siteStats.map((stat) => (
          <article key={stat.label} className="stat-card">
            <p>{stat.label}</p>
            <strong>{stat.value}</strong>
            <span>{stat.note}</span>
          </article>
        ))}
      </section>

      <section className="editorial-panel">
        <div>
          <p className="section-kicker">班级简介</p>
          <h2>把同一段青春，整理成未来还能一页页翻回来的地方。</h2>
        </div>
        <p className="body-copy">
          这一版已经开始接入真实校园素材，不再只是概念设计稿。后面我们还可以继续把真实同学名录、
          老师寄语、更多照片和视频线索补进来，让它慢慢长成一座真正属于你们这一届的纪念站。
        </p>
      </section>
    </div>
  )
}
