import Link from 'next/link'

export function Navigation() {
  return (
    <nav className="border-b border-stone-800 bg-stone-950">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-5">
        <Link
          href="/"
          className="font-semibold tracking-wide text-stone-100 transition hover:text-white"
        >
          Stećak Oracle
        </Link>

        <div className="flex gap-6 text-sm">
          <Link
            href="/stecci"
            className="text-stone-400 transition hover:text-stone-100"
          >
            Stećci
          </Link>

          <Link
            href="/motifs"
            className="text-stone-400 transition hover:text-stone-100"
          >
            Motifs
          </Link>

          <Link
            href="/sources"
            className="text-stone-400 transition hover:text-stone-100"
          >
            Sources
          </Link>
          <Link
            href="/oracle"
            className="text-stone-400 transition hover:text-stone-100"
          >
            Oracle
          </Link>
        </div>
      </div>
    </nav>
  )
}
