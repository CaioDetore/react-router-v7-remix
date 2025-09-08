import type { Brewery } from "~/routes/loaders";

export async function getBrewery(id: string) {
  const response = await fetch(`https://api.openbrewerydb.org/v1/breweries/${id}`);
  const brewerie = (await response.json()) as Brewery;

  return brewerie
}