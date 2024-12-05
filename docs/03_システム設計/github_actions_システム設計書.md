# システム設計書

## 概要
この設計書は、GitHub Actions を使用して React アプリケーションを Azure Web App にビルドおよびデプロイするためのワークフローを定義しています。

## ワークフロー名
`Build and Deploy HTML to Azure Web App`

## トリガー
このワークフローは、以下のブランチへのプッシュイベントによってトリガーされます。
- `feat/kurokomes`
- `feat/ono`
- `feat/sakaguchi`
- `develop`
- `main`  # 本番環境用のブランチ

```yaml
on:
  push:
    branches:
      - feat/kurokomes
      - feat/ono
      - feat/sakaguchi
      - develop
      - main  # 本番環境用のブランチ
```

## ジョブ
### ジョブ名
`build-and-deploy`

### 実行環境
`ubuntu-latest`

### 環境変数
- `APP_NAME`: `ekkyo-gch-${{ github.event.ref_name }}`
- `RESOURCE_GROUP`: `ekkyoResourceGroup`
- `LOCATION`: `westus`
- `NODE_VERSION`: `'16'`
- `APP_SERVICE_PLAN`: `ekkyowebAppServicePlanLinux`  # 固定のApp Serviceプラン

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

3. **ブランチ名のサニタイズ**
    - 説明: ブランチ名をアプリケーション名に使用できる形式に変換します。

    ```yaml
    - name: Sanitize branch name for app name
      id: sanitize
      run: echo "::set-output name=sanitized_name::$(echo ${{ github.ref_name }} | tr '/' '-' | tr '_' '-')"
    ```

4. **依存関係のインストール**
    - コマンド: `npm install`
    - 説明: `react-ekkyo-app` ディレクトリに移動し、依存関係をインストールします。

    ```yaml
    - name: Install dependencies
      run: |
        cd react-ekkyo-app
        npm install
    ```

5. **アプリケーションのビルド**
    - コマンド: `npm run build`
    - 説明: `react-ekkyo-app` ディレクトリに移動し、アプリケーションをビルドします。

    ```yaml
    - name: Build the app
      run: |
        cd react-ekkyo-app
        npm run build
    ```

6. **ビルドディレクトリの圧縮**
    - コマンド: `zip -r ../build.zip .`
    - 説明: `react-ekkyo-app/build` ディレクトリに移動し、ビルドディレクトリを ZIP ファイルに圧縮します。

    ```yaml
    - name: Zip the build directory
      run: |
        cd react-ekkyo-app/build
        zip -r ../build.zip .
    ```

7. **Azure へのログイン**
    - アクション: `azure/login@v1`
    - 認証情報: `${{ secrets.AZURE_CREDENTIALS }}`
    - 説明: Azure にログインします。

    ```yaml
    - name: Login to Azure
      uses: azure/login@v1
      with:
        creds: ${{ secrets.AZURE_CREDENTIALS }}
    ```

8. **Azure Web App の作成**
    - 説明: Azure Web App が存在しない場合は作成します。

    ```yaml
    - name: Create Azure Web App if it does not exist
      run: |
        if ! az webapp show --name ekkyo-gch-${{ steps.sanitize.outputs.sanitized_name }} --resource-group ${{ env.RESOURCE_GROUP }}; then
          az webapp create --resource-group ${{ env.RESOURCE_GROUP }} --plan ${{ env.APP_SERVICE_PLAN }} --name ekkyo-gch-${{ steps.sanitize.outputs.sanitized_name }} --runtime "NODE|16-lts"
        fi
    ```

9. **Azure Web App へのデプロイ**
    - アクション: `azure/webapps-deploy@v2`
    - アプリケーション名: `ekkyo-gch-${{ steps.sanitize.outputs.sanitized_name }}`
    - パブリッシュプロファイル: `${{ secrets.AZURE_PUBLISH_PROFILE }}`
    - パッケージ: `react-ekkyo-app/build.zip`
    - スタートアップコマンド: `pm2 serve /home/site/wwwroot --no-daemon`
    - 説明: ビルドされたアプリケーションを Azure Web App にデプロイします。

    ```yaml
    - name: Deploy to Azure Web App
      uses: azure/webapps-deploy@v2
      with:
        app-name: ekkyo-gch-${{ steps.sanitize.outputs.sanitized_name }}
        publish-profile: ${{ secrets.AZURE_PUBLISH_PROFILE }}
        package: react-ekkyo-app/build.zip
        startup-command: 'pm2 serve /home/site/wwwroot --no-daemon'
    ```

## まとめ
このワークフローにより、指定されたブランチにプッシュされた変更が自動的にビルドされ、Azure Web App にデプロイされます。各ステップは、依存関係のインストール、アプリケーションのビルド、ビルドディレクトリの圧縮、Azure へのログイン、Azure Web App の作成、およびデプロイを順に実行します。
