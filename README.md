# Gulp Template
這是個使用 gulp 打造的自動化樣板，提供一些簡易的指令，以提升前端網頁開發的效率。


## Installation
安裝之前，請先確保在本地端電腦中安裝了 Node.js 以及 套件管理工具 NPM。

- 將 gulp 命令列套件安裝於全域環境

```shell
  $ npm install --global gulp-cli
```

- 安裝 gulp 相關套件

```shell
  $ npm install
```
*注意：該測試環境是在 Apple M1 Chip 下進行，請確認您的電腦的作業系統以及處理器架構，以免發生遺憾。*

## Commands

開發用指令
- `gulp`
    開啟測試伺服器，並複製相關檔案。

測試用指令
- `gulp ejs`
    編譯 ejs 檔案。
- `gulp scss`
    編譯 scss 檔案
- `gulp babel`
    編譯 js 檔案。
- `gulp img`
    複製圖片。
- `gulp serve`
    開始測試用瀏覽器。
- `gulp watch`
    監聽檔案。
- `gulp clean`
    清除 public 目錄。
- `gulp build`
    不開啟測試伺服器，複製檔案但不進行壓縮、優化程式碼。

部署到線上用指令
- `gulp build --env=production`
    不開始測試伺服器，複製檔案並壓縮、優化相關程式碼。
- `gulp deploy`
    將檔案部署到 Github Pages。

*注意：使用 `gulp deploy` 前，請先執行 `gulp build --env production` 優化程式碼，並記得部署前需使用 git 進行版本控制，並且令其指定 Github 上對應的 Repo*

## 待解決
- public 的 images 目錄中的影像，在圖像檔案更動時，無法自動移除。
- M1 下的 gulp-imagemin 無法正常運作。