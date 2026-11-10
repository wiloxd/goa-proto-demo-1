/* One copyright application, following the design system's "review and action"
 * example: the application on the left, the examiner's checks and decision on
 * the right.
 *
 * Applications that already have an outcome show it instead of the decision
 * form. A decision recorded here isn't saved anywhere: it shows a confirmation,
 * and is gone when you leave the page.
 */

import { useState } from "react";
import type { ReactNode } from "react";
import { Link, useParams } from "react-router-dom";
import {
  GoabBadge,
  GoabBlock,
  GoabButton,
  GoabCallout,
  GoabCheckbox,
  GoabContainer,
  GoabDropdown,
  GoabDropdownItem,
  GoabFormItem,
  GoabGrid,
  GoabLink,
  GoabRadioGroup,
  GoabRadioItem,
  GoabText,
  GoabTextArea,
} from "@abgov/react-components";
import type {
  GoabDropdownOnChangeDetail,
  GoabRadioGroupOnChangeDetail,
  GoabTextAreaOnChangeDetail,
} from "@abgov/ui-components-common";

import { findApplication, statusBadge, type SampleApplication } from "../data/sample";
import { formatFileSize, workTypes, yesNoLabels } from "../shared/copyright";
import { formatDate } from "../shared/formatDate";

type Decision = "" | "register" | "changes" | "refuse";

const refusalReasons = [
  "Not original enough",
  "Not something copyright protects",
  "Copy of the work is missing or can't be opened",
  "Copy doesn't match the application",
];

const checks = [
  "Copy of the work opens and matches the title and type",
  "Work has enough original creative content",
  "Author and owner details are consistent",
];

function Detail({ label, value }: { label: string; value: string }) {
  return (
    <GoabBlock direction="column" gap="3xs" width="100%">
      <GoabText size="body-xs" color="secondary" mt="none" mb="none">
        {label}
      </GoabText>
      <GoabText size="body-s" mt="none" mb="none">
        {value || "None given"}
      </GoabText>
    </GoabBlock>
  );
}

function Card({ heading, children }: { heading: string; children: ReactNode }) {
  return (
    <GoabContainer accent="thin" type="non-interactive" padding="compact" mb="none">
      <GoabBlock direction="column" gap="m" width="100%">
        <GoabText tag="h2" size="heading-xs" mt="none" mb="none">
          {heading}
        </GoabText>
        {children}
      </GoabBlock>
    </GoabContainer>
  );
}

function BackToApplications() {
  return (
    <GoabLink leadingIcon="arrow-back" size="small" mb="none">
      <Link to="/internal">Back to applications</Link>
    </GoabLink>
  );
}

function ApplicationDetails({ app }: { app: SampleApplication }) {
  return (
    <GoabBlock direction="column" gap="l" width="100%">
      <Card heading="The work">
        <GoabGrid minChildWidth="180px" gap="s">
          <Detail label="Type of work" value={workTypes[app.typeOfWork].label} />
          <Detail label="Year finished" value={app.yearFinished} />
          <Detail
            label="First published"
            value={
              app.published === "yes"
                ? `${formatDate(app.publishedDate)}, ${app.publishedCountry}`
                : "Not published"
            }
          />
          <Detail label="Other title" value={app.otherTitle} />
        </GoabGrid>
      </Card>

      <Card heading="Author and owner">
        <GoabGrid minChildWidth="180px" gap="s">
          <Detail label="Author" value={app.authorName} />
          <Detail label="Citizenship" value={app.authorCitizenship} />
          <Detail label="Work made for hire" value={yesNoLabels[app.madeForHire]} />
          <Detail
            label="Copyright owner"
            value={
              app.owner === "author"
                ? "The author"
                : `${app.ownerName}, ${app.ownerAddress}`
            }
          />
        </GoabGrid>
      </Card>

      <Card heading="Copy of the work">
        <Detail
          label="File"
          value={`${app.fileName} · ${formatFileSize(app.fileSize)}`}
        />
      </Card>

      <Card heading="Applicant contact">
        <GoabGrid minChildWidth="180px" gap="s">
          <Detail label="Name" value={app.contactName} />
          <Detail label="Email" value={app.contactEmail} />
          <Detail label="Phone" value={app.contactPhone} />
        </GoabGrid>
      </Card>
    </GoabBlock>
  );
}

/* For applications that already have an outcome. */
function Outcome({ app }: { app: SampleApplication }) {
  const outcome = app.outcome;
  if (!outcome) return null;
  const who = `${outcome.by}, ${formatDate(outcome.on)}`;

  return (
    <Card heading="Decision">
      <GoabBlock direction="column" gap="s" width="100%">
        {app.status === "Registered" && (
          <>
            <Detail label="Registered by" value={who} />
            <Detail
              label="Registration number"
              value={outcome.registrationNumber ?? ""}
            />
            <Detail label="Effective from" value={formatDate(app.submitted)} />
          </>
        )}
        {app.status === "Waiting on applicant" && (
          <>
            <Detail label="Changes asked for by" value={who} />
            <Detail label="Message to the applicant" value={outcome.message ?? ""} />
          </>
        )}
        {app.status === "Refused" && (
          <>
            <Detail label="Refused by" value={who} />
            <Detail label="Reason" value={outcome.reason ?? ""} />
            <Detail label="Message to the applicant" value={outcome.message ?? ""} />
          </>
        )}
      </GoabBlock>
    </Card>
  );
}

const noErrors = { decision: "", reason: "", message: "" };

