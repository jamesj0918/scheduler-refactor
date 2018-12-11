<template>
    <div id="ResultLayoutWrap">
        <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.5.0/css/all.css" integrity="sha384-B4dIYHKNBt8Bc12p+WXckhzcICo0wtJAoU8YZTY5qE0Id1GSseTk6S+L3BlXeVIU" crossorigin="anonymous">
        <div class="TimeTableListWrap" :style="{width: ((timetables.length) * 475) + 'px'}">
            <div class="TimeTableList" v-for="timetable in timetables" :key="timetable.id">
                <div class="TimeTable" >
                    <div class="DeleteIcon" @click="remove_timetable(timetable.id)">
                        <i class="fas fa-times-circle"></i>
                    </div>
                    <div @click="link_result(timetable.timetable, timetable.id)">
                        <TimeTable
                                :timetable="timetable.timetable"
                                style="margin: 0 auto; float: right; cursor: pointer">
                        </TimeTable>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import TimeTable from "./TimeTable";
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
                this.$store.dispatch('SET_INDEX', index);
                this.$router.push({name: 'Result', params: {timetable: timetable, result_index: index}});
            },
            remove_timetable(index){
                this.$store.dispatch('REMOVE_TIMETABLE',index);
                this.timetables.splice(this.timetables.map((timetable)=> {return timetable.id}).indexOf(index), 1);
            }
            get_result_list(){
                const timetables = this.$store.getters.GET_RESULT;
                for(let i=0; i<timetables.length; i++){
                    this.timetables.push({id : i, timetable: timetables[i]})
                }
            }
        },
        created(){
            this.get_result_list();
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
    .DeleteIcon{
        float : right;
        margin-right : 1vw;
        cursor: pointer;
        color : rgb(120, 120, 120);
    }
    .DeleteIcon:hover{
        color: rgb(85, 85, 85);
    }

</style>
