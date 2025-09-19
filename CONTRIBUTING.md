# Contributing to Unykorn XAUFTH/uUSD Ecosystem

Thank you for your interest in contributing to the Unykorn XAUFTH/uUSD ecosystem! This document provides guidelines for contributing to our project.

## 🎯 Code of Conduct

We are committed to providing a welcoming and inclusive experience for everyone. By participating in this project, you agree to abide by our code of conduct:

- Be respectful and inclusive
- Use welcoming and inclusive language
- Be collaborative and constructive
- Focus on what is best for the community
- Show empathy towards other community members

## 🚀 Getting Started

### Prerequisites

Before contributing, ensure you have:
- Node.js 18+ installed
- Git configured with your credentials
- Basic understanding of HTML, CSS, JavaScript
- Familiarity with blockchain and DeFi concepts (preferred)

### Setting up the Development Environment

1. **Fork the Repository**
   ```bash
   # Fork the repo on GitHub, then clone your fork
   git clone https://github.com/YOUR_USERNAME/unykorn-site.git
   cd unykorn-site
   ```

2. **Set up Upstream Remote**
   ```bash
   git remote add upstream https://github.com/kevanbtc/unykorn-site.git
   git fetch upstream
   ```

3. **Install Dependencies (if any)**
   ```bash
   # Currently, this is a static site with no build dependencies
   # Future versions may include npm packages
   ```

4. **Start Local Development Server**
   ```bash
   # Using Python
   python3 -m http.server 8000
   
   # Or using Node.js (if you have it installed)
   npx serve -s . -l 8000
   ```

## 🛠️ Development Workflow

### Branching Strategy

We use a feature branch workflow:
- `main` - Production-ready code
- `develop` - Integration branch for features
- `feature/feature-name` - Individual feature branches
- `hotfix/issue-name` - Critical bug fixes

### Making Changes

1. **Create a Feature Branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Make Your Changes**
   - Follow our coding standards (see below)
   - Test your changes thoroughly
   - Update documentation if needed

3. **Commit Your Changes**
   ```bash
   git add .
   git commit -m "feat: add descriptive commit message"
   ```

4. **Push to Your Fork**
   ```bash
   git push origin feature/your-feature-name
   ```

5. **Create a Pull Request**
   - Use our PR template
   - Provide a clear description of changes
   - Reference any related issues
   - Add screenshots for UI changes

## 📝 Coding Standards

### HTML Guidelines
- Use semantic HTML5 elements
- Ensure accessibility compliance (WCAG 2.1 AA)
- Include proper meta tags and structured data
- Use meaningful IDs and class names

### CSS Guidelines
- Use CSS custom properties (variables) defined in `:root`
- Follow BEM methodology for class naming
- Ensure responsive design (mobile-first approach)
- Use consistent spacing and typography scales

### JavaScript Guidelines
- Use modern ES6+ syntax
- Write clear, self-documenting code
- Handle errors gracefully
- Use async/await for asynchronous operations
- Add JSDoc comments for complex functions

### File Structure
```
unykorn-site/
├── index.html              # Main entry point
├── styles.css              # All styles (consider splitting later)
├── script.js               # Main JavaScript functionality
├── downloads/              # Static files and documents
├── assets/                 # Images, icons, etc. (if added)
├── docs/                   # Additional documentation
└── tests/                  # Test files (if added)
```

## 🧪 Testing Guidelines

Currently, testing is primarily manual. For any contributions:

1. **Visual Testing**
   - Test on multiple browsers (Chrome, Firefox, Safari, Edge)
   - Test on different screen sizes (mobile, tablet, desktop)
   - Verify accessibility using tools like axe-devtools

2. **Functional Testing**
   - Verify all links work correctly
   - Test JavaScript functionality
   - Validate JSON files
   - Check SHA-256 verification works

3. **Performance Testing**
   - Ensure fast loading times
   - Optimize images and assets
   - Monitor Core Web Vitals

## 📋 Types of Contributions

### 🐛 Bug Reports
When reporting bugs, please include:
- Clear description of the issue
- Steps to reproduce
- Expected vs. actual behavior
- Browser and device information
- Screenshots/screen recordings if applicable

### ✨ Feature Requests
For new features, please:
- Check if the feature already exists or is planned
- Describe the problem you're trying to solve
- Propose a solution with examples
- Consider the impact on existing users

### 📚 Documentation Improvements
Documentation contributions are highly valued:
- Fix typos and grammatical errors
- Improve clarity and examples
- Add missing information
- Create tutorials and guides

### 🎨 Design Improvements
For UI/UX improvements:
- Provide mockups or design files
- Consider accessibility implications
- Maintain consistency with existing design
- Test on multiple devices

## 🔍 Review Process

All contributions go through our review process:

1. **Automated Checks**
   - GitHub Actions CI pipeline
   - Link validation
   - File integrity checks

2. **Manual Review**
   - Code quality assessment
   - Feature functionality testing
   - Design consistency check
   - Documentation review

3. **Approval and Merge**
   - At least one maintainer approval required
   - All checks must pass
   - Squash and merge for clean history

## 📄 Commit Message Guidelines

We follow the [Conventional Commits](https://conventionalcommits.org/) specification:

```
type(scope): description

[optional body]

[optional footer(s)]
```

Types:
- `feat:` New features
- `fix:` Bug fixes
- `docs:` Documentation changes
- `style:` Code formatting changes
- `refactor:` Code refactoring
- `test:` Adding or updating tests
- `chore:` Maintenance tasks

Examples:
```
feat: add real-time KPI updates from evidence pack
fix: correct SHA-256 verification for audit files
docs: improve README setup instructions
style: enhance navigation hover effects
```

## 🆘 Getting Help

If you need assistance:

1. **Check existing documentation**
   - README.md
   - GitHub Wiki (when available)
   - Issue discussions

2. **Search existing issues**
   - Someone might have asked the same question
   - Check closed issues for solutions

3. **Ask for help**
   - Open a discussion issue
   - Tag maintainers for urgent matters
   - Be specific about what you need

## 🏷️ Issue Labels

We use these labels to categorize issues:

- `bug` - Something isn't working
- `enhancement` - New feature or improvement
- `documentation` - Documentation improvements
- `good first issue` - Good for newcomers
- `help wanted` - Extra attention needed
- `priority: high` - Urgent fixes needed
- `priority: medium` - Important improvements
- `priority: low` - Nice-to-have features

## 🎉 Recognition

Contributors are recognized in:
- GitHub contributors graph
- Release notes for significant contributions
- Special mentions for major improvements

Thank you for contributing to the Unykorn XAUFTH/uUSD ecosystem! 🚀