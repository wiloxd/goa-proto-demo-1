/* "Check your answers", following the design system's review page pattern:
 * the answers grouped under headings, a Change link beside each one, the fee,
 * a declaration to agree to, then a Submit button.
 *
 * Each Change link goes back to its question with ?change=1, so Continue
 * returns here instead of going on through the rest of the questions.
 */

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  GoabButton,
  GoabButtonGroup,
  GoabCheckbox,
  GoabFormItem,
  GoabLink,
  GoabTable,
  GoabText,
} from "@abgov/react-components";
import type { GoabCheckboxOnChangeDetail } from "@abgov/ui-components-common";
import { formatDate } from "../shared/formatDate";
import { usePageTitleSize } from "../shared/usePageTitleSize";
import { useAnswers, type Answers } from "./answers";
import { donePath, questions } from "./journey";
import { applicationFee, formatFileSize, workTypes, yesNoLabels } from "./options";

interface Row {
  question: string;
  answer: string;
  path: string;
}

function sections(answers: Answers): { heading: string; rows: Row[] }[] {
  const published =
    answers.published === "yes"
      ? [formatDate(answers.publishedDate), answers.publishedCountry]
          .filter(Boolean)
          .join(", ")
      : answers.published === "no"
        ? "Not published"
        : "";

  const owner =
    answers.owner === "author"
      ? "The author"
      : answers.owner === "someone-else"
        ? [answers.ownerName, answers.ownerAddress].filter(Boolean).join(", ")
        : "";

  return [
    {
      heading: "The work",
      rows: [
        {
          question: "Type of work",
          answer: answers.typeOfWork ? workTypes[answers.typeOfWork].label : "",
          path: "/apply/type-of-work",
        },
        { question: "Title", answer: answers.title, path: "/apply/title" },
        { question: "Other title", answer: answers.otherTitle, path: "/apply/title" },
        {
          question: "Year finished",
          answer: answers.yearFinished,
          path: "/apply/finished",
        },
        { question: "First published", answer: published, path: "/apply/published" },
      ],
    },
    {
      heading: "Author and owner",
      rows: [
        { question: "Author", answer: answers.authorName, path: "/apply/author" },
        {
          question: "Citizenship",
          answer: answers.authorCitizenship,
          path: "/apply/author",
        },
        {
          question: "Made as part of a job",
          answer: answers.madeForHire ? yesNoLabels[answers.madeForHire] : "",
          path: "/apply/author",
        },
        { question: "Copyright owner", answer: owner, path: "/apply/owner" },
      ],
    },
    {
      heading: "Your contact details",
      rows: [
        { question: "Name", answer: answers.contactName, path: "/apply/contact" },
        { question: "Email", answer: answers.contactEmail, path: "/apply/contact" },
        { question: "Phone", answer: answers.contactPhone, path: "/apply/contact" },
      ],
    },
    {
      heading: "Copy of the work",
      rows: [
        {
          question: "File",
          answer: answers.fileName
            ? `${answers.fileName} (${formatFileSize(answers.fileSize)})`
            : "",
          path: "/apply/upload",
        },
      ],
    },
  ];
}

export function ReviewPage() {
  const navigate = useNavigate();
  const { answers } = useAnswers();
  const titleSize = usePageTitleSize();
  const [agreed, setAgreed] = useState(false);
  const [error, setError] = useState("");

  const submit = () => {
    if (!agreed) {
      setError("Confirm the information is correct to submit your application");
      return;
    }
    navigate(donePath);
  };

  return (
    <>
      <GoabLink leadingIcon="arrow-back" size="small" mb="none">
        <Link to={questions[questions.length - 1].path}>Back</Link>
      </GoabLink>

      <GoabText tag="h1" size={titleSize} mt="xl" mb="m">
        Check your answers
      </GoabText>
      <GoabText size="body-m" mt="none" mb="none">
        Make sure these are right before you submit. You can't change them afterwards.
      </GoabText>

      {sections(answers).map((section) => (
        <section key={section.heading}>
          <GoabText tag="h2" size="heading-s" mt="2xl" mb="s">
            {section.heading}
          </GoabText>
          <div className="review-answers">
            <GoabTable width="100%">
              <tbody>
                {section.rows.map((row) => (
                  <tr key={row.question}>
                    <td>
                      <strong>{row.question}</strong>
                    </td>
                    <td>{row.answer || "Not provided"}</td>
                    <td>
                      <GoabLink size="small">
                        <Link to={`${row.path}?change=1`}>
                          Change
                          <span className="visually-hidden">
                            {" "}
                            {row.question.toLowerCase()}
                          </span>
                        </Link>
                      </GoabLink>
                    </td>
                  </tr>
                ))}
              </tbody>
            </GoabTable>
          </div>
        </section>
      ))}

      <GoabText tag="h2" size="heading-s" mt="2xl" mb="s">
        Fee
      </GoabText>
      <GoabText size="body-m" mt="none" mb="none">
        The fee is <strong>{applicationFee}</strong>. It isn't refunded if we don't
        register the work.
      </GoabText>

      <GoabText tag="h2" size="heading-s" mt="2xl" mb="s">
        Declaration
      </GoabText>
      <GoabFormItem label="" error={error}>
        <GoabCheckbox
          name="declaration"
          checked={agreed}
          error={!!error}
          text="I confirm the information in this application is correct to the best of my knowledge, and that I'm the author, the copyright owner, or allowed to apply for them."
          onChange={(detail: GoabCheckboxOnChangeDetail) => {
            setAgreed(detail.checked);
            setError("");
          }}
        />
      </GoabFormItem>

      <GoabButtonGroup alignment="start" mt="2xl">
        <GoabButton type="primary" onClick={submit}>
          Submit application
        </GoabButton>
      </GoabButtonGroup>
    </>
  );
}
