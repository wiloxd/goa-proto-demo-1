/* Checks the copyright application's answers reach the review page, and that
 * the Change links and Back links go where they should. */

import type { ReactElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { describe, expect, it } from "vitest";

import { AnswersProvider, type Answers } from "./answers";
import { ReviewPage } from "./ReviewPage";
import { ContactPage } from "./ContactPage";
import { OwnerPage } from "./OwnerPage";
import { TitlePage } from "./TitlePage";
import { TypeOfWorkPage } from "./TypeOfWorkPage";
import { UploadPage } from "./UploadPage";
import { formatFileSize } from "../shared/copyright";

function renderPage(path: string, page: ReactElement, answers: Partial<Answers> = {}) {
  return renderToStaticMarkup(
    <MemoryRouter initialEntries={[path]}>
      <AnswersProvider initial={answers}>
        <Routes>
          <Route path="*" element={page} />
        </Routes>
      </AnswersProvider>
    </MemoryRouter>,
  );
}

const sampleAnswers: Partial<Answers> = {
  typeOfWork: "writing",
  title: "Sample Novel Title",
  yearFinished: "2023",
  published: "yes",
  publishedDate: "2024-03-03",
  publishedCountry: "Canada",
  authorName: "Test Author A",
  authorCitizenship: "Canada",
  madeForHire: "no",
  owner: "someone-else",
  ownerName: "Sample Press Ltd",
  ownerAddress: "100 Sample Street",
  contactName: "Test Author A",
  contactEmail: "author@example.com",
  fileName: "sample-novel.pdf",
  fileSize: 2_400_000,
};

describe("the review page", () => {
  it("shows the answers given", () => {
    const markup = renderPage("/apply/review", <ReviewPage />, sampleAnswers);
    expect(markup).toContain("Writing");
    expect(markup).toContain("Sample Novel Title");
    expect(markup).toContain("March 3, 2024, Canada");
    expect(markup).toContain("Test Author A");
    expect(markup).toContain("Sample Press Ltd, 100 Sample Street");
    expect(markup).toContain("author@example.com");
    expect(markup).toContain("sample-novel.pdf (2.3 MB)");
  });

  it("says when the work hasn't been published, and when the author owns it", () => {
    const markup = renderPage("/apply/review", <ReviewPage />, {
      published: "no",
      owner: "author",
    });
    expect(markup).toContain("Not published");
    expect(markup).toContain("The author");
  });

  it("links each answer back to its question, then back to review", () => {
    const markup = renderPage("/apply/review", <ReviewPage />);
    expect(markup).toContain('href="/apply/title?change=1"');
    expect(markup).toContain('href="/apply/upload?change=1"');
    expect(markup).toContain("Change<span");
  });

  it("shows the fee and asks for the declaration", () => {
    const markup = renderPage("/apply/review", <ReviewPage />);
    expect(markup).toContain("$45");
    expect(markup).toContain("goa-checkbox");
  });
});

describe("the question pages", () => {
  it("go back to the previous question", () => {
    expect(renderPage("/apply/contact", <ContactPage />)).toContain(
      'href="/apply/owner"',
    );
  });

  it("go back to the start page from the first question", () => {
    expect(renderPage("/apply/type-of-work", <TypeOfWorkPage />)).toContain(
      'href="/apply"',
    );
  });

  it("go back to the review page when changing an answer", () => {
    expect(renderPage("/apply/contact?change=1", <ContactPage />)).toContain(
      'href="/apply/review"',
    );
  });

  it("show the answer already given", () => {
    expect(renderPage("/apply/title", <TitlePage />, { title: "Sample" })).toContain(
      'value="Sample"',
    );
  });

  it("show the owner's details again when someone else owns it", () => {
    const markup = renderPage("/apply/owner", <OwnerPage />, sampleAnswers);
    expect(markup).toContain('value="Sample Press Ltd"');
  });

  it("show the file already chosen instead of the upload box", () => {
    const markup = renderPage("/apply/upload", <UploadPage />, sampleAnswers);
    expect(markup).toContain("goa-file-upload-card");
    expect(markup).not.toContain("goa-file-upload-input");
  });
});

describe("file sizes", () => {
  it("read in bytes, KB or MB", () => {
    expect(formatFileSize(500)).toBe("500 bytes");
    expect(formatFileSize(20_480)).toBe("20 KB");
    expect(formatFileSize(2_400_000)).toBe("2.3 MB");
  });
});
