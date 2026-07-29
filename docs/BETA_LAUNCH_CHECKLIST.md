# Beta Launch Checklist

Before opening the doors to closed beta users, ensure the following Product and GTM (Go-To-Market) readiness checks are complete.

## 1. Product Experience
- [ ] **Onboarding Tour**: Verify the `OnboardingModal` triggers for new accounts and successfully sets the `has_seen_onboarding` local storage flag.
- [ ] **Empty States**: Ensure dashboards and workflow lists display helpful "Create your first workflow" prompts when no data exists.
- [ ] **Feedback Widget**: Ensure the global `FeedbackWidget` is visible and properly logs user submissions.
- [ ] **Help Center**: Verify the Help Center page is accessible and FAQs are populated.

## 2. Marketing Website
- [ ] **Landing Page**: Verify messaging, hero copy, and Call-to-Action (CTA) buttons link to the registration flow.
- [ ] **Pricing Page**: Confirm tier differentiation is clear and limits (e.g. 1,000 executions for Free tier) are accurate.
- [ ] **Responsive Design**: Verify the Landing Page and Pricing Page render correctly on mobile devices.

## 3. Product Analytics & Telemetry
- [ ] **Tracking Snippet**: Confirm the PostHog/Mixpanel initialization script is present in `index.html`.
- [ ] **Pageviews**: Verify `$pageview` events are registering in the analytics dashboard.
- [ ] **Custom Events**: Verify key product actions (e.g., "Workflow Executed", "Agent Created") emit events for funnel tracking.

## 4. Go-To-Market (GTM)
- [ ] **Demo Video**: Record and upload the platform walkthrough using the script in `LAUNCH_ASSETS.md`.
- [ ] **Social Announcement**: Schedule LinkedIn and Twitter launch posts.
- [ ] **Invite Emails**: Prepare the beta invitation email list and dispatch access keys/links.

**Launch Authorization**:
Once this checklist is cleared by the Product Manager, the Beta invite wave may commence.
