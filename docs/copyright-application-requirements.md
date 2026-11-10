# Copyright application: requirements

## What it's for

This prototype explores a simpler way to apply to register a copyright. The
starting point is the US Copyright Office's Electronic Copyright Office (eCO),
<https://eservice.eco.loc.gov/>, whose standard application walks an applicant
through about a dozen sections: type of work, titles, publication and
completion, authors, claimants, limitation of claim, rights and permissions,
correspondent, mailing address, special handling and certification, followed by
payment and a separate step to upload the deposit copy.

The prototype is not a copy of eCO and is not a real service. It borrows the
shape of the information eCO collects and asks whether a person registering a
single work of their own could get through it in about ten minutes, one
question at a time.

It has two sides: an applicant who fills in the application, and an examiner
who reviews it. Both are covered here.

## The scoping session, November 10 2026

**Settled in a planning session with the designer.** Three decisions shaped the
first version:

**One author, one work.** The prototype follows the scope of eCO's simpler
"Single Application" rather than its standard one: a single work, created by a
single person, who is usually also the applicant. An "add another author" loop,
contributions by each author and joint ownership were considered and left out
to keep the first version short. If research shows applicants commonly have
co-authors, this is the first thing to revisit.

**A copy of the work is uploaded inside the application.** eCO collects the
deposit copy after payment, as a separate step. Here it is the last question,
before the applicant checks their answers, so there is one flow with one end.
Nothing is uploaded anywhere in the prototype: only the file's name and size are
kept, to show on the review page.

**The fee is shown, but there is no payment screen.** The fee appears on the
start page and again on the review page. Payment was left out because it is a
shared government pattern rather than something this service needs to design.

## How eCO's sections were simplified

Each of eCO's sections was kept, merged or dropped. This mapping is the
prototype's own and has not been checked with anyone who runs copyright
registration. Treat it as **derived and unconfirmed**.

| eCO section | In this prototype |
| --- | --- |
| Type of work | Kept, as five plain-language choices with examples |
| Titles | Kept: one title, plus an optional other title |
| Publication / completion | Kept: the year finished, then whether it was published and, if so, the date and country |
| Authors | Kept for one author: name, citizenship, and whether it was made as part of a job ("work made for hire") |
| Claimants | Kept as "Who owns the copyright?": the author, or someone else with their name and address |
| Limitation of claim | **Dropped.** Asking what material is new and what was borrowed is the hardest part of eCO for a first-time applicant. Leaving it out assumes the whole work is new |
| Rights and permissions, correspondent, mailing address | Merged into one contact question: name, email and an optional phone number |
| Special handling | Dropped |
| Certification | Kept, as a declaration checkbox on the review page |

## The examiner side

**Decided in the same November 10 session:** the examiner side is a workspace
where staff review applications and record one of three outcomes. It was built
after the applicant form was approved, and uses the same answers, so each
application on the examiner side shows exactly what an applicant would have
entered.

**Three outcomes, modelled loosely on eCO's examination:** register the work,
ask the applicant for changes, or refuse. Asking for changes stands in for
eCO's correspondence with the applicant, which can go back and forth for
months; here it's a single message, and the application waits on the
applicant. Refusing needs a reason from a short list and a message in plain
words, because an applicant who is refused will want to know why.

The refusal reasons are **invented**: not original enough, not something
copyright protects, copy missing or can't be opened, copy doesn't match the
application. Nobody should quote this list until someone who examines
applications has looked at it.

**The checklist is prototype-only.** Three checks sit above the decision as a
prompt for what an examiner looks at. They don't block a decision and aren't
recorded. Whether examiners want a checklist at all, and whether it should be
required, is a question for research.

**The registration counts from the day the application was submitted**, not the
day it's decided. That mirrors eCO's effective date of registration and matches
what the applicant is told on the confirmation page. It is an assumption, not
confirmed policy, for the same reason as the applicant side's wording.

**The list shows status, reference, title, type of work and the date
submitted.** An Author column was tried and dropped: with it, the list was too
wide to fit without wrapping. Authors can still be found with search.

## Connecting the two sides

**Decided with the designer on November 10 2026**, after both sides were
built. An application submitted on the form now appears in the examiner's list
with its own reference, and an examiner's decision changes its status from then
on. This lets one person run the whole story in a demo: apply, then review.

Three levels of saving were weighed. Keeping everything per tab, as before,
can't connect the sides, because the examiner usually opens in another tab.
A shared online database would let several people and devices see the same
applications. It was rejected because the published site is public: anyone
with the link could add entries, nobody could make sure they held only sample
data, and it would need an account and upkeep a prototype doesn't justify.

The chosen level saves in the browser being used. It survives closing the tab
and every tab sees it, but no other browser or person does. **This is
prototype-only.** It says nothing about how a real service would store
applications.

**"Reset demo data"** in the prototype controls clears it, so each demo or
research session can start from the same six sample applications.

**References carry on from the highest one in use**, starting at
SAMPLE-CR-0007, and a registered application gets the matching SAMPLE-REG
number. Both are invented formats.

## Assumptions

Made to keep moving, each cheap to change. **None of these are real figures or
policy.**

- **The fee of $45 is invented.** So is the statement that it isn't refunded.
- **"About 3 months" for a decision is invented**, as is "most applications
  don't need changes" on the confirmation page.
- **The confirmation says the registration counts from the day the person
  applied.** That mirrors how eCO's effective date works, but nobody has
  confirmed it applies to this service.
- **The country list is a ten-item sample**, ending in "Another country". A real
  service needs a full list.
- **The upload accepts documents, images, audio and video up to 50 MB.** The
  limit and the file types are placeholders.
- **Contact is by email only.** Phone is optional and there is no postal option.
- **Applicants can't save and come back.** Answers are kept only for the
  browser tab.

## Still open

- **Who the service is for.** The prototype sits in the Government of Alberta
  design system, but copyright registration in Canada is federal. Whether this
  is a design exercise or a service someone would run decides the fee, the
  timeline and the legal wording, and this document can't answer it.
- **Whether dropping "limitation of claim" is acceptable.** Someone who knows
  registration has to say whether an application that assumes the whole work is
  new is still useful, or whether a simple "Does the work include material
  someone else made?" question is needed.
- **Whether the applicant can be someone other than the author or owner**, such
  as an agent or a publisher's staff. The declaration allows for it, but no
  question asks.

## Out of scope

- **Several works in one application** (eCO's group registrations), because the
  first version is about one person registering one thing.
- **Payment**, for the reason above.
- **Signing in and an applicant's account**, so there is no way to check on an
  application after submitting, or to reply when an examiner asks for changes.
- **Assigning applications to examiners**, queues and workload. Every examiner
  sees every application.
- **Saving decisions.** A decision recorded in the prototype shows a
  confirmation and is forgotten when you leave the page. *Since changed: both
  sides now save to the browser. See
  [Connecting the two sides](#connecting-the-two-sides).*
