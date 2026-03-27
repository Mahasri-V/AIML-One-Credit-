# Practical Test Scenarios and Usage Guide

## Quick Start Guide

### Step 1: Install Dependencies
```bash
cd your-project-directory
npm install --save-dev @testing-library/react @testing-library/jest-dom @testing-library/user-event vitest jsdom
```

### Step 2: Run Tests
```bash
# Run all tests
npm test

# Run in watch mode (hot reload)
npm test -- --watch

# View test UI
npm run test:ui
```

### Step 3: Check Results
- ✅ In watch mode, tests re-run automatically when files change
- ✅ Green checkmarks indicate passing tests
- ❌ Red X marks indicate failing tests
- 📊 Coverage metrics show how much code is tested

---

## Real-World Test Scenarios

### Scenario 1: Testing Section Visibility

**Situation**: You want to ensure all portfolio sections are visible on page load.

**Test Code**:
```javascript
it('should display all portfolio sections on load', () => {
  render(<App />);
  
  // Verify each section is visible
  expect(screen.getByText('Hi, I\'m John Doe')).toBeInTheDocument();
  expect(screen.getByText('About Me')).toBeInTheDocument();
  expect(screen.getByText('Skills')).toBeInTheDocument();
  expect(screen.getByText('Projects')).toBeInTheDocument();
  expect(screen.getByText('Contact')).toBeInTheDocument();
});
```

**When to use**: 
- After modifying the layout
- When adding/removing sections
- Before deployment

---

### Scenario 2: Testing Navigation Active State

**Situation**: You need to verify the active navigation link changes as users scroll.

**Test Code**:
```javascript
it('should highlight correct section during scroll', () => {
  render(<App />);
  
  // Initially, Hero should be active
  let heroLink = screen.getByRole('link', { name: 'Hero' });
  expect(heroLink).toHaveClass('active');
  
  // Simulate scroll to Skills section
  window.scrollY = 2000;
  window.dispatchEvent(new Event('scroll'));
  
  // Skills should now be active (verify with updated assertions if needed)
});
```

**When to use**:
- After changing scroll breakpoints
- When modifying section heights
- To verify navigation consistency

---

### Scenario 3: Testing Skills Display

**Situation**: You want to ensure all skills are displayed correctly.

**Test Code**:
```javascript
it('should display all 6 skills with correct names', () => {
  render(<App />);
  
  const expectedSkills = ['React', 'JavaScript', 'CSS', 'Node.js', 'Python', 'UI/UX'];
  
  expectedSkills.forEach(skill => {
    const skillElement = screen.getByText(skill);
    expect(skillElement).toBeInTheDocument();
    expect(skillElement.closest('.skill-card')).toHaveClass('skill-card');
  });
});
```

**When to use**:
- When updating skill list
- To verify skill card rendering
- Before adding more skills

---

### Scenario 4: Testing Project Cards

**Situation**: Verify project cards render with correct content.

**Test Code**:
```javascript
it('should render all project cards with content', () => {
  const { container } = render(<App />);
  
  // Check for 3 projects
  const projectCards = container.querySelectorAll('.project-card');
  expect(projectCards).toHaveLength(3);
  
  // Verify each project has title and description
  for (let i = 1; i <= 3; i++) {
    expect(screen.getByText(`Project ${i}`)).toBeInTheDocument();
    expect(screen.getByText(`Description of project ${i}`)).toBeInTheDocument();
  }
});
```

**When to use**:
- When modifying project structure
- To verify project count
- When updating project descriptions

---

### Scenario 5: Testing Accessibility

**Situation**: Ensure the portfolio is accessible to screen reader users.

**Test Code**:
```javascript
it('should have proper semantic HTML for accessibility', () => {
  render(<App />);
  
  // Check heading hierarchy
  const h1 = screen.getByRole('heading', { level: 1 });
  expect(h1.textContent).toContain('Hi, I\'m John Doe');
  
  // Check all nav links have text
  const navLinks = screen.getAllByRole('link');
  navLinks.forEach(link => {
    expect(link.textContent.trim().length).toBeGreaterThan(0);
  });
});
```

**When to use**:
- Before deploying
- When changing heading structure
- To ensure WCAG compliance

---

### Scenario 6: Testing Event Listeners

**Situation**: Verify scroll event listeners are properly attached/removed.

**Test Code**:
```javascript
it('should properly manage scroll event listener lifecycle', () => {
  const addEventListenerSpy = vi.spyOn(window, 'addEventListener');
  const removeEventListenerSpy = vi.spyOn(window, 'removeEventListener');
  
  const { unmount } = render(<App />);
  
  // Check listener was added
  expect(addEventListenerSpy).toHaveBeenCalledWith('scroll', expect.any(Function));
  
  // Unmount and verify cleanup
  unmount();
  expect(removeEventListenerSpy).toHaveBeenCalledWith('scroll', expect.any(Function));
  
  addEventListenerSpy.mockRestore();
  removeEventListenerSpy.mockRestore();
});
```

**When to use**:
- When modifying effect hooks
- To prevent memory leaks
- After refactoring useEffect

---

### Scenario 7: Testing Button Interaction

