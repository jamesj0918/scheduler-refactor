<template>
    <div id="OptionSelectLayoutWrap">
        <div style="display: inline-block; width: 734px;">
            <TimeTable style="display: inline-block; width: 434px; height: auto; float: left; "></TimeTable>
            <div style="display: flex; height: 10vh; float: right; width: 434px; ">
                <button @click="submit" >submit</button>
            </div>
        </div>
        <div style="display:inline-block;">
            <OptionSelect></OptionSelect>
        </div>
    </div>
</template>

<script>
    import TimeTable from './TimeTable'
    import OptionSelect from "./OptionSelect";
    export default {
        name: "OptionSelectLayout",
        components:{
            TimeTable,
            OptionSelect
        },
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
            submit(){
                let pinned_counts = this.$store.state.submit.pinned_counts;
                let selected_counts = this.$store.state.submit.selected_counts;
                let breaktime_counts = this.$store.state.submit.breaktime_counts;
                if (pinned_counts > 0 && selected_counts > 0 && breaktime_counts >= 0) {
                    this.$router.push('/loading');
                }
                else{
                    alert('고정강의와 선택강의 모두 최소 1개 이상은 필요합니다!');
                }
            },
        }
    }
</script>

<style scoped>
    *{
        margin: 0;
        padding: auto;
    }
    #OptionSelectLayoutWrap{
        margin: 0 auto;
    }
    button{
        cursor: pointer;
        width: 100px;
        height: 40px;
        margin: auto;
        background-color: rgb(266, 266, 266);

        border-radius: 5px;
        outline: none;
        font-weight: bold;
        font-size: 13px;
        color: rgb(120, 120, 120);
    }
    button:hover{
        background-color: rgb(230, 230, 230);
    }
</style>
