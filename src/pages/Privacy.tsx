import LegalLayout, { ContactEmail, H2, P, UL } from "@/components/legal/LegalLayout";

const Privacy = () => (
  <LegalLayout title="Privacy Policy">
    <H2>1. Introduction</H2>
    <P>
      Surya Sports Media ("we", "us", "our") provides digital advertising and marketing services. This privacy policy
      explains how we collect, use, and protect your information when you visit our website or use our WhatsApp
      communication channel.
    </P>

    <H2>2. Information We Collect</H2>
    <P>
      <strong>Information you provide:</strong> When you message us on WhatsApp, we collect your name, phone number,
      and any details you share in the conversation.
    </P>
    <P>
      <strong>Automatic data:</strong> Our landing page may collect anonymised analytics (page views, referral source)
      to improve our service.
    </P>

    <H2>3. How We Use Your Information</H2>
    <UL
      items={[
        "To respond to your enquiries and provide requested services",
        "To send marketing communications (only if you opt in)",
        "To improve our website and advertising campaigns",
        "To comply with legal obligations",
      ]}
    />

    <H2>4. WhatsApp Communications</H2>
    <P>
      When you click our WhatsApp button, you are redirected to WhatsApp (operated by Meta Platforms Inc.). Your use of
      WhatsApp is subject to its own privacy policy. We do not control how WhatsApp handles your data.
    </P>

    <H2>5. Data Sharing</H2>
    <P>We do not sell your personal data. We may share information with:</P>
    <UL
      items={[
        "Service providers who assist in running our business (e.g., analytics, hosting)",
        "Law enforcement if required by law",
      ]}
    />

    <H2>6. Data Security</H2>
    <P>
      We take reasonable measures to protect your personal information. However, no method of transmission over the
      internet is 100% secure.
    </P>

    <H2>7. Your Rights</H2>
    <P>
      You have the right to access, correct, or delete your personal data. To exercise these rights, contact us at the
      email below.
    </P>

    <H2>8. Changes to This Policy</H2>
    <P>We may update this privacy policy from time to time. Changes will be posted on this page with an updated date.</P>

    <H2>9. Contact Us</H2>
    <P>
      If you have questions about this policy, contact us at <ContactEmail />.
    </P>
  </LegalLayout>
);

export default Privacy;
