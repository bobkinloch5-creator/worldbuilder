import type { Metadata } from "next"

export const metadata: Metadata = {
    title: "Privacy Policy | SL Builder",
    description: "Privacy Policy for the SL Builder LSL Asset Generator",
}

export default function PrivacyPolicy() {
    return (
        <div className="min-h-screen bg-background">
            <div className="mx-auto max-w-3xl px-6 py-20">
                <a href="/" className="text-sm text-primary hover:underline mb-8 inline-block">
                    ← Back to SL Builder
                </a>
                <h1 className="text-3xl font-bold tracking-tight text-foreground mb-8">
                    Privacy Policy
                </h1>
                <div className="prose prose-neutral dark:prose-invert text-sm leading-relaxed text-muted-foreground space-y-6">
                    <p className="text-xs text-muted-foreground">
                        Last updated: February 19, 2026
                    </p>

                    <section>
                        <h2 className="text-lg font-semibold text-foreground mt-8 mb-3">1. Overview</h2>
                        <p>
                            SL Builder is committed to protecting your privacy. This Privacy Policy explains what
                            information we collect, how we use it, and your options regarding your data.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-lg font-semibold text-foreground mt-8 mb-3">2. Information We Collect</h2>
                        <h3 className="text-base font-medium text-foreground mt-4 mb-2">Data We Do NOT Collect</h3>
                        <ul className="list-disc pl-5 space-y-1">
                            <li>We do not collect personal information (name, email, address)</li>
                            <li>We do not collect login credentials or account information</li>
                            <li>We do not store your generated scripts or configurations</li>
                            <li>We do not use cookies for tracking or advertising</li>
                        </ul>

                        <h3 className="text-base font-medium text-foreground mt-4 mb-2">Data We May Collect</h3>
                        <ul className="list-disc pl-5 space-y-1">
                            <li>
                                <strong>Analytics data:</strong> We use Vercel Analytics to collect anonymous,
                                aggregated usage statistics (page views, general geographic region, browser type).
                                This data cannot be used to identify individual users.
                            </li>
                            <li>
                                <strong>Technical data:</strong> Standard server logs may include IP addresses,
                                browser user agent strings, and request timestamps. These are used solely for
                                debugging and are not linked to any personal identity.
                            </li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-lg font-semibold text-foreground mt-8 mb-3">3. Client-Side Processing</h2>
                        <p>
                            All script generation, layout planning, and asset configuration happens entirely
                            in your browser. Your input data is never transmitted to our servers. When you
                            close the browser tab, your session data is gone.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-lg font-semibold text-foreground mt-8 mb-3">4. Third-Party Services</h2>
                        <p>We use the following third-party services:</p>
                        <ul className="list-disc pl-5 space-y-1 mt-2">
                            <li>
                                <strong>Vercel:</strong> Hosts the website and provides anonymous analytics.
                                See <a href="https://vercel.com/legal/privacy-policy" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">Vercel's Privacy Policy</a>.
                            </li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-lg font-semibold text-foreground mt-8 mb-3">5. Data Security</h2>
                        <p>
                            Since we do not collect or store personal data, the risk of data breaches affecting
                            your personal information through our service is minimal. The website is served over
                            HTTPS to ensure data in transit is encrypted.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-lg font-semibold text-foreground mt-8 mb-3">6. Children's Privacy</h2>
                        <p>
                            SL Builder does not knowingly collect information from children under 13.
                            The Service is intended for users who are of legal age to use virtual world platforms.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-lg font-semibold text-foreground mt-8 mb-3">7. Your Rights</h2>
                        <p>You have the right to:</p>
                        <ul className="list-disc pl-5 space-y-1 mt-2">
                            <li>Use the Service without providing any personal information</li>
                            <li>Clear your browser data to remove any locally cached content</li>
                            <li>Opt out of analytics by using browser extensions that block tracking scripts</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-lg font-semibold text-foreground mt-8 mb-3">8. Changes to This Policy</h2>
                        <p>
                            We may update this Privacy Policy from time to time. Changes will be reflected on
                            this page with an updated date. We encourage you to review this policy periodically.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-lg font-semibold text-foreground mt-8 mb-3">9. Contact</h2>
                        <p>
                            For questions about this Privacy Policy, please reach out via the project repository
                            or community channels.
                        </p>
                    </section>
                </div>
            </div>
        </div>
    )
}
