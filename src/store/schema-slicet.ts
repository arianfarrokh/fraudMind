import { createSlice } from "@reduxjs/toolkit";
import { number } from "yup";
// SchemaType
const fraudMindSchemaSlice = createSlice({
  name: "fraud-mind-schema",
  initialState: {
    schemaId: 0,
  },
  reducers: {
    setSchemaId: (state, action) => {
      state.schemaId = action.payload;
    },
  },
});

export default fraudMindSchemaSlice.reducer;
export const { setSchemaId } = fraudMindSchemaSlice.actions;
