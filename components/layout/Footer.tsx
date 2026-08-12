export default function Footer() {
  return (
    <footer className="border-t border-neutral-200 bg-white text-neutral-400">
      <div className="mx-auto flex max-w-7xl flex-col items-center px-6 py-7">
        <nav className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-[11px]">
          <a href="/terms" className="transition hover:text-neutral-700">
            Terms
          </a>

          <span className="text-neutral-200">|</span>

          <a href="/privacy" className="transition hover:text-neutral-700">
            Privacy
          </a>

          <span className="text-neutral-200">|</span>

          <a href="/cookies" className="transition hover:text-neutral-700">
            Cookies
          </a>

          <span className="text-neutral-200">|</span>

          <a href="/contact" className="transition hover:text-neutral-700">
            Contact
          </a>
        </nav>

        <p className="mt-5 text-[10px] text-neutral-400">
          © {new Date().getFullYear()} Maldo Brands. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
