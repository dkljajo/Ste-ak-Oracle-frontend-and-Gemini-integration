import Link from 'next/link'
import { sanityClient } from '../../lib/sanity'

type Stecak = {
  _id: string
  name: string
  slug?: {
    current: string
  }
  location: string
  region?: string
  period?: string
  description?: string
}

async function getStecci(): Promise<Stecak[]> {
  return sanityClient.fetch(`
    *[_type == "stecak"] | order(name asc) {
      _id,
      name,
      slug,
      location,
      region,
      period,
      description
    }
  `)
}

export default async function StecciPage() {
  const stecci = await getStecci()

  return (
    <main className="min-h-screen bg-stone-950 text-stone-100">
      <section className="mx-auto max-w-5xl px-6 py-20">
        <p className="text-sm uppercase tracking-[0.3em] text-stone-400">
          Stećak Oracle
        </p>

        <h1 className="mt-4 text-4xl font-semibold">
          Stećci
        </h1>

        <p className="mt-4 max-w-2xl text-stone-300">
          Explore documented stećak monuments and their historical context.
        </p>

        <div className="mt-10 grid gap-6">
          {stecci.map((stecak) => (
            <Link
              key={stecak._id}
              href={`/stecci/${stecak.slug?.current}`}
              className="block rounded-2xl border border-stone-800 bg-stone-900/60 p-6 transition hover:border-stone-600 hover:bg-stone-900"
            >
              <h2 className="text-2xl font-semibold">
                {stecak.name}
              </h2>

              <p className="mt-2 text-stone-400">
                {stecak.location}
              </p>

              {stecak.period && (
                <p className="mt-2 text-sm text-stone-500">
                  {stecak.period}
                </p>
              )}

              {stecak.description && (
                <p className="mt-4 leading-7 text-stone-300">
                  {stecak.description}
                </p>
              )}

              <p className="mt-5 text-sm font-medium text-stone-400">
                View details →
              </p>
            </Link>
          ))}
        </div>
      </section>
    </main>
  )
}
