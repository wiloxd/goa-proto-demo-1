/* Checks that an application submitted on the form reaches the examiner's
 * list, that decisions stick, and that resetting clears both. Uses a stand-in
 * for the browser's storage, since tests run outside a browser. */

import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { sampleApplications } from "../data/sample";
import {
  allApplications,
  recordDecision,
  resetDemoData,
  submitApplication,
} from "./demoData";

const sample = sampleApplications[0];
const {
  id: _id,
  submitted: _submitted,
  status: _status,
  outcome: _outcome,
  ...answers
} = sample;

beforeEach(() => {
  const store = new Map<string, string>();
  globalThis.localStorage = {
    getItem: (key: string) => store.get(key) ?? null,
    setItem: (key: string, value: string) => void store.set(key, value),
    removeItem: (key: string) => void store.delete(key),
    clear: () => store.clear(),
    key: (i: number) => [...store.keys()][i] ?? null,
    get length() {
      return store.size;
    },
  } as Storage;
});

afterEach(() => {
  // Put things back as they were: no storage outside a browser.
  delete globalThis.localStorage;
});

describe("the demo data", () => {
  it("starts with just the sample applications", () => {
    expect(allApplications()).toHaveLength(sampleApplications.length);
  });

  it("adds a submitted application to the top of the list, as New", () => {
    const reference = submitApplication({ ...answers, title: "Submitted Sample Work" });
    const [first] = allApplications();
    expect(reference).toBe("SAMPLE-CR-0007");
    expect(first.id).toBe(reference);
    expect(first.title).toBe("Submitted Sample Work");
    expect(first.status).toBe("New");
  });

  it("numbers each new application after the last", () => {
    submitApplication(answers);
    expect(submitApplication(answers)).toBe("SAMPLE-CR-0008");
  });

  it("keeps a recorded decision", () => {
    recordDecision("SAMPLE-CR-0006", "Refused", {
      reason: "Not original enough",
      message: "Sample.",
    });
    const app = allApplications().find((a) => a.id === "SAMPLE-CR-0006");
    expect(app?.status).toBe("Refused");
    expect(app?.outcome?.reason).toBe("Not original enough");
    expect(app?.outcome?.by).toBe("Sample Worker");
  });

  it("forgets everything on reset", () => {
    submitApplication(answers);
    recordDecision("SAMPLE-CR-0006", "Registered", {
      registrationNumber: "SAMPLE-REG-0006",
    });
    resetDemoData();
    expect(allApplications()).toEqual(sampleApplications);
  });
});
