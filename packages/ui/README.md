# @steward/ui

React component library for the Steward design system. Built with Radix UI primitives, Tailwind CSS, and full accessibility support.

## Installation

```bash
pnpm add @steward/ui @steward/tokens
```

## Setup

### 1. Import Styles

Add the global styles to your app's root CSS file:

```css
/* app.css or globals.css */
@import "@steward/ui/styles";
```

Or import the tokens CSS directly and add your own Tailwind setup:

```css
@import "@steward/tokens/dist/tokens.css";
@tailwind base;
@tailwind components;
@tailwind utilities;
```

### 2. Configure Tailwind

Extend your Tailwind config with the Steward preset:

```js
// tailwind.config.js
import stewardPreset from "@steward/ui/tailwind.preset";

export default {
  presets: [stewardPreset],
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
    // Include @steward/ui components in content
    "./node_modules/@steward/ui/dist/**/*.{js,ts,jsx,tsx}",
  ],
};
```

## Components

### Button

```tsx
import { Button } from "@steward/ui";

<Button variant="primary">Save</Button>
<Button variant="secondary">Cancel</Button>
<Button variant="destructive">Delete</Button>
<Button variant="outline">Edit</Button>
<Button variant="ghost">More</Button>
<Button variant="link">Learn more</Button>

// Sizes
<Button size="sm">Small</Button>
<Button size="md">Medium</Button>
<Button size="lg">Large</Button>

// Loading state
<Button loading>Saving...</Button>
```

### Input & FormField

```tsx
import { Input, FormField, Label } from "@steward/ui";

// Basic input
<Input placeholder="Enter your name" />

// With FormField wrapper
<FormField
  label="Email"
  htmlFor="email"
  helpText="We'll never share your email"
  error={errors.email}
  required
>
  <Input id="email" type="email" error={!!errors.email} />
</FormField>
```

### Select

```tsx
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@steward/ui";

<Select>
  <SelectTrigger>
    <SelectValue placeholder="Select a role" />
  </SelectTrigger>
  <SelectContent>
    <SelectItem value="admin">Admin</SelectItem>
    <SelectItem value="member">Member</SelectItem>
    <SelectItem value="guest">Guest</SelectItem>
  </SelectContent>
</Select>
```

### Card

```tsx
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@steward/ui";

<Card>
  <CardHeader>
    <CardTitle>Account Settings</CardTitle>
    <CardDescription>Manage your account preferences</CardDescription>
  </CardHeader>
  <CardContent>
    {/* Form fields */}
  </CardContent>
  <CardFooter>
    <Button>Save changes</Button>
  </CardFooter>
</Card>
```

### Badge

```tsx
import { Badge } from "@steward/ui";

<Badge>Default</Badge>
<Badge variant="success">Active</Badge>
<Badge variant="warning">Pending</Badge>
<Badge variant="danger">Error</Badge>
<Badge variant="outline">Draft</Badge>
```

### Alert

```tsx
import { Alert, AlertTitle, AlertDescription } from "@steward/ui";

<Alert variant="success" showIcon>
  <AlertTitle>Success!</AlertTitle>
  <AlertDescription>Your changes have been saved.</AlertDescription>
</Alert>

<Alert variant="danger" showIcon>
  <AlertTitle>Error</AlertTitle>
  <AlertDescription>Something went wrong. Please try again.</AlertDescription>
</Alert>
```

### Dialog (Modal)

```tsx
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@steward/ui";

<Dialog>
  <DialogTrigger asChild>
    <Button>Open Dialog</Button>
  </DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Confirm Action</DialogTitle>
      <DialogDescription>
        Are you sure you want to continue?
      </DialogDescription>
    </DialogHeader>
    <DialogFooter>
      <Button variant="outline">Cancel</Button>
      <Button>Confirm</Button>
    </DialogFooter>
  </DialogContent>
</Dialog>
```

### Table

```tsx
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@steward/ui";

<Table>
  <TableHeader>
    <TableRow>
      <TableHead>Name</TableHead>
      <TableHead>Email</TableHead>
      <TableHead>Role</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
    <TableRow>
      <TableCell>John Doe</TableCell>
      <TableCell>john@example.com</TableCell>
      <TableCell>Admin</TableCell>
    </TableRow>
  </TableBody>
</Table>
```

### Tabs

```tsx
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@steward/ui";

<Tabs defaultValue="general">
  <TabsList>
    <TabsTrigger value="general">General</TabsTrigger>
    <TabsTrigger value="security">Security</TabsTrigger>
  </TabsList>
  <TabsContent value="general">General settings...</TabsContent>
  <TabsContent value="security">Security settings...</TabsContent>
</Tabs>
```

## Dark Mode

The components automatically support dark mode via CSS variables. Toggle dark mode by adding the `dark` class to your root element:

```tsx
// Toggle dark mode
document.documentElement.classList.toggle("dark");
```

Or use `data-theme` attribute:

```html
<html data-theme="dark">
```

## Accessibility

All components are built with accessibility in mind:

- Full keyboard navigation
- ARIA attributes and roles
- Focus management
- Screen reader support

## TypeScript

All components are fully typed with TypeScript. Import types directly:

```tsx
import type { ButtonProps, CardProps, AlertProps } from "@steward/ui";
```

