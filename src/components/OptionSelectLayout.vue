<template>
    <div id="OptionSelectLayoutWrap">
        <div style="display: inline-block; width: 734px;">
            <TimeTable style="display: inline-block; width: 434px; height: auto; float: left; "></TimeTable>
            <div style="display: flex; height: 10vh; float: right; width: 434px; ">
                <button @click="submit" >submit</button>
            </div>
        </div>
        <div style="display: inline-block; width: 362px; margin-left: 5%;">
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
        width: 100px;
        height: 50px;
        margin: auto;
        background-color: rgb(266, 266, 266);
        border-radius: 10px;
        outline: none;
    }
    button:hover{
        background-color: rgb(230, 230, 230);
    }
</style>
