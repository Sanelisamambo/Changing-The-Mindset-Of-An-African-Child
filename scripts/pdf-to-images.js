const fs = require('fs');
const path = require('path');
const { fromPath } = require('pdf2image');

console.log('📖 PDF to Image Converter');
console.log('========================');

// Check if PDF exists
const pdfPath = path.join(__dirname, '..', 'public', 'book.pdf');
const outputDir = path.join(__dirname, '..', 'public', 'book-pages');

// Check if PDF exists
if (!fs.existsSync(pdfPath)) {
  console.error('❌ PDF not found at:', pdfPath);
  console.log('📌 Please place your PDF at:', pdfPath);
  process.exit(1);
}

console.log('✅ PDF found at:', pdfPath);

// Create output directory if it doesn't exist
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
  console.log('📁 Created output directory:', outputDir);
}

console.log('🔄 Converting PDF to images...');
console.log('⏳ This may take a few moments...');

// Convert PDF to images using fromPath
fromPath(pdfPath, {
  density: 150,           // DPI for quality
  quality: 85,            // JPEG quality
  outputType: 'webp',     // Output format
  outputFolder: outputDir,
  outputFile: 'page',     // Will create page-001.webp, page-002.webp, etc.
})
  .then((images) => {
    console.log(`✅ Successfully converted ${images.length} pages!`);
    console.log(`📁 Images saved to: ${outputDir}`);
    
    // List the files
    const files = fs.readdirSync(outputDir);
    console.log('\n📋 Generated files:');
    files.forEach(file => {
      console.log(`  - ${file}`);
    });
    
    console.log('\n🎉 Done! You can now view your book at http://localhost:3000/read/4');
  })
  .catch((error) => {
    console.error('❌ Error converting PDF:', error.message);
    console.log('\n💡 Alternative method:');
    console.log('You can use online tools or Adobe Acrobat to convert each page to');
    console.log('WebP format and save them as:');
    console.log('  public/book-pages/004.webp');
    console.log('  public/book-pages/005.webp');
    console.log('  ...');
    console.log('  public/book-pages/130.webp');
  });