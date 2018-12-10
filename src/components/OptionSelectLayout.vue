<template>
    <div id="OptionSelectLayoutWrap">
        <div style="display: inline-block; float: left;">
            <TimeTable></TimeTable>
            <div style="display: block; margin-left: 480px">
                <button @click="submit" >확인</button>
            </div>
        </div>
        <div style="display:inline-block;">
            <OptionSelect ></OptionSelect>
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
        mounted(){


        },
        methods:{
            submit(){
                this.$router.push('/loading');
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
        width: 80px;
        height: 30px;
        margin: auto;
        background-color: rgb(266, 266, 266);
        border: 2px solid rgb(221, 221, 221);
        border-radius: 5px;
        outline: none;
        font-weight: bold;
        font-size: 16px;
        color: rgb(120, 120, 120);
    }
    button:hover{
        background-color: rgb(230, 230, 230);
    }
</style>
