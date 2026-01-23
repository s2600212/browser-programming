
# Lecture 02 – Semantic HTML & Structure

## 1. What I implemented this lecture
- Complete semantic HTML structure with header, main, sections, and footer
- Portfolio section with multiple projects including images and embedded video
- Areas of interest section organized with articles and lists
- Accessibility features including skip link, ARIA labels, and descriptive alt text
- Proper heading hierarchy throughout the page
- Social media links in footer using semantic navigation

## 2. Semantic decisions I made (REQUIRED)

### Decision 1
- **Element(s) used:** `<article>` within `<section>`
- **Where in the page:** Portfolio section for each individual project
- **Why this element is semantically correct:** Each project represents a self-contained composition that could be independently distributed or syndicated. The `<article>` element is appropriate because each project has its own heading, images, description, and links, making it a complete, standalone piece of content. This is preferable to using generic `<div>` elements because it conveys meaning about the content's independence and reusability.

### Decision 2
- **Element(s) used:** `<figure>` and `<figcaption>`
- **Where in the page:** Wrapping all images and the embedded video throughout the portfolio section
- **Why this element is semantically correct:** The `<figure>` element is specifically designed for content that is referenced from the main flow but can be moved to another location without affecting the document's meaning. `<figcaption>` provides a caption that is explicitly associated with the figure. This is semantically superior to using `<img>` with a `<p>` tag because it creates a programmatic relationship between the image and its description, which is beneficial for accessibility and document structure.

### Decision 3
- **Element(s) used:** `<nav>` with `aria-label` in the footer
- **Where in the page:** Footer section containing social media links
- **Why this element is semantically correct:** The `<nav>` element indicates a section of navigation links. Even though these are social media links rather than site navigation, they represent a collection of important navigation destinations for the user. The `aria-label="Social media links"` attribute clarifies the purpose of this navigation section for screen reader users, distinguishing it from primary site navigation if present elsewhere on the page.

### Decision 4
- **Element(s) used:** `<main>` with `id="main"`
- **Where in the page:** Wrapping all primary content between header and footer
- **Why this element is semantically correct:** The `<main>` element identifies the primary content of the document, excluding repeated content like headers, footers, and navigation. There should only be one `<main>` element per page, and it helps assistive technologies quickly navigate to the core content. The `id="main"` attribute serves as the target for the skip link, allowing keyboard users to bypass repetitive navigation.

### Decision 5
- **Element(s) used:** `<section>` with `aria-labelledby` referencing heading IDs
- **Where in the page:** Portfolio and Areas of Interest sections
- **Why this element is semantically correct:** The `<section>` element represents a thematic grouping of content, typically with a heading. Using `aria-labelledby` to reference the section's heading ID creates an explicit programmatic relationship between the section and its label, improving accessibility. This is more semantic than using a generic `<div>` because it conveys that this is a meaningful organizational unit of the document.

---

## 3. Accessibility considerations
- **Skip link:** Added a "Skip to content" link at the beginning of the page that targets the `<main>` element, allowing keyboard and screen reader users to bypass repetitive header content
- **Alt text:** All images include descriptive alt text that explains the content and context of the image, not just generic descriptions
- **ARIA labels:** Used `aria-labelledby` to associate sections with their headings, and `aria-label` to describe navigation purposes
- **Semantic elements:** Used proper HTML5 semantic elements (`<header>`, `<main>`, `<section>`, `<article>`, `<nav>`, `<footer>`) which provide implicit roles to assistive technologies
- **Heading hierarchy:** Maintained logical heading structure (h1 → h2 → h3) without skipping levels, making document outline clear
- **Link context:** All links have descriptive text (not "click here") and external links include `rel="noopener noreferrer"` for security
- **Iframe title:** Video embed includes a descriptive title attribute for screen reader context

These features improve usability by making the page navigable by keyboard, understandable by screen readers, and structurally logical for all users regardless of how they access the content.

---

## 4. What I learned
- The importance of choosing the right semantic element based on content meaning, not just visual appearance
- How `<article>` differs from `<section>` (articles are self-contained, sections are thematic groupings)
- The proper use of `<figure>` and `<figcaption>` for associating images with their captions
- ARIA attributes like `aria-labelledby` and `aria-label` enhance accessibility without changing visual presentation
- Skip links are a simple but powerful accessibility feature for keyboard navigation
- Heading hierarchy should be logical and reflect content structure, not styling preferences
- Alt text should be descriptive and contextual, not just identify what the image shows

---

## 5. What I still need to improve
- Better understanding of when to use `<article>` vs `<section>` in edge cases
- Learning more advanced ARIA attributes for complex interactive components
- Creating more detailed and context-specific alt text for complex images
- Learning about semantic HTML for data tables and structured data
- Exploring `<aside>` and `<address>` elements for additional semantic richness

---

## 6. Notes about AI usage (if any)
- **Tool used:** Claude 4.5 Sonnet for reference and validation
- **What I accepted as-is:** Basic semantic HTML structure recommendations and accessibility best practices. Also the last two generated recent projects. The first generated one was modified by me, but the second one was left untouched, as well as the embedded link. This link was fully generated by Claude 4.5 Sonnet and supprisingly works, except for the content is unrelated to the project, but I decided to keep it nontheless, because I found it mildly entertaining.
- **What I modified manually:** 
  - Personalized all content (name, projects, interests, bio)
  - Adjusted heading hierarchy to fit my content
  - Wrote custom alt text for all images based on my actual projects
  - Reorganized sections to match my portfolio needs
  - Added additional ARIA labels and semantic refinements
  - Added an AI content disclaimer
  - Created more detailed project descriptions and interest categories