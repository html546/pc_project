import axios from 'axios';
import api from '../../api/api';
export function add0(m) { return m < 10 ? '0' + m : m }
export function format(shijianchuo) {
    //shijianchuo是整数，否则要parseInt转换
    var time = new Date(shijianchuo);
    var y = time.getFullYear();
    var m = time.getMonth() + 1;
    var d = time.getDate();
    var h = time.getHours();
    var mm = time.getMinutes();
    var s = time.getSeconds();
    return y + '-' + add0(m) + '-' + add0(d) + ' ' + add0(h) + ':' + add0(mm) + ':' + add0(s);
}
export function format1(shijianchuo) {
    var time = new Date(shijianchuo);
    var y = time.getFullYear();
    var m = time.getMonth() + 1;
    var d = time.getDate();
    return y + '-' + add0(m) + '-' + add0(d);
}
export function post(url, params, config = {}) {
    return axios({
        method: 'post',
        // url: '/api' + url,
        url: url,
        data: params
    })
}
export function checkPass(vm, callback, page) {
    let user = localStorage.getItem('user');
    vm.$swal({
        title: '请输入二级密码',
        input: 'password',
        inputPlaceholder: '请输入二级密码',
    }).then((value) => {
        console.log(value);
        post(api.tradePasswordVerify, {
            userid: JSON.parse(user).id,
            sessionid: JSON.parse(user).sessionid,
            password: value.value
        }).then(res => {
            console.log(res);
            if (res.data.status == 1) {
                vm.$swal({
                    type: 'success',
                    title: res.data.msg
                }).then(res => {
                    if (res.value) {
                        // console.log(typeof callback);
                        callback(page);
                    }
                })
            } else {
                vm.$swal({
                    type: "info",
                    title: res.data.msg
                })
            }
        }).catch(err => {
            console.log(err)
        })
        // alert(value);
    })
}