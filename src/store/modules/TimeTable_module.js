const SET_RESULT = "SET_RESULT";
const ADD_CLASS = "ADD_CLASS";
const SET_INDEX = "SET_INDEX";
const SUB_CLASS = "SUB_CLASS";
const SET_POINTS = "SET_POINTS";
const GET_RESULT= "GET_RESULT";
const GET_TIMETABLE = "GET_TIMETABLE";

const state = {
    activeTimeTable: 0,
    points: 0,
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
    },
    SET_POINTS(state, points){
        state.points = points;
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
    SET_POINTS({commit},points){
        commit(SET_POINTS, points);
    }

};

const getters = {
    GET_RESULT: function(state){
        return state.result;
    },
    GET_ORIGINAL: state => {
        console.log("get_timeTable");
        state.result_extends[state.activeTimeTable] = state[state.activeTimeTable];
        return state.result[state.activeTimeTable];
    },
    GET_TIMETABLE: state => {
        return state.result_extends[state.activeTimeTable];
    },
    GET_POINTS: state => {
        return state.points;
    },
    GET_LENGTH: state => {
        return state.result[state.activeTimeTable].length;
    }
};

export default {
    state,
    mutations,
    actions,
    getters,
}
