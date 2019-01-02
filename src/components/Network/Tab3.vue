<template>
  <div id="ramus2">

  </div>
</template>

<script>
import api from '../../api/api.js';
import * as base from '../../assets/js/base.js';
export default {
  name: '',
  data() {
    return {
    }
  },
  beforeRouteEnter(to, from, next) {
    console.log(to);
    if (to.meta.checkPass == true) {
      next(vm => {
        base.checkPass(vm, vm.getWork);
      });
    } else {
      next(vm => {
        vm.getWork();
      })
    }
  },
  created() {

  },
  methods: {
    getWork() {
      var user = localStorage.getItem("user")
      base.post(api.manageInWork, {
        'userid': JSON.parse(user).id,
        'sessionid': JSON.parse(user).sessionid,
        'target_user_id': JSON.parse(user).id,
      }).then(res => {
        if (res.data.status == 0) {
          return;
        } else if (res.data.status == 1) {
          console.log(res.data.data.users);
          console.log('****************************');
          console.log(res.data.data.downusers);
          if (res.data.data.users != "") {
            var ranksheet = res.data.data.ranksheet;
            var net_intr = res.data.data.net_district;
            var net_intr_layer = res.data.data.net_district.sheet + "_layer";
            var net_intr_down_data = res.data.data.net_district.sheet + "_down_data";
            var htmlstr = '';
            var infouserlayer = res.data.data.users[net_intr_layer] + 1;
            htmlstr = htmlstr + '<table style="width:100%;"><tr><td><table width="100" border="1"  cellpadding="0" cellspacing="1"  align="center" class="thistable" style="margin:0 auto;text-align:center;"><tbody><tr><td align="center" bgcolor="#FFFFFF"><table width="100%" border="0" cellspacing="1" cellpadding="0" id="overUser_000001" style="text-align:center;"><tr><td class="nettd"  id="tdcolor1" ><a class="currentNavTab" style="width: 100px; background-color: #fff" href="/settlement/network/recommendin/type/1/style/ramus/id/1" rel="848de803b7f8dc083244584bcbbdaf0a" title="" rselect="true"><strong>' + res.data.data.users.username + '</strong></a></td></tr><tr><td class="nettd"  id="tdcolor1" ><strong>[' + res.data.data.users.truename + ']</strong></td></tr><tr><td class="nettd"  id="tdcolor1" >' + timestampToDate2(res.data.data.users.pay_date) + '</td></tr><tr><td align="center" id="tdcolor3">' + res.data.data.users[ranksheet] + '</td></tr></tr><tr><td height="25" align="center" valign="bottom"><table width="100%" border="0" background="/Public/Images/admin/tab_05.gif"><tbody><tr><td colspan="2" align="center" class="ceng">层:' + infouserlayer + '</td></tr></tbody></table></td></tr></table></td></tr></tbody></table><table border="0" align="center" cellspacing="0" cellpadding="0" style="margin:0 auto"><tbody><tr><td>';

            if (res.data.data.users[net_intr_down_data] != false) {
              htmlstr = htmlstr + '<table border="0" align="center" cellspacing="0" cellpadding="0" style="margin:0px auto 0 auto;"><tbody><tr><td align="center" style="line-height: 10px; height: 10px;"><img style="width:1px;height:20px" alt="" src="../../assets/images/line2.gif" border="0"></td></tr></tbody></table><table border="0" align="center" cellspacing="0" cellpadding="0" style="margin:0px auto 0 auto;"><tbody><tr>';
            }
            htmlstr = htmlstr + shownew(res.data.data.users, res.data.data.downusers, net_intr_down_data, net_intr_layer, 1, res.data.data.chengnums);
            document.getElementById('ramus2').innerHTML = htmlstr;
          }
        }
      })
    }
  },
}
function shownew(users, downusers, net_intr_down_data, net_intr_layer, nowceng, cengnum) {
  var htmlstr = '';
  if (users[net_intr_down_data] == false) {
    return '';
  }

  var downcount = 0;
  for (var index in users[net_intr_down_data]) {
    downcount++;
  }
  var nowlength = 1;
  // for(var i = 0; i <= users[net_intr_down_data].length; i++){
  for (var index in users[net_intr_down_data]) {
    //console.log('----------------------');
    //console.log(downusers);
    //console.log(users[net_intr_down_data]);// TODO 数据结构不一样
    //console.log(users[net_intr_down_data][index]);
    //console.log(index);
    //console.log('----------------------');
    // 获取 users[net_intr_down_dataintr] 中的 key 对应的 value
    var index_val = users[net_intr_down_data][index];
    var infouser = downusers[index_val];
    htmlstr = htmlstr + '<td valign="top"><table border="0" cellspacing="0" cellpadding="0" style="width:100%;"><tbody><tr><td valign="top"><table border="0" cellspacing="0" cellpadding="0" width="100%" style="margin:0px auto 0 auto;"><tbody><tr><td align="center" valign="top" style="height:10px;line-height:10px"><table width="100%" border="0" cellspacing="0" cellpadding="0" id="topppppppppppppppppp"><tbody><tr>';
    if (nowlength == 1 && downcount > 1) {
      htmlstr = htmlstr + '<td width="50%" height="1"></td><td width="50%" height="1" class="hengxian"></td>';
    }
    if (nowlength > 1 && downcount > 1 && downcount > nowlength) {
      htmlstr = htmlstr + '<td width="50%" height="1" class="hengxian"></td><td width="50%" height="1" class="hengxian"></td>';
    }
    if (nowlength == 1) {
      htmlstr = htmlstr + '<td width="50%" height="1" ></td><td width="50%" height="1"></td>';
    }
    if (nowlength > 1 && downcount > 1 && downcount == nowlength) {
      htmlstr = htmlstr + '<td width="50%" height="1"  class="hengxian"></td><td width="50%" height="1"></td>';
    }
    htmlstr = htmlstr + '</tr></tbody></table><img style="width:1px;height:20px;line-height:20px" alt="" src="../../assets/images/line2.gif" border="0"></td></tr></tbody></table><table width="100" border="1"  cellpadding="0" cellspacing="1"  align="center"   class="thistable"><tbody><tr><td align="center" class="la4"><table width="100%" border="0" cellspacing="1" cellpadding="0" id="overUser_000002" style="background-color:#fff;text-align:center;"><tbody><tr><td  class="nettd" ';


    if (infouser["state"] == 1) {
      htmlstr = htmlstr + ' id="tdcolor1" ';
    } else {
      htmlstr = htmlstr + ' id="tdcolor2" ';
    }
    htmlstr = htmlstr + '><a class="currentNavTab" style="width: 100px; background-color: " href="#" title="" rselect="true"><strong>' + infouser["username"] + '</strong></a></td></tr><tr><td  class="nettd"';
    if (infouser["state"] == 1) {
      htmlstr = htmlstr + ' id="tdcolor1" ';
    } else {
      htmlstr = htmlstr + ' id="tdcolor2" ';
    }
    htmlstr = htmlstr + '><strong>[';
    if (infouser['truename'] != '') {
      htmlstr = htmlstr + infouser['truename'];
    } else {
      htmlstr = htmlstr + '暂无';
    }
    htmlstr = htmlstr + ']</strong></td></tr><tr><td  class="nettd"  ';
    if (infouser["state"] == 1) {
      htmlstr = htmlstr + ' id="tdcolor1" ';
    } else {
      htmlstr = htmlstr + ' id="tdcolor2" ';
    }
    htmlstr = htmlstr + '>';
    if (infouser['pay_date'] > 0) {
      htmlstr = htmlstr + timestampToDate2(infouser.pay_date);
    }
    var infouserlayer = infouser[net_intr_layer] + 1;
    htmlstr = htmlstr + '</td></tr><tr><td  align="center" valign="bottom" id="tdcolor3" style="background:#ffffff;">层:' + infouserlayer + '</td></tr></tbody></table></td></tr></table></td></tr></tbody></table>';
    nowlength++;


  }
  htmlstr = htmlstr + '</td></tr></tbody></table></td></tr></table>';
  nowceng++;
  if (nowceng <= cengnum) {
    htmlstr = htmlstr + shownew(infouser, downusers, net_intr_down_data, net_intr_layer, nowceng, cengnum);
  }
  return htmlstr;
}
function timestampToDate2(e) {
  var date = new Date(e * 1000);
  var year = date.getFullYear() + "-";
  var month =
    (date.getMonth() + 1 < 10 ?
      "0" + (date.getMonth() + 1) :
      date.getMonth() + 1) + "-";
  var day = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();

  return year + month + day;
} 
</script>

<style lang="" scoped>
#ramus2 {
  margin-top: 30px;
}
</style>