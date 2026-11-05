// ファイル一覧データ（GitHub ReleasesのURLに置き換えてください）
const files = [
    {
        id: 1,
        name: "素材セットA",
        category: "素材",
        description: "キャラクター立ち絵素材まとめ",
        size: "45MB",
        date: "2026-11-01",
        url: "https://github.com/ユーザー名/リポジトリ/releases/download/v1.0/material_a.zip"
    },
    {
        id: 2,
        name: "素材セットB",
        category: "素材",
        description: "背景画像素材まとめ",
        size: "78MB",
        date: "2026-11-01",
        url: "https://github.com/ユーザー名/リポジトリ/releases/download/v1.0/material_b.zip"
    },
    {
        id: 3,
        name: "ツールキット",
        category: "ツール",
        description: "変換スクリプト集",
        size: "12MB",
        date: "2026-10-28",
        url: "https://github.com/ユーザー名/リポジトリ/releases/download/v1.0/tools.zip"
    },
    {
        id: 4,
        name: "音源パック",
        category: "音源",
        description: "UTAU用音源データ",
        size: "120MB",
        date: "2026-10-25",
        url: "https://github.com/ユーザー名/リポジトリ/releases/download/v1.0/voice_pack.zip"
    },
    {
        id: 5,
        name: "パッチデータ",
        category: "パッチ",
        description: "ゲーム日本語化パッチ",
        size: "8MB",
        date: "2026-10-20",
        url: "https://github.com/ユーザー名/リポジトリ/releases/download/v1.0/patch.zip"
    }
];

// カテゴリ一覧を抽出してセレクトボックスに追加
const categories = [...new Set(files.map(f => f.category))];
const categorySelect = document.getElementById('categoryFilter');
categories.forEach(cat => {
    const option = document.createElement('option');
    option.value = cat;
    option.textContent = cat;
    categorySelect.appendChild(option);
});

// ファイル一覧を表示
function renderFiles(fileData) {
    const container = document.getElementById('fileList');
    const noResults = document.getElementById('noResults');
    container.innerHTML = '';

    if (fileData.length === 0) {
        noResults.style.display = 'block';
        return;
    }
    noResults.style.display = 'none';

    fileData.forEach(file => {
        const card = document.createElement('div');
        card.className = 'file-card';
        card.innerHTML = `
            <div class="file-info">
                <span class="file-category">${file.category}</span>
                <h3>${file.name}</h3>
                <p>${file.description}</p>
                <div class="file-meta">
                    <span>📅 ${file.date}</span>
                    <span>💾 ${file.size}</span>
                </div>
            </div>
            <a href="${file.url}" class="download-btn" download target="_blank">⬇ ダウンロード</a>
        `;
        container.appendChild(card);
    });
}

// 検索機能
function filterFiles() {
    const query = document.getElementById('searchInput').value.toLowerCase();
    const category = document.getElementById('categoryFilter').value;

    const filtered = files.filter(file => {
        const matchQuery = file.name.toLowerCase().includes(query) ||
                          file.description.toLowerCase().includes(query);
        const matchCategory = category === 'all' || file.category === category;
        return matchQuery && matchCategory;
    });

    renderFiles(filtered);
}

// イベントリスナー
document.getElementById('searchInput').addEventListener('input', filterFiles);
document.getElementById('categoryFilter').addEventListener('change', filterFiles);

// 初回表示
renderFiles(files);
