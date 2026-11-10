/* Question 3: the year the work was finished. Four digits, not in the future. */

import { useState } from "react";
import { GoabFormItem, GoabInput } from "@abgov/react-components";
import type { GoabInputOnChangeDetail } from "@abgov/ui-components-common";
import { useAnswers } from "./answers";
import { QuestionPage } from "./QuestionPage";

export function FinishedPage() {
  const { answers, saveAnswers } = useAnswers();
  const [year, setYear] = useState(answers.yearFinished);
  const [error, setError] = useState("");

  const handleContinue = () => {
    const value = year.trim();
    const thisYear = new Date().getFullYear();
    if (!value) {
      setError("Enter the year the work was finished");
      return false;
    }
    if (!/^\d{4}$/.test(value)) {
      setError("Enter the year as 4 numbers, for example 2024");
      return false;
    }
    if (Number(value) > thisYear) {
      setError(`Enter a year that's ${thisYear} or earlier`);
      return false;
    }
    saveAnswers({ yearFinished: value });
    return true;
  };

  return (
    <QuestionPage
      path="/apply/finished"
      heading="What year was the work finished?"
      intro="This is the year the work was first in its final form, even if it was published later."
      onContinue={handleContinue}
    >
      <GoabFormItem label="Year" helpText="For example, 2024" error={error}>
        <GoabInput
          name="year-finished"
          value={year}
          error={!!error}
          width="10ch"
          onChange={(detail: GoabInputOnChangeDetail) => {
            setYear(detail.value);
            setError("");
          }}
        />
      </GoabFormItem>
    </QuestionPage>
  );
}
