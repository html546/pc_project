<template>
  <div
    id="ramus1"
    style="width:100%;overflow-x:scroll;background:#ccc;text-align:center;"
  >
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
      base.post(api.recommendInWork, {
        'userid': JSON.parse(user).id,
        'sessionid': JSON.parse(user).sessionid,
      }).then(res => {
        if (res.data.status == 0) {
          return;
        } else if (res.data.status == 1) {
          document.getElementById('ramus1').innerHTML = res.data.data.htmlstr;
          console.log(res);
          // console.log(res.data.data.net_intr.sheet);
          // console.log('****************************');
          // console.log(res.data.data.downusers);
          /* if (res.data.data.users != "") {
            var ranksheet = res.data.data.ranksheet;
            var net_intr = res.data.data.net_intr;
            var net_intr_layer = res.data.data.net_intr.sheet + "_layer";
            var net_intr_down_data = res.data.data.net_intr.sheet + "_down_data";
            var htmlstr = '';
            var infouserlayer = res.data.data.users[net_intr_layer] + 1;
            htmlstr = htmlstr + '<table style="width:100%;"><tr><td><table width="100" border="1"  cellpadding="0" cellspacing="1"  align="center" class="thistable" style="margin:0 auto;text-align:center;"><tbody><tr><td align="center" bgcolor="#FFFFFF"><table width="100%" border="0" cellspacing="1" cellpadding="0" id="overUser_000001" style="text-align:center;"><tr><td class="nettd"  id="tdcolor1" ><a class="currentNavTab" style="width: 100px; background-color: " href="/settlement/network/recommendin/type/1/style/ramus/id/1" rel="848de803b7f8dc083244584bcbbdaf0a" title="" rselect="true"><strong>' + res.data.data.users.username + '</strong></a></td></tr><tr><td class="nettd"  id="tdcolor1" ><strong>[' + res.data.data.users.truename + ']</strong></td></tr><tr><td class="nettd"  id="tdcolor1" >' + timestampToDate2(res.data.data.users.pay_date) + '</td></tr><tr><td align="center" id="tdcolor3">' + res.data.data.users[ranksheet] + '</td></tr></tr><tr><td height="25" align="center" valign="bottom"><table width="100%" border="0" background="/static/tab_05.gif"><tbody><tr><td colspan="2" align="center" class="ceng">层:' + infouserlayer + '</td></tr></tbody></table></td></tr></table></td></tr></tbody></table><table border="0" align="center" cellspacing="0" cellpadding="0" style="margin:0px auto 0 auto;"><tbody><tr><td>';

            if (res.data.data.users[net_intr_down_data] != false) {
              htmlstr = htmlstr + '<table border="0" align="center" cellspacing="0" cellpadding="0" style="margin:0px auto 0 auto;"><tbody><tr><td align="center" style="line-height: 10px; height: 10px;"><img style="width:1px;height:20px" alt="" src="../../assets/images/line2.gif" border="0"></td></tr></tbody></table><table border="0" align="center" cellspacing="0" cellpadding="0" style="margin:0px auto 0 auto;"><tbody><tr>';
            }
            htmlstr = htmlstr + shownew(res.data.data.users, res.data.data.downusers, net_intr_down_data, net_intr_layer, 1, res.data.data.chengnums);

            document.getElementById('ramus1').innerHTML = htmlstr;
          } */
        }
      })
    }
  },
}
/* function shownew(users, downusers, net_intr_down_data, net_intr_layer, nowceng, cengnum) {
  var htmlstr = '';
  if (users[net_intr_down_data] == false) {
    return '';
  }
  if (users[net_intr_down_data] != false) {
    htmlstr = htmlstr + '<table border="0" align="center" cellspacing="0" cellpadding="0" style="margin:0px auto 0 auto;"><tbody><tr><td align="center" style="line-height: 10px; height: 10px;"><img style="width:1px;height:20px" alt="" src="../../assets/images/line2.gif" border="0"></td></tr></tbody></table><table border="0" align="center" cellspacing="0" cellpadding="0" style="margin:0px auto 0 auto;"><tbody><tr>';
  }
  var downcount = 0;
  for (var index in users[net_intr_down_data]) {
    downcount++;
  }
  nowceng++;
  var nowlength = 1;
  for (var index in users[net_intr_down_data]) {
    var infouser = downusers[index];
    if (infouser == undefined) {
      continue;
    }
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
    if (nowceng < cengnum && infouser[net_intr_down_data] != false) {
      htmlstr = htmlstr + shownew(infouser, downusers, net_intr_down_data, net_intr_layer, nowceng, cengnum);
    }
  }
  htmlstr = htmlstr + '</td></tr></tbody></table>';

  return htmlstr;
} */
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

<style lang="">
#ramus1 {
  margin-top: 30px;
}
.hengxian {
  background-color: #003399;
}
.thistable {
  background-color: #517dbf;
  margin: 0px auto 0 auto;
  border: 1px solid #ededed;
}
#tdcolor1 {
  background-color: #1bbc9d;
}
.nettd {
  height: 40px;
  line-height: 40px;
  text-align: center;
  border-bottom: 1px solid #a5d1ec;
  color: #ffffff;
}
#tdcolor3 {
  background-color: #e7f2fb;
  line-height: 20px;
}
</style>