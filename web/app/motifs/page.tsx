import { sanityClient } from '../../lib/sanity'

type Motif = {
  _id: string
  name: string
  description?: string
  interpretations?: string[]
  caution?: string
}

async function getMotifs(): Promise<Motif[]> {
  return sanityClient.fetch(`
    *[_type == "motif"] | order(name asc) {
      _id,
      name,
      description,
      interpretations,
      caution
    }
  `)
}

export default async function MotifsPage() {
  const motifs = await getMotifs()

  return (
    <main className="min-h-screen bg-stone-950 text-stone-100">
      <section className="mx-auto max-w-5xl px-6 py-20">
        <p className="text-sm uppercase tracking-[0.3em] text-stone-400">
          Stećak Oracle
        </p>

        <h1 className="mt-4 text-4xl font-semibold">
          Motifs
        </h1>

        <p className="mt-4 max-w-2xl text-stone-300">
          Explore documented motifs found on stećci and the interpretations
          associated with them.
        </p>

        <div className="mt-10 grid gap-6">
          {motifs.map((motif) => (
            <article
              key={motif._id}
              className="rounded-2xl border border-stone-800 bg-stone-900/60 p-6"
            >
              <h2 className="text-2xl font-semibold">
                {motif.name}
              </h2>

              {motif.description && (
                <p className="mt-4 leading-7 text-stone-300">
                  {motif.description}
                </p>
              )}

              {motif.interpretations && motif.interpretations.length > 0 && (
                <div className="mt-6">
                  <h3 className="text-sm font-semibold uppercase tracking-wider text-stone-400">
                    Possible interpretations
                  </h3>

                  <ul className="mt-3 space-y-2">
                    {motif.interpretations.map((interpretation, index) => (
                      <li
                        key={index}
                        className="text-stone-300"
                      >
                        {interpretation}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {motif.caution && (
                <div className="mt-6 rounded-xl border border-stone-700 bg-stone-950/60 p-4">
                  <p className="text-sm font-semibold text-stone-200">
                    Interpretation caution
                  </p>

                  <p className="mt-2 text-sm leading-6 text-stone-400">
                    {motif.caution}
                  </p>
                </div>
              )}
            </article>
          ))}
        </div>
      </section>
    </main>
  )
}
