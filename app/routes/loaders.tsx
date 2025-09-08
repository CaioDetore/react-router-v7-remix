import { Link, Outlet } from "react-router";
import type { Route } from "./+types/loaders";

export type Brewery = {
  id: string;
  name: string;
  brewery_type: string;
  address_1: string;
  address_2: string | null;
  address_3: string | null;
  city: string;
  state_province: string;
  postal_code: string;
  country: string;
  longitude: number;
  latitude: number;
  phone: string;
  website_url: string;
  state: string;
  street: string;
};

export async function loader() {
  const response = await fetch("https://api.openbrewerydb.org/v1/breweries");
  const breweries = (await response.json()) as Brewery[];

  return {
    title: "RR7",
    breweries,
  };
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
