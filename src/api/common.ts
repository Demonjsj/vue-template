/*
 * @Author: JSJ 389114820@qq.com
 * @Date: 2024-01-29 15:29:35
 * @Description: 通用接口
 */
import request from '@/utils/request'

// 本地资源通用下载
export const downloadResourceApi = (data: any) => {
    return request({
        url: '/common/download/resource',
        method: 'get',
        params: data
    })
}
