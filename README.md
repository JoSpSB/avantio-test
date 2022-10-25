# Avantio Test

## Project Setup

> npm init -y

> npm install

> npx tsc -init

### Update tsconfig.json with this:
```
"rootDir": "./src",
"outDir": "./dist",
```

### Update package.json with this:
```
  "nodemonConfig": {
    "watch": [
      "src"
    ],
    "ext": "ts",
    "exec": "npx ts-node src/index.ts"
  }
  "scripts": {
    "build": "npx tsc",
    "dev": "npx nodemon",
    "lint": "npx eslint ./src --ext .ts",
    "test": "jest --coverage"
  }
```

> npx eslint --init
```
  How would you like to use ESLint?
    To check syntax, find problems, and enforce code style
  What type of modules does your project use?
    JavaScript modules (import/export)
  Which framework does your project use?
    None of these
  Does your project use TypeScript?
    Yes
  Where does your code run? (Seleccionar son la barra espaciadora)
    Node
  How would you like to define a style for your project?
    Answer questions about your style
  What format do you want your config file to be in?
    JavaScript
  What style of indentation do you use?
    Spaces
  What quotes do you use for strings?
    Single
  What line endings do you use?
    Unix
  Do you require semicolons?
    Yes
```

> npx prettier --parser typescript --write ./src

### Run the server:
> npm run dev
