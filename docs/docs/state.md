## State management

We use **@tanstack/react-query** for the caching layer:

* automatic background refetch
* stale-while-revalidate UX
* optimistic updates (manual refresh button)

A tiny React context keeps the current search term. No global store (Redux, Zustand) was needed because React-Query already handles shared server data.
