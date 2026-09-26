import LegalHeader from "@/components/layout/LegalHeader";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white text-neutral-800">
      <LegalHeader />

      <main>
        {/* Page Header */}
        <section className="border-b border-neutral-200">
          <div className="mx-auto max-w-4xl px-6 py-10 text-center md:py-10">
            <h1 className="font-editorial text-4xl font-light tracking-tight text-neutral-900 md:text-5xl">
              About GZM
            </h1>

            <p className="mx-auto mt-5 max-w-xl text-sm leading-7 text-neutral-500">
              A story-based fashion discovery platform.
            </p>
          </div>
        </section>

        {/* About Content */}
        <section>
          <div className="mx-auto max-w-3xl px-6 py-10 md:py-14">
            <div className="space-y-14 text-[14px] leading-7 text-neutral-600">
              {/* Introduction */}
              <div>
                <h2 className="mb-4 text-lg font-medium text-neutral-900">
                  Stories Worth Wearing
                </h2>

                <p className="mt-5">
                  GZM builds worlds filled with fashionable characters. Users
                  follow the silly and sometimes unfortunate moments of their
                  lives. Ultimately, their stories resolve in a fond memory or a
                  sense of triumph.
                </p>

                <p className="mt-5">
                  GZM includes brands and items from various categories of
                  fashion and function. With our independent editoral freedom we
                  can feature a particular brand if a piece fits an aesthetic,
                  combine products from completely different retailers, or build
                  a look around an idea rather than soley a commercial
                  relationship.
                </p>
              </div>

              {/* Stories */}
              <div>
                <h2 className="mb-4 text-lg font-medium text-neutral-900">
                  Curated Looks
                </h2>

                <p className="mt-5">
                  Our role is discovery and curation. We find interesting pieces
                  and build looks around them. When you want to explore a
                  particular piece, GZM connects you directly to the third-party
                  retailer that sells it.
                </p>

                <p className="mt-5">
                  The result is a way of exploring fashion through contempoary
                  brands defining the moment - no matter the place, time, or
                  situation.
                </p>
              </div>

              {/* Affiliate Model */}
              <div>
                <h2 className="mb-4 text-lg font-medium text-neutral-900">
                  Affiliate Relationships
                </h2>

                <p>
                  Some product links on GZM are affiliate links. When you make a
                  qualifying purchase through one of these links, GZM may
                  receive a commission from the retailer at no additional cost
                  to you.
                </p>

                <p className="mt-5">
                  Affiliate relationships help support GZM and its editorial
                  work. They do not mean that a brand or product has paid to be
                  featured.
                </p>

                <p className="mt-5">
                  A brand’s appearance on GZM does not necessarily indicate
                  sponsorship, endorsement, or a formal partnership with GZM.
                </p>
              </div>

              {/* Brands & Vendors */}
              <div className="border-t border-neutral-200 pt-10">
                <h2 className="mb-4 text-lg font-medium text-neutral-900">
                  For Brands &amp; Vendors
                </h2>

                <p className="mt-5">
                  If you are a brand or vendor interested in being considered
                  for GZM, we'd like to hear from you.
                </p>

                <p className="mt-5">
                  <a
                    href="mailto:hello@gzm.fashion"
                    className="text-neutral-900 underline underline-offset-4 transition hover:text-neutral-500"
                  >
                    Tell us about yourself.
                  </a>
                </p>
              </div>

              {/* Legal Links */}
              <div className="item-center text-center border-t border-neutral-200 pt-8">
                <p className="text-[13px] text-neutral-500">
                  For more information about product links and retailers, see
                  our{" "}
                  <a
                    href="/affiliate-disclosure"
                    className="text-neutral-700 underline underline-offset-4 transition hover:text-neutral-500"
                  >
                    Affiliate Disclosure
                  </a>{" "}
                  and{" "}
                  <a
                    href="/vendor-disclaimer"
                    className="text-neutral-700 underline underline-offset-4 transition hover:text-neutral-500"
                  >
                    Vendor Disclaimer
                  </a>
                  .
                </p>
                <p className="mt-5 text-[13px] text-neutral-500">
                  For legal or business matters requiring direct communication
                  with GZM, reach us{" "}
                  <a
                    href="mailto:hello@gzm.fashion"
                    className="text-neutral-700 underline underline-offset-4 transition hover:text-neutral-500"
                  >
                    here
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
