import { Middleware } from "redux"

export const actionLog : Middleware = (store) => (next) => (action) => {
    // 打印store中的状态
    console.log("当前的 state", store.getState())
    // 被截获的action对象
    console.log("截获的 action", action)
    // 经过reducer改变后的状态
    next(action)  // 实现对action进行dispatch
    console.log("更新后的 state", store.getState())
}