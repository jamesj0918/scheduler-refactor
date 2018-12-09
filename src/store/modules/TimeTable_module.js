const SET_RESULT = "SET_RESULT";
const ADD_CLASS = "ADD_CLASS";
const SET_INDEX = "SET_INDEX";
const SUB_CLASS = "SUB_CLASS";
const GET_RESULT= "GET_RESULT";
const GET_TIMETABLE = "GET_TIMETABLE";

const state = {
    activeTimeTable: 0,
    result: [],
    result_extends: [],
};

const mutations = {
    SET_RESULT(state, subject){
        state.result = subject;
        state.result_extends = subject;
    },
    ADD_CLASS(state, subject){
        state.result_extends[state.activeTimeTable].push(subject);
    },
    SUB_CLASS(state, index){
        state.result_extends[state.activeTimeTable].splice(index,1);
    },
    SET_INDEX(state, index){
        state.activeTimeTable = index;
    }

};

const actions = {
    SET_RESULT({commit},subject){
        commit(SET_RESULT, subject);
    },
    ADD_CLASS({commit},subject){
        commit(ADD_CLASS, subject);
    },
    SUB_CLASS({commit},index){
        commit(SUB_CLASS, index);
    },
    SET_INDEX({commit},index){
        commit(SET_INDEX, index);
    },

};

const getters = {
    GET_RESULT: function(state){
        return state.result;
    },
    GET_ORIGINAL: state => {
        console.log("get_timeTable");
        return state.result[state.activeTimeTable];
    },
    GET_TIMETABLE: state => {
        return state.result_extends[state.activeTimeTable];
    }
};

export default {
    state,
    mutations,
    actions,
    getters,
}
