/* Question 7: who we contact about the application. Name and email required,
 * phone optional. */

import { useState } from "react";
import { GoabFormItem, GoabInput } from "@abgov/react-components";
import type { GoabInputOnChangeDetail } from "@abgov/ui-components-common";
import { useAnswers } from "./answers";
import { QuestionPage } from "./QuestionPage";

const noErrors = { contactName: "", contactEmail: "" };

export function ContactPage() {
  const { answers, saveAnswers } = useAnswers();
  const [contactName, setContactName] = useState(answers.contactName);
  const [contactEmail, setContactEmail] = useState(answers.contactEmail);
  const [contactPhone, setContactPhone] = useState(answers.contactPhone);
  const [errors, setErrors] = useState(noErrors);

  const handleContinue = () => {
    const email = contactEmail.trim();
    const found = {
      contactName: contactName.trim() ? "" : "Enter your full name",
      contactEmail: !email
        ? "Enter your email address"
        : /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
          ? ""
          : "Enter an email address in the right format, for example name@example.com",
    };
    setErrors(found);
    if (found.contactName || found.contactEmail) return false;
    saveAnswers({
      contactName: contactName.trim(),
      contactEmail: email,
      contactPhone: contactPhone.trim(),
    });
    return true;
  };

  return (
    <QuestionPage
      path="/apply/contact"
      heading="How can we contact you about this application?"
      intro="We'll only contact you if we have a question, and to tell you our decision."
      onContinue={handleContinue}
    >
      <GoabFormItem label="Full name" error={errors.contactName}>
        <GoabInput
          name="contact-name"
          value={contactName}
          error={!!errors.contactName}
          width="460px"
          onChange={(detail: GoabInputOnChangeDetail) => {
            setContactName(detail.value);
            setErrors((e) => ({ ...e, contactName: "" }));
          }}
        />
      </GoabFormItem>
      <GoabFormItem label="Email address" error={errors.contactEmail} mt="l">
        <GoabInput
          name="contact-email"
          type="email"
          value={contactEmail}
          error={!!errors.contactEmail}
          width="460px"
          onChange={(detail: GoabInputOnChangeDetail) => {
            setContactEmail(detail.value);
            setErrors((e) => ({ ...e, contactEmail: "" }));
          }}
        />
      </GoabFormItem>
      <GoabFormItem label="Phone number" requirement="optional" mt="l">
        <GoabInput
          name="contact-phone"
          type="tel"
          value={contactPhone}
          width="320px"
          onChange={(detail: GoabInputOnChangeDetail) => setContactPhone(detail.value)}
        />
      </GoabFormItem>
    </QuestionPage>
  );
}
