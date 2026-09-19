import { notFound } from 'next/navigation'
import Link from 'next/link'
import { sanityClient } from '../../../lib/sanity'

type Motif = {
  _id: string
  name: string
}

type Source = {
  _id: string
  title: string
  url: string
  publisher?: string
}

type Stecak = {
  _id: string
  name: string
  location: string
  region?: string
  period?: string
  description?: string
  inscription?: string
  historicalContext?: string
  motifs?: Motif[]
  sources?: Source[]
}

async function getStecak(slug: string): Promise<Stecak | null> {
  return sanityClient.fetch(
    `
      *[_type == "stecak" && slug.current == $slug][0] {
        _id,
        name,
        location,
        region,
        period,
        description,
        inscription,
        historicalContext,
        motifs[]-> {
          _id,
          name
        },
        sources[]-> {
          _id,
          title,
          url,
          publisher
        }
      }
    `,
    { slug },
  )
}

export default async function StecakDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const stecak = await getStecak(slug)

  if (!stecak) {
    notFound()
  }

  return (
    <main className="min-h-screen bg-stone-950 text-stone-100">
      <section className="mx-auto max-w-4xl px-6 py-20">
        <Link
          href="/stecci"
          className="text-sm text-stone-500 transition hover:text-stone-200"
        >
          ← Back to Stećci
        </Link>

        <p className="mt-10 text-sm uppercase tracking-[0.3em] text-stone-400">
          Stećak Oracle
        </p>

        <h1 className="mt-4 text-4xl font-semibold sm:text-5xl">
          {stecak.name}
        </h1>

        <p className="mt-4 text-lg text-stone-400">
          {stecak.location}
        </p>

        <div className="mt-8 flex flex-wrap gap-3">
          {stecak.region && (
            <span className="rounded-full border border-stone-700 px-4 py-2 text-sm text-stone-300">
              {stecak.region}
            </span>
          )}

          {stecak.period && (
            <span className="rounded-full border border-stone-700 px-4 py-2 text-sm text-stone-300">
              {stecak.period}
            </span>
          )}
        </div>

        {stecak.description && (
          <section className="mt-12">
            <h2 className="text-xl font-semibold">
              Description
            </h2>

            <p className="mt-4 leading-8 text-stone-300">
              {stecak.description}
            </p>
          </section>
        )}

        {stecak.inscription && (
          <section className="mt-10">
            <h2 className="text-xl font-semibold">
              Inscription
            </h2>

            <p className="mt-4 leading-8 text-stone-300">
              {stecak.inscription}
            </p>
          </section>
        )}

        {stecak.historicalContext && (
          <section className="mt-10">
            <h2 className="text-xl font-semibold">
              Historical Context
            </h2>

            <p className="mt-4 leading-8 text-stone-300">
              {stecak.historicalContext}
            </p>
          </section>
        )}

        {stecak.motifs && stecak.motifs.length > 0 && (
          <section className="mt-12">
            <h2 className="text-xl font-semibold">
              Motifs
            </h2>

            <div className="mt-4 flex flex-wrap gap-3">
              {stecak.motifs.map((motif) => (
                <Link
                  key={motif._id}
                  href="/motifs"
                  className="rounded-full border border-stone-700 px-4 py-2 text-sm text-stone-300 transition hover:border-stone-500 hover:text-stone-100"
                >
                  {motif.name}
                </Link>
              ))}
            </div>
          </section>
        )}

        {stecak.sources && stecak.sources.length > 0 && (
          <section className="mt-12">
            <h2 className="text-xl font-semibold">
              Sources & Evidence
            </h2>

            <div className="mt-4 space-y-4">
              {stecak.sources.map((source) => (
                <div
                  key={source._id}
                  className="rounded-xl border border-stone-800 bg-stone-900/60 p-5"
                >
                  <h3 className="font-semibold">
                    {source.title}
                  </h3>

                  {source.publisher && (
                    <p className="mt-2 text-sm text-stone-500">
                      {source.publisher}
                    </p>
                  )}

                  <a
                    href={source.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 inline-block text-sm text-stone-300 underline decoration-stone-600 underline-offset-4 transition hover:decoration-stone-300"
                  >
                    Open source →
                  </a>
                </div>
              ))}
            </div>
          </section>
        )}
      </section>
    </main>
  )
}
