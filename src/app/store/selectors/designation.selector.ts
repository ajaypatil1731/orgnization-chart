import { createFeatureSelector, createSelector } from "@ngrx/store";
import { Designation } from "../../models/designation.model";

// Feature selector for the 'designation' slice of the store
export const allDesignations = createFeatureSelector<Designation[]>('designation');

// Selector to get designations based on the passed designation value
export const getDesignation = (designation: string) => createSelector(
  allDesignations,
  (state) => state.filter(item => item.designation === designation || item.designation !== 'ceo')
);
