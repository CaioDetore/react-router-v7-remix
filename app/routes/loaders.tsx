import { Link, Outlet } from "react-router";
import type { Route } from "./+types/loaders";
import { getBreweries } from "~/services/beer";


export async function loader() {
  return await getBreweries()
}

export default function ({ loaderData }: Route.ComponentProps) {
  return (
    <>
      <h2>{loaderData.title}</h2>

      <section className="grid grid-cols-2 gap-6 p-5">
        <ul>
          {loaderData.breweries.map((brewery, idx) => (
            <li
              key={brewery.id}
              className={idx % 2 === 0 ? "p-5 bg-slate-800 rounded" : "p-5 bg-slate-900 rounded"}
            >
              <Link prefetch="intent" to={`/loaders/${brewery.id}`}>{brewery.name}</Link>
            </li>
          ))}
        </ul>

        <div className="bg-slate-700 p-5 rounded-md">

          <Outlet />
        </div>
      </section>


    </>
  );
}
