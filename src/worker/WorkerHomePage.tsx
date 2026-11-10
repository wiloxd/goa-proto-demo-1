/* The examiner's landing page: every application, newest first. The data comes
 * from src/data/sample.ts and is all made up. */

import { GoabText } from "@abgov/react-components";
import { sampleApplications } from "../data/sample";
import { ApplicationsTable } from "./ApplicationsTable";

export function WorkerHomePage() {
  const waiting = sampleApplications.filter((a) => a.status === "New").length;

  return (
    <>
      <GoabText tag="h1" size="heading-m" mt="none" mb="xs">
        Applications
      </GoabText>
      <GoabText size="body-s" color="secondary" mt="none" mb="xl">
        {waiting} new · {sampleApplications.length} in total · newest first
      </GoabText>

      <ApplicationsTable rows={sampleApplications} />
    </>
  );
}
