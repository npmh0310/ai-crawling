# Skill: new-component

Create a new shared React component following shadcn/ui + project conventions.

## Trigger

Use when asked to "create a component", "add a UI component", or "build a widget".

## Decision tree

- Reused across routes → `components/common/<ComponentName>.tsx`
- Layout/navigation → `components/layouts/<section>/<ComponentName>.tsx`
- Used by a single page → co-locate inside `app/<route>/`

## Rules

- Accept `className` as a prop and forward it with `cn()` — never override consumer styles
- Use `cva` for conditional variants, not inline ternaries
- Mark `"use client"` only if the component needs hooks or event handlers
- No default props workarounds — use TypeScript default parameter values
- Export the component as a named export, not default

## Template

```tsx
import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";

const componentVariants = cva("base-classes", {
  variants: {
    variant: {
      default: "...",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

interface ComponentProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof componentVariants> {}

export function ComponentName({ className, variant, ...props }: ComponentProps) {
  return (
    <div className={cn(componentVariants({ variant }), className)} {...props} />
  );
}
```
