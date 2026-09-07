# PostHog Self-driving setup report

## Summary

PostHog Self-driving is configured for the Vertex learning platform. Session Replay, Error Tracking, and Support were enabled, alongside health, error, and support signal sources; targeted scouts and Replay Vision monitors are armed.

Findings will begin appearing in the [Self-driving inbox](https://eu.posthog.com/project/257034/inbox) within about 30 minutes as new data and recordings arrive.

## AI data processing

Approved by the organization-level setup gate.

## GitHub

GitHub was already connected before this setup. No repository or issue responder was enabled because GitHub Issues was not selected.

## Products enabled

| Product | Status | Notes |
|---|---|---|
| Session Replay | enabled | Browser `posthog.init` was checked; no disabling override is present. No recordings existed at setup time. |
| Error Tracking | enabled | Browser exception capture is explicitly enabled. One active hydration error was already observed. |
| Support | enabled | Tickets will begin arriving only after an inbound email, inbox, or Slack channel is connected in PostHog. |

## Signal sources

| Signal source | Action | Details |
|---|---|---|
| `signals_scout` / `cross_source_issue` | enabled by default | Scout findings are allowed through the default scout gate; no opt-out row was created. |
| `health_checks` / `health_issue` | enabled | New responder configuration. |
| `error_tracking` / `issue_created` | enabled | New responder configuration. |
| `error_tracking` / `issue_reopened` | enabled | New responder configuration. |
| `error_tracking` / `issue_spiking` | enabled | New responder configuration. |
| `conversations` / `ticket` | enabled | New responder configuration; remains idle until an inbound Support channel exists. |
| Session Replay source row | deliberately skipped | Replay findings are routed through Replay Vision scanners, not a retired session-analysis source. |
| Connected-tool responders | skipped | No external issue tracker or support/error tool was selected. |

## Connected tools

The connected-tools selection was **None of these**. GitHub remains connected but is not enabled as an Issues responder; all offered tools are not used for this setup.

## Scout troop

**Run budget:** 100 maximum runs/day; 0 used today; 100 remaining.

> Scouts are in early access. Each project gets up to 100 scout runs a day. Contact team-self-driving@posthog.com if you need more.

### Enabled scouts (7)

| Scout | Why it is enabled |
|---|---|
| `signals-scout-general` | Cross-product correlations and gaps without a dedicated specialist. |
| `signals-scout-health-checks` | Prioritizes actionable PostHog setup-health issues. |
| `signals-scout-observability-gaps` | Finds meaningful event streams that lack an insight, dashboard, or alert. |
| `signals-scout-product-analytics` | Watches product-flow, funnel, lifecycle, retention, and stickiness behavior. |
| `signals-scout-web-analytics` | Watches traffic, attribution, landing-page, bounce, and 404 regressions. |
| `signals-scout-course-discovery-flow` | Custom Vertex course-to-lesson progression check. |
| `signals-scout-search-engagement-health` | Custom Vertex search-interaction health check. |

### Disabled built-in scouts (22)

- `signals-scout-error-tracking` — covered by the native Error Tracking responder.
- `signals-scout-session-replay` — covered by the Replay Vision monitors below.
- AI observability, APM, CSP violations, customer analytics, data pipelines, data warehouse, experiments, feature flags, logs, revenue analytics, surveys, tasks, skills store, insight alerts, inbox validation, anomaly detection, replay vision, web vitals, and conversations — disabled because this project has no evidence they are actively used, or because a dedicated route is not yet needed.

Enable a relevant specialist later from the inbox if the product begins using that surface.

## Custom scouts

| Scout | What it watches | Discriminator | Why it adds coverage |
|---|---|---|---|
| `signals-scout-course-discovery-flow` | Catalog, course, lesson, and continue-learning interactions. | Sustained course-to-lesson progression regression or interaction cliff while catalog/page activity remains steady. | The built-in product-analytics scout watches generic saved-flow regressions; this explicitly owns Vertex’s course-discovery path and its entry-volume failure mode. |
| `signals-scout-search-engagement-health` | Search submissions and non-sensitive query-length distribution relative to homepage activity. | Sustained search-volume or input-mix shift while the page heartbeat remains steady. | Web analytics watches traffic, but not whether the learning search control itself remains usable and engaged. |

The custom scouts were user-approved, created with daily schedules, and are enabled to emit reports. They should ignore incomplete current buckets, low-volume activity, one-off learner behavior, broad traffic changes, and raw search terms. If either is noisy, set its scout config `emit` to `false` in PostHog to switch it to dry-run mode.

Considered but not added: a search-results-quality scout was ruled out because the current event contract captures search submission and query length, but not result counts or result-click outcomes; that surface is not yet watchable as a success/failure loop.

## Replay Vision scanners

A Replay Vision scanner is an LLM that watches individual session recordings on a schedule and pushes qualifying visible defects to the inbox. These are the only items in this setup that spend Replay Vision quota; each finding arrives at half weight and needs corroboration before promotion into a report.

| Brief | Scanner | Status | Query scope | Sampling | Estimated monthly cost |
|---|---|---|---|---:|---:|
| Breakage monitor | Vertex course learning breakage | created | URLs containing `/courses/`, covering course and lesson navigation—the core learning flow and its immediate predecessors. | 0.5 | 0 credits (0 observations from the recent 7-day estimate) |
| Frustration monitor | Vertex course navigation frustration | created | `$rageclick` only, with no URL filter. | 1.0 | 0 credits (0 observations from the recent 7-day estimate) |

Replay Vision quota was verified: 2,500 credits remain in the current period, with 0 credits used. No session recordings existed during setup, so both scanners are armed and will start working as soon as recordings arrive.

## Follow-ups

- [ ] Connect an inbound Support channel (email, inbox, or Slack) in PostHog so the enabled Support responder can receive tickets.
- [ ] Generate real browser sessions to begin collecting Session Replay recordings; the two Replay Vision scanners will then begin their scheduled analysis.
- [ ] Consider adding outcome telemetry for search (result count and a result-selection event) before adding a future search-quality or unmet-demand scout.

## What happens next

The scout coordinator picks up fresh configs within about 30 minutes. Daily scout runs draw from the verified 100-run budget, and qualifying findings cluster into reports in the Self-driving inbox. Immediately actionable reports can start coding tasks.

## Repository changes

- Created `posthog-self-driving-report.md`.
- No application source files were modified; the existing browser initialization already keeps Session Replay and exception capture enabled.
