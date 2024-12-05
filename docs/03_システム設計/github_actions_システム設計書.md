# システム設計書

## 概要
この設計書は、GitHub Actions を使用して React アプリケーションを Azure Web App にビルドおよびデプロイするためのワークフローを定義しています。

## ワークフロー名
`Build and Deploy HTML to Azure Web App`

## トリガー
このワークフローは、`feat/react` ブランチへのプッシュイベントによってトリガーされます。

```yaml
on:
  push:
    branches:
      - feat/react  # デプロイをトリガーするブランチを指定
```

## ジョブ
### ジョブ名
`build-and-deploy`

### 実行環境
`ubuntu-latest`

### ステップ
1. **コードのチェックアウト**
    - アクション: `actions/checkout@v2`
    - 説明: リポジトリのコードをチェックアウトします。

    ```yaml
    - name: Checkout code
      uses: actions/checkout@v2
    ```

2. **Node.js のセットアップ**
    - アクション: `actions/setup-node@v2`
    - Node.js バージョン: `16`
    - 説明: Node.js 環境をセットアップします。

    ```yaml
    - name: Set up Node.js
      uses: actions/setup-node@v2
      with:
        node-version: '16'
    ```

3. **依存関係のインストール**
    - コマンド: `npm install`
    - 説明: `react-ekkyo-app` ディレクトリに移動し、依存関係をインストールします。

    ```yaml
    - name: Install dependencies
      run: |
        cd react-ekkyo-app
        npm install
    ```

4. **アプリケーションのビルド**
    - コマンド: `npm run build`
    - 説明: `react-ekkyo-app` ディレクトリに移動し、アプリケーションをビルドします。

    ```yaml
    - name: Build the app
      run: |
        cd react-ekkyo-app
        npm run build
    ```

5. **ビルドディレクトリの圧縮**
    - コマンド: `zip -r ../build.zip .`
    - 説明: `react-ekkyo-app/build` ディレクトリに移動し、ビルドディレクトリを ZIP ファイルに圧縮します。

    ```yaml
    - name: Zip the build directory
      run: |
        cd react-ekkyo-app/build
        zip -r ../build.zip .
    ```

6. **Azure へのログイン**
    - アクション: `azure/login@v1`
    - 認証情報: `${{ secrets.AZURE_CREDENTIALS }}`
    - 説明: Azure にログインします。

    ```yaml
    - name: Login to Azure
      uses: azure/login@v1
      with:
        creds: ${{ secrets.AZURE_CREDENTIALS }}
    ```

7. **Azure Web App へのデプロイ**
    - アクション: `azure/webapps-deploy@v2`
    - アプリケーション名: `ekkyowebapp-github-actions-linux`
    - リソースグループ: `ekkyoResourceGroup`
    - パッケージ: `react-ekkyo-app/build.zip`
    - スタートアップコマンド: `pm2 serve /home/site/wwwroot --no-daemon`
    - 説明: ビルドされたアプリケーションを Azure Web App にデプロイします。

    ```yaml
    - name: Deploy to Azure Web App
      uses: azure/webapps-deploy@v2
      with:
        app-name: ekkyowebapp-github-actions-linux
        resource-group: ekkyoResourceGroup
        package: react-ekkyo-app/build.zip
        startup-command: 'pm2 serve /home/site/wwwroot --no-daemon'
    ```

## まとめ
このワークフローにより、`feat/react` ブランチにプッシュされた変更が自動的にビルドされ、Azure Web App にデプロイされます。各ステップは、依存関係のインストール、アプリケーションのビルド、ビルドディレクトリの圧縮、Azure へのログイン、およびデプロイを順に実行します。