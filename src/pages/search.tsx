import { FormEvent, useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link'
import { GetServerSideProps } from 'next';
import PrismicDOM from 'prismic-dom'
import Prismic from 'prismic-javascript'
import { Document } from 'prismic-javascript/types/documents'

import { client } from '@/lib/prismic';
interface SearchProps {
  searchResults: Document[];
}

export default function Search({searchResults }: SearchProps) {
  const [search, setSearch] = useState('')

  const router = useRouter()
  
  const handleSearch = (e: FormEvent) => {
    e.preventDefault();

    router.push(`/search?q=${encodeURIComponent(search)}`)

    setSearch('')
  }

  return (
    <div>
      {search}
      <form onSubmit={handleSearch}>
        <input type="text" value={search} onChange={e => setSearch(e.target.value)} />
        <button type='submit'>Search</button>
      </form>

      <ul>
        {searchResults.map(searchResult => (
          <li key={searchResult.id}>
            <Link href={`/catalog/products/${searchResult.uid}`}>
              <a>
                {PrismicDOM.RichText.asText(searchResult.data.title)}
              </a>
            </Link>
          </li>
        ))}
      </ul>      
    </div>
  )
}

export const getServerSideProps: GetServerSideProps<SearchProps> = async (context) => {
  const { q } = context.query

  if (!q) {
    return {
      props: {
        searchResults: []
      }
    }
  }

  const searchResults = await client().query([
    Prismic.Predicates.at('document.type', 'product'),
    Prismic.Predicates.fulltext('my.product.title', String(q)),
  ])

  return {
    props: {
      searchResults: searchResults.results
    }
  }
}