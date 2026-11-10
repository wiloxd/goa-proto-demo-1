/* What the person has answered so far, shared by every page of the form.
 *
 * Answers are kept for this browser tab (sessionStorage), so a page reload
 * doesn't lose them, and closing the tab clears them. "Start over" in the
 * prototype controls clears them too.
 */

import { createContext, useCallback, useContext, useState } from "react";
import type { ReactNode } from "react";

import type { Owner, WorkType, YesNo } from "./options";

export interface Answers {
  typeOfWork: WorkType;
  title: string;
  otherTitle: string;
  /** Four digits, for example "2024". */
  yearFinished: string;
  published: YesNo;
  /** As the date picker gives it: YYYY-MM-DD. */
  publishedDate: string;
  publishedCountry: string;
  authorName: string;
  authorCitizenship: string;
  madeForHire: YesNo;
  owner: Owner;
  ownerName: string;
  ownerAddress: string;
  contactName: string;
  contactEmail: string;
  contactPhone: string;
  /** Only the file's details are kept. Nothing is uploaded anywhere. */
  fileName: string;
  fileSize: number;
  fileType: string;
}

export const emptyAnswers: Answers = {
  typeOfWork: "",
  title: "",
  otherTitle: "",
  yearFinished: "",
  published: "",
  publishedDate: "",
  publishedCountry: "",
  authorName: "",
  authorCitizenship: "",
  madeForHire: "",
  owner: "",
  ownerName: "",
  ownerAddress: "",
  contactName: "",
  contactEmail: "",
  contactPhone: "",
  fileName: "",
  fileSize: 0,
  fileType: "",
};

const STORAGE_KEY = "proto:copyright-answers";

function loadAnswers(): Answers {
  try {
    const stored = sessionStorage.getItem(STORAGE_KEY);
    if (stored) return { ...emptyAnswers, ...JSON.parse(stored) };
  } catch {
    /* No storage (or something unreadable in it): start empty. */
  }
  return emptyAnswers;
}

interface AnswersContextValue {
  answers: Answers;
  saveAnswers: (changes: Partial<Answers>) => void;
}

const AnswersContext = createContext<AnswersContextValue | null>(null);

/* `initial` is for tests, to show a page with answers already filled in. */
export function AnswersProvider({
  children,
  initial,
}: {
  children: ReactNode;
  initial?: Partial<Answers>;
}) {
  const [answers, setAnswers] = useState<Answers>(() =>
    initial ? { ...emptyAnswers, ...initial } : loadAnswers(),
  );

  const saveAnswers = useCallback((changes: Partial<Answers>) => {
    setAnswers((current) => {
      const next = { ...current, ...changes };
      try {
        sessionStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      } catch {
        /* Storage blocked: the answers still work until the page reloads. */
      }
      return next;
    });
  }, []);

  return (
    <AnswersContext.Provider value={{ answers, saveAnswers }}>
      {children}
    </AnswersContext.Provider>
  );
}

export function useAnswers() {
  const value = useContext(AnswersContext);
  if (!value) throw new Error("useAnswers must be used inside AnswersProvider.");
  return value;
}
