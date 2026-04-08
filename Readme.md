# Interactive Wall Calendar Component

A highly functional, responsive, and aesthetically pleasing interactive calendar component built for the web. Inspired by physical wall calendars, this project translates a static design concept into a dynamic React component with robust state management and a focus on User Experience (UX).

## ✨ Features

### Core Requirements Fulfilled
* **Physical Aesthetic:** Emulates a real wall calendar with a 3D-styled spiral binding, wall shadow effects, and dynamic geometric image headers.
* **Date Range Selector:** Robust selection logic allowing users to pick start and end dates seamlessly, featuring distinct visual states for the start, end, and in-between days.
* **Integrated Notes Section:** A functional, lined notepad area for monthly memos. 
* **Fully Responsive:** Uses Flexbox/Grid to present a side-by-side layout on desktop and gracefully collapses into a stacked, accordion-style layout for mobile touch screens.

### Creative Liberties & Extras
* **Local Storage Persistence:** Selected date ranges, monthly notes, and theme preferences are saved to the browser's `localStorage`, ensuring data survives page reloads safely without Next.js hydration mismatches.
* **Dark Mode:** A custom, animated theme toggle that dynamically adjusts UI colors, gradients, and contrast for optimal low-light viewing.
* **Monthly Theming:** Each month features a unique hero image and color palette (accent colors and muted backgrounds) that propagate throughout the component.
* **Holiday Markers:** Important dates are subtly highlighted with accent dots below the date numbers.
* **Keyboard Accessibility:** Global keyboard listeners allow users to navigate between months using the `ArrowLeft` and `ArrowRight` keys.
* **Fluid Animations:** Smooth CSS transitions for navigating between months (sliding grids, flipping headers).

## 🛠 Tech Stack

* **Framework:** Next.js / React 
* **Language:** TypeScript 
* **Styling:** Tailwind CSS (with custom arbitrary values for complex gradients/shadows)
* **Icons/Images:** Next/Image for optimized hero images, inline SVGs for UI elements.

## 🏗 Architectural Choices

* **Modular Components:** The monolithic calendar is broken down into single-responsibility components (`CalendarGrid`, `CalendarDay`, `CalendarHero`, `CalendarNotes`) for maintainability.
* **Custom Hooks:** Heavy state logic is decoupled from the view layer using custom hooks (`useDateRange`, `useDarkMode`, `useNotes`).
* **Pure Utility Functions:** Calendar math and grid generation are isolated in `lib/calendar.ts` making them easily testable and independent of React.
* **Client-Side Storage:** Built entirely as a frontend application, relying strictly on native web storage APIs to meet the "Frontend Only" constraint without sacrificing UX.

## 🚀 How to Run Locally

1. **Clone the repository:**
   ```bash
   git clone <your-repository-url>
   cd wall-calendar
