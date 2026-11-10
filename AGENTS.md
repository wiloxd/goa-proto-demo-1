# House rules

These apply to every session in this repo.

## Working here

- **Sample data only.** Never use real names, SINs, case details, or screenshots of internal systems. That applies to the code, pull requests, issues, stories and docs.
- **Design system components and tokens first.** Use Government of Alberta Design System components and `--goa-*` tokens before writing your own. The `using-goa-design-system` and `component-search` skills cover how.
- **Load the `visual-design` skill before building or restyling a screen.** Set every Text component's `size` from its role tables, space siblings with a Block or Grid `gap`, and use only design-system tokens for type and spacing. On worker screens, use the compact version of every component that has one.
- **Tables that list records use the `table-sizing` skill.** Wrap them in a `table--list-sizing` box so every list has the same row heights.
- **One change per pull request, using the `open-pr` skill.** Merging to `main` publishes the live prototype, so every change gets its own preview first.
- **Explain in plain language.** The person you're working with is a designer, not a developer. Say what you're doing and why in a sentence or two. Summarise command output; don't paste it.
- **New pages go in the prototype controls.** When you add a page, add it to its side's screens list (`citizenScreens` or `workerScreens`, in that side's routes file) so it can be reached from the **Prototype** button and the directory page at `/`.

## Where to look

- `README.md`: how the prototype is published, where things live, and which files belong to the worker side and the citizen side
- `docs/`: guides for designers and the requirements docs
- `.agents/skills/`: skills for the design system, visual design (text sizes and spacing), table sizing, content design, pull requests, requirements docs, GitHub issues and Jira stories
