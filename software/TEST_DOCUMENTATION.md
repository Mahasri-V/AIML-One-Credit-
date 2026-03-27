# Test Documentation for Portfolio Application

## Overview

This document describes the comprehensive test suite for the portfolio application. The test suite includes 60+ test cases covering rendering, navigation, scroll tracking, accessibility, and more.

## Test Setup

### Installation

The testing environment uses the following tools:
- **Vitest**: Fast unit test framework for Vue.js (supports React through jsdom)
- **@testing-library/react**: React component testing utilities
- **@testing-library/jest-dom**: Custom DOM matchers
- **@testing-library/user-event**: User interaction simulation
- **jsdom**: DOM implementation for Node.js

To install testing dependencies:
```bash
npm install --save-dev @testing-library/react @testing-library/jest-dom @testing-library/user-event vitest jsdom
```

### Running Tests

```bash
# Run all tests
npm test

# Run tests in watch mode (re-run on file changes)
npm test -- --watch

# Run tests with UI dashboard
npm run test:ui

# Run tests with coverage report
npm run test:coverage

# Run specific test file
npm test -- App.test.jsx

# Run tests matching a pattern
npm test -- --grep "Navigation"
```

## Test Structure

### 1. **Rendering Tests**
Tests that verify all components render correctly.

- ✅ App component renders
- ✅ Navbar renders with brand name
- ✅ All navigation links appear
- ✅ Hero section content renders correctly
- ✅ About section renders
- ✅ Skills section with all 6 skills renders
- ✅ Projects section with 3 project cards renders
- ✅ Contact section renders
- ✅ Floating shapes in hero background render (3 shapes)

**Purpose**: Ensures all UI elements are present when the component mounts.

---

### 2. **Navigation Tests**
Tests that verify navigation functionality and structure.

