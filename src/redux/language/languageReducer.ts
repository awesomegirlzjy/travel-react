
import { CHANGE_LANGUAGE, ADD_LANGUAGE, LanguageActionTypes } from "./languageActions"

export interface LanguageState {
    language: "en" | "zh",
    languageList: {name: string, code: string}[]
}

const defaultState: LanguageState = {
    language: "zh",
    languageList: [
        {name: "中文", code: "zh"},
        {name: "English", code: "en"}
    ]
}

// 使用action对preState进行处理，输出新的state
export default (preState=defaultState, action: LanguageActionTypes) => {
    console.log("reducer", preState, action)
    const {type, data} = action
    switch (type) {
        case CHANGE_LANGUAGE:
            // i18n.changeLanguage(data)  // 这是一个有副作用的操作，不适合放在这里，可以放到中间件中进行处理
            return {...preState, language: data}  // 使得preState中的language属性被修改为data
        case ADD_LANGUAGE:
            return {
                ...preState, 
                languageList: [...preState.languageList, data]
            }
        default: 
            return preState
    }
}