import { PayloadAction } from "@reduxjs/toolkit";
import { call, delay, fork, put, takeLatest } from "redux-saga/effects";
import { filterActions } from "./FilterSlice";
import { trendingApi } from "../../features/product/TredingApi";
import { Product } from "../../model/product";

function* handleFilter(action: PayloadAction<string | null>) {

    if(action.payload === '' || action.payload === 'all') {

        const[result, error]:any[] = yield call(trendingApi)

        if (result) {

            // console.log("get default filter: ", result)
            yield put(filterActions.filterSuccess(result))
        }
    }
    else {

        const[result, error]:any[] = yield call(trendingApi)

        if (result) {
            
            const tmp:Product[] = []

            for (let i = 0; i < result.length; i++) {

                const element = result[i];

                if (element.category === action.payload) {

                    tmp.push(element)
                }
            }
            console.log("Action: ", action.payload);
            
            console.log("Filter: ", tmp);
            yield put(filterActions.filterSuccess(tmp))
        }

    }
}

function* workerFilter() {
    
    yield takeLatest(filterActions.getKeyFilter, handleFilter)
}

export function* watcherMakeFilter() {
    yield fork(workerFilter);
}