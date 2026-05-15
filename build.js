const fs = require('fs');
const path = require('path');

const build = async () => {
    try {
        // Read template HTML
        let htmlContent = fs.readFileSync(path.join(__dirname, 'index.html'), 'utf8');

        // Read CSS
        const cssContent = fs.readFileSync(path.join(__dirname, 'style.css'), 'utf8');

        // Read JavaScript
        const jsContent = fs.readFileSync(path.join(__dirname, 'script.js'), 'utf8');

        // Read data.json
        const talksData = fs.readFileSync(path.join(__dirname, 'data.json'), 'utf8');

        // Inject CSS into <style id="dynamic-styles"></style>
        htmlContent = htmlContent.replace(
            '<style id="dynamic-styles"></style>',
            `<style>${cssContent}</style>`
        );

        // Inject JavaScript and talksData into <script id="dynamic-script"></script>
        htmlContent = htmlContent.replace(
            '<script id="dynamic-script"></script>',
            `<script>window.talksData = ${talksData};${jsContent}</script>`
        );

        // Write the final index.html
        fs.writeFileSync(path.join(__dirname, 'dist', 'index.html'), htmlContent, 'utf8');
        console.log('Successfully built dist/index.html');

    } catch (error) {
        console.error('Error during build process:', error);
    }
};

// Create a 'dist' directory if it doesn't exist
const distDir = path.join(__dirname, 'dist');
if (!fs.existsSync(distDir)) {
    fs.mkdirSync(distDir);
}

build();