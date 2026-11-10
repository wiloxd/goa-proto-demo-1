/* Copyright choices and the words shown for each, shared by the applicant
 * form and the examiner workspace. Change a label here and it changes on both
 * sides.
 *
 * The country list is a short sample, not a complete list.
 */

export type WorkType =
  | ""
  | "writing"
  | "visual-art"
  | "music"
  | "sound-recording"
  | "film";
export type YesNo = "" | "yes" | "no";
export type Owner = "" | "author" | "someone-else";

export const workTypes: Record<
  Exclude<WorkType, "">,
  { label: string; description: string }
> = {
  writing: {
    label: "Writing",
    description: "For example, a book, article, poem, script or computer code.",
  },
  "visual-art": {
    label: "Visual art",
    description: "For example, a painting, drawing, photograph, sculpture or map.",
  },
  music: {
    label: "Music or lyrics",
    description: "A song or piece of music as written, not a recording of it.",
  },
  "sound-recording": {
    label: "Sound recording",
    description: "A recording of music, speech or other sounds, such as a podcast.",
  },
  film: {
    label: "Film or video",
    description: "For example, a movie, documentary, animation or online video.",
  },
};

export const yesNoLabels: Record<Exclude<YesNo, "">, string> = {
  yes: "Yes",
  no: "No",
};

export const countries = [
  "Australia",
  "Canada",
  "France",
  "Germany",
  "India",
  "Japan",
  "Mexico",
  "United Kingdom",
  "United States",
  "Another country",
];

/** The fee shown on the review page. A sample amount, not a real fee. */
export const applicationFee = "$45";

/** "2400000" becomes "2.3 MB". */
export function formatFileSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} bytes`;
  if (bytes < 1024 * 1024) return `${Math.round(bytes / 1024)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}
