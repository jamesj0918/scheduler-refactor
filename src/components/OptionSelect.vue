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
            <i style="margin-left:10px; margin-right:135px; cursor:pointer" class="fas fa-check-circle" @click="set_points"></i>
            남은 학점 : {{extra_points}}
        </div>
        <br>
        <div style = "cursor: pointer;font-size: 14px; font-weight: bold; color: rgb(85, 85, 85);">
            공강 선택
            <i @click="add_breaktime()" class="fas fa-plus-circle"></i>
        </div>
        <div class="BreaktimeList">
            <div v-for="(breaktime, index) in breaktime_data" class="BreakTimeSelect">
                <select v-model="breaktime.day" class="DaySelect">
                    <option value="mon">월</option>
                    <option value="tue">화</option>
                    <option value="wed">수</option>
                    <option value="thu">목</option>
                    <option value="fri">금</option>
                    <option value="all">매일</option>
                </select>
                <select v-model="breaktime.start_time" class="StartTimeSelect">
                    <option v-for="start in time_list" :value="sub_colon(start)">{{start}}</option>
                </select>
                ~
                <select v-model="breaktime.end_time" class="EndTimeSelect">
                    <option v-for="end in time_list" :value = "sub_colon(end)">{{end}}</option>
                </select>
                <div class="PlusIcon">
                    <i @click="sub_choice(index)" class="fas fa-minus-circle"></i>
                </div>
            </div>
        </div>
        <br>
        <div class="ToggleSearch">
            <button style="cursor: pointer;" :disabled="pin_lectures" @click="toggle">고정 강의</button>
            <button style="cursor: pointer" :disabled="select_lectures" @click="toggle">선택 강의</button>
        </div>
        <br>
        <PinSearchForm v-show="pin_lectures"></PinSearchForm>
        <SelectSearchForm v-show="select_lectures" ></SelectSearchForm>
    </div>
</template>

<script>
    import axios from 'axios'
    import PinSearchForm from './PinSearchForm'
    import SelectSearchForm from './SelectSearchForm'

    export default {
        name: "OptionSelect",
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
                extra_points: 0.0,
                subject_point: 0.0,
                day_list: ["월", "화", "수", "목", "금"],
                option_day_value: ["mon", "tue", "wed", "thr", "fri"],
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
                breaktime_count: 1,
                day: "",
                start_time: "",
                end_time: "",
            }
        },
        mounted(){
            axios.get('department')
                .then((response)=>{
                    this.departments = response.data;
                });
            this.$bus.$on('timetable_not_collided', this.add_lecture_points);
            this.$bus.$on('add_selected_lecture_points', this.add_lecture_points);
            this.$bus.$on('remove_lecture', this.sub_lecture_points);
            this.$bus.$on('get_result',this.get_break_time);
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
                this.subject_point += lecture.point;
                this.extra_points -= lecture.point;
            },
            add_breaktime(){
                this.breaktime_count++;
                this.breaktime_data.push({day: "", start_time : "", end_time: ""});
                this.store.state.submit.breaktime_data++;
            },
            sub_colon(time){
                return time[0]+time[1]+time[3]+time[4];
            },
            sub_choice(index){
                this.breaktime_count--;
                this.breaktime_data.splice(index,1);
                this.store.state.submit.breaktime_data--;
            },
            set_points(){
                this.extra_points = this.points - this.subject_point;
                this.$store.dispatch('SET_POINTS',this.points);
            },
            sub_lecture_points(lecture){
                this.subject_point-=lecture.point;
                this.extra_points+=lecture.point;
            },
            get_break_time(){
                this.$bus.$emit('get_break_time',this.breaktime_data);
            }
        },//methods

    }
</script>

<style scoped>
    #OptionSelectWrap{
        display: inline-block;
        margin-left: 30px;
        margin-top: 30px;
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
        width: 100%;
        padding-right: 20px;
        padding-top:5px;
        height: 50px;
        overflow-y: scroll;
        color: rgb(85, 85, 85);
        font-size: 14px;
        font-Weight: bolder;
    }
    .EndTimeSelect{
        margin-right: 80px;
    }
</style>
