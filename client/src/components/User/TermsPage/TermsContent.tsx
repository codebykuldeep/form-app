import { Box } from "@mui/material";
import React from "react";
import classes from './termspage.module.css'

function TermsContent() {
  return (
    <Box>
      <h1>Terms and Conditions</h1>
      Welcome to Website. By using our website, you agree to our Terms and
      Privacy Policy. If you do not agree, please do not use our services.
      <Box className={classes.content}>
        <h3>1. Data Collection</h3>
        We collect personal and banking details to provide our services. Your
        data is stored securely but may be shared with third-party service
        providers.
        <h3>2. User Responsibilities</h3>- Provide accurate information. - Do
        not use our website for unlawful activities. - Maintain confidentiality
        of your account details.
        <h3>3. Liability & Security</h3>
        We take security measures to protect your data but cannot guarantee
        complete security. We are not responsible for losses due to unauthorized
        access or data breaches.
        <h3>4. Changes & Termination</h3>
        We may update these Terms at any time. Continued use of our website
        implies acceptance of the revised Terms. We may terminate access for
        violations.
        <h3>5. Governing Law</h3>
        These Terms are governed by the laws of [Jurisdiction]. For inquiries,
        contact us at [Contact Information].
      </Box>
    </Box>
  );
}

export default TermsContent;
