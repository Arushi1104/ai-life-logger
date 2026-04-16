# Design System Document: The Quiet Observer

## 1. Overview & Creative North Star
The North Star for this design system is **"The Quiet Observer."** 

In an era of noisy, attention-grabbing interfaces, this system treats the user’s private thoughts with the reverence of a high-end editorial publication. We are moving away from the "app-like" feel of buttons and borders and toward a "living document" feel. The experience is defined by **Intentional Asymmetry** and **Atmospheric Depth**. By utilizing generous whitespace (negative space) as a functional element rather than a void, we create a sense of sanctuary. The interface should feel like a premium, heavy-stock paper journal brought to life through light and soft motion.

---

## 2. Colors & Tonal Architecture
The palette is rooted in deep indigos and soft lavenders, designed to lower the user's heart rate and encourage introspection.

### The "No-Line" Rule
**Explicit Instruction:** 1px solid borders are strictly prohibited for sectioning or containment. Boundaries must be defined solely through background color shifts. To separate the navigation from the feed, use `surface-container-low` against a `surface` background. The eye should perceive change through tone, not lines.

### Surface Hierarchy & Nesting
Treat the UI as a series of physical layers—like stacked sheets of fine vellum.
*   **Base Level:** `surface` (#f5f6fc) or `surface-bright`.
*   **Structural Sections:** Use `surface-container-low` (#eff0f7) for sidebars or background groupings.
*   **Content Focus:** Use `surface-container-lowest` (#ffffff) for the actual journaling cards to make them feel like "raised" paper.

### The "Glass & Gradient" Rule
To elevate the experience beyond flat design:
*   **Floating Elements:** Use Glassmorphism for headers or floating action buttons. Apply a background color of `surface` at 80% opacity with a `24px` backdrop-blur.
*   **Signature Textures:** Use subtle linear gradients for primary CTAs, transitioning from `primary` (#4854a7) to `primary-container` (#99a5fe) at a 135-degree angle. This provides a "soulful" depth that solid fills lack.

---

## 3. Typography: The Editorial Mix
We utilize a dual-font strategy to balance AI intelligence with human emotion.

*   **The Rational (Manrope):** A clean sans-serif used for the "system" voice—labels, buttons, and navigation. It represents the AI's clarity.
    *   *Logo Style:* "ALL" should be set in `display-lg` (Manrope), Bold, with tighter letter-spacing for a minimalist, monolithic look.
*   **The Emotional (Newsreader):** A sophisticated serif used for the "human" voice—journal entries, titles, and long-form reflection.
    *   *Strategy:* Use `title-lg` (Newsreader) for entry headers and `body-lg` (Newsreader) for the journal text. The high x-height and elegant serifs mimic the feel of a literary magazine.

---

## 4. Elevation & Depth
Hierarchy in this design system is achieved through **Tonal Layering** rather than traditional drop shadows.

*   **The Layering Principle:** Place a `surface-container-lowest` card on top of a `surface-container-low` background. This creates a "soft lift."
*   **Ambient Shadows:** If a floating effect is required (e.g., a modal or a floating menu), use an extra-diffused shadow: `box-shadow: 0 20px 40px rgba(72, 84, 167, 0.06);`. Note the tint: we use a tiny percentage of our `primary` indigo rather than black to keep the shadows feeling "airy."
*   **The "Ghost Border" Fallback:** If a border is essential for accessibility, use the `outline-variant` (#abadb3) at **15% opacity**. It should be felt, not seen.

---

## 5. Components

### Buttons
*   **Primary:** Rounded `xl` (1.5rem). Background is a gradient of `primary` to `primary-dim`. Text is `label-md` in `on-primary`.
*   **Tertiary/Ghost:** Use `on-surface-variant` text. No background. Interaction state is a subtle shift to `surface-container-high`.

### Input Fields (The "Reflective" Input)
*   **Styling:** No bottom line or box. Use a `surface-container-low` background with a `xl` corner radius. 
*   **Typography:** The cursor should be the `primary` color. Placeholder text uses `newsreader` to prompt the user's "voice."

### Cards (Journal Entries)
*   **Construction:** `surface-container-lowest` background, `lg` (1rem) rounded corners.
*   **Spacing:** Avoid dividers. Use 32px of vertical whitespace to separate the title (`title-lg` Newsreader) from the metadata (`label-sm` Manrope).

### Chips (Sentiment & Tags)
*   **Visuals:** Use `secondary-container` for the background and `on-secondary-container` for text. Radius should be `full` (pill shape). These should feel like soft pebbles.

### Interactive "Timeline"
*   Instead of a vertical line, use a series of staggered `surface-container-high` dots. This breaks the rigidity of a standard list and feels more "organic."

---

## 6. Do’s and Don’ts

### Do
*   **Do** use asymmetrical margins. For example, give a journal entry more padding on the left than the right to mimic a book gutter.
*   **Do** lean into `surface-container` tiers to create depth.
*   **Do** prioritize `newsreader` for any content the user writes. It validates their words as "literature."

### Don't
*   **Don't** use 100% black (#000000) for text. Use `on-surface` (#2c2f33) to maintain a soft, premium contrast.
*   **Don't** use "standard" 8px or 16px padding everywhere. Mix 24px, 32px, and 48px to create an editorial rhythm.
*   **Don't** use dividers or lines to separate content. If it feels cluttered, add more whitespace or shift the background tone.