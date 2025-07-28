#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const APPS_DIR = 'apps';
const REGISTRY_FILE = 'docs/registry.json';
const BASE_URL = 'https://raw.githubusercontent.com/spacelift-io/flows-community-registry/refs/heads/main/apps';

function readJsonFile(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(content);
  } catch (error) {
    console.error(`Error reading ${filePath}:`, error.message);
    return null;
  }
}

function findIconFile(appPath) {
  try {
    const files = fs.readdirSync(appPath);
    const iconFile = files.find(file => {
      const ext = path.extname(file).toLowerCase();
      return ext === '.png' || ext === '.svg';
    });
    return iconFile || null;
  } catch (error) {
    return null;
  }
}

function buildRegistry() {
  const registry = {
    apps: {}
  };

  if (!fs.existsSync(APPS_DIR)) {
    console.error(`Apps directory ${APPS_DIR} does not exist`);
    return registry;
  }

  const appDirs = fs.readdirSync(APPS_DIR, { withFileTypes: true })
    .filter(dirent => dirent.isDirectory())
    .map(dirent => dirent.name);

  for (const appDir of appDirs) {
    const manifestPath = path.join(APPS_DIR, appDir, 'manifest.json');
    const appPath = path.join(APPS_DIR, appDir);
    
    if (!fs.existsSync(manifestPath)) {
      console.warn(`Skipping ${appDir}: manifest.json not found`);
      continue;
    }

    const manifest = readJsonFile(manifestPath);
    if (!manifest) {
      console.warn(`Skipping ${appDir}: invalid manifest.json`);
      continue;
    }

    const iconFile = findIconFile(appPath);
    const iconUrl = iconFile ? `${BASE_URL}/${appDir}/${iconFile}` : null;

    registry.apps[appDir] = {
      name: manifest.name,
      description: manifest.description,
      blockStyle: {
        ...(iconUrl && { iconUrl }),
        color: manifest.color
      },
      appMetadataUrl: manifest.appMetadataUrl
    };

    console.log(`Added app: ${appDir}`);
  }

  return registry;
}

function main() {
  console.log('Rebuilding registry.json...');
  
  const registry = buildRegistry();
  
  // Ensure docs directory exists
  const docsDir = path.dirname(REGISTRY_FILE);
  if (!fs.existsSync(docsDir)) {
    fs.mkdirSync(docsDir, { recursive: true });
  }

  // Write the registry file
  fs.writeFileSync(REGISTRY_FILE, JSON.stringify(registry, null, 2) + '\n');
  
  console.log(`Registry updated with ${Object.keys(registry.apps).length} apps`);
}

if (require.main === module) {
  main();
}