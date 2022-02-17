# WAVファイルからGoogle Cloud Speech-to-Text ストリーミング

## WAV ファイル

- LINEAR16 エンコード
- サンプリング周波数16000 Hz

を前提


## 実行環境

- nodeJS v12

## 必要モジュール

- commander
- fs
- @google-cloud/speech
- memory-streams

および上記モジュールが依存するモジュール

## インストール

`$ yarn` または `$ npm install`

## 実行

環境変数 GOOGLE_APPLICATION_CREDENTIALS に Google Cloud からダウンロードしたファイルパスを指定した上:


```
$ node client.js -i <wavファイル>
```

## 実行結果

行頭の括弧内に Speech-to-Text API が返す isFinal の値を表示します
- t: 最終結果
- f: 中間結果

括弧後に認識結果文字列を表示します

```
(f) こんにちは
(t) こんにちはテストです
```
