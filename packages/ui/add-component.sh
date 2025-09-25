#!/bin/bash

# Script to add Shadcn components and fix import paths
# Usage: ./add-component.sh button input card

if [ $# -eq 0 ]; then
    echo "Usage: $0 <component1> [component2] [component3] ..."
    echo "Example: $0 button input card"
    exit 1
fi

echo "Adding Shadcn components: $@"

# Add components using Shadcn CLI
npx shadcn@latest add "$@" --yes

# Fix import paths in all UI components
echo "Fixing import paths..."
find src/components/ui -name "*.tsx" -exec sed -i '' 's|from "src/lib/utils"|from "../../lib/utils"|g' {} \;

echo "Components added and import paths fixed!"
echo "Don't forget to add the new components to src/index.ts"
