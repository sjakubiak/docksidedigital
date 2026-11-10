---
name: Dependency security overrides
description: Why targeted transitive dependency overrides are retained during security maintenance.
---

Keep targeted security overrides until upstream parent dependencies resolve to patched versions on their own.

**Why:** The latest compatible parent releases still pulled in vulnerable build-tool dependencies; automatic audit fixes alone could not produce a clean dependency tree.

**How to apply:** When updating or removing an override, verify the resolved dependency tree, a clean security audit, TypeScript, and the production build rather than assuming a newer parent release removes the vulnerability.
