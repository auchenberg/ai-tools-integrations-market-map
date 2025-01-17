const { chromium } = require('playwright-core');
const { spawn } = require('child_process');
const waitOn = require('wait-on');

async function startServer() {
    return new Promise((resolve, reject) => {
        const server = spawn('npm', ['run', 'dev'], {
            stdio: 'inherit',
            shell: true
        });

        // Wait for the server to be ready
        waitOn({
            resources: ['http://localhost:3000'],
            timeout: 30000,
            validateStatus: (status) => status === 200
        })
            .then(() => resolve(server))
            .catch((err) => {
                server.kill();
                reject(new Error(`Server failed to start: ${err.message}`));
            });
    });
}

async function captureScreenshot() {
    let server;
    try {
        // Start the Next.js server
        console.log('Starting Next.js server...');
        server = await startServer();
        console.log('Server is ready');

        // const browser = await chromium.connectOverCDP(
        //     `wss://connect.browserbase.com?apiKey=${process.env.BROWSERBASE_API_KEY}`
        // );

        const browser = await chromium.launch()
        const page = await browser.newPage()

        // const defaultContext = browser.contexts()[0];
        // const page = defaultContext.pages()[0];

        await page.setViewportSize({ width: 1440, height: 2000 });

        console.log('Navigating to page...');
        await page.goto('http://localhost:3000', {
            waitUntil: 'networkidle',
            timeout: 30000,
        });

        await page.waitForSelector('.market-map', {
            state: 'visible',
            timeout: 10000,
        });

        const fs = require('fs');
        const dir = './output';
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir);
        }

        console.log('Taking screenshot...');
        await page.screenshot({
            path: 'output/market-map.png',
            fullPage: true,
        });

        console.log('Screenshot saved to output/market-map.png');
        await browser.close();

        console.log('Killing server...');
        server.kill();

    } catch (error) {
        console.error('Error:', error);
        process.exit(1);
    } finally {
        if (server) {
            server.kill();
            console.log('Server stopped');
        }
    }
}

captureScreenshot(); 