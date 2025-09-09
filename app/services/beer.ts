import { cache, TTL } from "./cache";

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

export async function getBrewery(id: string) {
  const cacheKey = `brewery:${id}`;
  const cachedBrewery = await cache.get(cacheKey);

  if (cachedBrewery) {
    return JSON.parse(cachedBrewery) as Brewery;
  }

  const response = await fetch(`https://api.openbrewerydb.org/v1/breweries/${id}`);
  const brewerie = (await response.json()) as Brewery;

  const brewerieJson = JSON.stringify(brewerie);
  await cache.set(cacheKey, brewerieJson);
  await cache.expire(cacheKey, TTL);

  return brewerie
}

export async function getBreweries() {
  const cachedBreweries = await cache.get('breweries')

  if (cachedBreweries) {
    return JSON.parse(cachedBreweries) as Brewery[]
  }

  const response = await fetch("https://api.openbrewerydb.org/v1/breweries");
  const breweries = (await response.json()) as Brewery[];

  const breweriesJson = JSON.stringify(breweries)

  await cache.set("breweries", breweriesJson)
  await cache.expire("breweries", TTL)

  return {
    title: "RR7",
    breweries,
  };
}