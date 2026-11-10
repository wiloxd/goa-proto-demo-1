/* Every citizen page sits inside the citizen layout, under /apply. (The site
 * root is the directory page, which lists both sides.)
 *
 * citizenScreens lists the pages for the prototype controls (the "Prototype"
 * button in the corner) and the directory page. When you add a page, add it
 * there too.
 */

import { Route } from "react-router-dom";
import type { ControlSide } from "../shared/controls/types";
import { CitizenLayout } from "./CitizenLayout";
import { StartPage } from "./StartPage";
import { TypeOfWorkPage } from "./TypeOfWorkPage";
import { TitlePage } from "./TitlePage";
import { FinishedPage } from "./FinishedPage";
import { PublishedPage } from "./PublishedPage";
import { AuthorPage } from "./AuthorPage";
import { OwnerPage } from "./OwnerPage";
import { ContactPage } from "./ContactPage";
import { UploadPage } from "./UploadPage";
import { ReviewPage } from "./ReviewPage";
import { DonePage } from "./DonePage";
import { donePath, questions, reviewPath, startPath } from "./journey";

export const citizenRoutes = (
  <Route element={<CitizenLayout />}>
    <Route path="apply" element={<StartPage />} />
    <Route path="apply/type-of-work" element={<TypeOfWorkPage />} />
    <Route path="apply/title" element={<TitlePage />} />
    <Route path="apply/finished" element={<FinishedPage />} />
    <Route path="apply/published" element={<PublishedPage />} />
    <Route path="apply/author" element={<AuthorPage />} />
    <Route path="apply/owner" element={<OwnerPage />} />
    <Route path="apply/contact" element={<ContactPage />} />
    <Route path="apply/upload" element={<UploadPage />} />
    <Route path="apply/review" element={<ReviewPage />} />
    <Route path="apply/done" element={<DonePage />} />
  </Route>
);

export const citizenScreens: ControlSide = {
  name: "Citizen side",
  description:
    "The public form someone fills in to register a copyright, from the start page to the confirmation.",
  home: startPath,
  owns: (pathname) => pathname === startPath || pathname.startsWith(`${startPath}/`),
  sections: [
    { heading: "Start", pages: [{ label: "Start page", path: startPath }] },
    { heading: "Questions", pages: questions },
    {
      heading: "Finish",
      pages: [
        { label: "Check your answers", path: reviewPath },
        { label: "Application submitted", path: donePath },
      ],
    },
  ],
};
