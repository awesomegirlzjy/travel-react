import { 
    FETCH_RECOMMEND_PRODUCTS_START, 
    FETCH_RECOMMEND_PRODUCTS_SUCCESS, 
    FETCH_RECOMMEND_PRODUCTS_FAIL, 
    RecommendProductAction 
} from "./recommendProductsActions"

interface RecommandProductsState {
    productList: any[],
    loading: boolean,
    error: string | null
}

const defaultState: RecommandProductsState = {
    productList: [],
    loading: false,
    error: null
}

export default (state=defaultState, action: RecommendProductAction) => {

    switch(action.type) {
        case FETCH_RECOMMEND_PRODUCTS_START:
            console.log("reducer - giveMeDataActionCreator - start")
            return {...state, loading: true}
        case FETCH_RECOMMEND_PRODUCTS_SUCCESS:
            console.log("reducer - giveMeDataActionCreator - success")
            return {...state, loading: false, productList: action.data}
        case FETCH_RECOMMEND_PRODUCTS_FAIL:
            console.log("reducer - giveMeDataActionCreator - fail")
            return {...state, loading: false, error: action.data}
        default: 
            return state
    }
    
}