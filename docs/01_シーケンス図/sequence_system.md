## シーケンス図

### 1. トップ画面から利用者投稿画面への遷移
```mermaid
sequenceDiagram
    participant User as 利用者
    participant TopPage as トップ画面
    participant UserPostPage as 利用者投稿画面

    User ->> TopPage: 投稿フォームボタンをクリック
    TopPage ->> UserPostPage: 利用者投稿画面を表示
```

### 2. 利用者投稿画面からトップ画面への遷移
```mermaid
sequenceDiagram
    participant User as 利用者
    participant UserPostPage as 利用者投稿画面
    participant TopPage as トップ画面
    participant AzureBlobStorage as Azure Blob Storage

    User ->> UserPostPage: 募集概要と求めるスキルを入力
    User ->> UserPostPage: 募集投稿ボタンをクリック
    UserPostPage ->> AzureBlobStorage: データを登録
    AzureBlobStorage -->> UserPostPage: 登録完了
    UserPostPage ->> TopPage: トップ画面を表示
```

### 3. トップ画面から登録者投稿画面への遷移
```mermaid
sequenceDiagram
    participant User as 利用者
    participant TopPage as トップ画面
    participant RegisterPostPage as 登録者投稿画面

    User ->> TopPage: 対応可否ボタンをクリック
    TopPage ->> RegisterPostPage: 登録者投稿画面を表示
```

### 4. 登録者投稿画面からトップ画面への遷移
```mermaid
sequenceDiagram
    participant User as 利用者
    participant RegisterPostPage as 登録者投稿画面
    participant TopPage as トップ画面
    participant AzureBlobStorage as Azure Blob Storage

    User ->> RegisterPostPage: 回答フォームと日付を入力
    User ->> RegisterPostPage: 登録投稿ボタンをクリック
    RegisterPostPage ->> AzureBlobStorage: データを登録
    AzureBlobStorage -->> RegisterPostPage: 登録完了
    RegisterPostPage ->> TopPage: トップ画面を表示
```

### 5. トップ画面から募集内容チャット画面への遷移
```mermaid
sequenceDiagram
    participant User as 利用者
    participant TopPage as トップ画面
    participant ChatPage as 募集内容チャット画面

    User ->> TopPage: 募集概要リンクをクリック
    TopPage ->> ChatPage: 募集内容チャット画面を表示
```

### 6. 募集内容チャット画面でのチャット投稿
```mermaid
sequenceDiagram
    participant User as 利用者
    participant ChatPage as 募集内容チャット画面
    participant AzureBlobStorage as Azure Blob Storage

    User ->> ChatPage: チャット入力
    User ->> ChatPage: チャット投稿ボタンをクリック
    ChatPage ->> AzureBlobStorage: チャットデータを登録
    AzureBlobStorage -->> ChatPage: 登録完了
    ChatPage ->> ChatPage: チャット内容を表示
```
```