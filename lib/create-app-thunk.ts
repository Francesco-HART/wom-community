import { createAsyncThunk } from "@reduxjs/toolkit";
import { RootState, AppDispatch, Dependencies } from "./create-store";

export const createAsyncAppThunk = createAsyncThunk.withTypes<{
  state: RootState;
  dispatch: AppDispatch;
  extra: Dependencies;
}>();
