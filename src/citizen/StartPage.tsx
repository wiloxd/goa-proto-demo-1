/* The start page, following the design system's start page pattern: a
 * heading, what the service is for, what you'll need, and a start button. */

import { useNavigate } from "react-router-dom";
import { GoabButton, GoabText } from "@abgov/react-components";
import { applicationFee } from "./options";
import { questions } from "./journey";

export function StartPage() {
  const navigate = useNavigate();

  return (
    <>
      <GoabText tag="h1" size="heading-xl" mt="none" mb="l">
        Register a copyright
      </GoabText>
      <GoabText size="body-l" mt="none" mb="none">
        Registering creates a public record that you own the copyright in your work. It
        can help you prove ownership if someone copies your work without permission.
      </GoabText>

      <GoabText tag="h2" size="heading-s" mt="2xl" mb="s">
        Before you start
      </GoabText>
      <GoabText size="body-m" mt="none" mb="s">
        You'll need:
      </GoabText>
      <ul className="citizen-list">
        <li>the title of the work and the year it was finished</li>
        <li>the date and country it was first published, if it has been</li>
        <li>the author's name and country of citizenship</li>
        <li>the owner's name and address, if that isn't the author</li>
        <li>a digital copy of the whole work</li>
      </ul>
      <GoabText size="body-m" mt="m" mb="none">
        It costs {applicationFee} and takes about 10 minutes. You'll answer{" "}
        {questions.length} questions, then check your answers before you submit.
      </GoabText>

      <GoabButton type="start" mt="2xl" onClick={() => navigate(questions[0].path)}>
        Start now
      </GoabButton>
    </>
  );
}
