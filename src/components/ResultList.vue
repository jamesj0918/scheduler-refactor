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
                breakTimeList: "",
                fixList:"",
                selectList:"",
                loading: false,
            }
        },
        methods:{
            link_result(timetable, index){
                this.$router.push({name: 'Result', params: {timetable: timetable, result_index: index}});
            },
            set_break_time_list(breakTimeList){
                for(let i = 0;i<breakTimeList.length;i++){
                    this.breakTimeList+=String(breakTimeList[i].day);
                    this.breakTimeList+=":";
                    this.breakTimeList+=String(breakTimeList[i].start_time);
                    this.breakTimeList+=":";
                    this.breakTimeList+=String(breakTimeList[i].end_time);
                    this.breakTimeList+=',';
                }
                this.breakTimeList = this.breakTimeList.slice(0,this.breakTimeList.length-1);
                if(this.breakTimeList == '::'){
                    this.breakTimeList='';
                }
            },
            set_fix_list(fixList){
                console.log(fixList);
                for(let i = 0 ;i<fixList.length;i++){
                    this.fixList+=String(fixList[i].id);
                    this.fixList+=',';
                }
                this.fixList = this.fixList.slice(0,this.fixList.length-1);

            },
            set_select_list(selectList){
                for(let i = 0 ;i<selectList.length;i++){
                    this.selectList+=String(selectList[i].code);
                    this.selectList+=',';
                }
                this.selectList = this.selectList.slice(0,this.selectList.length-1);
            },
            get_result(){
                this.loading = true;
                axios.get('lectures/query/?timetable='+this.breakTimeList+'&selected='+this.selectList+'&fixed='+this.fixList)
                    .then((response)=>{
                        this.timetables = response.data;
                        this.loading = false;
                    })
            },
            emit(){
                this.$bus.$emit('get_result');
                this.get_result();
            }

        },
        created(){

            this.$bus.$on('get_fix_list', this.set_fix_list);
            this.$bus.$on('get_break_time', this.set_break_time_list);
            this.$bus.$on('get_select_list', this.set_select_list);
            this.emit();
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
