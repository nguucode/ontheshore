---
title: "Fortify - Insurance CRM"
role: "Senior UI/UX Designer"
year: "2023"
summary: "A CRM for a US insurance agency that I took from domain research to a working front-end in three days with Claude Code: 201 user stories written first, then all built."
cover: "/projects/accountkit/fortify.png"
facts:
  Year: "2023"
  Duration: "3 days"
  Role: "Senior UI/UX Designer"
  Team: "Solo, with Claude Code"
  Tools: "Claude Code, Impeccable, React"
  Demo: "https://crm.ontheshore.biz"
  Source: "https://github.com/nguucode/fortify"
order: 3
draft: false
---

Most of my enterprise work sits behind NDAs, so I can describe it but never show it. Fortify is my answer to that. I picked a domain I had never worked in, a US independent insurance agency that sells home, auto and business insurance through about ten carriers, and set myself one rule: **write the whole product down before building any screen, then let Claude Code build from what I wrote.** Three days later the agency had a working CRM, running on mock data, that anyone can open.

## Learning a business I knew nothing about

I started where I would start on a client project: with how the agency actually works. Two research passes covered the daily workflow from lead to quote, bind, service and renewal, and how existing CRMs and agency management systems lay out their screens. I leaned on primary sources such as state insurance regulators, the independent agents' association and the help docs of the main agency systems, and I marked every place where I was inferring rather than quoting.

The research changed the product before I had drawn anything. An agency already runs its policies, terms and commission in an agency management system, and nobody wants a second copy to keep in sync. So Fortify does not try to replace that system. **It sits beside it, shows policies as read-only and synced, and owns the work around them:** leads, opportunities and quotes, renewals as work items, service requests, certificates and claims.

## Writing the product before drawing it

Before any screen, I settled the object model, four roles (Producer, Account Manager, Principal and Admin) with their permissions, and a sitemap. From there the backlog grew into 16 epics and 201 user stories, each with acceptance criteria and its empty, loading and error states, plus about 45 business rules with their sources. Texas and Florida each have their own rules for things like when an agency may text a client, and those went in as rules too, not as guesses inside a screen.

The spec lives inside the product. Fortify has a Product menu that reads the same files and shows the sitemap, the object model, the roles, the glossary and every story with its status. A reviewer can check any screen against the story it came from without leaving the app.

## Two decisions that shaped the screens

- **The expiration date is the axis of the work.** An agency lives by when each policy ends, so every row in the Accounts list carries a twelve-month ribbon showing where its terms expire. A producer can scan a page of clients and see the next three months of renewals without opening anything.
- **One blue, only for action.** The interface borrows the grammar of a dense developer dashboard: quiet surfaces, tight tables and a single accent. Blue means "you can act here", and status, risk and stage use other means, so a screen full of data still has one obvious next step.

## Building it with Claude Code

I split the stories into build waves and ran each wave through Claude Code with Impeccable, a design skill that reviews the built screens against a written design direction. Domain rules such as "winning an opportunity creates bound terms awaiting the agency system" were written test first, and the project ended with 168 passing tests and a clean automated accessibility scan (WCAG 2.2 AA) on every route it covered, on desktop and mobile.

AI did not get everything right. Review rounds and my own checks caught a stage bar using the wrong blue, columns cut off when the sidebar was pinned and the wrong logo in the header, and some stories needed judgement calls that the spec did not cover, such as who may merge two accounts. Those calls were mine to make, and I logged each one with its reason. **The speed came from the spec, not from the model:** when a story was clear, Claude Code built it right the first time, and when it was vague, I paid for it in review.

## What a demo cannot prove

Fortify has never met a real agency. The data is generated, the integrations are simulated and nobody has used it under the pressure of a renewal season, so I cannot claim it works better for anyone. What it does show is how I work on an enterprise product I can actually share: research first, a spec a team could build from, and AI used to build that spec rather than to replace the thinking behind it.

## Screens

<div class="gallery" tabindex="0" role="region" aria-label="Screens, scroll sideways">
  <figure class="shot">
    <a href="/projects/accountkit/fortify-pipeline.png"><img src="/projects/accountkit/fortify-pipeline.png" alt="Pipeline board with five stages and a needs-attention banner" loading="lazy" /></a>
    <figcaption>1 / 6 · Pipeline: Opportunities by stage, with stale deals flagged</figcaption>
  </figure>
  <figure class="shot">
    <a href="/projects/accountkit/fortify-accounts.png"><img src="/projects/accountkit/fortify-accounts.png" alt="Accounts list with a term ribbon in each row" loading="lazy" /></a>
    <figcaption>2 / 6 · Accounts: the book, with a 12-month term ribbon per row</figcaption>
  </figure>
  <figure class="shot">
    <a href="/projects/accountkit/fortify-accounts-detail.png"><img src="/projects/accountkit/fortify-accounts-detail.png" alt="Account page for a household with tabs, open tasks and contacts" loading="lazy" /></a>
    <figcaption>3 / 6 · Account: policies, renewals, service and activity in one place</figcaption>
  </figure>
  <figure class="shot">
    <a href="/projects/accountkit/fortify-renewals.png"><img src="/projects/accountkit/fortify-renewals.png" alt="Renewals list with expiry, premium change and risk" loading="lazy" /></a>
    <figcaption>4 / 6 · Renewals: work items before each term expires</figcaption>
  </figure>
  <figure class="shot">
    <a href="/projects/accountkit/fortify-service.png"><img src="/projects/accountkit/fortify-service.png" alt="Service request board" loading="lazy" /></a>
    <figcaption>5 / 6 · Service: requests from intake to done</figcaption>
  </figure>
  <figure class="shot">
    <a href="/projects/accountkit/fortify-reports.png"><img src="/projects/accountkit/fortify-reports.png" alt="Pipeline report with stage bars and lost reasons" loading="lazy" /></a>
    <figcaption>6 / 6 · Reports: pipeline, retention and commission by role</figcaption>
  </figure>
</div>
