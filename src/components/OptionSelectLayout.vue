<template>
    <div id="OptionSelectLayoutWrap">
        <TimeTable :bus="bus"></TimeTable>
        <OptionSelect :bus="bus"></OptionSelect>
    </div>
</template>

<script>
    import Vue from 'vue'
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
                bus: new Vue()
            }
        }
    }
</script>

<style scoped>
    #OptionSelectLayoutWrap{
        margin: 0 auto;
    }
</style>