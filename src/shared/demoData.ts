/* The demo data both sides share: applications submitted on the applicant form,
 * and decisions examiners record.
 *
 * It's kept in this browser (localStorage), so it survives closing the tab and
 * every tab sees the same thing, but nobody else's browser does. A tab that's
 * already open updates as soon as another tab changes something.
 * "Reset demo data" in the prototype controls clears it, leaving only the
 * built-in sample applications.
 *
 * Nothing is sent anywhere. With no storage (tests, or a browser that blocks
 * it), everything still works from the sample data alone.
 */

import { useSyncExternalStore } from "react";
import {
  sampleApplications,
  sampleWorker,
  type ApplicationStatus,
  type SampleApplication,
} from "../data/sample";

export const DEMO_DATA_KEY = "proto-demo:copyright";

type Outcome = NonNullable<SampleApplication["outcome"]>;

interface DemoData {
  /** Applications submitted on the form, newest first. */
  submitted: SampleApplication[];
  /** Decisions recorded by examiners, by application reference. */
  decisions: Record<string, { status: ApplicationStatus; outcome: Outcome }>;
}

const empty: DemoData = { submitted: [], decisions: {} };

/* useSyncExternalStore needs the same object back until something changes,
   so the parsed data is cached against the raw text it came from. */
let cachedRaw: string | null = null;
let cached: DemoData = empty;

function read(): DemoData {
  let raw: string | null = null;
  try {
    raw = localStorage.getItem(DEMO_DATA_KEY);
  } catch {
    return empty;
  }
  if (raw === cachedRaw) return cached;
  cachedRaw = raw;
  try {
    cached = raw ? { ...empty, ...JSON.parse(raw) } : empty;
  } catch {
    cached = empty;
  }
  return cached;
}

const listeners = new Set<() => void>();

function write(data: DemoData) {
  try {
    localStorage.setItem(DEMO_DATA_KEY, JSON.stringify(data));
  } catch {
    /* Storage blocked: the change is lost, as in a test. */
  }
  listeners.forEach((listener) => listener());
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  /* Another tab changed the data. */
  const onStorage = (e: StorageEvent) => {
    if (e.key === DEMO_DATA_KEY || e.key === null) listener();
  };
  window.addEventListener("storage", onStorage);
  return () => {
    listeners.delete(listener);
    window.removeEventListener("storage", onStorage);
  };
}

/** Today as YYYY-MM-DD, in the person's own time zone. */
export function today() {
  const d = new Date();
  return [
    d.getFullYear(),
    String(d.getMonth() + 1).padStart(2, "0"),
    String(d.getDate()).padStart(2, "0"),
  ].join("-");
}

/** Every application, newest first, with recorded decisions applied. */
export function allApplications(data: DemoData = read()): SampleApplication[] {
  return [...data.submitted, ...sampleApplications].map((app) => {
    const decision = data.decisions[app.id];
    return decision ? { ...app, ...decision } : app;
  });
}

export function useApplications(): SampleApplication[] {
  const data = useSyncExternalStore(subscribe, read, () => empty);
  return allApplications(data);
}

export function useApplication(id: string | undefined) {
  return useApplications().find((app) => app.id === id);
}

/* References carry on from the highest one in use: SAMPLE-CR-0007, 0008... */
function nextReference(data: DemoData) {
  const highest = Math.max(
    ...allApplications(data).map((a) => Number(a.id.replace(/\D/g, "")) || 0),
  );
  return `SAMPLE-CR-${String(highest + 1).padStart(4, "0")}`;
}

/** Adds a submitted application and returns its reference. */
export function submitApplication(
  application: Omit<SampleApplication, "id" | "submitted" | "status">,
): string {
  const data = read();
  const id = nextReference(data);
  write({
    ...data,
    submitted: [
      { ...application, id, submitted: today(), status: "New" },
      ...data.submitted,
    ],
  });
  return id;
}

/** Records an examiner's decision on an application. */
export function recordDecision(
  id: string,
  status: ApplicationStatus,
  details: Omit<Outcome, "by" | "on">,
) {
  const data = read();
  write({
    ...data,
    decisions: {
      ...data.decisions,
      [id]: { status, outcome: { by: sampleWorker.name, on: today(), ...details } },
    },
  });
}

/** Forgets everything submitted and decided in this browser. */
export function resetDemoData() {
  try {
    localStorage.removeItem(DEMO_DATA_KEY);
  } catch {
    /* Storage blocked: there's nothing to clear. */
  }
  listeners.forEach((listener) => listener());
}
