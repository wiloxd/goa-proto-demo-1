/* Question 2: the work's title (required) and any other title (optional).
 * A good page to copy when adding a question with text inputs. */

import { useState } from "react";
import { GoabFormItem, GoabInput } from "@abgov/react-components";
import type { GoabInputOnChangeDetail } from "@abgov/ui-components-common";
import { useAnswers } from "./answers";
import { QuestionPage } from "./QuestionPage";

export function TitlePage() {
  const { answers, saveAnswers } = useAnswers();
  const [title, setTitle] = useState(answers.title);
  const [otherTitle, setOtherTitle] = useState(answers.otherTitle);
  const [error, setError] = useState("");

  const handleContinue = () => {
    if (!title.trim()) {
      setError("Enter the title of the work");
      return false;
    }
    saveAnswers({ title: title.trim(), otherTitle: otherTitle.trim() });
    return true;
  };

  return (
    <QuestionPage
      path="/apply/title"
      heading="What is the work called?"
      intro="Use the title exactly as it appears on the work. If it doesn't have one, give it a short name that describes it."
      onContinue={handleContinue}
    >
      <GoabFormItem label="Title" error={error}>
        <GoabInput
          name="title"
          value={title}
          error={!!error}
          width="460px"
          onChange={(detail: GoabInputOnChangeDetail) => {
            setTitle(detail.value);
            setError("");
          }}
        />
      </GoabFormItem>
      <GoabFormItem
        label="Other title"
        requirement="optional"
        helpText="Another name the work is known by, such as a working title or a title in another language."
        mt="l"
      >
        <GoabInput
          name="other-title"
          value={otherTitle}
          width="460px"
          onChange={(detail: GoabInputOnChangeDetail) => setOtherTitle(detail.value)}
        />
      </GoabFormItem>
    </QuestionPage>
  );
}
