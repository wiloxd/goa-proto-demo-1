/* The examiner's landing page: every application, newest first. The data comes
 * from src/data/sample.ts, plus anything submitted on the applicant form in
 * this browser (src/shared/demoData.ts). */

import { GoabText } from "@abgov/react-components";
import { useApplications } from "../shared/demoData";
import { ApplicationsTable } from "./ApplicationsTable";

export function WorkerHomePage() {
  const applications = useApplications();
  const waiting = applications.filter((a) => a.status === "New").length;

  return (
    <>
      <GoabText tag="h1" size="heading-m" mt="none" mb="xs">
        Applications
      </GoabText>
      <GoabText size="body-s" color="secondary" mt="none" mb="xl">
        {waiting} new · {applications.length} in total · newest first
      </GoabText>

      <ApplicationsTable rows={applications} />
    </>
  );
}
