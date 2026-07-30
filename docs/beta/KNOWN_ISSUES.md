# AIFlow Enterprise v4.0 — Known Non-Blocking Issues & Mitigations

---

## 📌 Non-Blocking Operational Observations

The following items represent minor, non-critical observations identified during beta testing. None of these items impact core workflow execution, data security, or API availability.

| Issue ID | Description | Impact Level | Mitigation Workaround |
| :- | :--- | :--- | :--- |
| **ISSUE-01** | Python `datetime.utcnow()` deprecation warnings in pytest logs. | Low (Non-blocking warning) | Standardized on `datetime.now(timezone.utc)` for all new Phase 2-5 modules. Code logic is 100% unaffected. |
| **ISSUE-02** | Vite esbuild/oxc plugin warning during `npm test`. | Low (Build tool warning) | Upgrade build tool chain in v4.1 maintenance release. Vitest and TypeScript compilation are 100% clean. |
| **ISSUE-03** | React Router v6 future flag transition warnings. | Low (Warning) | Opt-in flags (`v7_startTransition`, `v7_relativeSplatPath`) will be enabled in React Router v7 release. |
