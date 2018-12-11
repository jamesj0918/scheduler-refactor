<template>
    <div><link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.5.0/css/all.css" integrity="sha384-B4dIYHKNBt8Bc12p+WXckhzcICo0wtJAoU8YZTY5qE0Id1GSseTk6S+L3BlXeVIU" crossorigin="anonymous">
        <div v-if="loading" style="color: rgb(120, 120, 120);">
            <i style="margin-left: 46%;margin-top: 20%;" class="fas fa-spinner grey fa-4x fa-spin"></i>
        </div>
        <div v-else>
            <button class="result" @click = "go_result">결과 확인</button>
        </div>
    </div>
</template>

<script>
    import axios from 'axios'
    export default {
        name: "Loading",
        data(){
            return{
                timetables: [],
                breakTimeList: "",
                fixList:"",
                selectList:"",
                loading: false,
            }
        },
        mounted(){
            this.$bus.$on('get_fix_list', this.set_fix_list);
            this.$bus.$on('get_break_time', this.set_break_time_list);
            this.$bus.$on('get_select_list', this.set_select_list);
            this.submit();
        },
        methods:{
            submit(){
                this.$bus.$emit('get_result');
                this.get_result();
            },
            go_result(){
              this.$router.push('/result');
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
            set_break_time_list(breakTimeList){
                console.log(breakTimeList);
                for(let i = 0; i<breakTimeList.length; i++){
                    if (breakTimeList[i].day !== "all"){
                        this.breakTimeList+=String(breakTimeList[i].day);
                        this.breakTimeList+=':';
                    }
                    if (breakTimeList[i].start_time){
                        this.breakTimeList+=String(breakTimeList[i].start_time);
                        this.breakTimeList+=':';
                    }
                    if (breakTimeList[i].end_time){
                        this.breakTimeList+=String(breakTimeList[i].end_time);
                        this.breakTimeList+=',';
                    }
                }
                this.breakTimeList = this.breakTimeList.slice(0,this.breakTimeList.length-1);
            },
            get_result(){
                this.loading = true;
                let breaktime;
                if (this.breakTimeList){
                    breaktime = "&timetable="+this.breakTimeList;
                }
                else {
                    breaktime = "";
                }
                axios.get('lectures/query/?selected='+this.selectList+'&fixed='+this.fixList+breaktime)
                    .then((response)=>{
                        console.log(response);
                        this.timetables = response.data;
                        this.loading = false;
                        this.$store.dispatch("SET_RESULT",this.timetables);
                    });
            },
        }
    }
</script>

<style scoped>
    .result{
        display: inline-block;
        color: rgb(85, 85, 85);
        margin-left: 45%;
        margin-top: 20%;
        cursor: pointer;
        width: 5vw;
        height: 3vh;
    }
</style>
