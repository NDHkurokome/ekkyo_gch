# ekkyo_gch
エッキョウのGithub Copilot Hackthon用のリポジトリ

## 準備

* Chrome拡張機能Pegmatiteのインストール
    * 一部のドキュメントについてはPlantUMLを利用しているため、Githubでプレビューする際にはChromeブラウザのPegmatite(https://chromewebstore.google.com/detail/pegmatite/jegkfbnfbfnohncpcfcimepibmhlkldo?hl=ja-jp)をご利用ください。

## 説明

* Github Actionsのトリガー
    * .github/workflows/azure-deploy.yml中の[on][push][branches]にデプロイをトリガーするブランチを指定してください。
    * 指定されたブランチにPushされた際にGithub Actionsが起動します。
