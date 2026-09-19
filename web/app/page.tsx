import { sanityClient } from '../lib/sanity'

type Stats = {
  stecci: number
  motifs: number
  sources: number
}

async function getStats(): Promise<Stats> {
  return sanityClient.fetch(`
    {
      "stecci": count(*[_type == "stecak"]),
      "motifs": count(*[_type == "motif"]),
      "sources": count(*[_type == "source"])
    }
  `)
}

export default async function Home() {
  const stats = await getStats()

  return (
    <main className="min-h-screen bg-stone-950 text-stone-100">
      <section className="mx-auto flex min-h-screen max-w-5xl flex-col justify-center px-6 py-20">
        <p className="mb-4 text-sm uppercase tracking-[0.3em] text-stone-400">
          Stećak Oracle
        </p>

        <h1 className="max-w-3xl text-5xl font-semibold tracking-tight sm:text-6xl">
          Explore the stories carved in medieval stone.
        </h1>

        <p className="mt-6 max-w-2xl text-lg leading-8 text-stone-300">
          Discover stećci, their locations, motifs, historical context and
          documented sources through a structured knowledge base.
        </p>

        <div className="mt-10 flex flex-col gap-4 sm:flex-row">
          <a
            href="/stecci"
            className="rounded-full bg-stone-100 px-6 py-3 text-center font-medium text-stone-950 transition hover:bg-white"
          >
            Explore Stećci
          </a>

          <a
            href="/motifs"
            className="rounded-full border border-stone-700 px-6 py-3 text-center font-medium text-stone-200 transition hover:border-stone-500"
          >
            Explore Motifs
          </a>
        </div>

        <div className="mt-20 grid gap-6 sm:grid-cols-3">
          <div className="rounded-2xl border border-stone-800 bg-stone-900/60 p-6">
            <p className="text-3xl font-semibold">{stats.stecci}</p>
            <p className="mt-2 text-sm text-stone-400">Stećak records</p>
          </div>

          <div className="rounded-2xl border border-stone-800 bg-stone-900/60 p-6">
            <p className="text-3xl font-semibold">{stats.motifs}</p>
            <p className="mt-2 text-sm text-stone-400">Documented motifs</p>
          </div>

          <div className="rounded-2xl border border-stone-800 bg-stone-900/60 p-6">
            <p className="text-3xl font-semibold">{stats.sources}</p>
            <p className="mt-2 text-sm text-stone-400">Research sources</p>
          </div>
        </div>
      </section>
    </main>
  )
}
