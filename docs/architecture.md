# Task Manager Architecture

- このアプリケーションのアーキテクチャを説明したドキュメントです

## アプリケーション

- npm workspaceによるモノレポ構成を取ること

```text
.
├── docs // ドキュメント置き場
├── client // クライアントアプリ
├── server // API
└── package.json // トップレベルのpackage.json. 共通のパッケージをここで宣言する
```

### client

- react@19
- react-router@7
- jotai@2
- @vanilla-extract/css@latest

- localhost:5173で起動すること

### server

- express@5
- tsx@latest
- nodemon@latest

- localhost:3000で起動すること

### db

- prisma
- postgres

### 共通

- typescript@5
- vite@5
- vitest@latest
- @biomejs/biome@2.0.6

## 約束事・制約事項

- TypeScriptを利用すること
- インストールするパッケージのバージョンは固定すること
- 外部パッケージを可能な限り利用せず、シンプルな実装を心がけること
- コード内にコメントは記載しないこと
- Reactの設計思想に倣って実装すること
  - [Reactリファレンスの公式ドキュメント](https://ja.react.dev/reference/react)を参照すること
- コンポーネントで管理するStateはレンダリングに関わるもののみとし、それ以外のStateはJotaiを利用した管理とすること
  - Jotaiのコードは`stores`以下にnamespaceを区切ってコードを書くこと
- ページに関わるUIコンポーネントは`pages`以下にページ名をディレクトリとして格納すること
- UIコンポーネントはReact関数コンポーネントで実装し、クラスコンポーネントは使用しないこと
- スタイルはvanilla-extract/cssを利用し、`Page.tsx`のスタイルファイルは`Page.css.ts`という形式で対応するUIコンポーネントがわかりやすいファイル名で定義すること
- UIコンポーネントとスタイルファイルは同じディレクトリに格納すること
- `components`ディレクトリ以下には、共通で利用されるUIコンポーネントを格納すること
- API呼び出しなどのビジネスロジックは`features`以下にファイルを作成して格納すること
- 外部データは`stores`以下のJotaiのハンドラーから`featuers`以下に実装したAPIへのアクセスコードを通してAPIへリクエストして取得し、Jotaiのステートとして管理すること
  - API呼び出しはfetchを使うこと
- DBはDockerを利用してローカルに構築すること
- LintとFormatはBiomeを、型チェックはtscを利用すること
  - トップレベルのpackage.jsonに下記のコマンドを用意する

```json
"lint": "biome check .",
"lint:fix": "biome check --apply .",
"format": "biome format --write .",
"type-check": "tsc --noEmit",
```
