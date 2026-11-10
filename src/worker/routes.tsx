/* Every worker page lives under /internal, inside the workspace shell.
 *
 * workerScreens lists the pages for the prototype controls (the "Prototype"
 * button in the corner) and the directory page. When you add a page, add it
 * there too.
 */

import { Route } from "react-router-dom";
import type { ControlSide } from "../shared/controls/types";
import { WorkerShell } from "./WorkerShell";
import { WorkerHomePage } from "./WorkerHomePage";
import { ApplicationPage } from "./ApplicationPage";
import { SearchPage } from "./SearchPage";

export const workerRoutes = (
  <Route path="/internal" element={<WorkerShell />}>
    <Route index element={<WorkerHomePage />} />
    <Route path="applications/:applicationId" element={<ApplicationPage />} />
    <Route path="search" element={<SearchPage />} />
  </Route>
);

export const workerScreens: ControlSide = {
  name: "Worker side",
  description:
    "The workspace examiners use to review copyright applications and register, refuse or ask for changes.",
  home: "/internal",
  owns: (pathname) => pathname === "/internal" || pathname.startsWith("/internal/"),
  sections: [
    {
      heading: "Workspace",
      pages: [
        { label: "Applications", path: "/internal" },
        { label: "A new application", path: "/internal/applications/SAMPLE-CR-0006" },
        { label: "Waiting on applicant", path: "/internal/applications/SAMPLE-CR-0003" },
        { label: "Registered", path: "/internal/applications/SAMPLE-CR-0002" },
        { label: "Refused", path: "/internal/applications/SAMPLE-CR-0001" },
        { label: "Search", path: "/internal/search" },
      ],
    },
  ],
};
