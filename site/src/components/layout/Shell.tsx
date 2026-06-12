import type { PropsWithChildren } from 'react'
import { NavLink } from 'react-router-dom'

const navigation = [
  { to: '/', label: '首页', end: true },
  { to: '/classmates', label: '同学录' },
  { to: '/memories', label: '时光机' },
  { to: '/blessings', label: '祝福墙' },
  { to: '/teachers', label: '恩师说' },
]

export function Shell({ children }: PropsWithChildren) {
  return (
    <div className="site-shell">
      <header className="topbar">
        <div className="brand-lockup">
          <span className="brand-kicker">高峰学校 2025届九年级</span>
          <span className="brand-title">8班 · 9班 · 10班毕业纪念</span>
        </div>
        <nav className="topnav" aria-label="主导航">
          {navigation.map((item) => (
            <NavLink
              key={item.to}
              end={item.end}
              to={item.to}
              className={({ isActive }) => (isActive ? 'nav-link is-active' : 'nav-link')}
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
      </header>

      <main className="page-frame">{children}</main>

      <nav className="mobile-nav" aria-label="移动导航">
        {navigation.map((item) => (
          <NavLink
            key={item.to}
            end={item.end}
            to={item.to}
            className={({ isActive }) => (isActive ? 'mobile-link is-active' : 'mobile-link')}
          >
            {item.label}
          </NavLink>
        ))}
      </nav>

      <footer className="site-footer">
        <p>高峰学校 2025届九年级 8班 · 9班 · 10班数字纪念册</p>
        <p>下一步可以继续补充真实同学名录、老师寄语和更多现场影像。</p>
      </footer>
    </div>
  )
}
