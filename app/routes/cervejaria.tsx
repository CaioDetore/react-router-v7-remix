import { getBrewery } from "~/services/beer";
import type { Route } from "./+types/cervejaria";
import { ErrorBoundary } from "~/root";
import { SingleBrewery } from "~/features/breweries/singles";

export async function loader({params}: Route.LoaderArgs) {
  return await getBrewery(params.id)
}

export default SingleBrewery

// o router sempre procuro o error boundary mais proximo de onde estourou o erro
// export function ErrorBoundary() {
//   return <div className="bg-red-100 text-red-600 text-4xl p-5">Deu erro em srsrs</div>
// }

export { ErrorBoundary }