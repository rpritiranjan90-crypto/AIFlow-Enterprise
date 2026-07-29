# Billing & Business Analytics Overview

## 1. Billing Operations (Stripe Integration)
- **Subscription Management**: Tiers (Free, Pro, Enterprise) are modeled as Stripe Products.
- **Webhooks**: 
  - `invoice.paid`: Triggers tenant status to `ACTIVE`.
  - `invoice.payment_failed`: Triggers 3-day grace period email; changes status to `PAST_DUE`.
  - `customer.subscription.deleted`: Triggers downgrade to Free tier logic in PostgreSQL.
- **Usage Metering**: Celery workers increment a Redis counter per workflow execution. A nightly cron job aggregates and pushes usage (`stripe.SubscriptionItem.createUsageRecord`) to Stripe for overage billing.

## 2. Executive Analytics Dashboards
Built using PostHog or Mixpanel to track business KPIs:
- **Monthly Active Users (MAU)** & **Daily Active Users (DAU)**.
- **Trial Conversion Rate**: Percentage of users moving from the 14-Day Pro Trial to Paid.
- **Net Revenue Retention (NRR)**: Tracking expansion revenue vs churn.
- **Feature Adoption**: Funnel tracking (e.g. Landing Page -> Sign Up -> First Workflow Executed).
