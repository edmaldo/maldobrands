import LegalHeader from "@/components/layout/LegalHeader";

export default function VendorDisclaimerPage() {
  return (
    <div className="min-h-screen bg-white text-neutral-800">
      <LegalHeader />

      <main>
        {/* Page Header */}
        <section className="border-b border-neutral-200">
          <div className="mx-auto max-w-4xl px-6 py-12 text-center md:py-16">
            <p className="mb-3 text-[11px] uppercase tracking-[0.18em] text-neutral-400">
              Legal
            </p>

            <h1 className="text-4xl font-light tracking-tight text-neutral-900 md:text-5xl">
              Vendor Disclaimer
            </h1>

            <p className="mt-3 text-sm text-neutral-500">
              Last updated August 13, 2026
            </p>
          </div>
        </section>

        {/* Disclaimer Content */}
        <section>
          <div className="mx-auto max-w-3xl px-6 py-10 md:py-14">
            <div className="space-y-12 text-[14px] leading-7 text-neutral-600">
              {/* Main Disclaimer */}
              <div>
                <div className="border border-neutral-200 px-6 py-6">
                  <p className="text-center text-[15px] leading-7 text-neutral-800">
                    <span className="font-medium">
                      GZM is a fashion discovery platform, not the seller of the
                      products featured on our site.
                    </span>
                  </p>
                </div>

                <p className="mt-6">
                  GZM Fashion (“GZM,” “we,” “us,” or “our”) curates fashion
                  looks and showcases products offered by independent
                  third-party brands, retailers, and vendors.
                </p>

                <p className="mt-5">
                  Unless expressly stated otherwise, GZM does not sell,
                  manufacture, fulfill, ship, or provide customer service for
                  the products featured on the site.
                </p>
              </div>

              {/* Vendor Responsibility */}
              <div>
                <h2 className="mb-4 text-lg font-medium text-neutral-900">
                  1. Vendor Responsibility
                </h2>

                <p>
                  The third-party vendor offering a product is responsible for
                  that product and for the transaction associated with its
                  purchase.
                </p>

                <p className="mt-5">
                  This includes product quality, descriptions, pricing,
                  availability, sizing, inventory, shipping, delivery, returns,
                  exchanges, refunds, warranties, customer service, and any
                  applicable taxes or fees.
                </p>

                <p className="mt-5">
                  If you purchase a product from a vendor after following a link
                  from GZM, your transaction is directly with that vendor.
                </p>
              </div>

              {/* Product Information */}
              <div>
                <h2 className="mb-4 text-lg font-medium text-neutral-900">
                  2. Product Information
                </h2>

                <p>
                  GZM makes reasonable efforts to present useful and accurate
                  information about the products we feature. However, product
                  information may change and may not always reflect the
                  vendor&apos;s most current information.
                </p>

                <p className="mt-5">
                  Prices, availability, colors, sizes, materials, descriptions,
                  promotions, and other product details may change without
                  notice.
                </p>

                <p className="mt-5">
                  Before purchasing, you should verify the current product
                  information directly with the vendor.
                </p>
              </div>

              {/* Third-Party Websites */}
              <div>
                <h2 className="mb-4 text-lg font-medium text-neutral-900">
                  3. Third-Party Websites
                </h2>

                <p>
                  Product links on GZM may take you to websites operated by
                  third parties. These websites are independent of GZM and may
                  have their own terms, privacy policies, and other policies.
                </p>

                <p className="mt-5">
                  GZM does not control or guarantee the content, security,
                  availability, or practices of third-party websites.
                </p>

                <p className="mt-5">
                  You are responsible for reviewing the policies and terms of
                  the vendor before completing a transaction.
                </p>
              </div>

              {/* Purchases and Disputes */}
              <div>
                <h2 className="mb-4 text-lg font-medium text-neutral-900">
                  4. Purchases and Disputes
                </h2>

                <p>
                  Questions, concerns, or disputes regarding a product or
                  purchase should be directed to the vendor that sold the
                  product.
                </p>

                <p className="mt-5">
                  GZM is not responsible for the fulfillment of orders, delivery
                  delays, defective or damaged products, returns, refunds,
                  exchanges, or disputes arising from a transaction between you
                  and a third-party vendor.
                </p>
              </div>

              {/* Affiliate Relationships */}
              <div>
                <h2 className="mb-4 text-lg font-medium text-neutral-900">
                  5. Affiliate Relationships
                </h2>

                <p>
                  Some product links on GZM may be affiliate links. GZM may
                  receive a commission when you make a qualifying purchase
                  through one of these links, at no additional cost to you.
                </p>

                <p className="mt-5">
                  An affiliate relationship does not make GZM the seller of the
                  product or a party to your transaction with the vendor.
                </p>

                <p className="mt-5">
                  For more information, see our{" "}
                  <a
                    href="/affiliate-disclosure"
                    className="text-neutral-900 underline underline-offset-4 transition hover:text-neutral-500"
                  >
                    Affiliate Disclosure
                  </a>
                  .
                </p>
              </div>

              {/* Vendor Independence */}
              <div>
                <h2 className="mb-4 text-lg font-medium text-neutral-900">
                  6. Vendor Independence
                </h2>

                <p>
                  The appearance of a brand, retailer, or product on GZM does
                  not necessarily mean that the vendor has an endorsement,
                  partnership, sponsorship, or other formal relationship with
                  GZM.
                </p>

                <p className="mt-5">
                  GZM may feature products based on their relevance to a
                  particular curated look, category, aesthetic, or editorial
                  direction.
                </p>
              </div>

              {/* Changes */}
              <div>
                <h2 className="mb-4 text-lg font-medium text-neutral-900">
                  7. Changes to This Disclaimer
                </h2>

                <p>
                  We may update this Vendor Disclaimer as GZM&apos;s platform,
                  vendor relationships, and business model evolve. When we make
                  updates, we will change the “Last updated” date at the top of
                  this page.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
