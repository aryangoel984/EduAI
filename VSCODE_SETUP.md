# Running AI Education Platform in VS Code

## Step 1: Download Project Files
1. In Replit, click the three dots menu (⋯) in the file explorer
2. Select "Download as zip"
3. Extract the zip file to a folder on your computer

## Step 2: Open in VS Code
1. Open VS Code
2. File → Open Folder
3. Select your extracted project folder

## Step 3: Install Dependencies
Open VS Code terminal (Terminal → New Terminal) and run:
```bash
npm install
```

## Step 4: Run the Application
In the terminal, run:
```bash
npm run dev
```

Your application will start at: http://localhost:5000

## Project Structure in VS Code
```
ai-education-platform/
├── client/           # React frontend
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   └── App.tsx
├── server/           # Express backend
│   ├── index.ts
│   ├── routes.ts
│   └── storage.ts
├── shared/           # Shared schemas
└── package.json
```

## VS Code Extensions (Recommended)
- TypeScript and JavaScript Language Features
- ES7+ React/Redux/React-Native snippets
- Tailwind CSS IntelliSense
- Auto Rename Tag

## Development Commands
- `npm run dev` - Start development server
- `Ctrl+C` - Stop the server
- `Ctrl+Shift+P` - VS Code command palette

Your full AI education platform with all features will run locally in VS Code!