<template>
    <div>
        <div v-if="loading">
            loading
        </div>
        <div v-else>
            <button @click = "go_result">결과 확인</button>
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
                breakTimeList:'',
                fixList:"",
                selectList:"",
                loading: false,
            }
        },
        mounted(){
            this.$bus.$on('get_fix_list', this.set_fix_list);
            this.$bus.$on('get_break_time', this.set_break_time_list);
            this.$bus.$on('get_select_list', this.set_select_list);
            this.breakTimeList="";
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
                if(breakTimeList.length==0){
                    this.breakTimeList = '';
                }
                else{
                    this.breakTimeList+='&timetable=';
                    for(let i = 0; i<breakTimeList.length; i++){
                        this.breakTimeList+=String(breakTimeList[i].day);
                        this.breakTimeList+=':';
                        this.breakTimeList+=String(breakTimeList[i].start_time);
                        this.breakTimeList+=':';
                        this.breakTimeList+=String(breakTimeList[i].end_time);
                        this.breakTimeList+=',';
                    }
                    this.breakTimeList = this.breakTimeList.slice(0,this.breakTimeList.length-1);
                }
            },
            get_result(){
                this.loading = true;
                axios.get('lectures/query/?selected='+this.selectList+'&fixed='+this.fixList +this.breakTimeList)
                    .then((response)=>{
                        console.log("결과전체목록",response);
                        this.timetables = response.data;
                        this.loading = false;
                        this.$store.dispatch("SET_RESULT",this.timetables);
                    });
            },
        }
    }
</script>

<style scoped>

</style>
