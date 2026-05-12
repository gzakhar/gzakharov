---
layout: post
title: Shipping from a phone
date: 2026-05-11
tags: [ai, agents]
excerpt: "Once an agent runs the developer-half of a project from a server somewhere, the human's surface compresses to whatever fits on a phone. I haven't been at a desk for the last several features of my own project."
---

I was on the MTA Hudson line into Grand Central. The only piece of dev equipment on me was my phone, with Linear open on it; the server running TaskBridge was sitting at home. I wrote up a ticket for a feature I wanted in one of my projects, went back and forth in the comment section with the agent a couple of times until the description was tight enough that I trusted what would come back, and assigned it for pickup. By the time the train pulled into the station, my GitHub app was buzzing with a PR ready for review.

The only reason that's a paragraph I can write is that the project doesn't live in my IDE anymore. It lives in a ticket system. The IDE is a thing that runs on a server somewhere and waits to be told what to do.

## The operator surface is small

When the agent does the implementation half of the work, the human's surface area collapses to a handful of inputs. From my side, the whole loop is:

- <c>Write a ticket.</c> Linear app, ninety seconds.
- <c>Label it for pickup.</c> One tap.
- <c>Wait.</c> The agent doesn't need supervision. I'm free to do something else.
- <c>Review the PR.</c> GitHub mobile is fine for this. Diffs render. Inline comments work.
- <c>Merge it, or send it back.</c> If it's wrong, I comment in Linear with what I want different and re-label `retry`. The agent picks up where it left off, with my comment as added context.

That's the entire loop. None of it requires a 27-inch monitor or a keyboard with arrow keys. The biggest screen any of it benefits from is the PR review &mdash; and even there, a phone is enough for the cases where I already know what I asked for and just need to confirm the agent didn't drift.

The classic objection is *but you can't code on a phone*. It turns out to be the wrong objection. I'm not coding on a phone. I'm directing. The coding is happening on a server.

## What this changes

The IDE always implied a place. Specifically, the place where the IDE was &mdash; the laptop, the desk, the network, the chair. People built rituals around that place. Coffee, two monitors, the right playlist, the chunk of time long enough to be worth booting up for. Those rituals aren't bad; they're how you get into flow.

But they also tied development to a *posture*. Sitting down. Two hands free. Probably alone. Probably indoors. Probably in a long-enough block to justify the setup cost.

The interface compressing to a phone removes the posture requirement. The standing-on-a-train idea now gets a ticket. The five-minute waiting-room window now gets a PR review. The 11pm thought that used to live as a note in a doc until tomorrow now gets dispatched while it's fresh.

The change isn't speed. The agent doesn't ship faster than I would &mdash; honestly, often slower. The change is *who I am* when I'm developing. I no longer have to be at a desk to be the person whose project is moving forward.

## The bet

The claim: a phone screen is big enough for the judgment half of software development, *as long as* the writing half runs elsewhere. The IDE was never protecting the writing &mdash; it was protecting the reading and the deciding. And reading and deciding aren't a 27-inch problem; they're a literacy problem.

If that's true, the question "where do you develop?" answers itself: anywhere you have Linear, GitHub, and a few minutes. Which means the people for whom a desk-bound workflow was a constraint &mdash; parents on leave, IC's on the road, anyone whose ideas don't keep desk hours &mdash; get the same surface area as the person at the corporate workstation.

I'm staking the bet on lived practice. I haven't been at a desk for the last several features of my own project. The work moved forward anyway.

---

The system I'm using to run this way is a small thing called TaskBridge &mdash; an orchestrator that takes a labeled Linear issue and walks it to a merged GitHub PR. The code is public if you want to look at it. But the post isn't really about TaskBridge. It's about what becomes possible once *any* system like it exists, and what changes about where and when you get to be a person who builds things.
