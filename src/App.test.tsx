/* Checks that every starter page still draws, at the address it should.
 *
 * If you remove the worker or citizen side, delete its block below too. These
 * tests are only a safety net: they catch a page that has stopped drawing at
 * all, not whether it looks right. Use the preview link for that.
 *
 * Rendered to static markup because this repo has no browser in its tests.
 */

import { renderToStaticMarkup } from "react-dom/server";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, it } from "vitest";

import { App, sides } from "./App";

function renderAt(path: string) {
  return renderToStaticMarkup(
    <MemoryRouter initialEntries={[path]}>
      <App />
    </MemoryRouter>,
  );
}

describe("the directory page", () => {
  it("is at the site root, with each side's pages", () => {
    const markup = renderAt("/");
    expect(markup).toContain("Snapshots");
    for (const side of sides) {
      expect(markup).toContain(side.name);
      for (const page of side.sections.flatMap((s) => s.pages)) {
        expect(markup).toContain(`href="${page.path}"`);
      }
    }
  });

  it("is listed in the prototype controls' sides, not as a side", () => {
    expect(sides.some((side) => side.owns("/"))).toBe(false);
  });
});

describe("the prototype controls", () => {
  it("are on every page", () => {
    expect(renderAt("/")).toContain("Move the prototype controls");
    expect(renderAt("/internal")).toContain("Move the prototype controls");
    expect(renderAt("/no-such-page")).toContain("Move the prototype controls");
  });

  /* A page listed in the controls but missing from the routes (or the other
     way round, after a rename) would show "Page not found". */
  const listed = sides.flatMap((side) => [
    side.home,
    ...side.sections.flatMap((s) => s.pages.map((p) => p.path)),
  ]);
  it.each(listed)("can reach %s", (path) => {
    expect(renderAt(path)).not.toContain("Page not found");
  });

  it("knows which side each listed page is on", () => {
    for (const side of sides) {
      for (const page of side.sections.flatMap((s) => s.pages)) {
        expect(side.owns(page.path), page.path).toBe(true);
      }
    }
  });
});

// ---- WORKER ----
describe("the worker side", () => {
  it("lists the sample applications at /internal, each linking to its page", () => {
    const markup = renderAt("/internal");
    expect(markup).toContain("goa-workspace-layout");
    expect(markup).toContain("Sample Novel Title");
    expect(markup).toContain('href="/internal/applications/SAMPLE-CR-0006"');
  });

  it("shows a new application's details, checks and a decision form", () => {
    const markup = renderAt("/internal/applications/SAMPLE-CR-0006");
    expect(markup).toContain("Sample Press Ltd");
    expect(markup).toContain("March 3, 2026, Canada");
    expect(markup).toContain("sample-novel.pdf");
    expect(markup).toContain("Checks");
    expect(markup).toContain("Record decision");
  });

  it("shows the outcome instead of the form once there is one", () => {
    const registered = renderAt("/internal/applications/SAMPLE-CR-0002");
    expect(registered).toContain("SAMPLE-REG-0002");
    expect(registered).not.toContain("Record decision");

    const refused = renderAt("/internal/applications/SAMPLE-CR-0001");
    expect(refused).toContain("Not something copyright protects");

    expect(renderAt("/internal/applications/SAMPLE-CR-0003")).toContain(
      "Message to the applicant",
    );
  });

  it("says so when an application doesn't exist", () => {
    expect(renderAt("/internal/applications/NOPE")).toContain("Application not found");
  });

  it("shows a search box at /internal/search", () => {
    expect(renderAt("/internal/search")).toContain("Reference, title or author");
  });
});

// ---- CITIZEN ----
describe("the citizen side", () => {
  it("shows the start page at /apply", () => {
    const markup = renderAt("/apply");
    expect(markup).toContain("goa-app-header");
    expect(markup).toContain("Start now");
  });

  it("numbers the questions", () => {
    expect(renderAt("/apply/type-of-work")).toContain("Question 1 of 8");
    expect(renderAt("/apply/upload")).toContain("Question 8 of 8");
  });

  it("shows 'Not provided' for answers not given yet", () => {
    expect(renderAt("/apply/review")).toContain("Not provided");
  });
});

describe("the error pages", () => {
  it("shows a not-found page for an address that doesn't exist", () => {
    expect(renderAt("/no-such-page")).toContain("Page not found");
  });

  it("shows the problem page at /error", () => {
    expect(renderAt("/error")).toContain("We are having a problem");
  });
});
