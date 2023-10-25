import { AuthType } from "@/types/AuthType";
import { User } from "@/types/DataType";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type InitialState = {
  value: TableState;
};

type TableState = {
  data: User[];
  editedDataId: number;
  isEditing: boolean;
};

const initialState = {
  value: {
    data: [],
    editedDataId: 0,
    isEditing: false,
  } as TableState,
} as InitialState;

export const table = createSlice({
  name: "table",
  initialState,
  reducers: {
    saveData: (state, action: PayloadAction<User[]>) => {
      state.value.data = action.payload;
    },
    isEditingChange: (state, action: PayloadAction<boolean>) => {
      state.value.isEditing = action.payload;
    },
    saveEditedDataId: (state, action: PayloadAction<number>) => {
      state.value.editedDataId = action.payload;
    },
  },
});

export const { saveData, isEditingChange, saveEditedDataId } = table.actions;
export default table.reducer;
