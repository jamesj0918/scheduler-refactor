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
            학점 선택 <input style="width: 30px" type="text">
        </div>
        <br>
        <div class="ToggleSearch">
            <button :disabled="pin_lectures" @click="toggle">고정 강의</button>
            <button :disabled="select_lectures" @click="toggle">선택 강의</button>
        </div>
        <br>
        <PinSearchForm v-if="pin_lectures"></PinSearchForm>
        <SelectSearchForm v-if="select_lectures"></SelectSearchForm>
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
            }
        },
        mounted(){
            axios.get('department')
                .then((response)=>{
                    this.departments = response.data;
                })
        },
        methods:{
            toggle(){
                this.pin_lectures = !this.pin_lectures;
                this.select_lectures = !this.select_lectures;
            }
        }
    }
</script>

<style scoped>
    #OptionSelectWrap{
        display: inline-block;
        margin-left: 30px;
        margin-top: 130px;
        margin-bottom: 0.5px;
    }
</style>