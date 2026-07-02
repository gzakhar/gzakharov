---
layout: post
title: Self-healing services
date: 2026-07-01
tags: [ai, agents]
excerpt: "Today code is the durable artifact and the spec goes stale. I think that arrow should flip: the spec becomes the thing that lasts, and the implementation becomes something a system generates, validates, and repairs against it — including repairing the spec itself when it turns out to be incomplete."
---

I'm the only real developer on a handful of projects, and I move between them. The expensive part was never the typing. It was coming back to a project after a few weeks away and trying to reload the whole thing into my head &mdash; what got built, what I was in the middle of, which decisions were already settled and which I'd only argued with myself about. Cold-starting my own context cost more than any single feature.

So I started dumping that context into ticket software. Linear, mostly. Not for what it's for &mdash; there's no team to coordinate &mdash; but as external memory. Each ticket became a place to write down what a feature should do, why, and what I'd already decided. Over time the tickets, not the code, became where the project actually lived.

Then Claude Code got good enough to do the implementation half from those descriptions. So I wired the two sides together: a labeled ticket goes in, an agent picks it up, a PR comes out. That's TaskBridge. And once that loop existed, a different question showed up, which is what this post is actually about.

## The arrow is pointing the wrong way

Right now the flow is:

> specification &rarr; developer &rarr; code

The developer reads the spec, writes the code, and the code becomes the durable artifact &mdash; the thing that's true, the thing you trust, the thing you maintain. The spec, meanwhile, rots. Within a month it describes a system that no longer exists. Everyone knows to read the code, not the doc.

I don't think that's a law of nature. I think it's an artifact of code being expensive to produce, which made it the thing worth keeping. Flip that, and the flow becomes:

> specification &rarr; living system &rarr; implementation

Here the spec is the long-term description of what the system should do, and the implementation is a *generated expression* of that spec &mdash; regenerated, not hand-carried, every time the spec changes. The durable artifact is the intent. The code is downstream and, honestly, somewhat disposable.

So the thesis, in one line:

> Software should move from code as the source of truth to specification as the source of truth, with implementation becoming something the system continuously generates, validates, and repairs.

## The hard part is the spec, not the code

The obvious objection is that a spec can never hold what code holds. Code is where all the real-world nuance ends up &mdash; the edge case someone hit in production, the weird rule the business actually runs on, the thing that's true but nobody wrote down. A paragraph of English doesn't capture that. It never did.

This is where AI stops being an autocomplete in the terminal and starts being the thing that makes the idea viable. A person with deep domain knowledge &mdash; not necessarily someone who can write code &mdash; should be able to describe the desired behavior in plain English, and the system's job is to <c>organize</c> that description, <c>challenge</c> it where it's vague, and <c>complete</c> it where it's missing. Less "generate my code" and more "interrogate my intent until it's specific enough to be executable."

## Incomplete specs are the point, not the flaw

Here's the part I want to be careful about, because it's where the idea is easiest to wave away.

The initial spec will always be incomplete. Always. If the pitch were "write a complete spec and the system takes it from there," it would be the same fantasy as complete requirements documents, and it would fail the same way.

But I don't think incompleteness is a weakness of the idea. I think it's the problem the system exists to solve. The spec shouldn't be complete up front. It should get *more* complete over time, and the mechanism for that is execution. The system runs the implementation, hits tests, hits failures, hits edge cases &mdash; and every gap it finds is a question the spec didn't answer.

When it finds one, it shouldn't guess. It should surface the ambiguity to a human: *here's a case the spec doesn't cover, what should happen?* The human answers, that answer becomes part of the spec, and the implementation gets regenerated to match. The clarification is captured once, in the durable artifact, instead of being buried in a code change nobody will find later.

So "self-healing" is two loops, not one. The obvious one repairs the implementation when it drifts from the spec. The more interesting one repairs the *spec* &mdash; completing it, over time, out of everything execution reveals that the author didn't think to say.

## Someone still owns the spec

If the code stops being the thing you maintain, something has to take its place, and it isn't nothing. It's the spec &mdash; and the spec needs an owner. I think that owner is one role you can arrive at from two directions.

From the product side, it's the <c>technical PM of the future</c>: someone who understands the domain deeply enough to say what the system should do and defend it against the system's questions, without necessarily writing a line of the implementation. The spec is finally a first-class artifact they can own end to end, instead of a doc they hand off and lose control of the moment it hits engineering.

From the engineering side, it's the <c>developer whose job moved up a level</c>. This role doesn't disappear &mdash; it relocates. Instead of writing the implementation, you're the one responsible for keeping the specification correct, complete, and *technically viable*: catching where the domain expert's English is going to generate something that can't actually be built, sits wrong with the rest of the system, or will fall over under load. You sit between the business intent and the machine that renders it, and you're the reason the spec is executable rather than just plausible.

Same seat, two on-ramps. The interesting thing is that "correct, complete, and viable" is a harder, more durable skill than "can produce the code" &mdash; and it's the skill neither role fully has today.

## Where MAPE-K comes in, and where it stops

None of the control-loop shape is new. IBM's autonomic-computing work and the [self-managing systems](https://en.wikipedia.org/wiki/Software_Engineering_for_Adaptive_and_Self-Managing_Systems) research that followed gave us MAPE-K &mdash; monitor, analyze, plan, execute, over shared knowledge &mdash; two decades ago. The idea that a system can watch itself and correct itself is old, and it's the right ancestor to name.

But those loops acted on infrastructure and configuration. They'd restart a failing node, scale a pool, retune a parameter. They adapted the *environment* around a fixed implementation. What they never touched was the implementation logic itself &mdash; the actual behavior of the software. That was the developer's, and it stayed hand-written. The thing that's newly possible is closing the loop one level deeper: not just healing the deployment, but regenerating the logic against a description of what it's supposed to do.

## The bet

Two claims here could be wrong, and they're different sizes.

The small one is the one everybody reaches for: *specs can't be complete enough.* I've already made my peace with that &mdash; incompleteness is the input, not the objection.

The big one is the real bet: **the implementation generated from a spec has to become good enough to run without constant human review.** That's a large claim, and today it's plainly false &mdash; most AI-generated code still needs a human to sign off before it feels safe. The whole idea rests on that gap closing. If generated implementations stay something you have to read line-by-line before you trust them, then the code is still the source of truth in practice, no matter what the diagram says, and this is just a nicer way to draft.

I'm betting the gap closes. But that's the line the idea lives or dies on, and I'd rather name it than hide it.

---

I haven't built this. The nearest thing I have is TaskBridge, which walks a ticket to a PR &mdash; and a PR still assumes a human at the end reading the code. Self-healing services would be the step after: where the ticket isn't a task to be implemented once, but a piece of a living specification the system keeps generating against, and keeps asking me to finish. This post is the idea, not the announcement.
