/* Question 4: has the work been published? Choosing Yes reveals two more
 * questions underneath: when, and in which country. */

import { useState } from "react";
import {
  GoabBlock,
  GoabDatePicker,
  GoabDropdown,
  GoabDropdownItem,
  GoabFormItem,
  GoabRadioGroup,
  GoabRadioItem,
} from "@abgov/react-components";
import type {
  GoabDatePickerOnChangeDetail,
  GoabDropdownOnChangeDetail,
  GoabRadioGroupOnChangeDetail,
} from "@abgov/ui-components-common";
import { isInThePast } from "../shared/isInThePast";
import { useAnswers } from "./answers";
import { countries, type YesNo } from "./options";
import { QuestionPage } from "./QuestionPage";

const noErrors = { published: "", publishedDate: "", publishedCountry: "" };

export function PublishedPage() {
  const { answers, saveAnswers } = useAnswers();
  const [published, setPublished] = useState<YesNo>(answers.published);
  const [publishedDate, setPublishedDate] = useState(answers.publishedDate);
  const [publishedCountry, setPublishedCountry] = useState(answers.publishedCountry);
  const [errors, setErrors] = useState(noErrors);

  const handleContinue = () => {
    const found = { ...noErrors };
    if (!published) found.published = "Select yes if the work has been published";
    if (published === "yes") {
      if (!publishedDate) found.publishedDate = "Enter the date it was first published";
      else if (!isInThePast(publishedDate))
        found.publishedDate = "Enter a date in the past";
      if (!publishedCountry)
        found.publishedCountry = "Select the country it was first published in";
    }
    setErrors(found);
    if (Object.values(found).some(Boolean)) return false;
    saveAnswers(
      published === "yes"
        ? { published, publishedDate, publishedCountry }
        : { published, publishedDate: "", publishedCountry: "" },
    );
    return true;
  };

  const whenAndWhere = (
    <GoabBlock direction="column" gap="l" width="100%">
      <GoabFormItem
        label="Date first published"
        helpText="For example, March 3 2024"
        error={errors.publishedDate}
      >
        <GoabDatePicker
          name="published-date"
          type="input"
          value={publishedDate || undefined}
          error={!!errors.publishedDate}
          onChange={(detail: GoabDatePickerOnChangeDetail) => {
            setPublishedDate(detail.valueStr ?? "");
            setErrors((e) => ({ ...e, publishedDate: "" }));
          }}
        />
      </GoabFormItem>
      <GoabFormItem label="Country first published in" error={errors.publishedCountry}>
        <GoabDropdown
          name="published-country"
          value={publishedCountry}
          error={!!errors.publishedCountry}
          width="320px"
          onChange={(detail: GoabDropdownOnChangeDetail) => {
            setPublishedCountry(detail.value ?? "");
            setErrors((e) => ({ ...e, publishedCountry: "" }));
          }}
        >
          {countries.map((country) => (
            <GoabDropdownItem key={country} value={country} label={country} />
          ))}
        </GoabDropdown>
      </GoabFormItem>
    </GoabBlock>
  );

  return (
    <QuestionPage
      path="/apply/published"
      heading="Has the work been published?"
      intro="Published means copies were offered to the public, for example sold, given away or made available to download. Showing or performing it isn't publishing."
      onContinue={handleContinue}
    >
      <GoabFormItem label="Published" error={errors.published}>
        <GoabRadioGroup
          name="published"
          value={published}
          error={!!errors.published}
          onChange={(detail: GoabRadioGroupOnChangeDetail) => {
            setPublished(detail.value as YesNo);
            setErrors(noErrors);
          }}
        >
          <GoabRadioItem value="yes" label="Yes" reveal={whenAndWhere} />
          <GoabRadioItem value="no" label="No" />
        </GoabRadioGroup>
      </GoabFormItem>
    </QuestionPage>
  );
}
