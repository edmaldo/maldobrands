import LegalHeader from "@/components/layout/LegalHeader";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white text-neutral-800">
      <LegalHeader />

      <main>
        {/* Page Header */}
        <section className="border-b border-neutral-200">
          <div className="mx-auto max-w-4xl px-6 py-12 text-center md:py-16">
            <p className="mb-3 text-[11px] uppercase tracking-[0.18em] text-neutral-400">
              GZM
            </p>

            <h1 className="text-4xl font-light tracking-tight text-neutral-900 md:text-5xl">
              About GZM
            </h1>
          </div>
        </section>

        {/* About Content */}
        <section>
          <div className="mx-auto max-w-3xl px-6 py-10 md:py-14">
            <div className="space-y-12 text-[14px] leading-7 text-neutral-600">
              <div>
                <p className="text-[15px] text-neutral-800">
                  GZM is a fashion discovery and curation platform built around
                  the idea that discovering what to wear should be as inspiring
                  as discovering what to buy.
                </p>

                <p className="mt-5">
                  We curate complete looks from across contemporary fashion and
                  bring the individual pieces together in one place, making it
                  easier to explore the relationships between clothing,
                  accessories, brands, and aesthetics.
                </p>
              </div>

              <div>
                <h2 className="mb-4 text-lg font-medium text-neutral-900">
                  What GZM Does
                </h2>

                <p>
                  GZM showcases curated outfits assembled from products offered
                  by third-party brands and retailers. Our role is discovery and
                  curation: we organize fashion into looks and provide a path to
                  the products that make those looks possible.
                </p>

                <p className="mt-5">
                  GZM is not generally the seller of the products featured on
                  the platform. When you choose to shop a product, you may be
                  directed to the retailer that sells it.
                </p>
              </div>

              <div>
                <h2 className="mb-4 text-lg font-medium text-neutral-900">
                  Curation
                </h2>

                <p>
                  GZM is built around curation rather than simply presenting a
                  catalog of products. Looks may be organized by season,
                  aesthetic, category, or other points of view to help make
                  contemporary fashion easier to explore.
                </p>
              </div>

              <div>
                <h2 className="mb-4 text-lg font-medium text-neutral-900">
                  Shopping Through GZM
                </h2>

                <p>
                  Product links on GZM may lead to independent brands,
                  retailers, or other third-party websites. Those businesses are
                  responsible for the products they sell and for any resulting
                  transactions.
                </p>

                <p className="mt-5">
                  GZM may also participate in affiliate programs. This means we
                  may receive a commission from qualifying purchases made
                  through certain links, at no additional cost to you.
                </p>
              </div>

              <div>
                <h2 className="mb-4 text-lg font-medium text-neutral-900">
                  Independent From Our Vendors
                </h2>

                <p>
                  The appearance of a brand or product on GZM does not
                  necessarily indicate a sponsorship, endorsement, or formal
                  partnership with that brand or retailer.
                </p>

                <p className="mt-5">
                  For more information about how GZM works with product links
                  and retailers, see our{" "}
                  <a
                    href="/affiliate-disclosure"
                    className="text-neutral-900 underline underline-offset-4 transition hover:text-neutral-500"
                  >
                    Affiliate Disclosure
                  </a>{" "}
                  and{" "}
                  <a
                    href="/vendor-disclaimer"
                    className="text-neutral-900 underline underline-offset-4 transition hover:text-neutral-500"
                  >
                    Vendor Disclaimer
                  </a>
                  .
                </p>
              </div>

              <div className="border-t border-neutral-200 pt-8">
                <p className="text-[13px] text-neutral-500">
                  For legal or business matters requiring direct communication
                  with GZM, the company may be reached at{" "}
                  <a
                    href="mailto:hello@gzm.fashion"
                    className="text-neutral-700 underline underline-offset-4 transition hover:text-neutral-500"
                  >
                    hello@gzm.fashion
                  </a>
                  .
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
