'use client'

import Link from 'next/link'
import { useMemo, useState } from 'react'

type ProjectListItem = {
  id: string
  slug: string
  title: string
  status: string
  location: string
  year?: number
  summary: string
  tags: string[]
}

export default function ProjectsClient({ projects }: { projects: ProjectListItem[] }) {
  const [query, setQuery] = useState('')
  const [year, setYear] = useState('')

  const yearOptions = useMemo(() => {
    const years = Array.from(new Set(projects.map((p) => p.year).filter((y): y is number => typeof y === 'number')))
    years.sort((a, b) => b - a)
    return years
  }, [projects])

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    return projects.filter((p) => {
      const matchesYear = year ? String(p.year ?? '') === year : true
      const haystack = `${p.title} ${p.summary} ${p.location} ${p.tags.join(' ')}`.toLowerCase()
      const matchesQuery = q ? haystack.includes(q) : true
      return matchesYear && matchesQuery
    })
  }, [projects, query, year])

  return (
    <>
      <div className="mt-12" id="filters">
        <div className="rounded-[10px] border border-muted/30 bg-paper p-6">
          <div className="grid gap-4 md:grid-cols-[1fr_220px]">
            <input
              type="text"
              placeholder="Search projects…"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full rounded-[10px] border border-muted/30 bg-paper px-4 py-3 text-ink placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-blush"
            />
            <select
              value={year}
              onChange={(e) => setYear(e.target.value)}
              className="w-full rounded-[10px] border border-muted/30 bg-paper px-4 py-3 text-ink focus:outline-none focus:ring-2 focus:ring-blush"
            >
              <option value="">All Years</option>
              {yearOptions.map((y) => (
                <option key={y} value={String(y)}>
                  {y}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div className="mt-10 space-y-6" id="list">
        {filtered.map((project) => (
          <Link key={project.id} href={`/projects/${project.slug}`} className="group border-0 block">
            <div className="bg-paper p-8 rounded-[10px] border border-muted/30 hover:border-blush transition-colors hover:-translate-y-[1px] hover:shadow-sm">
              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
                <div className="flex-1">
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-semibold uppercase tracking-[0.16em] text-muted">{project.status}</span>
                    <span className="text-xs font-semibold uppercase tracking-[0.16em] text-muted">•</span>
                    <span className="text-xs font-semibold uppercase tracking-[0.16em] text-muted">{project.location}</span>
                  </div>

                  <h2 className="mt-3 text-2xl font-serif font-bold text-ink group-hover:underline group-hover:decoration-muted/50 group-hover:underline-offset-4">
                    {project.title}
                  </h2>

                  <p className="mt-3 text-deep/80 leading-relaxed">{project.summary || '—'}</p>

                  <div className="mt-5 flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="inline-flex rounded-full border border-muted/30 bg-mist px-4 py-2 text-[13px] uppercase tracking-[0.12em] text-deep"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="min-w-[140px] text-right">
                  <div className="text-xs uppercase tracking-[0.16em] text-muted">Year</div>
                  <div className="mt-2 text-lg font-semibold text-ink">{project.year ?? '—'}</div>
                </div>
              </div>
            </div>
          </Link>
        ))}

        {filtered.length === 0 ? (
          <div className="rounded-[10px] border border-muted/30 bg-paper p-8 text-deep/80">
            No projects match your filters.
          </div>
        ) : null}
      </div>
    </>
  )
}
