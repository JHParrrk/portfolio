const fs = require('fs');
const path = require('path');

const targetDirs = [
  path.join(__dirname, 'pages'),
  path.join(__dirname, 'src', 'features'),
  path.join(__dirname, 'src', 'shared'),
  path.join(__dirname, 'src', 'app'),
];

const importReplacements = [
  // 1. Specific features (Absolute paths & Relative up paths)
  {
    regex: /(['"])(?:@\/|\.?\.\/)+(?:src\/)?components\/units\/board/g,
    replacement: '$1@/features/boards/ui',
  },
  {
    regex: /(['"])(?:@\/|\.?\.\/)+(?:src\/)?components\/units\/market/g,
    replacement: '$1@/features/market/ui',
  },
  {
    regex: /(['"])(?:@\/|\.?\.\/)+(?:src\/)?components\/units\/login/g,
    replacement: '$1@/features/auth/ui',
  },
  {
    regex: /(['"])(?:@\/|\.?\.\/)+(?:src\/)?components\/units\/mypages/g,
    replacement: '$1@/features/mypage/ui',
  },
  {
    regex: /(['"])(?:@\/|\.?\.\/)+(?:src\/)?components\/units\/openapi/g,
    replacement: '$1@/features/openapi/ui',
  },
  {
    regex: /(['"])(?:@\/|\.?\.\/)+(?:src\/)?components\/units\/myfirebase/g,
    replacement: '$1@/features/firebase/ui',
  },

  {
    regex: /(['"])(?:\.\.\/)+units\/board/g,
    replacement: '$1@/features/boards/ui',
  },
  {
    regex: /(['"])(?:\.\.\/)+units\/market/g,
    replacement: '$1@/features/market/ui',
  },
  {
    regex: /(['"])(?:\.\.\/)+units\/login/g,
    replacement: '$1@/features/auth/ui',
  },
  {
    regex: /(['"])(?:\.\.\/)+units\/mypages/g,
    replacement: '$1@/features/mypage/ui',
  },
  {
    regex: /(['"])(?:\.\.\/)+units\/openapi/g,
    replacement: '$1@/features/openapi/ui',
  },
  {
    regex: /(['"])(?:\.\.\/)+units\/myfirebase/g,
    replacement: '$1@/features/firebase/ui',
  },
  {
    regex: /(['"])(?:\.\.\/)+registration/g,
    replacement: '$1@/features/auth/ui/registration',
  },

  // 2. Specific FSD Shared mappings
  {
    regex: /(['"])(?:@\/|\.?\.\/)+(?:src\/)?components\/commons\/layout/g,
    replacement: '$1@/shared/ui/layout',
  },
  {
    regex: /(['"])(?:@\/|\.?\.\/)+(?:src\/)?components\/commons\/paginations/g,
    replacement: '$1@/shared/ui/pagination',
  },
  {
    regex: /(['"])(?:@\/|\.?\.\/)+(?:src\/)?components\/commons\/searchbars/g,
    replacement: '$1@/shared/ui/searchbar',
  },
  {
    regex: /(['"])(?:@\/|\.?\.\/)+(?:src\/)?components\/commons\/uploads/g,
    replacement: '$1@/shared/ui/upload',
  },
  {
    regex: /(['"])(?:@\/|\.?\.\/)+(?:src\/)?components\/commons\/comments/g,
    replacement: '$1@/shared/ui/comments',
  },
  {
    regex: /(['"])(?:@\/|\.?\.\/)+(?:src\/)?components\/commons\/hocs/g,
    replacement: '$1@/shared/ui/hocs',
  },
  {
    regex: /(['"])(?:@\/|\.?\.\/)+(?:src\/)?components\/commons\/hooks/g,
    replacement: '$1@/shared/hooks',
  },
  {
    regex: /(['"])(?:@\/|\.?\.\/)+(?:src\/)?commons\/styles/g,
    replacement: '$1@/shared/ui/styles',
  },
  {
    regex: /(['"])(?:@\/|\.?\.\/)+(?:src\/)?commons\/types/g,
    replacement: '$1@/shared/types',
  },
  {
    regex: /(['"])(?:@\/|\.?\.\/)+(?:src\/)?commons\/utils/g,
    replacement: '$1@/shared/utils',
  },
  {
    regex: /(['"])(?:@\/|\.?\.\/)+(?:src\/)?commons\/constants/g,
    replacement: '$1@/shared/utils/constants',
  },
  {
    regex: /(['"])(?:@\/|\.?\.\/)+(?:src\/)?commons\/validations/g,
    replacement: '$1@/shared/utils/validations',
  },
  {
    regex: /(['"])(?:@\/|\.?\.\/)+(?:src\/)?commons\/libraries/g,
    replacement: '$1@/shared/api/libraries',
  },
  {
    regex: /(['"])(?:@\/|\.?\.\/)+(?:src\/)?commons\/stores/g,
    replacement: '$1@/shared/models/stores',
  },
  {
    regex: /(['"])(?:@\/|\.?\.\/)+(?:src\/)?components\/commons\/apollo/g,
    replacement: '$1@/app/providers/apollo',
  },

  // Relative deep up paths targeting commons
  {
    regex: /(['"])(?:\.\.\/)+commons\/hooks/g,
    replacement: '$1@/shared/hooks',
  },
  {
    regex: /(['"])(?:\.\.\/)+commons\/comments/g,
    replacement: '$1@/shared/ui/comments',
  },
  {
    regex: /(['"])(?:\.\.\/)+commons\/paginations/g,
    replacement: '$1@/shared/ui/pagination',
  },
  {
    regex: /(['"])(?:\.\.\/)+commons\/searchbars/g,
    replacement: '$1@/shared/ui/searchbar',
  },
  {
    regex: /(['"])(?:\.\.\/)+commons\/uploads/g,
    replacement: '$1@/shared/ui/upload',
  },
  {
    regex: /(['"])(?:\.\.\/)+commons\/layout/g,
    replacement: '$1@/shared/ui/layout',
  },
  {
    regex: /(['"])(?:\.\.\/)+commons\/hocs/g,
    replacement: '$1@/shared/ui/hocs',
  },
  {
    regex: /(['"])(?:\.\.\/)+commons\/apollo/g,
    replacement: '$1@/app/providers/apollo',
  },
  {
    regex: /(['"])(?:\.\.\/)+commons\/libraries/g,
    replacement: '$1@/shared/api/libraries',
  },
  {
    regex: /(['"])(?:\.\.\/)+commons\/stores/g,
    replacement: '$1@/shared/models/stores',
  },
  {
    regex: /(['"])(?:\.\.\/)+commons\/styles/g,
    replacement: '$1@/shared/ui/styles',
  },
  {
    regex: /(['"])(?:\.\.\/)+commons\/constants/g,
    replacement: '$1@/shared/utils/constants',
  },
  {
    regex: /(['"])(?:\.\.\/)+commons\/types/g,
    replacement: '$1@/shared/types',
  },
  {
    regex: /(['"])(?:\.\.\/)+commons\/validations/g,
    replacement: '$1@/shared/utils/validations',
  },

  // Catch-all
  {
    regex: /(['"])(?:@\/|\.?\.\/)+(?:src\/)?components\/commons/g,
    replacement: '$1@/shared/ui',
  },
  {
    regex: /(['"])(?:@\/|\.?\.\/)+(?:src\/)?commons/g,
    replacement: '$1@/shared',
  },
];

function processFile(filePath) {
  if (
    !filePath.endsWith('.ts') &&
    !filePath.endsWith('.tsx') &&
    !filePath.endsWith('.js') &&
    !filePath.endsWith('.jsx')
  )
    return;
  const content = fs.readFileSync(filePath, 'utf-8');
  let newContent = content;

  for (const { regex, replacement } of importReplacements) {
    newContent = newContent.replace(regex, replacement);
  }

  if (content !== newContent) {
    fs.writeFileSync(filePath, newContent, 'utf-8');
    console.log('Updated imports in', filePath);
  }
}

function traverseAndProcess(dir) {
  if (!fs.existsSync(dir)) return;
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      traverseAndProcess(fullPath);
    } else {
      processFile(fullPath);
    }
  }
}

for (const dir of targetDirs) {
  traverseAndProcess(dir);
}
console.log('Import replacement complete!');