function DecisionForm({ app }: { app: SampleApplication }) {
  const [checked, setChecked] = useState<string[]>([]);
  const [decision, setDecision] = useState<Decision>("");
  const [reason, setReason] = useState("");
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState(noErrors);
  const [recorded, setRecorded] = useState(false);

  const recordDecision = () => {
    const found = {
      decision: decision ? "" : "Select a decision",
      reason: decision === "refuse" && !reason ? "Select a reason" : "",
      message:
        (decision === "changes" || decision === "refuse") && !message.trim()
          ? "Enter a message to the applicant"
          : "",
    };
    setErrors(found);
    if (Object.values(found).some(Boolean)) return;
    setRecorded(true);
  };

  if (recorded) {
    const registrationNumber = app.id.replace("SAMPLE-CR-", "SAMPLE-REG-");
    return (
      <Card heading="Decision">
        {decision === "register" && (
          <GoabCallout type="success" heading="Registered" mb="none">
            <GoabText size="body-s" mt="none" mb="none">
              Registration number {registrationNumber}, effective from{" "}
              {formatDate(app.submitted)}. The applicant is emailed their certificate.
            </GoabText>
          </GoabCallout>
        )}
        {decision === "changes" && (
          <GoabCallout type="information" heading="Sent to the applicant" mb="none">
            <GoabText size="body-s" mt="none" mb="none">
              The status is now Waiting on applicant. It comes back to the list when they
              reply.
            </GoabText>
          </GoabCallout>
        )}
        {decision === "refuse" && (
          <GoabCallout type="important" heading="Refused" mb="none">
            <GoabText size="body-s" mt="none" mb="none">
              The applicant is emailed the reason and your message.
            </GoabText>
          </GoabCallout>
        )}
      </Card>
    );
  }

  const messageField = (label: string, helpText: string) => (
    <GoabFormItem
      label={label}
      labelSize="compact"
      helpText={helpText}
      error={errors.message}
    >
      <GoabTextArea
        name="message"
        size="compact"
        rows={4}
        width="100%"
        value={message}
        error={!!errors.message}
        onChange={(detail: GoabTextAreaOnChangeDetail) => {
          setMessage(detail.value);
          setErrors((e) => ({ ...e, message: "" }));
        }}
      />
    </GoabFormItem>
  );

  return (
    <GoabBlock direction="column" gap="l" width="100%">
      <Card heading="Checks">
        <GoabBlock direction="column" gap="xs" width="100%">
          {checks.map((check) => (
            <GoabCheckbox
              key={check}
              name={check}
              text={check}
              size="compact"
              checked={checked.includes(check)}
              onChange={({ checked: on }) =>
                setChecked((list) =>
                  on ? [...list, check] : list.filter((c) => c !== check),
                )
              }
            />
          ))}
        </GoabBlock>
      </Card>

      <Card heading="Decision">
        <GoabFormItem label="Outcome" labelSize="compact" error={errors.decision}>
          <GoabRadioGroup
            name="decision"
            size="compact"
            value={decision}
            error={!!errors.decision}
            onChange={(detail: GoabRadioGroupOnChangeDetail) => {
              setDecision(detail.value as Decision);
              setErrors(noErrors);
            }}
          >
            <GoabRadioItem value="register" label="Register" />
            <GoabRadioItem
              value="changes"
              label="Ask for changes"
              reveal={messageField(
                "Message to the applicant",
                "Say what to change or send. They reply by email.",
              )}
            />
            <GoabRadioItem
              value="refuse"
              label="Refuse"
              reveal={
                <GoabBlock direction="column" gap="m" width="100%">
                  <GoabFormItem label="Reason" labelSize="compact" error={errors.reason}>
                    <GoabDropdown
                      name="reason"
                      size="compact"
                      width="100%"
                      value={reason}
                      error={!!errors.reason}
                      onChange={(detail: GoabDropdownOnChangeDetail) => {
                        setReason(detail.value ?? "");
                        setErrors((e) => ({ ...e, reason: "" }));
                      }}
                    >
                      {refusalReasons.map((r) => (
                        <GoabDropdownItem key={r} value={r} label={r} />
                      ))}
                    </GoabDropdown>
                  </GoabFormItem>
                  {messageField(
                    "Message to the applicant",
                    "Explain the decision in plain words. It's sent with the reason.",
                  )}
                </GoabBlock>
              }
            />
          </GoabRadioGroup>
        </GoabFormItem>

        <GoabBlock>
          <GoabButton size="compact" onClick={recordDecision}>
            Record decision
          </GoabButton>
        </GoabBlock>
      </Card>
    </GoabBlock>
  );
}

export function ApplicationPage() {
  const { applicationId } = useParams();
  const app = findApplication(applicationId);

  if (!app) {
    return (
      <>
        <BackToApplications />
        <GoabText tag="h1" size="heading-m" mt="xl" mb="s">
          Application not found
        </GoabText>
        <GoabText size="body-s" mt="none" mb="none">
          There's no application with the reference {applicationId}. Check the reference,
          or go back to the list of applications.
        </GoabText>
      </>
    );
  }

  const decided =
    app.status === "Registered" || app.status === "Refused" || !!app.outcome;

  return (
    <>
      <BackToApplications />
      <GoabText tag="h1" size="heading-m" mt="xl" mb="xs">
        {app.title}
      </GoabText>
      <GoabBlock gap="s" alignment="center" width="100%" mb="xl">
        <GoabBadge type={statusBadge[app.status]} content={app.status} icon={false} />
        <GoabText size="body-xs" color="secondary" mt="none" mb="none">
          {app.id} · Submitted {formatDate(app.submitted)}
        </GoabText>
      </GoabBlock>

      <GoabGrid minChildWidth="315px" gap="l">
        <ApplicationDetails app={app} />
        {decided ? <Outcome app={app} /> : <DecisionForm app={app} />}
      </GoabGrid>
    </>
  );
}
