import { createFeatureSelector, createSelector } from "@ngrx/store";
import { Designation } from "../../models/designation.model";

export const allDesignations = createFeatureSelector<Designation[]>('designation');

export const getDesignation = (designation: string)=> createSelector(
    allDesignations,
    (state)=> state.filter(item=> item.designation !== 'ceo' || designation === 'ceo')
)