import { getBrewery } from "~/services/beer";
import type { Route } from "./+types/cervejaria";
import { ErrorBoundary } from "~/root";

export async function loader({params}: Route.LoaderArgs) {
  return await getBrewery(params.id)
}

export default function ({loaderData}: Route.ComponentProps) {
  return <pre>{JSON.stringify(loaderData, null, 2)}</pre>
}

// o router sempre procuro o error boundary mais proximo de onde estourou o erro
// export function ErrorBoundary() {
//   return <div className="bg-red-100 text-red-600 text-4xl p-5">Deu erro em srsrs</div>
// }

export { ErrorBoundary }