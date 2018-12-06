<template>
    <div id="ResultLayoutWrap">
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
            }
        },
        methods:{
            link_result(timetable, index){
                this.$router.push({name: 'Result', params: {timetable: timetable, result_index: index}});
            }
        },
        mounted(){
            axios.get('lectures/query?timetable=mon:0900:1200,tue:0900:1200,wed:0900:1200,thu:0900:1200,fri:0900:1200&selected=009955&fixed=1606,1621,1646')
                .then((response)=>{
                    this.timetables = response.data;
                })
        }
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
</style>