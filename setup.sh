#!/bin/bash

# P&J Glass Website - Quick Setup Script
# Run this after cloning/downloading the project

echo "🚀 P&J Glass Website Setup"
echo "============================"
echo ""

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed!"
    echo "📥 Please install Node.js from: https://nodejs.org"
    exit 1
fi

echo "✅ Node.js $(node -v) detected"
echo ""

# Install dependencies
echo "📦 Installing dependencies..."
npm install

if [ $? -eq 0 ]; then
    echo "✅ Dependencies installed successfully!"
else
    echo "❌ Installation failed. Please check errors above."
    exit 1
fi

echo ""
echo "🎨 Setup checklist:"
echo "-------------------"
echo "[ ] Add images to /public/images/"
echo "[ ] Update contact info in Footer.js"
echo "[ ] Configure form endpoint in contact/page.js"
echo "[ ] Add your logo files (logo.svg, logo-white.svg)"
echo ""
echo "🚀 Start development server with:"
echo "   npm run dev"
echo ""
echo "📖 Read README.md for full documentation"
echo ""
echo "✨ You're all set! Happy coding!"
