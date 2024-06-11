# N-map2
長久手市内の公共施設　検索MAP ツールです。
前回のアプリからBackendをSpring boot/kotlinで実装し、
機能追加を行なっています。 

--前回(Backendをexpressで実装しています。)  
現在地と長久手全体、近い順（クローズアップ）の３つのモード。
https://github.com/YoshikiNishizuka/btc6-solo-nmap

--NEW

## セットアップ

- ファイル構成

ツリー表示と簡単なフォルダの解説
-<pre>
.
├── frontend
├── gradle/wrapper
├── src
├── temp
├── .DS_Store
├── .gitignore
├── README.md
├── build.gradle.kts
├── gradlew
├── gradlew.bat
└── settings.gradle.kts
</pre>

## ↓前回資料。不備もあったので見直しが必要
- 最初に`npm install`をTopのcdとfrontendで実行してください。  
  その際インストールされるパッケージは以下のバージョンであることに注意願います。  
  express: ^4.19.2  
  knex: ^3.1.0  
  leaflet: ^1.9.4  
  nodemon: ^3.1.0  
  pg: ^8.11.5
  @types/react: ^18.3.3  
  @types/react-dom: ^18.3.0  
  @vitejs/plugin-react: ^4.3.0  
  leaflet: ^1.9.4  
  react": ^18.2.0  
  react-leaflet": ^4.2.1  
  vite": ^5.2.11

## アプリの操作
- 起動後、現在地を中心とした地図と**長久手市内**のトイレがマップ上に📍されています。
- 機能1. 現在地へ移動 : 今見ている地図の縮尺のまま現在地中心へ移動します
- 機能2. 長久手全域表示 : 長久手を中心とし全体が見える縮尺で表示します。
- 機能3. 近い順検索 : 地図を拡大して現在地に移動し、マップ下に近い順でリストアップ表示します。
- 機能4. 新規登録 : 新しいトイレを住所、施設or場所名、緯度、経度を入力して登録できます。

## 将来計画
- クリックで緯度経度を入力できる機能の実装
- トイレの細かい情報まで検索およびフィルターする機能の実装
- コンテンツの英語化