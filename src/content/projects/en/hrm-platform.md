---
title: "Three designers, fifty developers, one HRM built around the seat"
role: "Lead Product Designer"
year: "2024"
summary: "An HRM product for an enterprise client, built by an IT outsourcing team with no prior HRM experience. Shipped and in daily use."
facts:
  Year: "2024"
  Platform: "TODO" # Web / Desktop / Mobile
  Team: "3 designers (me and 2 juniors), 50 developers"
  Role: "Lead Product Designer, product consultant"
  Duration: "TODO"
order: 99
draft: true
---

The key decisions were to build the product in the order the seat model dictates, and to make a transfer as fast in the system as it had been in chat.

## Nobody in the room had built an HRM before

- **New domain.** The client was the first HRM project at the company. No designer, BA or developer had worked with approval chains, org structures or staffing rules before.
- **Requests, not problems.** The client arrived with a list of features. Built line by line, it would have produced modules that did not share one model of the organisation.
- **Scale of the team.** Three designers worked with fifty developers. Reviewing every screen by hand was not possible, so the system and the domain rules had to carry that review.

## Outcome

- **Shipped.** The product is live and the client's staff use it daily.
- **Scope.** TODO: module names.
- **One system.** A single design system, used by the two junior designers and all fifty developers.
- **No usage metrics.** The product and its data belong to the client, so this page reports no numbers beyond team size.

## My part and the team's

| Hat | What I owned |
|---|---|
| Product consultant | Product direction and the order of modules (Decision 1). Advising the client on how their HR process should work in software, including the transfer approval model (Decision 2) |
| Lead designer | The core flows, including transfers (Decision 2). Creating and running the design system, and leading two junior designers (Decision 3) |

## The seat comes before the person

The product is position based. Every change to the organisation goes through a seat, not through a person.

- **Person.** The employee, with their own record.
- **Seat (position).** A place in the org chart, created and approved before anyone is hired into it. It exists whether filled or vacant. Department and reporting line live on the seat.
- **Assignment.** A person placed in a seat. Hiring, promotion and transfer all create or change an assignment.

<!-- TODO: diagram Person / Seat / Assignment -->

## Decision 1: build in the order the seat model dictates

- **Constraint.** Nobody on the team knew HRM, and the client's feature list had no order of its own. Every module on it, from hiring to transfers, reads from the seat.
- **Chosen.** Build sequentially along the seat model: the org structure and its seats first, then the flows that move people into and between them.
- **Why.** Building later modules first would have meant each one inventing its own picture of the organisation, then reconciling them afterwards.
- **Cost.** The first sprints delivered setup screens rather than the features employees would touch. The client had to wait longer to see the parts they had asked for most.

## Decision 2: a transfer in the system has to be as fast as a chat message

- **Constraint.** The client's structure was complex, with many senior levels that had to approve. Transfers happened often.
- **The real benchmark.** Before the product, transfers were agreed verbally and confirmed over online chat. That was fast, and the client expected the system to be just as fast.
- **The tension.** A system has to be accurate and leave a record. Chat is fast because it skips both.
- **Who can start one.** A manager, a team lead or HR.
- **Who approves.** Approval runs from lower levels up to higher ones. When the requester is already senior, only the levels above them need to approve. A transfer needs at most five approvals.
- **Proposed by the client.** Step-by-step approval, one level after another. With up to five levels, a transfer would wait on each approver in turn.
- **Chosen.** We persuaded the client to send the request to every required level at once. The transfer goes through when all of them have approved, in any order.
- **Approve where people already talk.** A Transfers chat bot posts each request. Only the people involved in that transfer can see the message, and they can approve it right there.
- **Accuracy.** Every transfer has an effective date, and the target seat is locked while the request is open, so two transfers cannot claim the same seat.
- **Cost.** Approvals no longer follow the chain of command. A senior approver can sign off before the people below them have seen the request.

## Decision 3: one Figma library, reviewed in sprint, checked at sprint end

- **Constraint.** Three designers, fifty developers. Most screens would be built without a designer watching.
- **Chosen.** I created and ran one design system in Figma, reviewed the juniors' work during the sprint, and ran design QA on what was built at the end of each sprint.
- **Cost.** Drift between design and build surfaced only at sprint end, so fixes moved into the next sprint. Review of every junior design also ran through one person.

## One transfer, from seat to effective date

The product follows a single seat through its changes.

- **Org structure and seats.** HR sets up departments and the seats inside them, each with its reporting line. A seat can stay vacant.
- **Hiring into a seat.** A person is assigned to an approved seat, never directly to a department.
- **Transfer request.** A manager, lead or HR picks the person and the target seat, and sets an effective date. The target seat locks once the request is sent.
- **Approval.** Every required level gets the request at the same time, in the product and in the Transfers chat bot. Each approver can approve from either place.
- **Effective date.** When all approvals are in, the assignment changes on the effective date and the seat lock is released.

<!-- TODO: screens, one per step, captions up to 80 characters, each pointing to a decision -->

## What I would do differently

- **Decision 1.** Building the seat first is what made the seat lock in Decision 2 possible. I would show the client the seat model as a diagram in the first sprint, so the setup screens read as the foundation they were rather than a delay.
- **Decision 2.** The benchmark was chat, not another HR system. I would look for the informal workaround behind every requested feature from day one, because that is the speed users will compare against.
- **Decision 3.** QA at sprint end found drift a sprint late. I would move part of it earlier, with written rules developers can check against before a screen ever reaches review.
