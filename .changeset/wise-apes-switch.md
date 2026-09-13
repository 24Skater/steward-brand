---
"@steward-apps/ui": minor
---

Add `AppSwitcher` — moving between the Steward applications a church has.

It knows no product catalogue: the caller passes the applications, their hosts
and what access the church has to each. A component in the shared design system
that listed Steward's own products would put the hosted business's SKUs inside
a package anybody can install, and would be a lie on a self-hosted install that
runs one application and has never heard of the others.

Applications a church cannot reach are shown greyed out with the reason rather
than hidden, because an application that silently disappears reads as data
loss. Read-only applications stay openable, which is the state in which getting
in to export matters most. With one application and no console configured it
renders nothing at all.
