import { createAction, createSlice } from "@reduxjs/toolkit";
import partService from "../services/part.service";
import history from "../utils/history";

const partsSlice = createSlice({
    name: "parts",
    initialState: {
        entities: null,
        isLoading: true,
        error: null,
        lastFetch: null
    },
    reducers: {
        partsRequested: (state) => {
            state.isLoading = true;
        },
        partsReceved: (state, action) => {
            state.entities = action.payload;
            state.isLoading = false;
        },
        partsRequestFailed: (state, action) => {
            state.error = action.payload;
            state.isLoading = false;
        },
        partCreated: (state, action) => {
            if (!Array.isArray(state.entities)) {
                state.entities = [];
            }
            state.entities.push(action.payload);
        }
    }
});

const { reducer: partsReducer, actions } = partsSlice;
const { partsReceved, partsRequestFailed, partsRequested, partCreated } =
    actions;

const partCreateRequested = createAction("parts/partCreateRequested");
const createPartFailed = createAction("parts/createPartFailed");

export function createPart(payload) {
    return async function (dispatch) {
        dispatch(partCreateRequested());
        try {
            const { content } = await partService.create(payload);
            dispatch(partCreated(content));
            history.push("/");
        } catch (error) {
            dispatch(createPartFailed(error.message));
        }
    };
}

export const loadPartsList = () => async (dispatch) => {
    dispatch(partsRequested());
    try {
        const { content } = await partService.get();
        dispatch(partsReceved(content));
    } catch (error) {
        dispatch(partsRequestFailed(error.message));
    }
};

export const getParts = () => (state) => state.parts.entities;

export const getPartsLoadingStatus = () => (state) => state.parts.isLoading;
export const getPartById = (partId) => (state) => {
    if (state.parts.entities) {
        return state.parts.entities.find((p) => p.id === partId);
    }
};

export default partsReducer;
