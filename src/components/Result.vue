<template>
    <div id="ResultWrap">
        <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.5.0/css/all.css" integrity="sha384-B4dIYHKNBt8Bc12p+WXckhzcICo0wtJAoU8YZTY5qE0Id1GSseTk6S+L3BlXeVIU" crossorigin="anonymous">
        <div class="TimeTableWrap">
            <TimeTable  :timetable="timetable">

            </TimeTable>
        </div>
        <div class="SearchFormWrap">
            <PinSearchForm >

            </PinSearchForm>
        </div>
    </div>
</template>

<script>
    import Vue from 'vue';
    import TimeTable from "./TimeTable";
    import PinSearchForm from "./PinSearchForm";

    export default {
        name: "Result",
        components: {PinSearchForm, TimeTable},
        props: ["timetable"],
        data(){
            return{
                result_bus: new Vue()
            }
        }
    }
</script>

<style scoped>
    .TimeTableWrap{
        display: inline-block;
        float: left;
    }
    .SearchFormWrap{
        display: inline-block;
        margin-top: 130px;
    }
</style>
