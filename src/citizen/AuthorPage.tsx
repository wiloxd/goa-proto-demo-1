/* Question 5: who created the work. One author only in this prototype. */

import { useState } from "react";
import {
  GoabDropdown,
  GoabDropdownItem,
  GoabFormItem,
  GoabInput,
  GoabRadioGroup,
  GoabRadioItem,
} from "@abgov/react-components";
import type {
  GoabDropdownOnChangeDetail,
  GoabInputOnChangeDetail,
  GoabRadioGroupOnChangeDetail,
} from "@abgov/ui-components-common";
import { useAnswers } from "./answers";
import { countries, type YesNo } from "./options";
import { QuestionPage } from "./QuestionPage";

const noErrors = { authorName: "", authorCitizenship: "", madeForHire: "" };

export function AuthorPage() {
  const { answers, saveAnswers } = useAnswers();
  const [authorName, setAuthorName] = useState(answers.authorName);
  const [authorCitizenship, setAuthorCitizenship] = useState(answers.authorCitizenship);
  const [madeForHire, setMadeForHire] = useState<YesNo>(answers.madeForHire);
  const [errors, setErrors] = useState(noErrors);

  const handleContinue = () => {
    const found = {
      authorName: authorName.trim() ? "" : "Enter the author's full name",
      authorCitizenship: authorCitizenship
        ? ""
        : "Select the author's country of citizenship",
      madeForHire: madeForHire ? "" : "Select yes if the work was made as part of a job",
    };
    setErrors(found);
    if (Object.values(found).some(Boolean)) return false;
    saveAnswers({ authorName: authorName.trim(), authorCitizenship, madeForHire });
    return true;
  };

  return (
    <QuestionPage
      path="/apply/author"
      heading="Who created the work?"
      intro="The author is the person who created the work. If you made it yourself, that's you."
      onContinue={handleContinue}
    >
      <GoabFormItem label="Author's full name" error={errors.authorName}>
        <GoabInput
          name="author-name"
          value={authorName}
          error={!!errors.authorName}
          width="460px"
          onChange={(detail: GoabInputOnChangeDetail) => {
            setAuthorName(detail.value);
            setErrors((e) => ({ ...e, authorName: "" }));
          }}
        />
      </GoabFormItem>

      <GoabFormItem
        label="Country of citizenship"
        error={errors.authorCitizenship}
        mt="l"
      >
        <GoabDropdown
          name="author-citizenship"
          value={authorCitizenship}
          error={!!errors.authorCitizenship}
          width="320px"
          onChange={(detail: GoabDropdownOnChangeDetail) => {
            setAuthorCitizenship(detail.value ?? "");
            setErrors((e) => ({ ...e, authorCitizenship: "" }));
          }}
        >
          {countries.map((country) => (
            <GoabDropdownItem key={country} value={country} label={country} />
          ))}
        </GoabDropdown>
      </GoabFormItem>

      <GoabFormItem
        label="Was the work made as part of a job?"
        helpText="For example, an employee writing a report for their employer. If so, the employer usually owns the copyright."
        error={errors.madeForHire}
        mt="l"
      >
        <GoabRadioGroup
          name="made-for-hire"
          value={madeForHire}
          error={!!errors.madeForHire}
          onChange={(detail: GoabRadioGroupOnChangeDetail) => {
            setMadeForHire(detail.value as YesNo);
            setErrors((e) => ({ ...e, madeForHire: "" }));
          }}
        >
          <GoabRadioItem value="yes" label="Yes" />
          <GoabRadioItem value="no" label="No" />
        </GoabRadioGroup>
      </GoabFormItem>
    </QuestionPage>
  );
}
