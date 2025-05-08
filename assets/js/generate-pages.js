const fs = require('fs-extra');
const path = require('path');
const marked = require('marked');

const toolsJsonPath = path.join(__dirname, '../../data/tools.json');
const detailsDir = path.join(__dirname, '../../data/details');
const outputDir = path.join(__dirname, '../tools');
const headTemplate = fs.readFileSync(path.join(__dirname, '../../templates/head.html'), 'utf8');
const footerTemplate = fs.readFileSync(path.join(__dirname, '../../templates/footer.html'), 'utf8');
const notFoundTemplate = fs.readFileSync(path.join(__dirname, '../../templates/not-found.html'), 'utf8');

async function generatePages() {
    const tools = JSON.parse(await fs.readFile(toolsJsonPath, 'utf8'));
    await fs.ensureDir(outputDir);

    for (const tool of tools) {
        const markdownPath = path.join(detailsDir, `${tool.id}.md`);
        let contentHtml;

        if (await fs.pathExists(markdownPath)) {
            const markdown = await fs.readFile(markdownPath, 'utf8');
            const bodyHtml = marked.parse(markdown);
            contentHtml = `
                <main class="max-w-3xl mx-auto px-4 py-12">
                    <h1 class="text-3xl font-rounded font-bold mb-4">${tool.icon || ''} ${tool.title}</h1>
                    <p class="text-sm font-sans text-gray-500 mb-6">${tool.description}</p>
                    <article class="prose prose-slate md:prose-lg lg:prose-xl font-noto">
                        ${bodyHtml}
                    </article>
                </main>
            `;
        } else {
            // ツールが見つからなかった場合の表示（404テンプレート）
            contentHtml = `
                <main class="max-w-3xl mx-auto px-4 py-12">
                    ${notFoundTemplate}
                </main>
            `;
        }

        const finalHtml = `${headTemplate}\n${contentHtml}\n${footerTemplate}`;
        const outputPath = path.join(outputDir, `../../tools/${tool.id}.html`);
        await fs.outputFile(outputPath, finalHtml);
        console.log(`✔ Created ${outputPath}`);
    }
}

generatePages();