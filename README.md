# N-map2
長久手市内の公共施設　検索MAP ツールです。
前回のアプリからBackendをSpring boot/kotlinで実装し、
機能追加を行なっています。 

--前回(Backendをexpressで実装しています。)  
現在地と長久手全体、近い順（クローズアップ）の３つのモード。
https://github.com/YoshikiNishizuka/btc6-solo-nmap

### deploy url
https://btc6-solo-nmap2.onrender.com/

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

## 初期設定
- IntelliJで開発および設定を行っています。
- localにサーバーを作成して下さい。サーバー名：nmap2
- 最初に`npm run build`をfrontendで実行してください。  
- 次にTopのディレクトリでbootRunを実行し、サーバーを立ち上げます。
- localhost:8080へ接続して完了です。

## 前回からの変更
- 全体的にUIを見直し。
- 現在地中心の円(100m,400m,700m)を追加し、近距離ソートを廃止。
- サーバー情報を追加。
- フィルター機能を追加。

## アプリの操作
![image.png](image%2Fimage.png)
- 起動後、現在地を中心とした地図と**長久手市内**のトイレがマップ上に📍されています。
- 機能1. 現在地 : 今見ている地図の縮尺のまま現在地中心へ移動します
- 機能2. 全域 : 長久手を中心とし全体が見える縮尺で表示します。
- 機能3. フィルター : 車椅子、乳幼児、オスメイトがあるトイレをフィルターできます。
- 機能4. 追加 : 追加したいMap上タップ→📍タップ→追加ボタン。追加ボタン前はタップし直しで位置調整可能です。
- 機能5. 削除 : 消したいトイレのピンをクリック→ポップアップの削除ボタンで削除できます。

## 将来計画
- コンテンツの英語化
- 検索対象の拡大（公園、観光地など）