import service from "@/utils/service";


//模型
export function queryName() {
    return service({
        method: "get",
        url: '/Point/queryName',
        params: {
            workPoint: "桓集高速竣工后"
        },
        dataType: 'json',
    })
}
//模型
export function query() {
    return service({
        method: "get",
        url: '/Point/queryName',
        params: {
            workPoint: "桓集高速竣工前"
        },
        dataType: 'json',
    })
}

//进度录入获取该工点进度
export function find() {
    return service({
        method: 'get',
        url: 'Schedule/find',
    })
}


//进度录入删除模型表单

export function deleteSche(data) {
    return service({
        method: 'get',
        url: 'Schedule/deleteSche',
        params: data
    })
}


//质量巡检添加质量问题
export function addQualityInspect(data) {
    return service({
        method: 'post',
        url: '/Quality/addQualityInspec',
        data
    })
}
//质量审核表格
export function findForm() {
    return service({
        method: 'get',
        url: 'Quality/findQualityInspectList',
    })
}

export function findQualityInspect(params) {
    return service({
        method: 'get',
        url: '/Quality/findQualityInspect',
        params
    })
}


//查所有土量算名字
export function findMileage(){
    return service ({
        method :'get',
        url :'/Schedule/findMileage'
    })
}
//回传土方量的id
export function findFillVolumeSUM(params){
    return service ({
        method :'get',
        url:'/Schedule/findFillVolumeSUM',
        params,
    })
}


