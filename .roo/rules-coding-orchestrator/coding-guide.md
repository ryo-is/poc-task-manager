# コーディングガイド

## 設計

### クリーンアーキテクチャに従う

アーキテクチャという単語を、「知識を記述すべき箇所を示す方針」として扱う。

各モジュールがアーキテクチャに従って記述されているか確認する。

- クリーンアーキテクチャに従った依存関係となっているか。
- ビジネスルールがユーザーインターフェースやデータベースなどの詳細から独立しているか。

### コンテキスト、使われ方に対応した構成とする

共通性(概念)や可変性をふまえて、コンテキスト、使われ方に対応したモジュール構成とする。

- どのように使われるかについてインターフェースとして表現する。
- コンテキストにおける可変性に対応できるようにする。
- コンテキストにおいて必要のない可変性を扱う設計は排除する。

### 単一責任原則に従う

モジュールを変更する理由、モジュールの関心事はたったひとつだけとする。

- 同じ理由、同じタイミングで変更されるものは1つのモジュールにまとめる。
- 変更の理由やタイミングが異なるものは別のモジュールに分ける。
  - モジュールには複数の流動的要素を持たせない。

### 開放/閉鎖原則に従う

拡張を容易にし、統合コストを小さくするため、モジュール/クラス/メソッドについて以下を満たすように設計する。

- 拡張性という観点から見た場合、見通しが利くよう(open)になっている。
- 変更という観点から見た場合、閉鎖的(closed)になっている。

新たな機能をモジュール化された形で追加していけるようにする。

## APIを適切な粒度にする

使われ方に応じた粒度とする。細かすぎるとリクエストが増えるが、粗すぎると大量のデータを扱う必要がある。1ページあたりのコール回数やデータの大きさを考慮した粒度とする。

## 性能・安定性を考慮する

以下の観点を考慮する。

- スケーラビリティ
- 耐障害性があるか。
- 並列プログラミングにおいて、デッドロックや競合状態が生じないか。
- 脆弱性がないか。

## 必要最小限の複雑性にする

個々の行/関数/クラスといった変更内容のすべてのレベルにて以下を満たすようにする。

- コードを読む人がすぐに理解できる。
- 開発者がこのコードを呼び出したり変更したりしようとしてもエンバグしない。
- オーバーエンジニアリングとなっていない。
  - 汎用性が必要最低限である。
  - 今必要な機能のみ存在する。

## コメントは書かず、分かりづらいコードはリファクタリングする

- コメントはwhy/why notを説明するもののみ許容し、極力少なくする。
- whatを説明するコメントは書かない。コメントが不足していると思われる場合、コメントを追加するのではなくコードを整理する。
- コメントは英文法に従う。

## 一貫性を持たせる

認知容易性を高めることを目的として、コードには一貫性を持たせる。ただし、一貫性とクリーンコードとのトレードオフが生じた場合、クリーンコードを優先する。

## 必要な場合はドキュメンテーションを行う

ユーザーがコードをビルド、テスト、操作、またはリリースする方法が変更された場合、READMEなどの関連ドキュメントを更新する。

## すべての行においてルールに従う

自動生成されたコードなどを除き、基本的には一行ずつすべての行がルールに従うようにする。

## ユニットテスト

- リグレッションに対して保護できるテストとする。
- リファクタリングによって壊れないテストとする。
- 複雑さを必要最低限にする。

### ユニットテストを実装する対象

- 処理の分岐が発生する箇所に対してユニットテストを実装する。
  - コードの複雑さは分岐によってもたらされる。その複雑さを抑制するためにユニットテストを実装する。

例1: `Validate`メソッドの引数として空文字を入力した場合、およびそれ以外の文字列を入力した場合の2つのユニットテストを書く。

```typescript
function validate(value: string): Error | null {
  if (value === "") {
    return new Error("value should not be empty");
  }
  return null;
}
```

例2: `CompletedSuccessfully`メソッドの引数へ`State`として定義しているすべての値の入力、および`default`の分岐に入る値を入力した場合のユニットテストを書く。

```typescript
type State = "running" | "failed" | "done";

const State = {
  Running: "running" as const,
  Failed: "failed" as const,
  Done: "done" as const,
} as const;

function completedSuccessfully(state: State): boolean {
  switch (state) {
    case State.Running:
      return false;
    case State.Failed:
      return false;
    case State.Done:
      return true;
    default:
      return false;
  }
}
```

- ロジックが書かれている箇所に対してユニットテストを実施する。
  - ロジックが期待する値を正しく算出するかをユニットテストにて確認する。

例1: `BuildFilePath`メソッドの引数として`"memo.txt"`を入れた場合、`"/foo/bar/memo.txt"`が返ってくるかを検査するユニットテストが考えられる。

```typescript
function buildFilePath(filename: string): string {
    return "/foo/bar/" + filename;
}
```

例2: `AddTwoWeeks`メソッドの引数として`2020/01/01`を入れた場合、`2020/01/15`が返ってくるかを検査するユニットテストが考えられる。

```typescript
function addTwoWeeks(date: Date): Date {
  const twoWeeks = 2 * 7 * 24 * 60 * 60 * 1000; // ミリ秒
  return new Date(date.getTime() + twoWeeks);
}
```

- 外部サービスとのインタラクションを含む処理など、正確性の保証が難しい処理に対してユニットテストを実装する。

### ユニットテストの書き方

- Arrange-Act-Assert (AAA) パターンに従い、ユニットテストを記述する。
  - テストの準備 (Arrange)、実行 (Act)、結果検証 (Assert) に明示的に分けることにより、テストケースの可読性を向上させる。

```typescript
// Arrange
const target = new CaseConverter();

// Act
const actual = target.toUpperCamel("sushi-tempura-geisha");

// Assert
const expected = "SushiTempuraGeisha";
expect(actual).toBe(expected);
```
