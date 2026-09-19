# Stećak Oracle

**Explore the stories carved in medieval stone.**

Stećak Oracle is an educational web application exploring **stećci**, the medieval tombstone monuments found across Bosnia and Herzegovina and neighboring regions.

The project combines a structured **Sanity CMS** knowledge base with a **Next.js** frontend and **Google Gemini** to create an AI-powered interface for exploring historical information, motifs, locations, and documented sources.

Built for the **Sanity Challenge**.

## Features

* Browse documented stećci
* Explore historical motifs
* View locations and historical periods
* Connect monuments with documented sources
* Structured content management through Sanity
* AI-powered "Ask the Oracle" interface
* Gemini answers grounded in the Sanity knowledge base
* Clear distinction between documented information and interpretation
* Responsive dark-themed interface

## How It Works

The application uses three main components:

```text
                    ┌─────────────────┐
                    │     Sanity      │
                    │   Knowledge    │
                    │      Base      │
                    └────────┬────────┘
                             │
                             │ GROQ
                             ▼
                    ┌─────────────────┐
                    │    Next.js      │
                    │    Frontend     │
                    └────────┬────────┘
                             │
                    User asks question
                             │
                             ▼
                    ┌─────────────────┐
                    │     Gemini      │
                    │       AI        │
                    └────────┬────────┘
                             │
                             ▼
                    Grounded response
```

When a user asks the Oracle a question, the application retrieves the relevant structured information from Sanity and provides it to Gemini as its knowledge context.

The model is instructed not to invent historical facts and to distinguish documented information from interpretation.

## Tech Stack

### Frontend

* Next.js
* React
* TypeScript
* Tailwind CSS

### Content

* Sanity
* Sanity Studio
* GROQ

### AI

* Google Gemini
* `@google/genai`

### Development

* Node.js
* npm
* Git
* GitHub

## Content Model

The Sanity schema contains three main document types.

### Stećak

A stećak record contains:

* Name
* Slug
* Location
* Region
* Historical period
* Description
* Inscription
* Historical context
* Motifs
* Sources

### Motif

A motif contains:

* Name
* Description
* Possible interpretations
* Interpretation caution

### Source

A source contains:

* Title
* URL
* Publisher
* Source type
* Notes

This structure allows the AI layer to work with actual structured historical content instead of relying only on a generic language model prompt.

## Example

One of the initial records is a stećak from the **Radimlja necropolis near Stolac, Bosnia and Herzegovina**.

The knowledge base contains information about its location, historical context, associated motifs and documented sources.

For example, asking:

> What does the sword motif on the Radimlja stećak represent?

produces an answer based on the information stored in Sanity.

The application also tells the model to be cautious about interpretation because the meaning of historical motifs cannot always be established with certainty.

## Project Structure

```text
stecak-oracle/
├── web/
│   ├── app/
│   │   ├── api/
│   │   │   └── oracle/
│   │   ├── motifs/
│   │   ├── oracle/
│   │   ├── sources/
│   │   ├── stecci/
│   │   ├── components.tsx
│   │   ├── layout.tsx
│   │   └── page.tsx
│   ├── lib/
│   │   └── sanity.ts
│   └── package.json
│
├── studio/
│   ├── schemaTypes/
│   │   ├── motif.ts
│   │   ├── source.ts
│   │   ├── stecak.ts
│   │   └── index.ts
│   ├── sanity.config.ts
│   └── package.json
│
└── README.md
```

## Running Locally

### 1. Clone the repository

```bash
git clone git@github.com:dkljajo/Ste-ak-Oracle-frontend-and-Gemini-integration.git
cd Ste-ak-Oracle-frontend-and-Gemini-integration
```

### 2. Install frontend dependencies

```bash
cd web
npm install
```

### 3. Configure environment variables

Create:

```text
web/.env.local
```

Add your Gemini API key:

```env
GEMINI_API_KEY=your_gemini_api_key
```

Do not commit `.env.local` or API keys to Git.

### 4. Start the frontend

```bash
npm run dev
```

The Next.js application will be available at:

```text
http://localhost:3000
```

### 5. Start Sanity Studio

In another terminal:

```bash
cd studio
npm install
npm run dev
```

The Sanity Studio provides the interface for creating and managing stećak, motif and source records.

## Environment Variables

The project requires:

```env
GEMINI_API_KEY=
```

The Sanity project configuration is defined in the application code.

For security, API keys are intentionally excluded from Git.

## Design Philosophy

The goal was not to build another generic AI chatbot.

The idea was to create a small, structured cultural knowledge base and then put an AI interface on top of it.

This means:

```text
Structured knowledge
        +
Documented sources
        +
AI interface
        =
Stećak Oracle
```

The Oracle is therefore designed to be useful while remaining transparent about the difference between historical evidence and interpretation.

## What I Learned

This project gave me practical experience with:

* Designing a Sanity content model
* Creating relationships between Sanity documents
* Querying Sanity with GROQ
* Building a Next.js application around CMS data
* Integrating Gemini into a Next.js API route
* Grounding AI responses with application data
* Handling API errors and model availability
* Keeping API credentials outside the repository
* Building an AI feature around structured content instead of an open-ended chatbot

## Future Improvements

Possible next steps include:

* Adding photographs of individual stećci
* Expanding the historical database
* Adding more motifs and interpretations
* Interactive map of stećak locations
* Better source citations in Oracle responses
* Search and filtering
* Multilingual support
* Image-based stećak and motif recognition
* More advanced retrieval from the Sanity knowledge base

## Challenge

This project was created for the **Sanity Challenge**, exploring how Sanity can be used as the structured content foundation for an AI-powered application.

The project combines cultural heritage, structured content and generative AI in one small application.

## Author

**David Kljajo**

DevOps / Cloud / Linux enthusiast from Mostar, Bosnia and Herzegovina.

The project was built as part of my exploration of modern cloud, AI and content-driven application architecture.

## License

This project is intended primarily as a learning and demonstration project.

Historical information should be verified against the original sources referenced by the application.
