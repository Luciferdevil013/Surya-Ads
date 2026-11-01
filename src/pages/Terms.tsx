import LegalLayout, { ContactEmail, H2, P, UL } from "@/components/legal/LegalLayout";

const Terms = () => (
  <LegalLayout title="Terms of Service">
    <H2>1. Acceptance of Terms</H2>
    <P>
      By accessing or using Surya Sports Media services, you agree to these Terms of Service. If you do not agree,
      please do not use our services.
    </P>

    <H2>2. Services</H2>
    <P>
      Surya Sports Media provides digital advertising, marketing, and consultation services. Services may include
      Google Ads management, social media marketing, WhatsApp marketing campaigns, and related digital strategies.
    </P>

    <H2>3. Client Responsibilities</H2>
    <UL
      items={[
        "Provide accurate and complete information required for service delivery",
        "Timely review and approval of campaign materials",
        "Maintain adequate ad spend budgets as agreed",
        "Comply with platform advertising policies",
      ]}
    />

    <H2>4. Payment Terms</H2>
    <P>Payment terms will be specified in individual service agreements. Late payments may result in service suspension.</P>

    <H2>5. Intellectual Property</H2>
    <P>
      All creative materials, strategies, and proprietary tools developed by Surya Sports Media remain our intellectual
      property unless otherwise agreed in writing.
    </P>

    <H2>6. Limitation of Liability</H2>
    <P>
      Surya Sports Media shall not be liable for indirect, incidental, or consequential damages. Our total liability
      shall not exceed the fees paid for the specific service giving rise to the claim.
    </P>

    <H2>7. Termination</H2>
    <P>
      Either party may terminate services with written notice as specified in the service agreement. Outstanding fees
      remain payable upon termination.
    </P>

    <H2>8. Confidentiality</H2>
    <P>
      Both parties agree to maintain confidentiality of proprietary business information shared during the course of
      the engagement.
    </P>

    <H2>9. Modifications</H2>
    <P>
      We reserve the right to modify these terms at any time. Continued use of our services constitutes acceptance of
      modified terms.
    </P>

    <H2>10. Contact</H2>
    <P>
      For questions about these terms, contact us at <ContactEmail />.
    </P>
  </LegalLayout>
);

export default Terms;
