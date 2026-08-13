export default function Footer() {
  return (
    <footer className="border-t border-neutral-200 bg-white text-neutral-400">
      <div className="mx-auto flex max-w-7xl flex-col items-center px-6 py-7">
        <nav className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-[11px]">
          <a href="/about" className="transition hover:text-neutral-700">
            About GZM
          </a>

          <span className="text-neutral-200">|</span>

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

          <a
            href="/affiliate-disclosure"
            className="transition hover:text-neutral-700"
          >
            Affiliate Disclosure
          </a>

          <span className="text-neutral-200">|</span>

          <a
            href="/vendor-disclaimer"
            className="transition hover:text-neutral-700"
          >
            Vendor Disclaimer
          </a>
        </nav>

        <p className="mt-4 max-w-xl text-center text-[10px] leading-relaxed text-neutral-400">
          GZM is a fashion discovery platform featuring curated looks and
          products from third-party brands and retailers. Products are sold
          directly by the respective vendors. Some links may be affiliate links,
          through which GZM may earn a commission at no additional cost to you.
        </p>

        <p className="mt-4 text-[10px] text-neutral-400">
          © {new Date().getFullYear()} GZM Fashion. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
