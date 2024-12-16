import { createReducer, on } from "@ngrx/store";
import { Designation } from "../../models/designation.model";
import { designationAction } from "../actions/designation.action";

const initialState: Designation[] = [];
// Reducer to load designations
export const designationReducer = createReducer(
  initialState,
  //On load designations success
  on(designationAction.loadDesignationsSuccess, (state, action) => {
    return action.payload;
  }),
  //On load designations failure
  on(designationAction.loadDesignationsFailure, (state, action) => {
    return [];
  })
);
