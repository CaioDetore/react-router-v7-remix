import { Link, Outlet, useLoaderData } from "react-router";
import type { Brewery } from "~/services/beer";

export function BreweriesList() {
  const loaderData = useLoaderData<{ title: String, breweries: Brewery[] }>()

  if (!loaderData) return null

  return (
    <>
      <h2>{loaderData.title}</h2>

      <section className="grid grid-cols-2 gap-6 p-5">
        <ul className="space-y-4">
          {loaderData.breweries.map((brewery) => (
            <li
              key={brewery.id}
              className="p-5 bg-slate-800 rounded-lg shadow hover:shadow-lg transition-shadow flex flex-col gap-2 border border-slate-700"
            >
              <Link
                prefetch="intent"
                to={`/cervejarias/${brewery.id}`}
                className="text-xl font-bold text-blue-400 hover:underline"
              >
                {brewery.name}
              </Link>
              <span className="text-sm text-slate-300 capitalize">{brewery.brewery_type.replace('_', ' ')}</span>
              <span className="text-sm text-slate-400">
                {brewery.city} - {brewery.state_province || brewery.state} ({brewery.country})
              </span>
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
            </li>
          ))}
        </ul>

        <div className="bg-slate-700 p-5 rounded-md">

          <Outlet />
        </div>
      </section>
    </>
  )
}

