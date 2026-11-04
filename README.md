# SortBackend - Jenkins Deployment Ready

Yeh ek Node.js & Express backend project hai jise Jenkins CI/CD pipeline ke sath deploy karna sikhne ke liye organize kiya gaya hai.

---

## 📁 Project Structure

```text
sortbackend/
├── .gitignore          # Git me node_modules, tar.gz aur logs ko ignore karne ke liye
├── Jenkinsfile         # Jenkins CI/CD pipeline (Lint -> Test -> Build -> Package -> Deploy -> Smoke Test)
├── eslint.config.js    # ESLint configuration (linting rules)
├── jest.config.js      # Jest configuration (JUnit XML test reports ke liye)
├── package.json        # Dependencies aur scripts (start, test, lint, build, package, smoke test)
├── README.md           # Project documentation
├── scripts/
│   ├── deploy.sh       # Production deployment script (PM2 / background fallback)
│   └── smoke-test.js   # Automated health check & smoke tests
├── src/
│   ├── app.js          # Express app, middlewares, aur API routes
│   └── server.js       # Server listen / start point
└── tests/
    └── app.test.js     # Jest & Supertest API unit test cases
```

---

## 🚀 Local Run Commands

### 1. Dependencies Install karein:
```bash
npm install
```

### 2. Code Linting Check karein:
```bash
npm run lint
```

### 3. Unit Tests Run karein (Generates XML):
```bash
npm test
```

### 4. Build Validation:
```bash
npm run build
```

### 5. Package Artifact (`.tar.gz`):
```bash
npm run package
```

### 6. Deploy & Smoke Test:
```bash
npm run deploy
npm run test:smoke
```

---

## 🔄 Jenkins Pipeline Stages

1. **Checkout Code**: Git se latest code fetch karta hai.
2. **Install Dependencies**: `npm install` run karta hai.
3. **Code Linting**: `npm run lint` se code standard verify karta hai.
4. **Run Unit Tests**: `npm test` chalata hai aur `test-results/junit.xml` generate karta hai.
5. **Build Application**: Syntax validation `npm run build` perform karta hai.
6. **Package Application**: `tar -czf sortbackend-${BUILD_NUMBER}.tar.gz` banata hai aur `archiveArtifacts` se Jenkins me build artifact store karta hai.
7. **Deploy**: `scripts/deploy.sh` ke through server start/reload karta hai.
8. **Smoke Test**: `scripts/smoke-test.js` ke through running server par live health-check requests bhejta hai.
9. **Post Action**: Jenkins JUnit graph me test results record karta hai (`junit testResults: 'test-results/*.xml'`).
