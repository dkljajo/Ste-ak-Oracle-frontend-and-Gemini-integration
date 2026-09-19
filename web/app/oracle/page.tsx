'use client'

import { useState } from 'react'

export default function OraclePage() {
  const [question, setQuestion] = useState('')
  const [answer, setAnswer] = useState('')
  const [loading, setLoading] = useState(false)

  async function askOracle() {
    if (!question.trim()) return

    setLoading(true)
    setAnswer('')

    try {
      const response = await fetch('/api/oracle', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ question }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to get an answer.')
      }

      setAnswer(data.answer)
    } catch (error) {
      setAnswer(
        error instanceof Error
          ? error.message
          : 'Something went wrong.',
      )
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="min-h-screen bg-stone-950 text-stone-100">
      <section className="mx-auto max-w-4xl px-6 py-20">
        <p className="text-sm uppercase tracking-[0.3em] text-stone-400">
          Stećak Oracle
        </p>

        <h1 className="mt-4 text-4xl font-semibold sm:text-5xl">
          Ask the Oracle
        </h1>

        <p className="mt-4 max-w-2xl text-lg leading-8 text-stone-300">
          Ask a question about stećci, motifs, history or documented evidence.
        </p>

        <div className="mt-10">
          <textarea
            value={question}
            onChange={(event) => setQuestion(event.target.value)}
            placeholder="What does the sword motif on a stećak represent?"
            className="min-h-40 w-full rounded-2xl border border-stone-700 bg-stone-900/60 p-5 text-stone-100 outline-none placeholder:text-stone-500 focus:border-stone-500"
          />

          <button
            onClick={askOracle}
            disabled={loading || !question.trim()}
            className="mt-4 rounded-full bg-stone-100 px-6 py-3 font-medium text-stone-950 transition hover:bg-white disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading ? 'Asking Oracle...' : 'Ask Oracle'}
          </button>
        </div>

        <section className="mt-16 rounded-2xl border border-stone-800 bg-stone-900/60 p-6">
          <p className="text-sm uppercase tracking-wider text-stone-500">
            Answer
          </p>

          <p className="mt-4 whitespace-pre-line leading-8 text-stone-300">
            {answer ||
              'The Oracle will use documented information from the Stećak Oracle knowledge base to answer your question.'}
          </p>
        </section>
      </section>
    </main>
  )
}
