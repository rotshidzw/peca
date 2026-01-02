import Link from 'next/link';

export function Footer() {
  return (
    <footer className="border-t border-slate-200 py-10 dark:border-slate-800">
      <div className="container flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-sm font-semibold">Peca Journal</p>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Publishing thoughtful travel intelligence and global culture coverage.
          </p>
        </div>
        <div className="flex gap-6 text-sm text-slate-500 dark:text-slate-400">
          <Link href="/contact" className="hover:text-slate-900 dark:hover:text-slate-100">
            Contact
          </Link>
          <Link href="/search" className="hover:text-slate-900 dark:hover:text-slate-100">
            Search
          </Link>
          <Link href="/rss.xml" className="hover:text-slate-900 dark:hover:text-slate-100">
            RSS
          </Link>
        </div>
      </div>
    </footer>
  );
}
