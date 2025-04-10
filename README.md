# 🔍 Luma eCommerce Search Tests

This project contains **automated tests** for the [Luma Magento demo store](https://magento.softwaretestingboard.com) using [Playwright](https://playwright.dev/) and TypeScript. It also includes a suite of **manual test cases** to validate the search functionality.

---

### Prerequisites

- [Node.js](https://nodejs.org/en/) v18 or higher
- [Git](https://git-scm.com/)

### Install Dependencies

```bash
npm install
```
### Run Tests

- Execute all tests
```bash
npx playwright test
```

- Run a specific test file
```bash
npx playwright test tests/search.spec.ts
```

- Show browser UI (headed mode)
```bash
npx playwright test --headed
```
### Generate test report
```bash
npx playwright show-report
```

### Manual test cases for the Search field (high-leveled scope)

#### Basic functionality
TC01: Valid search term: Search for an existing product (i.e. “top”) - expected results shown, all results has input value in naming

TC02: Empty search: Submit blank input - expect no action.

TC03: No results: Search invlaid input - proper message is displayed "Your search returned no results."

TC04: Special characters: Input symbols - symbols handling and validation or no matches.

TC05: Minimum characters: Input 1–2 letters - proper message is displayed "Minimum search query length is 3"

#### Auto-suggestions
TC06: Suggestions appear: Start typing - expect dropdown suggestions.

TC07: Click suggestion: Click suggestion - correct page opened with results.

TC08: Keyboard navigation: Arrow keys + Enter on suggestion - works as expected.

TC09: Suggestions close: Blur input - suggestions disappear.

TC10: Trimmed input: Input with spaces - works like trimmed query.

#### Edge cases
TC11: Case insensitive: "TOP" vs "top" - same results.

TC12: Repeated words: "top top" - no issues.

TC13: Long input: 300+ chars - no crash.

TC14: Fast typing/deleting: Smooth performance.

TC15: XSS injection: Input <script> - no code execution.

#### Navigation & consistency
TC16: From different pages: Search works from all pages.

TC17: URL includes query: URL includes ?q= after search.

TC18: Direct URL: Open search result page directly by URL.

TC19: Back button: Back to previous search or page.

TC20: Responsive: Works on desktop, tablet, and mobile.
