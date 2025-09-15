import { getBreweries } from "~/services/beer";
import { BreweriesList } from "~/features/breweries/list";


export async function loader() {
  return await getBreweries()
}

export default BreweriesList
