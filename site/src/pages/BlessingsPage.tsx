import { useEffect, useState } from 'react'
import type { FormEvent } from 'react'

import { createApiClient } from '../lib/api-client'
import { runtimeConfig } from '../lib/config'
import type { Blessing } from '../types'

const client = createApiClient({
  mode: runtimeConfig.apiMode,
  baseUrl: runtimeConfig.apiBaseUrl,
})

export function BlessingsPage() {
  const [items, setItems] = useState<Blessing[]>([])
  const [status, setStatus] = useState('正在连接祝福墙...')
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    let cancelled = false

    async function loadBlessings() {
      const apiHealthy = await client
        .getHealth()
        .then(() => true)
        .catch(() => false)

      try {
        const result = await client.getBlessings()
        if (!cancelled) {
          setItems(result)

          if (runtimeConfig.apiMode === 'mock') {
            setStatus('当前为示例模式。')
          } else if (apiHealthy) {
            setStatus(runtimeConfig.apiMode === 'prod' ? '已连接正式接口。' : '已连接测试接口。')
          } else {
            setStatus('接口暂未连通，当前展示示例祝福。')
          }
        }
      } catch {
        if (!cancelled) {
          setStatus('祝福墙暂时无法加载，请稍后再试。')
        }
      }
    }

    void loadBlessings()

    return () => {
      cancelled = true
    }
  }, [])

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    const payload = {
      author: String(formData.get('author') || ''),
      role: String(formData.get('role') || ''),
      message: String(formData.get('message') || ''),
    }

    setSubmitting(true)

    try {
      const created = await client.submitBlessing(payload)
      setItems((current) => [created, ...current])
      setStatus('祝福已经收下。')
      event.currentTarget.reset()
    } catch {
      setStatus(
        runtimeConfig.apiMode === 'prod'
          ? '正式接口暂未上线，提交功能稍后恢复。'
          : '提交失败，请检查本机 WSL 接口或稍后重试。',
      )
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="page-stack">
      <section className="page-hero">
        <p className="section-kicker">祝福墙</p>
        <h1>把想说的话留在这里，给很多年后的自己和同学再读一遍。</h1>
        <p className="lead">
          当前接口模式：<strong>{runtimeConfig.apiMode}</strong>。这层前端已经按正式接口结构写好，后面切到云服务器时不用重做页面。
        </p>
      </section>

      <section className="blessings-layout">
        <form className="blessing-form" onSubmit={handleSubmit}>
          <h2>写下一句祝福</h2>
          <label>
            <span>姓名</span>
            <input name="author" placeholder="输入姓名" required />
          </label>
          <label>
            <span>身份</span>
            <input name="role" placeholder="例如：同学、老师、家长" required />
          </label>
          <label>
            <span>留言</span>
            <textarea
              name="message"
              placeholder="写下对高峰学校 2025 届九年级的祝福..."
              rows={5}
              required
            />
          </label>
          <button type="submit" className="primary-button" disabled={submitting}>
            {submitting ? '提交中...' : '提交祝福'}
          </button>
          <p className="status-line">{status}</p>
        </form>

        <div className="blessing-feed">
          {items.map((item) => (
            <article key={item.id} className="blessing-card">
              <p className="quote">{item.message}</p>
              <div className="blessing-meta">
                <strong>{item.author}</strong>
                <span>{item.role}</span>
                <span>{item.createdAt}</span>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  )
}
