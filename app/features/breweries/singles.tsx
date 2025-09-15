import { useLoaderData } from "react-router"
import type { Brewery } from "~/services/beer"

export function SingleBrewery() {
  const brewery = useLoaderData() as Brewery

  return (
    <div className="p-6 bg-slate-800 rounded-lg shadow flex flex-col gap-3 border border-slate-700 max-w-xl mx-auto text-white">
      <h2 className="text-2xl font-bold text-blue-400 mb-1">{brewery.name}</h2>
      <span className="text-base text-slate-300 capitalize">{brewery.brewery_type.replace('_', ' ')}</span>
      <span className="text-sm text-slate-400">
        {brewery.city} - {brewery.state_province || brewery.state} ({brewery.country})
      </span>
      <span className="text-sm text-slate-400">{brewery.street || brewery.address_1}</span>
      {brewery.phone && (
        <span className="text-sm text-slate-400">📞 {brewery.phone}</span>
      )}
      {brewery.website_url && (
        <a
          href={brewery.website_url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm text-blue-300 hover:text-blue-200 hover:underline"
        >
          🌐 Site
        </a>
      )}
    </div>
  )
}