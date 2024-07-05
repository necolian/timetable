//諸々読み込み
const expess = require("express");
const app = expess();

//getの処理
app.get("../get", (req, res) => {
  var data = "";
  var timetable = "";

  //クエリで日と時間帯を取得
  const query = req.query;

  if (query) {
    if ("sta" in query) {
      try {
        timetable = require("../public/data/" + query.sta + ".json");
        // myModule をここで使用
      } catch (error) {
        res.status("400").send({"code":400,"message":"その駅のデータは存在しません"});
      }
    }else{
      res.status("400").send({"code":400,"message":"駅が指定されていません"});
    }
      
    if ("date" in query) {
      //日付が指定されている場合
        if ("time" in query) {
          //日付と時間帯が指定されている場合
          data = timetable[query.date][query.time];
        } else {
          //日付が指定されているが時間帯が指定されていない場合
          data = timetable[query.date];
        }
     } else {
      data = timetable;
     }
  }else{
    res.status("400").send({"code":400,"message":"駅が指定されていません"});
  }

  res.status("200").send(data);
  console.log("sended data.");
});


//サーバーの処理
app.listen(3000, () => {
  console.log("server started.");
});