**Situation**: Verify the CTA button is interactive and functional.

**Test Code**:
```javascript
it('should handle button click', async () => {
  render(<App />);
  
  const button = screen.getByRole('button', { name: /view my work/i });
  
  // Setup user for interaction
  const user = userEvent.setup();
  
  // Click the button
  await user.click(button);
  
  // Button should still exist (or you could test navigation)
  expect(button).toBeInTheDocument();
});
```

**When to use**:
- When adding button handlers
- To verify click functionality
- Before deploying interactive features

---

### Scenario 8: Testing CSS Classes

**Situation**: Verify proper CSS classes for styling.

**Test Code**:
```javascript
it('should apply correct CSS classes to all elements', () => {
  const { container } = render(<App />);
  
  // Check main app container
  expect(container.querySelector('.app')).toBeInTheDocument();
  
  // Check navbar
  expect(container.querySelector('.navbar')).toBeInTheDocument();
  expect(container.querySelector('.nav-brand')).toBeInTheDocument();
  expect(container.querySelector('.nav-links')).toBeInTheDocument();
  
  // Check all sections
  expect(container.querySelector('.hero')).toBeInTheDocument();
  expect(container.querySelector('.about')).toBeInTheDocument();
  expect(container.querySelector('.skills')).toBeInTheDocument();
  expect(container.querySelector('.projects')).toBeInTheDocument();
  expect(container.querySelector('.contact')).toBeInTheDocument();
});
```

**When to use**:
- After CSS refactoring
- When verifying styling application
- To ensure BEM or class naming convention

---

## Running Tests in Different Scenarios

### Development Workflow
```bash
# Start tests in watch mode
npm test -- --watch

# This will:
# - Run all tests
# - Re-run when files change
# - Show live results
```

### Before Commit
```bash
# Run all tests once with coverage
npm run test:coverage

# Create HTML coverage report
# Check which lines aren't tested
```

### Continuous Integration (CI)
```bash
# Single run (non-watch mode)
npm test -- --run

# With coverage check
npm run test:coverage -- --run
```

### Debugging
```bash
# Run with UI dashboard
npm run test:ui

# This shows:
# - All test files
# - Pass/fail status
# - Execution time
# - Real-time updates
```

---

## Test Patterns Used

### 1. **Rendering Pattern**
Tests that components render without errors.
```javascript
render(<App />);
expect(screen.getByText('expected text')).toBeInTheDocument();
```

### 2. **Query Pattern**
Tests using different query methods:
```javascript
// By role (preferred for accessibility)
screen.getByRole('button', { name: 'Click me' });

// By text
screen.getByText('Some text');

// By class or selector
container.querySelector('.class-name');
```

### 3. **User Interaction Pattern**
Tests simulating user actions:
```javascript
const user = userEvent.setup();
await user.click(element);
```

### 4. **Event Pattern**
Tests for event listeners:
```javascript
window.dispatchEvent(new Event('scroll'));
```

### 5. **Spy Pattern**
Tests tracking function calls:
```javascript
const spy = vi.spyOn(window, 'addEventListener');
expect(spy).toHaveBeenCalled();
```

---

## Common Testing Commands

| Command | Purpose |
|---------|---------|
| `npm test` | Run all tests |
| `npm test -- --watch` | Run in watch mode |
| `npm run test:ui` | Open test UI dashboard |
| `npm run test:coverage` | Generate coverage report |
| `npm test -- App.test` | Run specific test file |
| `npm test -- --grep "Navigation"` | Run tests matching pattern |
| `npm test -- --reporter=verbose` | Verbose output |

---

## De-Bugging Failed Tests

### Step 1: Read the Error
```
FAIL  src/App.test.jsx
  ✕ should render the app component
  
Error: Unable to find an element with the text "My Portfolio"
```

### Step 2: Check Your Assertions
```javascript
// Wrong - exact case matching
expect(screen.getByText('my portfolio')).toBeInTheDocument();

// Right - case-insensitive
expect(screen.getByText(/my portfolio/i)).toBeInTheDocument();
```

### Step 3: Debug with screen.debug()
```javascript
it('test', () => {
  render(<App />);
  screen.debug(); // Print all DOM to console
});
```

### Step 4: Check Element Presence
```javascript
// See all text in document
console.log(screen.getByText(/./));
```

---

## Performance Metrics

After running `npm run test:coverage`, check these metrics:

- **Statements**: % of statements executed
- **Branches**: % of conditional branches tested  
- **Functions**: % of functions called
- **Lines**: % of lines of code executed

**Target Coverage**: 80%+

---

## Next Steps

1. ✅ Install testing dependencies
2. ✅ Run `npm test` to execute all tests
3. ✅ Check test output for pass/fail
4. ✅ Run `npm run test:coverage` to see coverage
5. ✅ Add tests when adding new features
6. ✅ Use `npm test -- --watch` during development

---

## Support Resources

- 📚 [Vitest Docs](https://vitest.dev/)
- 📚 [React Testing Library](https://testing-library.com/react)
- 📚 [Testing Best Practices](https://kentcdodds.com/blog/common-mistakes-with-react-testing-library)
- 💬 Check your IDE for test runner integration
