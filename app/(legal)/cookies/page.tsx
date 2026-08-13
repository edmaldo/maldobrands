import LegalHeader from "@/components/layout/LegalHeader";

export default function CookiesPage() {
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
              Cookie Policy
            </h1>

            <p className="mt-3 text-sm text-neutral-500">
              Last updated August 13, 2026
            </p>
          </div>
        </section>

        {/* Cookie Content */}
        <section>
          <div className="mx-auto max-w-3xl px-6 py-10 md:py-14">
            <div className="space-y-12 text-[14px] leading-7 text-neutral-600">
              <div>
                <p>
                  GZM Fashion (“GZM,” “we,” “us,” or “our”) uses cookies and
                  similar technologies to help operate our website, understand
                  how visitors use GZM, and improve the experience of
                  discovering curated fashion looks.
                </p>

                <p className="mt-5">
                  This Cookie Policy explains what cookies are, how they may be
                  used on GZM, and the choices available to you.
                </p>
              </div>

              <div>
                <h2 className="mb-4 text-lg font-medium text-neutral-900">
                  1. What Are Cookies?
                </h2>

                <p>
                  Cookies are small text files that websites may place on your
                  device when you visit them. They can allow a website to
                  recognize your browser, remember certain information, and
                  understand how the site is being used.
                </p>

                <p className="mt-5">
                  GZM may also use technologies that function similarly to
                  cookies, such as local storage, pixels, tags, or other
                  identifiers. We refer to these technologies collectively as
                  “cookies” in this policy.
                </p>
              </div>

              <div>
                <h2 className="mb-4 text-lg font-medium text-neutral-900">
                  2. How GZM May Use Cookies
                </h2>

                <p>
                  Depending on the features and services operating on GZM,
                  cookies may be used for several purposes.
                </p>

                <p className="mt-5">
                  <span className="font-medium text-neutral-800">
                    Essential functionality.
                  </span>{" "}
                  Some cookies or similar technologies may be necessary for the
                  website to function properly, maintain security, or support
                  basic features.
                </p>

                <p className="mt-5">
                  <span className="font-medium text-neutral-800">
                    Preferences.
                  </span>{" "}
                  Cookies may allow GZM to remember certain preferences or
                  settings so that the site can provide a more consistent
                  experience.
                </p>

                <p className="mt-5">
                  <span className="font-medium text-neutral-800">
                    Analytics and performance.
                  </span>{" "}
                  GZM may use analytics technologies to understand how visitors
                  navigate the site, which looks or features are being explored,
                  and how the website can be improved.
                </p>

                <p className="mt-5">
                  <span className="font-medium text-neutral-800">
                    Referral and affiliate tracking.
                  </span>{" "}
                  Some links from GZM may use tracking technologies to
                  understand when a visitor follows a product link to a
                  participating retailer. This may allow GZM or an affiliate
                  partner to attribute a qualifying referral or purchase.
                </p>
              </div>

              <div>
                <h2 className="mb-4 text-lg font-medium text-neutral-900">
                  3. Types of Cookies
                </h2>

                <p>
                  Cookies used by GZM or by services operating on our behalf may
                  generally fall into the following categories:
                </p>

                <div className="mt-6 space-y-6">
                  <div>
                    <h3 className="mb-2 font-medium text-neutral-900">
                      Strictly Necessary Cookies
                    </h3>

                    <p>
                      These cookies support essential website functions and
                      generally cannot be disabled through the site without
                      affecting how the website operates.
                    </p>
                  </div>

                  <div>
                    <h3 className="mb-2 font-medium text-neutral-900">
                      Preference Cookies
                    </h3>

                    <p>
                      These cookies may remember settings or choices that help
                      provide a more personalized or consistent experience.
                    </p>
                  </div>

                  <div>
                    <h3 className="mb-2 font-medium text-neutral-900">
                      Analytics Cookies
                    </h3>

                    <p>
                      These cookies may help us understand traffic, engagement,
                      and general usage patterns so that we can improve GZM.
                    </p>
                  </div>

                  <div>
                    <h3 className="mb-2 font-medium text-neutral-900">
                      Referral Cookies
                    </h3>

                    <p>
                      These technologies may be used in connection with
                      affiliate or referral links to help identify traffic or
                      qualifying purchases originating from GZM.
                    </p>
                  </div>
                </div>
              </div>

              <div>
                <h2 className="mb-4 text-lg font-medium text-neutral-900">
                  4. Third-Party Services
                </h2>

                <p>
                  Some cookies or similar technologies may be placed or operated
                  by third-party services that help GZM provide analytics,
                  security, functionality, or referral tracking.
                </p>

                <p className="mt-5">
                  Third-party services may collect information according to
                  their own privacy policies and terms. GZM does not control the
                  privacy practices of independent third parties.
                </p>

                <p className="mt-5">
                  When you leave GZM through a product or retailer link, the
                  destination website may also use its own cookies and tracking
                  technologies. Those technologies are governed by the policies
                  of the applicable third party, not this Cookie Policy.
                </p>
              </div>

              <div>
                <h2 className="mb-4 text-lg font-medium text-neutral-900">
                  5. Managing Cookies
                </h2>

                <p>
                  Most web browsers allow you to view, manage, block, or delete
                  cookies through their settings. The controls available to you
                  vary depending on the browser and device you use.
                </p>

                <p className="mt-5">
                  If you choose to block or delete certain cookies, some parts
                  of GZM may not function as intended.
                </p>
              </div>

              <div>
                <h2 className="mb-4 text-lg font-medium text-neutral-900">
                  6. Changes to This Cookie Policy
                </h2>

                <p>
                  We may update this Cookie Policy as the technology and
                  features used by GZM change. When we make updates, we will
                  change the “Last updated” date at the top of this page.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
