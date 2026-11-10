/* Question 1: what kind of work it is. One choice, with an example under each. */

import { useState } from "react";
import { GoabFormItem, GoabRadioGroup, GoabRadioItem } from "@abgov/react-components";
import type { GoabRadioGroupOnChangeDetail } from "@abgov/ui-components-common";
import { useAnswers } from "./answers";
import { workTypes, type WorkType } from "../shared/copyright";
import { QuestionPage } from "./QuestionPage";

export function TypeOfWorkPage() {
  const { answers, saveAnswers } = useAnswers();
  const [typeOfWork, setTypeOfWork] = useState<WorkType>(answers.typeOfWork);
  const [error, setError] = useState("");

  const handleContinue = () => {
    if (!typeOfWork) {
      setError("Select the type of work");
      return false;
    }
    saveAnswers({ typeOfWork });
    return true;
  };

  return (
    <QuestionPage
      path="/apply/type-of-work"
      heading="What type of work are you registering?"
      intro="Choose the one that fits best. If it's a mix, choose what the work mostly is."
      onContinue={handleContinue}
    >
      <GoabFormItem label="Type of work" error={error}>
        <GoabRadioGroup
          name="type-of-work"
          value={typeOfWork}
          error={!!error}
          onChange={(detail: GoabRadioGroupOnChangeDetail) => {
            setTypeOfWork(detail.value as WorkType);
            setError("");
          }}
        >
          {Object.entries(workTypes).map(([value, { label, description }]) => (
            <GoabRadioItem
              key={value}
              value={value}
              label={label}
              description={description}
            />
          ))}
        </GoabRadioGroup>
      </GoabFormItem>
    </QuestionPage>
  );
}
