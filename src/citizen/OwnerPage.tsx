/* Question 6: who owns the copyright. "Someone else" reveals their name and
 * address underneath. */

import { useState } from "react";
import {
  GoabBlock,
  GoabFormItem,
  GoabInput,
  GoabRadioGroup,
  GoabRadioItem,
  GoabTextArea,
} from "@abgov/react-components";
import type {
  GoabInputOnChangeDetail,
  GoabRadioGroupOnChangeDetail,
  GoabTextAreaOnChangeDetail,
} from "@abgov/ui-components-common";
import { useAnswers } from "./answers";
import type { Owner } from "../shared/copyright";
import { QuestionPage } from "./QuestionPage";

const noErrors = { owner: "", ownerName: "", ownerAddress: "" };

export function OwnerPage() {
  const { answers, saveAnswers } = useAnswers();
  const [owner, setOwner] = useState<Owner>(answers.owner);
  const [ownerName, setOwnerName] = useState(answers.ownerName);
  const [ownerAddress, setOwnerAddress] = useState(answers.ownerAddress);
  const [errors, setErrors] = useState(noErrors);

  const handleContinue = () => {
    const found = { ...noErrors };
    if (!owner) found.owner = "Select who owns the copyright";
    if (owner === "someone-else") {
      if (!ownerName.trim()) found.ownerName = "Enter the owner's name";
      if (!ownerAddress.trim()) found.ownerAddress = "Enter the owner's address";
    }
    setErrors(found);
    if (Object.values(found).some(Boolean)) return false;
    saveAnswers(
      owner === "someone-else"
        ? { owner, ownerName: ownerName.trim(), ownerAddress: ownerAddress.trim() }
        : { owner, ownerName: "", ownerAddress: "" },
    );
    return true;
  };

  const ownerDetails = (
    <GoabBlock direction="column" gap="l" width="100%">
      <GoabFormItem
        label="Owner's name"
        helpText="A person or an organization, such as a publisher or employer."
        error={errors.ownerName}
      >
        <GoabInput
          name="owner-name"
          value={ownerName}
          error={!!errors.ownerName}
          width="460px"
          onChange={(detail: GoabInputOnChangeDetail) => {
            setOwnerName(detail.value);
            setErrors((e) => ({ ...e, ownerName: "" }));
          }}
        />
      </GoabFormItem>
      <GoabFormItem label="Owner's address" error={errors.ownerAddress}>
        <GoabTextArea
          name="owner-address"
          value={ownerAddress}
          error={!!errors.ownerAddress}
          rows={4}
          width="460px"
          onChange={(detail: GoabTextAreaOnChangeDetail) => {
            setOwnerAddress(detail.value);
            setErrors((e) => ({ ...e, ownerAddress: "" }));
          }}
        />
      </GoabFormItem>
    </GoabBlock>
  );

  return (
    <QuestionPage
      path="/apply/owner"
      heading="Who owns the copyright?"
      intro="The author owns it unless they sold or gave it to someone, or made the work as part of a job."
      onContinue={handleContinue}
    >
      <GoabFormItem label="Copyright owner" error={errors.owner}>
        <GoabRadioGroup
          name="owner"
          value={owner}
          error={!!errors.owner}
          onChange={(detail: GoabRadioGroupOnChangeDetail) => {
            setOwner(detail.value as Owner);
            setErrors(noErrors);
          }}
        >
          <GoabRadioItem value="author" label="The author" />
          <GoabRadioItem
            value="someone-else"
            label="Someone else"
            reveal={ownerDetails}
          />
        </GoabRadioGroup>
      </GoabFormItem>
    </QuestionPage>
  );
}
