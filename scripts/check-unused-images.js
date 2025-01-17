const fs = require('fs');
const path = require('path');

try {
    // Read market map data
    const marketMapPath = 'src/data/market-map.json';
    if (!fs.existsSync(marketMapPath)) {
        throw new Error(`Market map file not found at ${marketMapPath}`);
    }
    const marketMapData = JSON.parse(fs.readFileSync(marketMapPath, 'utf8'));

    // Get all image files
    const imagesDir = 'public/images';
    if (!fs.existsSync(imagesDir)) {
        throw new Error(`Images directory not found at ${imagesDir}`);
    }
    const imageFiles = fs.readdirSync(imagesDir)
        .filter(file => file.endsWith('.svg') || file.endsWith('.png'))
        .map(file => file.toLowerCase());

    // Extract all company logos from market map data
    const usedImages = new Set();
    function findLogos(obj) {
        if (obj && typeof obj === 'object') {
            if (obj.logo) {
                usedImages.add(path.basename(obj.logo).toLowerCase());
            }
            Object.values(obj).forEach(value => findLogos(value));
        }
    }
    findLogos(marketMapData);

    // Find unused images
    const unusedImages = imageFiles.filter(file => !usedImages.has(file));

    // Group by file type
    const unusedSvgs = unusedImages.filter(file => file.endsWith('.svg'));
    const unusedPngs = unusedImages.filter(file => file.endsWith('.png'));

    // Print results
    console.log('\nAnalysis Results:');
    console.log('----------------');
    console.log(`Total images found: ${imageFiles.length}`);
    console.log(`Images used in market map: ${usedImages.size}`);
    console.log(`Unused images: ${unusedImages.length}`);

    if (unusedSvgs.length > 0) {
        console.log('\nUnused SVG files:');
        unusedSvgs.forEach(file => console.log(`  - public/images/${file}`));
    }

    if (unusedPngs.length > 0) {
        console.log('\nUnused PNG files:');
        unusedPngs.forEach(file => console.log(`  - public/images/${file}`));
    }

    if (unusedImages.length === 0) {
        console.log('\n✨ All images are being used!');
    } else {
        console.log('\nTo remove unused files, you can run:');
        console.log('rm', unusedImages.map(f => `public/images/${f}`).join(' '));
    }

} catch (error) {
    console.error('\n❌ Error:', error.message);
    process.exit(1);
} 