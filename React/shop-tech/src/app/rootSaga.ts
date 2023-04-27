import { all } from "redux-saga/effects";
import { watcherMakeFilter } from "../redux/Filter/FilterSaga";

export default function* rootSaga() {
    yield all([watcherMakeFilter()])
}