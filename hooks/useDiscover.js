//hooks/useDiscover.js
import { useState, useMemo } from 'react'
import { filterArticles }    from '../usecases/filterArticles'
import articles              from '../data/repositories/ArticlesRepository.json'

export function useDiscover() {
  const [query, setQuery] = useState('')
  const allArticles = useMemo(() => articles, [])
  const keywords = useMemo(
    () => query.trim().toLowerCase().split(/\s+/).filter(Boolean),
    [query]
  )
  const filtered = useMemo(
    () => filterArticles(allArticles, keywords),
    [allArticles, keywords]
  )
  return { query, setQuery, filtered }
}
