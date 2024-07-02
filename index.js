2//諸々読み込み
const expess = require("express");
const app = expess();
const timetabledata = require("./public/data/kitasukematsu.json");
const serverless = require("./public/js/serverless.js");

//getの処理
app.get("/get", (req, res) => {
  var data = "";

  //クエリで日と時間帯を取得
  const query = req.query;

  if (query) {
  if ("date" in query) {
    //日付が指定されている場合
    if ("time" in query) {
      //日付と時間帯が指定されている場合
      data = timetabledata[query.date][query.time];
    } else {
      //日付が指定されているが時間帯が指定されていない場合
      data = timetabledata[query.date];
    }
  } else {
    data = timetabledata;
  }}else{
    data = timetabledata;
  }

  res.status("200").send(data);
  console.log("sended data.");
});

//サーバーレス
exports.handler = async (event, context) => {
  return await serverless.handler(event, context);
};

//サーバーの処理
app.listen(3000, () => {
  console.log("server started.");
});
