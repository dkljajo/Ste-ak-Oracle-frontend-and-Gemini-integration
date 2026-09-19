import { sanityClient } from '../../lib/sanity'

type Source = {
  _id: string
  title: string
  url: string
  publisher?: string
  sourceType?: string
  notes?: string
}

async function getSources(): Promise<Source[]> {
  return sanityClient.fetch(`
    *[_type == "source"] | order(title asc) {
      _id,
      title,
      url,
      publisher,
      sourceType,
      notes
    }
  `)
}

export default async function SourcesPage() {
  const sources = await getSources()

  return (
    <main className="min-h-screen bg-stone-950 text-stone-100">
      <section className="mx-auto max-w-5xl px-6 py-20">
        <p className="text-sm uppercase tracking-[0.3em] text-stone-400">
          Stećak Oracle
        </p>

        <h1 className="mt-4 text-4xl font-semibold">
          Sources & Evidence
        </h1>

        <p className="mt-4 max-w-2xl text-stone-300">
          Explore the documented sources behind the information presented in
          Stećak Oracle.
        </p>

        <div className="mt-10 grid gap-6">
          {sources.map((source) => (
            <article
              key={source._id}
              className="rounded-2xl border border-stone-800 bg-stone-900/60 p-6"
            >
              <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                <h2 className="text-2xl font-semibold">
                  {source.title}
                </h2>

                {source.sourceType && (
                  <span className="w-fit rounded-full border border-stone-700 px-3 py-1 text-xs uppercase tracking-wider text-stone-400">
                    {source.sourceType}
                  </span>
                )}
              </div>

              {source.publisher && (
                <p className="mt-3 text-sm text-stone-400">
                  {source.publisher}
                </p>
              )}

              {source.notes && (
                <p className="mt-5 leading-7 text-stone-300">
                  {source.notes}
                </p>
              )}

              <a
                href={source.url}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 inline-block text-sm font-medium text-stone-100 underline decoration-stone-600 underline-offset-4 transition hover:decoration-stone-300"
              >
                Open source →
              </a>
            </article>
          ))}
        </div>
      </section>
    </main>
  )
}
