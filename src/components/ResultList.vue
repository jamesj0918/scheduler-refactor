<template>
    <div id="ResultLayoutWrap">
        <transition name="fade" id="fade">
            <div class="loading" v-show="loading">
                <span class="fa fa-spinner fa-spin"></span> Loading
            </div>
        </transition>
        <div class="TimeTableListWrap" :style="{width: ((timetables.length) * 475) + 'px'}">
            <div class="TimeTableList" v-for="(timetable, index) in timetables">
                <div class="TimeTable" @click="link_result(timetable, index)">
                    <TimeTable
                            :timetable="timetable"
                            style="margin: 0 auto; float: right; cursor: pointer">
                    </TimeTable>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import TimeTable from "./TimeTable";
    import axios from 'axios';

    export default {
        name: "ResultLayout",
        components: {TimeTable},
        data(){
            return{
                timetables: [],
                loading: false,
            }
        },
        methods:{
            link_result(timetable, index){
                this.$store.dispatch('SET_INDEX',index);
                this.$router.push({name: 'Result', params: {timetable: timetable, result_index: index}});
            },
        },
        created(){
            this.timetables = this.$store.getters.GET_RESULT;
        },

    }
</script>

<style scoped>
    .TimeTableListWrap{
        display: inline-block;
        height: 700px;
    }
    .TimeTableList{
        display: inline-block;
        float: left;
        height: 700px;
        width: auto;
    }
    .TimeTable{
        display: inline-block;
        padding-top: 130px;
        padding-left: 20px;
        padding-right: 20px;
    }
    #ResultLayoutWrap{
        display: inline-bLock;
        width: 100vw;
        overflow-x: scroll;
    }

    .loading {
        text-align: center;
        position: absolute;
        color: #fff;
        z-index: 9;
        background: rgb(200, 200 ,200);
        padding: 8px 18px;
        border-radius: 5px;
        left: calc(50% - 50px);
        top: 40%;
    }

    .fade-enter-active, .fade-leave-active {
        transition: opacity .5s
    }
    .fade-enter, .fade-leave-to {
        opacity: 0
    }
</style>
