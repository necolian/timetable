const express = require('express');
const app = express();

app.get("/", (req, res) => {
  cosole.log("OK");
  res.send("OK");
});

// サーバーレス関数の処理
exports.handler = async (event, context) => {
  try {
    // Express アプリケーションを呼び出す
    const response = await new Promise((resolve, reject) => {
      app(event.rawHeaders, event, (req, res) => {
        res.on('finish', () => {
          resolve(res);
        });
      });
    });

    // レスポンスを返す
    return {
      statusCode: response.statusCode,
      headers: response.headers,
      body: response.body
    };
  } catch (error) {
    console.error(error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Internal server error' })
    };
  }
};