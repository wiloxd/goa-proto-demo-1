/* The confirmation page, following the design system's result page pattern.
 * The reference number is the one the application was saved under (see
 * src/shared/demoData.ts). The timeline is made up. */

import { Link } from "react-router-dom";
import { GoabCallout, GoabText } from "@abgov/react-components";
import { usePageTitleSize } from "../shared/usePageTitleSize";
import { emptyAnswers, useAnswers } from "./answers";
import { startPath } from "./journey";

export function DonePage() {
  const { answers, saveAnswers } = useAnswers();
  const titleSize = usePageTitleSize();
  const email = answers.contactEmail || "the email address you gave us";

  return (
    <>
      <GoabText tag="h1" size={titleSize} mt="none" mb="l">
        Application submitted
      </GoabText>

      <GoabCallout type="success" heading="We've received your application">
        <GoabText size="body-m" mt="none" mb="none">
          Your reference number is{" "}
          <strong>{answers.submittedReference || "SAMPLE-CR-0000"}</strong>
        </GoabText>
      </GoabCallout>

      <GoabText size="body-m" mt="xl" mb="none">
        We've sent a confirmation to {email}.
      </GoabText>

      <GoabText tag="h2" size="heading-s" mt="2xl" mb="s">
        What happens next
      </GoabText>
      <ul className="citizen-list">
        <li>An examiner checks your application and the copy of your work.</li>
        <li>
          If we need anything else, we'll email you. Most applications don't need changes.
        </li>
        <li>
          When we register the work, we'll email you a certificate with a registration
          number. This usually takes about 3 months.
        </li>
      </ul>
      <GoabText size="body-m" mt="l" mb="none">
        You already own the copyright in your work. If we register it, the registration
        counts from today, the day you applied.
      </GoabText>

      <GoabText size="body-m" mt="2xl" mb="none">
        <Link to={startPath} onClick={() => saveAnswers(emptyAnswers)}>
          Register another work
        </Link>
      </GoabText>
    </>
  );
}
