/* Question 8: a copy of the work. Uses the design system's file upload.
 *
 * Nothing is uploaded anywhere: the page only keeps the file's name, size and
 * type, so the review page can show which file was chosen. One file only.
 */

import { useState } from "react";
import {
  GoabFileUploadCard,
  GoabFileUploadInput,
  GoabFormItem,
} from "@abgov/react-components";
import type { GoabFileUploadInputOnSelectFileDetail } from "@abgov/ui-components-common";
import { useAnswers } from "./answers";
import { QuestionPage } from "./QuestionPage";

interface ChosenFile {
  name: string;
  size: number;
  type: string;
}

export function UploadPage() {
  const { answers, saveAnswers } = useAnswers();
  const [file, setFile] = useState<ChosenFile | null>(
    answers.fileName
      ? { name: answers.fileName, size: answers.fileSize, type: answers.fileType }
      : null,
  );
  const [error, setError] = useState("");

  const handleContinue = () => {
    if (!file) {
      setError("Upload a copy of the work");
      return false;
    }
    saveAnswers({ fileName: file.name, fileSize: file.size, fileType: file.type });
    return true;
  };

  return (
    <QuestionPage
      path="/apply/upload"
      heading="Upload a copy of your work"
      intro="We keep this copy as a record of what you registered. Upload the whole work, not a sample of it."
      onContinue={handleContinue}
    >
      <GoabFormItem
        label="Copy of the work"
        helpText="PDF, image, audio or video file. Up to 50 MB."
        error={error}
      >
        {file ? (
          <GoabFileUploadCard
            filename={file.name}
            size={file.size}
            type={file.type}
            onDelete={() => setFile(null)}
          />
        ) : (
          <GoabFileUploadInput
            variant="dragdrop"
            maxFileSize="50MB"
            accept=".pdf,.doc,.docx,.txt,image/*,audio/*,video/*"
            onSelectFile={({ file: chosen }: GoabFileUploadInputOnSelectFileDetail) => {
              setFile({ name: chosen.name, size: chosen.size, type: chosen.type });
              setError("");
            }}
          />
        )}
      </GoabFormItem>
    </QuestionPage>
  );
}
