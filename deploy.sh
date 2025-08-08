#!/bin/bash

# Ahnaf Portfolio Deployment Script
echo "🚀 Starting deployment..."

# Check if wrangler is installed
if ! command -v wrangler &> /dev/null; then
    echo "❌ Wrangler CLI is not installed. Please install it first:"
    echo "npm install -g wrangler"
    exit 1
fi

# Build the project
echo "📦 Building project..."
npm run build

# Check if build was successful
if [ $? -ne 0 ]; then
    echo "❌ Build failed!"
    exit 1
fi

echo "✅ Build completed successfully!"

# Copy updated files to dist
echo "📁 Copying updated files..."
cp index.html dist/
cp script.js dist/
cp styles.css dist/
cp auth.html dist/
cp dashboard.html dist/
cp CV_Ahnaf_Rahat.pdf dist/

# Copy assets to dist
echo "📁 Copying assets..."
mkdir -p dist/assets
cp assets/* dist/assets/

# Deploy the Worker first (for API endpoints)
echo "🔧 Deploying Cloudflare Worker..."
wrangler deploy

# Check if Worker deployment was successful
if [ $? -ne 0 ]; then
    echo "❌ Worker deployment failed!"
    exit 1
fi

echo "✅ Worker deployed successfully!"

# Deploy static files to Cloudflare Pages
echo "🌐 Deploying static files to Cloudflare Pages..."
wrangler pages deploy dist

# Check if Pages deployment was successful
if [ $? -eq 0 ]; then
    echo "✅ Deployment completed successfully!"
    echo "🎉 Your portfolio is now live!"
    echo "📱 Main site: https://ahnaf-portfolio.pages.dev"
    echo "🔐 Dashboard: https://ahnaf-portfolio.pages.dev/auth.html"
    echo "🔧 API endpoints: https://ahnaf-portfolio.workers.dev"
    echo ""
    echo "📊 Dashboard Credentials:"
    echo "   Username: ahnaf"
    echo "   Password: iamAhnaf@"
    echo ""
    echo "⚠️  Note: Make sure your frontend is pointing to the correct API domain!"
    echo "   Update your API calls to use: https://ahnaf-portfolio.workers.dev"
else
    echo "❌ Pages deployment failed!"
    exit 1
fi
