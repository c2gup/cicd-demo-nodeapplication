# SortBackend - Jenkins Deployment Ready

Yeh ek Node.js & Express backend project hai jise Jenkins CI/CD pipeline ke sath deploy karna sikhne ke liye organize kiya gaya hai.

---

## 📁 Project Structure

```text
sortbackend/
├── .gitignore          # Git me node_modules aur logs ko ignore karne ke liye
├── Jenkinsfile         # Jenkins CI/CD pipeline script
├── package.json        # Dependencies aur scripts (start, test)
├── README.md           # Project documentation
├── src/
│   ├── app.js          # Express app, middlewares, aur API routes
│   └── server.js       # Server listen / start point
└── tests/
    └── app.test.js     # Jest & Supertest API test cases
```

---

## 🚀 Local Run

### 1. Dependencies Install karein:
```bash
npm install
```

### 2. Test Cases Run karein:
```bash
npm test
```

### 3. Server Start karein:
```bash
npm start
```
Server `http://localhost:3000` par run hoga.

---

## 🛠️ Jenkins Setup Guide

### Step 1: Git Repository me Push karein
```bash
git init
git add .
git commit -m "Initial commit with Jenkins pipeline and tests"
git branch -M main
git remote add origin <APKA_GITHUB_REPO_URL>
git push -u origin main
```

### Step 2: Jenkins me Pipeline Banayein
1. Jenkins open karein aur **New Item** par click karein.
2. Name daalein (jaise `sortbackend-pipeline`) aur **Pipeline** select karke OK karein.
3. **Pipeline definition** me **Pipeline script from SCM** select karein.
4. SCM me **Git** select karein aur apna GitHub Repo URL paste karein.
5. Branch specifier me `*/main` check karein.
6. Script Path me `Jenkinsfile` likha hona chahiye.
7. **Save** karein aur **Build Now** par click karein.
