/* Search applications by reference, title or author. The list narrows as you
 * type. */

import { useState } from "react";
import { GoabFormItem, GoabInput, GoabText } from "@abgov/react-components";
import type { GoabInputOnChangeDetail } from "@abgov/ui-components-common";
import { useApplications } from "../shared/demoData";
import { ApplicationsTable } from "./ApplicationsTable";

export function SearchPage() {
  const applications = useApplications();
  const [query, setQuery] = useState("");
  const term = query.trim().toLowerCase();
  const matches = term
    ? applications.filter((a) =>
        [a.id, a.title, a.otherTitle, a.authorName].some((field) =>
          field.toLowerCase().includes(term),
        ),
      )
    : [];

  return (
    <>
      <GoabText tag="h1" size="heading-m" mt="none" mb="xl">
        Search
      </GoabText>

      <GoabFormItem
        label="Reference, title or author"
        labelSize="compact"
        helpText="For example, SAMPLE-CR-0004, Sample Podcast or Test Author B"
      >
        <GoabInput
          name="search"
          size="compact"
          type="search"
          leadingIcon="search"
          width="460px"
          value={query}
          onChange={(detail: GoabInputOnChangeDetail) => setQuery(detail.value)}
        />
      </GoabFormItem>

      {term && matches.length === 0 && (
        <GoabText size="body-s" mt="xl" mb="none">
          No applications match "{query.trim()}". Check the reference, or try part of the
          title.
        </GoabText>
      )}

      {matches.length > 0 && (
        <div className="search-results">
          <ApplicationsTable rows={matches} />
        </div>
      )}
    </>
  );
}
