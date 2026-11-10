/* Sample copyright applications for the examiner workspace.
 *
 * Everything here is made up, and meant to look made up. Never put real names,
 * real works, or anything copied from an internal system in this file (or
 * anywhere else in the prototype). If you need more realistic data, ask the AI
 * to invent it.
 *
 * Each application holds the same answers the applicant form collects, so the
 * two sides line up.
 */

import type { GoabBadgeType } from "@abgov/ui-components-common";
import type { Owner, WorkType, YesNo } from "../shared/copyright";

export type ApplicationStatus =
  | "New"
  | "In review"
  | "Waiting on applicant"
  | "Registered"
  | "Refused";

export interface SampleApplication {
  id: string;
  submitted: string;
  status: ApplicationStatus;
  typeOfWork: Exclude<WorkType, "">;
  title: string;
  otherTitle: string;
  yearFinished: string;
  published: Exclude<YesNo, "">;
  publishedDate: string;
  publishedCountry: string;
  authorName: string;
  authorCitizenship: string;
  madeForHire: Exclude<YesNo, "">;
  owner: Exclude<Owner, "">;
  ownerName: string;
  ownerAddress: string;
  contactName: string;
  contactEmail: string;
  contactPhone: string;
  fileName: string;
  fileSize: number;
  /** What happened, for applications that already have an outcome. */
  outcome?: {
    by: string;
    on: string;
    /** Registered: the registration number. */
    registrationNumber?: string;
    /** Refused: the reason given. */
    reason?: string;
    /** Waiting on applicant or Refused: what the applicant was told. */
    message?: string;
  };
}

export const sampleApplications: SampleApplication[] = [
  {
    id: "SAMPLE-CR-0006",
    submitted: "2026-11-09",
    status: "New",
    typeOfWork: "writing",
    title: "Sample Novel Title",
    otherTitle: "Working title: The Sample Chapters",
    yearFinished: "2025",
    published: "yes",
    publishedDate: "2026-03-03",
    publishedCountry: "Canada",
    authorName: "Test Author A",
    authorCitizenship: "Canada",
    madeForHire: "no",
    owner: "someone-else",
    ownerName: "Sample Press Ltd",
    ownerAddress: "100 Sample Street, Sampletown",
    contactName: "Test Author A",
    contactEmail: "author.a@example.com",
    contactPhone: "",
    fileName: "sample-novel.pdf",
    fileSize: 2_400_000,
  },
  {
    id: "SAMPLE-CR-0005",
    submitted: "2026-11-06",
    status: "New",
    typeOfWork: "film",
    title: "Sample Short Film",
    otherTitle: "",
    yearFinished: "2026",
    published: "no",
    publishedDate: "",
    publishedCountry: "",
    authorName: "Test Author E",
    authorCitizenship: "Australia",
    madeForHire: "no",
    owner: "author",
    ownerName: "",
    ownerAddress: "",
    contactName: "Test Author E",
    contactEmail: "author.e@example.com",
    contactPhone: "555-0105",
    fileName: "sample-short-film.mp4",
    fileSize: 48_200_000,
  },
  {
    id: "SAMPLE-CR-0004",
    submitted: "2026-11-02",
    status: "In review",
    typeOfWork: "visual-art",
    title: "Untitled Sample Landscape No. 4",
    otherTitle: "",
    yearFinished: "2024",
    published: "no",
    publishedDate: "",
    publishedCountry: "",
    authorName: "Test Author B",
    authorCitizenship: "United Kingdom",
    madeForHire: "no",
    owner: "author",
    ownerName: "",
    ownerAddress: "",
    contactName: "Test Author B",
    contactEmail: "author.b@example.com",
    contactPhone: "",
    fileName: "sample-landscape-4.jpg",
    fileSize: 3_100_000,
  },
  {
    id: "SAMPLE-CR-0003",
    submitted: "2026-10-27",
    status: "Waiting on applicant",
    typeOfWork: "music",
    title: "Sample Song Lyrics",
    otherTitle: "",
    yearFinished: "2025",
    published: "yes",
    publishedDate: "2025-06-12",
    publishedCountry: "United States",
    authorName: "Test Author C",
    authorCitizenship: "Canada",
    madeForHire: "yes",
    owner: "someone-else",
    ownerName: "Sample Records Inc",
    ownerAddress: "200 Example Avenue, Sample City",
    contactName: "Test Contact C",
    contactEmail: "contact.c@example.com",
    contactPhone: "",
    fileName: "sample-lyrics-verse-1.pdf",
    fileSize: 84_000,
    outcome: {
      by: "Sample Worker",
      on: "2026-11-03",
      message:
        "The file you uploaded has the first verse only. Upload the complete lyrics so we can register the whole work.",
    },
  },
  {
    id: "SAMPLE-CR-0002",
    submitted: "2026-10-20",
    status: "Registered",
    typeOfWork: "sound-recording",
    title: "Sample Podcast, Episode 1",
    otherTitle: "",
    yearFinished: "2026",
    published: "yes",
    publishedDate: "2026-02-14",
    publishedCountry: "Canada",
    authorName: "Test Author D",
    authorCitizenship: "Canada",
    madeForHire: "no",
    owner: "author",
    ownerName: "",
    ownerAddress: "",
    contactName: "Test Author D",
    contactEmail: "author.d@example.com",
    contactPhone: "",
    fileName: "sample-podcast-ep1.mp3",
    fileSize: 31_500_000,
    outcome: {
      by: "Sample Worker",
      on: "2026-10-30",
      registrationNumber: "SAMPLE-REG-0002",
    },
  },
  {
    id: "SAMPLE-CR-0001",
    submitted: "2026-10-14",
    status: "Refused",
    typeOfWork: "writing",
    title: "The Big Sample Idea",
    otherTitle: "",
    yearFinished: "2026",
    published: "no",
    publishedDate: "",
    publishedCountry: "",
    authorName: "Test Author F",
    authorCitizenship: "Another country",
    madeForHire: "no",
    owner: "author",
    ownerName: "",
    ownerAddress: "",
    contactName: "Test Author F",
    contactEmail: "author.f@example.com",
    contactPhone: "",
    fileName: "big-idea-summary.txt",
    fileSize: 1_200,
    outcome: {
      by: "Sample Worker",
      on: "2026-10-22",
      reason: "Not something copyright protects",
      message:
        "The file describes an idea for a story. Copyright protects the finished work, not the idea for it.",
    },
  },
];

export function findApplication(id: string | undefined) {
  return sampleApplications.find((a) => a.id === id);
}

/* Which badge colour each status uses. */
export const statusBadge: Record<ApplicationStatus, GoabBadgeType> = {
  New: "important",
  "In review": "information",
  "Waiting on applicant": "default",
  Registered: "success",
  Refused: "emergency",
};

export const sampleWorker = {
  name: "Sample Worker",
  role: "Registration examiner",
};
