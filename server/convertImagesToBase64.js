const fs = require('fs');
const path = require('path');

// Directory containing images
const imageDir = path.join(__dirname, 'produits');

// Function to convert image to Base64 data URL
const convertImageToBase64 = (filePath) => {
  const image = fs.readFileSync(filePath); // Read the file as binary
  return `data:image/png;base64,${image.toString('base64')}`; // Convert to Base64 string and format
};

// Get a list of all image files in the directory
const getImageFiles = (dir) => {
  return fs.readdirSync(dir).filter(file => file.endsWith('.png'));
};

// Main function to convert all images
const batchConvertImages = () => {
  const imageFiles = getImageFiles(imageDir);
  imageFiles.forEach((file) => {
    const filePath = path.join(imageDir, file);
    const base64Data = convertImageToBase64(filePath);
    console.log(`Image ${file} converted to Base64:`);
    console.log(base64Data);
    console.log(); // Add a newline for better readability
  });
};

batchConvertImages();
