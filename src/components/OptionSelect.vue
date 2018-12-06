<template>
    <div id="OptionSelectWrap">
        <div class="DepartmentSelect">
            학과 선택
            <label>
                <select>
                    <option v-for="(department, i) in departments" :key="i">{{department.title}}</option>
                </select>
            </label>
        </div>
        <br>
        <div class="PointSelect">
            학점 선택 <input @change="validate_points()" v-model="points" style="width: 30px" type="text">
            남은 학점 : {{points}}
        </div>
        <br>
        <div class="BreaktimeList">
            <div v-for="(breaktime, index) in breaktime_data" class="BreakTimeSelect">
                <select v-model="day" class="DaySelect">
                    <option v-for="day in breaktime">{{day}}</option>
                </select>
                <select v-model="start_time" class="StartTimeSelect">
                    <option v-for="start_time in breaktime">{{start_time}}</option>
                </select>
                ~
                <select v-model="end_time" class="EndTimeSelect">
                    <option v-for="end_time in breaktime">{{end_time}}</option>
                </select>
                <div class="PlusIcon">
                    <i v-if="day === ''" @click="add_breaktime({day, start_time, end_time}, index)" class="fas fa-plus-circle"></i>
                    <i v-else @click="add_breaktime({day, start_time, end_time}, index)" class="fas fa-minus-circle"></i>
                </div>
            </div>
        </div>
        <br>
        <div class="ToggleSearch">
            <button :disabled="pin_lectures" @click="toggle">고정 강의</button>
            <button :disabled="select_lectures" @click="toggle">선택 강의</button>
        </div>
        <br>
        <PinSearchForm v-show="pin_lectures" :bus="bus"></PinSearchForm>
        <SelectSearchForm v-show="select_lectures" :bus="bus"></SelectSearchForm>
    </div>
</template>

<script>
    import axios from 'axios'
    import PinSearchForm from './PinSearchForm'
    import SelectSearchForm from './SelectSearchForm'

    export default {
        name: "OptionSelect",
        props: ['bus'],
        components:{
            PinSearchForm,
            SelectSearchForm
        },
        data(){
            return{
                departments: [],
                pin_lectures: true,
                select_lectures: false,
                points: 0.0,
                day_list: ["월","화","수","목","금"],
                time_list:[
                    "09:00",
                    "09:30",
                    "10:00",
                    "10:30",
                    "11:00",
                    "11:30",
                    "12:00",
                    "12:30",
                    "13:00",
                    "13:30",
                    "14:00",
                    "14:30",
                    "15:00",
                    "15:30",
                    "16:00",
                    "16:30",
                    "17:00",
                    "17:30",
                    "18:00",
                    "18:30",
                    "19:00",
                    "19:30",
                    "20:00",
                    "20:30",
                    "21:00",
                ],
                breaktime_data: [{day: "", start_time : "", end_time: ""}],
                day: "",
                start_time: "",
                end_time: ""
            }
        },
        mounted(){
            axios.get('department')
                .then((response)=>{
                    this.departments = response.data;
                });
            this.bus.$on('timetable_not_collided', this.add_lecture_points);
            this.bus.$on('add_selected_lecture_points', this.add_lecture_points);
        },
        methods:{
            toggle(){
                this.pin_lectures = !this.pin_lectures;
                this.select_lectures = !this.select_lectures;
            },
            validate_points(){
                if (this.points > 24) {
                    alert('최대 학점은 24학점 입니다!');
                    this.points = 0;
                }
            },
            add_lecture_points(lecture){
                this.points -= lecture.point;
            },
            add_breaktime(breaktime, index){
                this.breaktime_data[index] = breaktime;
                this.breaktime_data.push({day: "", start_time : "", end_time: ""});
            }
        }
    }
</script>

<style scoped>
    #OptionSelectWrap{
        display: inline-block;
        margin-left: 30px;
        margin-top: 80px;
    }
    select{
        color: rgb(120, 120, 120);
    }
    option{
        color: rgb(120, 120, 120);
    }
    .DepartmentSelect{
        color: rgb(85, 85, 85);
        font-size: 14px;
        font-Weight: bolder;
    }
    .PointSelect{
         color: rgb(85, 85, 85);
         font-size: 14px;
         font-Weight: bolder;
     }
    .BreakTimeSelect{
        display: block;
        border: 1px solid transparent;
    }
    .PlusIcon{
        float: right;
        color: rgb(120, 120, 120);
        cursor: pointer;
        display: inline-block;
        margin-top: 1px;
    }
    .PlusIcon:hover{
        color: rgb(85, 85, 85);
    }
    .StartTimeSelect{
        margin-left: 10px;
    }
    .BreaktimeList{
        display: inline-block;
    }
    .EndTimeSelect{
        margin-right: 80px;
    }
</style>