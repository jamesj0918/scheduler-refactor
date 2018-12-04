<template>
    <div id="TimeTableWrap">
        <div class="timeWrap">
            <div class="time"><b>9</b></div>
            <div class="time"><b>10</b></div>
            <div class="time"><b>11</b></div>
            <div class="time"><b>12</b></div>
            <div class="time"><b>1</b></div>
            <div class="time"><b>2</b></div>
            <div class="time"><b>3</b></div>
            <div class="time"><b>4</b></div>
            <div class="time"><b>5</b></div>
            <div class="time"><b>6</b></div>
            <div class="time"><b>7</b></div>
            <div class="time"><b>8</b></div>
        </div>
        <div id="TimeTable">
            <div class="dayWrap">
                <div class="day"><b>월</b></div>
                <div class="day"><b>화</b></div>
                <div class="day"><b>수</b></div>
                <div class="day"><b>목</b></div>
                <div class="day"><b>금</b></div>
            </div>
            <div class="row" v-for="day_index in 5" :key="day_index">
                <div class="column"
                    v-for="time_index in 24"
                    :ref="day_index+'_'+time_index"
                    @click="select_breaktime(day_index, time_index)"
                    :key="time_index">
                    &nbsp;
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import time_converter from '../time_converter'
    import axios from 'axios'

    export default {
        name: "TimeTable",
        data(){
            return{
                timetable_data: [],
                breaktime_data: [],
            }
        },
        methods:{
            select_breaktime(day_index, time_index){
                let breaktime_index = -1;
                for (let i=0; i<this.breaktime_data.length; i++){
                    if (this.breaktime_data[i] === time_converter.index_to_single_time({day_index, time_index})){
                        breaktime_index = i;
                        break;
                    }
                }

                if (breaktime_index === -1) this.breaktime_data.push(time_converter.index_to_single_time({day_index, time_index}));
                else this.breaktime_data.splice(breaktime_index, 1);

                this.fill_timetable(day_index, time_index);

            },
            fill_timetable(day_index, time_index){
                const ref_index = day_index+"_"+time_index;
                if (this.$refs[ref_index][0].style.backgroundColor === "rgb(190, 190, 190)") {
                    this.$refs[ref_index][0].style.backgroundColor = "white";
                    if (time_index % 2 === 0) {
                        if (time_index === 24) {
                            this.$refs[ref_index][0].style.borderBottom = "solid 2px rgb(226, 226, 226)";
                        }
                        else this.$refs[ref_index][0].style.borderBottom = "solid 1px rgb(226, 226, 226)";
                    }
                    else {
                        if (time_index === 1) {
                            this.$refs[ref_index][0].style.borderTop = "solid 2px rgb(226, 226, 226)";
                        }
                        else this.$refs[ref_index][0].style.borderTop = "solid 1px rgb(226, 226, 226)";
                    }
                    this.$refs[ref_index][0].style.height = "18px";
                }
                else {
                    this.$refs[ref_index][0].style.backgroundColor = "rgb(190, 190, 190)";
                    this.$refs[ref_index][0].style.borderBottom = "none";
                    this.$refs[ref_index][0].style.borderTop = "none";
                    this.$refs[ref_index][0].style.height = "19px";
                }
            },
            add_lecture_to_timetable(lecture){
                for (let i=0; i<lecture.timetable.length; i++){
                    let location = time_converter.time_to_location(lecture.timetable[i].day, lecture.timetable[i].start, lecture.timetable[i].end);
                    for (let l=location[0].start_time_index; l<=location[1].end_time_index; l++){
                        this.fill_timetable(location[0].day_index, l);
                    }
                    let start_ref_index = location[0].day_index+"_"+location[0].start_time_index;
                    let end_ref_index = location[1].day_index+"_"+location[1].end_time_index;
                    this.$refs[start_ref_index][0].innerHTML = "<b>"+ lecture.title + "</b>" +"<div style='font-size: 9px;'>" +lecture.classroom+"</div>";
                    this.$refs[start_ref_index][0].style.fontSize = "12px";
                    this.$refs[start_ref_index][0].style.color = "white";
                    this.$refs[end_ref_index][0].style.borderBottom = "solid 1px rgb(226, 226, 226)";
                    this.$refs[end_ref_index][0].style.height = "18px";
                }
            }
        },
        mounted() {
            axios.get('lectures/query/?timetable=mon:0900:1200,tue:0900:1200,' +
                'wed:0900:1200,thu:0900:1200,fri:0900:1200&selected=001725&fixed=1606,1621,1646')
                .then((response)=>{
                    this.timetable_data = response.data;
                    for (let j=0; j<this.timetable_data[0].length; j++){
                        let lecture = this.timetable_data[0][j];
                        this.add_lecture_to_timetable(lecture);
                    }
                });
            this.$refs["1_1"][0].style.borderRadius = "10px 0 0 0";
            this.$refs["5_1"][0].style.borderRadius = "0 10px 0 0";
            this.$refs["5_24"][0].style.borderRadius = "0 0 10px 0";
            this.$refs["1_24"][0].style.borderRadius = "0 0 0 10px";

            for(let j=1; j<=24; j++){
                let tmp = 1+"_"+j;
                this.$refs[tmp][0].style.borderLeft = "solid 2px rgb(226, 226, 226)";
            }
            for(let j=1; j<=24; j++){
                let tmp = 5+"_"+j;
                this.$refs[tmp][0].style.borderRight = "solid 2px rgb(226, 226, 226)";
            }
            for(let i=0; i<this.timetable_data.length; i++){
                this.fill_timetable(this.timetable_data[i].day_index, this.timetable_data[i].time_index);
            }
        },
        updated(){
            if (this.timetable_data){
                for(let i=0; i<this.timetable_data.length; i++){
                    this.fill_timetable(this.timetable_data[i].day_index, this.timetable_data[i].time_index);
                }
            }
        }
    }
</script>

<style scoped>
    .timeWrap{
        padding-top: 40px;
        padding-right: 10px;
        margin-left: 150px;
        display: inline-block;
        float: left;
        text-align: center;
    }
    .time{
        display: block;
        margin-bottom: 19px;
        color: rgb(200, 200, 200);
    }
    .day{
        display: inline-block;
        width: 75px;
        color: rgb(200, 200, 200);
    }
    .dayWrap{
        display: block;
        padding-left: 32.5px;
        padding-bottom: 10px;
    }
    #TimeTableWrap{
        height: auto;
        display: inline-block;
        margin-left: 170px;
        margin-top: 100px;
        float: left;
    }
    #TimeTable{
        display: inline-block;
        height: auto;
    }
    .row{
        display: inline-block;
    }
    .column{
        border: solid 1px rgb(226, 226, 226);
        width: 75px;
        height: 18px;
        display: block;
        background-color: white;
        cursor: pointer;
    }
    .column:first-child{
        border-top: solid 2px rgb(226, 226, 226);
    }
    .column:last-child{
        border-bottom: solid 2px rgb(226, 226, 226);
    }
    .column:nth-child(odd){
        border-bottom: none;
    }
    .column:nth-child(even){
        border-top: none;
    }
</style>