import { GoogleGenAI } from '@google/genai'
import { NextResponse } from 'next/server'
import { sanityClient } from '../../../lib/sanity'

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
})

async function getKnowledgeBase() {
  return sanityClient.fetch(`
    {
      "stecci": *[_type == "stecak"] {
        name,
        location,
        region,
        period,
        description,
        inscription,
        historicalContext,
        motifs[]-> {
          name,
          description,
          interpretations,
          caution
        },
        sources[]-> {
          title,
          url,
          publisher,
          sourceType,
          notes
        }
      },
      "motifs": *[_type == "motif"] {
        name,
        description,
        interpretations,
        caution
      },
      "sources": *[_type == "source"] {
        title,
        url,
        publisher,
        sourceType,
        notes
      }
    }
  `)
}

export async function POST(request: Request) {
  try {
    const { question } = await request.json()

    const knowledgeBase = await getKnowledgeBase()


    if (!question || typeof question !== 'string') {
      return NextResponse.json(
        { error: 'Question is required.' },
        { status: 400 },
      )
    }

    const response = await ai.models.generateContent({
      model: 'gemini-3.5-flash-lite',
      contents: `
Here is the knowledge base from Sanity:

${JSON.stringify(knowledgeBase, null, 2)}


You are the Stećak Oracle, an educational assistant about medieval stećci.

Answer this question clearly and carefully:

${question}

Important:
- Do not invent historical facts.
- Distinguish documented facts from interpretation.
- If the available information is insufficient, say so.
- Keep the answer concise.
`,
    })

    return NextResponse.json({
      answer: response.text ?? 'No answer was generated.',
    })
  } catch (error) {
    console.error('Oracle error:', error instanceof Error ? error.message : error)

    return NextResponse.json(
      { error: 'Failed to generate an answer.' },
      { status: 500 },
    )
  }
}
