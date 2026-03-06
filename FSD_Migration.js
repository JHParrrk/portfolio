const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, 'src');
const componentsUnits = path.join(srcDir, 'components', 'units');
const componentsCommons = path.join(srcDir, 'components', 'commons');
const commonsDir = path.join(srcDir, 'commons');

const featuresDir = path.join(srcDir, 'features');
const sharedDir = path.join(srcDir, 'shared');
const appProvidersDir = path.join(srcDir, 'app', 'providers');

const mappings = [
  // Units to Features
  {
    from: path.join(componentsUnits, 'board'),
    to: path.join(featuresDir, 'boards', 'ui'),
  },
  {
    from: path.join(componentsUnits, 'market'),
    to: path.join(featuresDir, 'market', 'ui'),
  },
  {
    from: path.join(componentsUnits, 'login'),
    to: path.join(featuresDir, 'auth', 'ui'),
  },
  {
    from: path.join(componentsUnits, 'mypages'),
    to: path.join(featuresDir, 'mypage', 'ui'),
  },
  {
    from: path.join(componentsUnits, 'openapi'),
    to: path.join(featuresDir, 'openapi', 'ui'),
  },
  {
    from: path.join(componentsUnits, 'myfirebase'),
    to: path.join(featuresDir, 'firebase', 'ui'),
  },

  // Commons to Shared
  {
    from: path.join(componentsCommons, 'layout'),
    to: path.join(sharedDir, 'ui', 'layout'),
  },
  {
    from: path.join(componentsCommons, 'paginations'),
    to: path.join(sharedDir, 'ui', 'pagination'),
  },
  {
    from: path.join(componentsCommons, 'searchbars'),
    to: path.join(sharedDir, 'ui', 'searchbar'),
  },
  {
    from: path.join(componentsCommons, 'uploads'),
    to: path.join(sharedDir, 'ui', 'upload'),
  },
  {
    from: path.join(componentsCommons, 'comments'),
    to: path.join(sharedDir, 'ui', 'comments'),
  },
  {
    from: path.join(componentsCommons, 'hocs'),
    to: path.join(sharedDir, 'ui', 'hocs'),
  },
  {
    from: path.join(componentsCommons, 'hooks'),
    to: path.join(sharedDir, 'hooks'),
  },
  {
    from: path.join(componentsCommons, 'apollo'),
    to: path.join(appProvidersDir, 'apollo'),
  },

  // src/commons to Shared Utils/API/Types
  {
    from: path.join(commonsDir, 'constants'),
    to: path.join(sharedDir, 'utils', 'constants'),
  },
  {
    from: path.join(commonsDir, 'libraries'),
    to: path.join(sharedDir, 'api', 'libraries'),
  },
  { from: path.join(commonsDir, 'types'), to: path.join(sharedDir, 'types') },
  {
    from: path.join(commonsDir, 'styles'),
    to: path.join(sharedDir, 'ui', 'styles'),
  },
  {
    from: path.join(commonsDir, 'stores'),
    to: path.join(sharedDir, 'models', 'stores'),
  },
  {
    from: path.join(commonsDir, 'validations'),
    to: path.join(sharedDir, 'utils', 'validations'),
  },
];

const copyFolderSync = (src, dest) => {
  if (!fs.existsSync(src)) return;
  if (!fs.existsSync(dest)) fs.mkdirSync(dest, { recursive: true });

  const entries = fs.readdirSync(src, { withFileTypes: true });

  for (let entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);

    if (entry.isDirectory()) {
      copyFolderSync(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
};

for (const map of mappings) {
  console.log(`Copying ${map.from} to ${map.to}`);
  copyFolderSync(map.from, map.to);
}

// Clean up after copy if needed, but for safety let's just delete the old dirs later.
console.log('Migration copy complete!');