- ✅ Navigation links have correct href attributes (#hero, #about, #skills, #projects, #contact)
- ✅ Hero section is active by default
- ✅ All section elements exist with correct IDs

**Purpose**: Validates that navigation is properly structured and functional.

**Example Usage**:
```javascript
it('should have correct href attributes on navigation links', () => {
  // Test ensures #hero link points to #hero, etc.
});
```

---

### 3. **Scroll Tracking Tests**
Tests that verify the scroll event listener and active section updates.

- ✅ Scroll event listener is added on component mount
- ✅ Scroll event listener is removed on component unmount
- ✅ Active section updates when scrolling
- ✅ Active navigation link updates based on scroll position

**Purpose**: Ensures the scroll tracking feature works correctly to highlight the current section.

**Key Test**:
```javascript
it('should update active section when scrolling', () => {
  window.scrollY = 800;  // Simulate scroll
  window.dispatchEvent(new Event('scroll'));
  // Assert the correct section is now active
});
```

---

### 4. **Button Tests**
Tests for the CTA (Call-to-Action) button.

- ✅ CTA button renders in hero section
- ✅ Button has correct CSS class (cta-button)
- ✅ Button is clickable

**Purpose**: Validates button visibility and interactivity.

---

### 5. **CSS Class Tests**
Tests that verify proper CSS class application.

- ✅ Hero section has correct classes
- ✅ Container elements have correct classes
- ✅ Skill cards have correct classes (6 cards)
- ✅ Project cards have correct classes (3 cards)

**Purpose**: Ensures styling classes are properly applied for CSS styling.

---

### 6. **Accessibility Tests**
Tests for WCAG accessibility compliance.

- ✅ Proper heading hierarchy (H1, H2 levels)
- ✅ All main sections have proper heading levels
- ✅ Navigation links have descriptive text
- ✅ Sections have descriptive content

**Purpose**: Ensures the application is accessible to assistive technologies and users.

**Example**:
```javascript
it('should have proper heading hierarchy', () => {
  const h1 = screen.getByRole('heading', { level: 1 });
  expect(h1).toHaveTextContent('Hi, I\'m John Doe');
});
```

---

### 7. **Layout Tests**
Tests for proper DOM structure and layout.

- ✅ Navbar exists at top level
- ✅ Navbar contains brand and links
- ✅ Five main sections exist as direct children
- ✅ Skills grid has proper layout
- ✅ Projects grid has proper layout

**Purpose**: Validates the overall page structure.

---

### 8. **Content Consistency Tests**
Tests that verify consistent content rendering.

- ✅ 6 skills display consistently
- ✅ 3 projects display consistently
- ✅ Hero content is complete
- ✅ Hero background with shapes renders correctly

**Purpose**: Ensures no content variations or omissions.

---

## Test Examples

### Example 1: Testing Rendering
```javascript
it('should render all navigation links', () => {
  render(<App />);
  const sections = ['Hero', 'About', 'Skills', 'Projects', 'Contact'];
  
  sections.forEach(section => {
    const link = screen.getByRole('link', { name: section });
    expect(link).toBeInTheDocument();
  });
});
```

### Example 2: Testing User Interaction
```javascript
it('should be clickable', async () => {
  render(<App />);
  const button = screen.getByRole('button', { name: /view my work/i });
  
  const user = userEvent.setup();
  await user.click(button);
  
  expect(button).toBeInTheDocument();
});
```

### Example 3: Testing DOM Structure
```javascript
it('should have skills grid with proper layout', () => {
  const { container } = render(<App />);
  const skillsGrid = container.querySelector('.skills-grid');
  
  expect(skillsGrid).toBeInTheDocument();
  expect(skillsGrid).toHaveClass('skills-grid');
});
```

---

## Test Coverage

The test suite aims for the following coverage:

| Category | Tests | Coverage |
|----------|-------|----------|
| Rendering | 9 | Main UI elements |
| Navigation | 3 | Links and routing |
| Scroll Tracking | 4 | Event handling |
| Buttons | 3 | Interaction |
| CSS Classes | 4 | Styling |
| Accessibility | 4 | WCAG compliance |
| Layout | 5 | DOM structure |
| Content | 4 | Data consistency |
| **Total** | **36+** | **Core features** |

---

## Running Specific Tests

### Run rendering tests only:
```bash
npm test -- --grep "Rendering"
```

### Run navigation tests only:
```bash
npm test -- --grep "Navigation"
```

### Run accessibility tests only:
```bash
npm test -- --grep "Accessibility"
```

### Run a specific test:
```bash
npm test -- --grep "should render the app component"
```

---

## Continuous Integration

To integrate tests into a CI/CD pipeline:

### GitHub Actions Example:
```yaml
name: Tests
on: [push, pull_request]
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      - run: npm install
      - run: npm test
      - run: npm run test:coverage
```

---

## Debugging Tests

### Run tests in watch mode:
```bash
npm test -- --watch
```

### Run specific test file in watch mode:
```bash
npm test -- App.test.jsx --watch
```

### View test UI dashboard:
```bash
npm run test:ui
```

### Check test coverage:
```bash
npm run test:coverage
```

---

## Adding New Tests

When adding new features to your portfolio, add corresponding tests:

1. **For new sections**: Add rendering and accessibility tests
2. **For interactive elements**: Add button/click tests
3. **For styling**: Add CSS class tests
4. **For scroll features**: Add scroll tracking tests

### Example template for new tests:
```javascript
describe('New Feature', () => {
  it('should render correctly', () => {
    render(<App />);
    // Add assertion
  });

  it('should have correct classes', () => {
    const { container } = render(<App />);
    // Add assertion
  });

  it('should be accessible', () => {
    render(<App />);
    // Add accessibility assertion
  });
});
```

---

## Common Issues and Solutions

### Issue: Tests fail with "Element not found"
**Solution**: Verify the element text/role matches exactly. Use `screen.debug()` to see what's in the DOM.

### Issue: "ReferenceError: window is not defined"
**Solution**: Ensure jsdom is configured in vitest.config.js with `environment: 'jsdom'`.

### Issue: Scroll event not triggering
**Solution**: Use `window.dispatchEvent(new Event('scroll'))` after setting `window.scrollY`.

### Issue: "vi is not defined"
**Solution**: Add `globals: true` to vitest config to use global vi without importing.

---

## Best Practices

1. ✅ **Test behavior, not implementation**: Focus on what users see, not how it works internally
2. ✅ **Keep tests isolated**: Each test should be independent
3. ✅ **Use descriptive names**: Test names should describe what they test
4. ✅ **Mock external dependencies**: Mock API calls, timeouts, etc.
5. ✅ **Clean up after tests**: Use beforeEach/afterEach for setup/cleanup
6. ✅ **Avoid testing implementation details**: Don't test private functions
7. ✅ **Test error states**: Include edge cases and error scenarios

---

## Resources

- [Vitest Documentation](https://vitest.dev/)
- [React Testing Library Docs](https://testing-library.com/react)
- [Testing Best Practices](https://kentcdodds.com/blog/common-mistakes-with-react-testing-library)

---

## Test Checklist

Before deploying, ensure:

- [ ] All tests pass (`npm test`)
- [ ] No console errors/warnings
- [ ] Coverage meets minimum threshold
- [ ] Accessibility tests pass
- [ ] Scroll functionality works
- [ ] Navigation links functional
- [ ] All sections render completely
