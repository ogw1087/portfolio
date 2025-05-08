async function loadTools() {
    const response = await fetch('./data/tools.json');
    const tools = await response.json();
    const container = document.getElementById('tool-list');
  
    tools.forEach(tool => {
        const card = document.createElement('div');
        card.className = 'bg-white rounded-xl shadow hover:shadow-lg transition p-4 cursor-pointer';
        card.innerHTML = `
            <img src="${tool.image}" alt="${tool.title}" class="w-full h-40 object-cover rounded-md mb-4">
            <h2 class="text-xl font-semibold mb-1">${tool.title}</h2>
            <p class="text-sm text-gray-600 mb-2">${tool.description}</p>
            <span class="inline-block bg-gray-200 text-xs px-2 py-1 rounded">${tool.category}</span>
        `;
  
        // 詳細ページへリンク (tools/tool-id.html)
        card.addEventListener('click', () => {
            window.location.href = `tools/${tool.id}.html`;
        });
  
        container.appendChild(card);
    });
}
  
// 初期化
window.addEventListener('DOMContentLoaded', loadTools);