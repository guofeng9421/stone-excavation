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
//2D3D同步
export function query2D3D() {
    return service({
        method: "get",
        url: '/Point/queryName',
        params: {
            workPoint: "平面图"
        },
        dataType: 'json',
    })
}
//场景GIS
export function findScene() {
    return service({
        method: "get",
        url: '/Point/findScene',
        params: {
            workPoint: "桓基高速"
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
export function findMileage() {
    return service({
        method: 'get',
        url: '/Schedule/findMileage'
    })
}
//回传土方量的id
export function findFillVolumeSUM(params) {
    return service({
        method: 'get',
        url: '/Schedule/findFillVolumeSUM',
        params,
    })
}

//环境管理近一周环境概况
export function findAver() {
    return service({
        method: 'get',
        url: '/Dust/findAver',
    })
}

//环境管理 当前环境
export function findByTotal() {
    return service({
        method: 'get',
        url: '/Dust/findByTotal',
    })
}
//环境管理 24小时曲线
export function findTian() {
    return service({
        method: 'get',
        url: '/Dust/findTian',
    })
}
//监控列表
export function findMonitor() {
    return service({
        method: 'get',
        url: '/Monitor/findMonitor',
    })
}

//监控设备号
export function findArea(params) {
    return service({
        method: 'get',
        url: 'Monitor/findArea',
        params,
    })
}





//监控显示
export function getKitToken(params) {
    return service({
        method: 'get',
        url:'/Monitor/getKitToken',//本地
        // url: '/quality/getKitToken',//宁波接口
        params,
    })
}

//获取监控accessToken
export function AccessToken() {
    return service({
        method: 'get',
        url: '/quality/Monitor',
    })
}