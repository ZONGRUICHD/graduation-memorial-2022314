import { teachers } from '../data/teachers'

export function TeachersPage() {
  return (
    <div className="page-stack">
      <section className="page-hero">
        <p className="section-kicker">恩师说</p>
        <h1>老师这一页已经可以展示，下一步只差把真实寄语填进来。</h1>
        <p className="lead">
          真实现场照片已经接入，这里保留了适合长文阅读的版式，后续补老师姓名、学科和留言会很自然。
        </p>
      </section>

      <section className="teachers-grid">
        {teachers.map((teacher) => (
          <article key={teacher.id} className="teacher-card">
            <img src={teacher.portrait} alt={teacher.name} />
            <div className="teacher-copy">
              <p className="section-kicker">{teacher.subject}</p>
              <h2>{teacher.name}</h2>
              <p className="quote">{teacher.message}</p>
            </div>
          </article>
        ))}
      </section>
    </div>
  )
}
