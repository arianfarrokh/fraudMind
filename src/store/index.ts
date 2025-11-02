import { configureStore, combineReducers } from "@reduxjs/toolkit";
import fraudMindSchemaReducer from "./schema-slicet";
const combinedReducer = combineReducers({
  fraudMindSchema: fraudMindSchemaReducer,
});

export default configureStore({
  reducer: combinedReducer,
});

export type RootState = ReturnType<typeof combinedReducer>;
