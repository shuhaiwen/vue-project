/*
 * @Author: your name
 * @Date: 2020-07-23 19:15:49
 * @LastEditTime: 2020-08-07 13:43:44
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \FrontEnd\js\vue\imitate-wzry\server\routes\otxData.js
 */
const fs = require("fs");
const path = require("path");
const mongoose = require('mongoose');
const { count } = require("console");
const otxRecord = mongoose.model('otxRecord')
function timeConnect(m) {
  return m < 10 ? "0" + m : m;
}
function formatTime(time) {
  //shijianchuo是整数，否则要parseInt转换

  var y = time.getFullYear();
  var m = time.getMonth() + 1;
  var d = time.getDate();
  var h = time.getHours();
  var mm = time.getMinutes();
  var s = time.getSeconds();
  return (
    y +
    "-" +
    timeConnect(m) +
    "-" +
    timeConnect(d) +
    " " +
    timeConnect(h) +
    ":" +
    timeConnect(mm) +
    ":" +
    timeConnect(s)
  );
}
// function insert(){
//   const filePath=path.join(__dirname, "../files/termAction.json")
//   fs.readFile(filePath,{encoding:'utf-8'},(err,data)=>{
//     if(err) {console.error(err)}
//     else{
//       let dataObj=JSON.parse(data)
//       for (const it of dataObj.Term) {
//         otxRecord.create({
//           Function:it,
//           Type:'Term'
//         },(err,docs)=>{
//           if(err) return console.log(err);
//           console.log(docs);
//         })
//       }
//       for (const it of dataObj.Action) {
//         otxRecord.create({
//           Function:it,
//           Type:'Action'
//         },(err,docs)=>{
//           if(err) return console.log(err);
//           console.log(docs);
//         })
//       }
//       toString
//       console.log("count: "+ toString(dataObj.Term.length+dataObj.Action.length));
//     }
//   })
// }
function downloadToTable(app) {

  app.post("/admin/api/otx/download", async (req, res) => {
    //insert()
    console.log("[post]收到/admin/api/otx/download请求...");
    const { listQuery,search } = req.body
    let filterOption = {}
    let sortOption = {}
    if(search){
      filterOption.Function=new RegExp('\\b('+search+')\\w*','i')
      console.log(' filterOption.Function: ',  filterOption.Function);

    }else{
     
      if (listQuery.filter.Auth.length > 0) {
        filterOption.Auth = {}
        filterOption.Auth.$in = listQuery.filter.Auth
      }
      if (listQuery.filter.Type.length > 0) {
        filterOption.Type = {}
        filterOption.Type.$in = listQuery.filter.Type
      }
      if (listQuery.filter.State.length > 0) {
        filterOption.State = {}
        filterOption.State.$in = listQuery.filter.State
      }
     
    }
    console.log('filterOption: ', filterOption);
    //排序条件
    Object.keys(listQuery.sort).forEach(key => {
      sortOption[key] = listQuery.sort[key] === false ? -1 : 1
    })
    //获取过滤后数量      
    let count = 0
    await otxRecord.find(filterOption).count((err, num) => {
      count = num
    })
    console.log('count: ', count);
    //排序
    otxRecord.find(filterOption).sort(sortOption).skip((listQuery.page - 1) * listQuery.limit).limit(listQuery.limit).lean().exec((err, docs) => {
      if (err) return console.log(err)
      docs.forEach(value => {
        value.UpDate = formatTime(value.UpDate)
        console.log('value.UpDate: ', value.UpDate);

      })
      res.send({
        message: "读取文件成功",
        total: count,
        data: docs,
      });
    })

    // const { jsonPath, listQuery } = req.body
    // fs.readFile(
    //   path.join(__dirname, "../files/", jsonPath),
    //   "utf-8",
    //   (error, data) => {
    //     if (error) {
    //       res.send({
    //         message: "读取文件失败",
    //       });
    //     } else {
    //       let dataList = []

    //       dataList = JSON.parse(data)
    //       let List = dataList.filter((value, index) => {
    //         if (listQuery.limit * (listQuery.page - 1) <= index && index < listQuery.limit * listQuery.page) {
    //           return true;
    //         }

    //       })
    //       List.forEach((value, index) => {
    //         List[index].UpDateTimeStamp=value.UpDate.$date.$numberLong
    //         List[index].UpDate = format(parseInt(value.UpDate.$date.$numberLong))

    //       });
    //       console.log(List);
    //       res.send({
    //         message: "读取文件成功",
    //         total: dataList.length,
    //         data: List,
    //       });
    //     }
    //   }
    // );
  });
};

function updateToTable(app) {

  app.post("/admin/api/otx/update", async (req, res) => {
    console.log("[post]收到/admin/api/otx/update...");
    const { id, rowData } = req.body
    console.log('rowData: ', rowData);
    console.log('id: ', id);
    otxRecord.findByIdAndUpdate(id, rowData, { upsert: false }, function (err, docs) {
      if (err) return console.log(err);
      console.log('更改成功：' + docs);
    })
    res.send({
      message: "更新文件成功"
    });
  })
}
function updateToPieChart(app) {
  app.get("/admin/api/otx/pieChart", async (req, res) => {
    console.log('[get]收到/admin/api/otx/pieChart...')
    const p1 = otxRecord.find({ Type: 'Term' }).count()
    const p2 = otxRecord.find({ Type: 'Term', State: '完成' }).count()
    const p3 = otxRecord.find({ Type: 'Term', State: '未完成' }).count()
    const p4 = otxRecord.find({ Type: 'Action' }).count()
    const p5 = otxRecord.find({ Type: 'Action', State: '完成' }).count()
    const p6 = otxRecord.find({ Type: 'Action', State: '未完成' }).count()
    Promise.all([p1, p2, p3, p4, p5, p6]).then(p => {
      console.log('p: ', p);
      let term = {}
      let action = {}
      term.numTotal = p[0]
      term.numDone = p[1]
      term.numNoDone = p[2]
      term.numIgnore = term.numTotal - term.numDone - term.numNoDone
      action.numTotal = p[3]
      action.numDone = p[4]
      action.numNoDone = p[5]
      action.numIgnore = action.numTotal - action.numDone - action.numNoDone
      console.log('term: ', term);
      console.log('action: ', action);
      res.send({
        message: '查询成功',
        data: {
          term,
          action
        }
      })
    })

  })
}
function updateToBarChart(app) {
  app.get("/admin/api/otx/barChart", async (req, res) => {
    console.log('[get]收到/admin/api/otx/barChart...')
    otxRecord.aggregate([{
      $group: {
        _id: {
          Auth: "$Auth",
          State: "$State"
        },
        count: { $sum: 1 }
      }
    }]).then(response => {
      console.log('response: ', response);
      let data = []
      response.forEach(value => {
        data.push({ name: value._id.Auth, state: value._id.State, count: value.count })
      })
      res.send({
        message: '查询成功',
        data
      })
    })
  })
}
module.exports = app => {
  downloadToTable(app)
  updateToTable(app)
  updateToPieChart(app)
  updateToBarChart(app)
}
