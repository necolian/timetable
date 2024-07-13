//諸々読み込み
const express = require("express");
const app = express();

app.get("/",(req,res) => {
  res.status(200).send({"code":200,"name":"necolian-timetable-api","version":"1.0.0","author":"necolian","hint":"データを取得するには、/getにアクセスしてください"});
});

//getの処理
app.get("/get", (req, res) => {
  
  //クエリを取得
  const query = req.query;

  //変数の定義
  var data;
  
  if (query) {

    if("sta" in query) {
      //駅の記述があった時の処理
      try {
      var timetable = require("./public/data/" + query.sta + ".json");
      }catch{
        return res.status(404).send({"code":404,"message":"駅が見つかりませんでした"})
      }
      var timetable_data = timetable.data;
      var syubetsu = timetable.syubetsu;

      if (!query.to) {
        return res.status(404).send({"code":404,"message":"行き先が指定されていません"});
      }
      
      for (let i = 1; i < timetable_data.length; i++) {
          if (timetable_data[i].to = query.to) {
          data = timetable_data[i];
          break;
        }
      }

      //駅の記述がなかったらエラー
      if (!data){
        console.log(data);
        return res.status(404).send({"code":404,"message":"行き先が見つかりませんでした"});
      }

      if ("date" in query) {
        if ("time" in query) {
          data = data.time[query.date][query.time];
        }else{
          data = data.time[query.date];
        }
      }
      
    }else{
      return res.status(404).send({"code":404,"message":"駅が指定されていません"});
    }
  }else{
    return res.status(404).send({"code":404,"message":"クエリが指定されていません"});
  }

  res.status(200).send({"code":200,"syubetsu":syubetsu,"data":data});
  console.log("sended data.");
});


//サーバーの処理
app.listen(3000, () => {
  console.log("server started.");
});
