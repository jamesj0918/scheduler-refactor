<template>
    <div id="ResultWrap">
        <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.5.0/css/all.css" integrity="sha384-B4dIYHKNBt8Bc12p+WXckhzcICo0wtJAoU8YZTY5qE0Id1GSseTk6S+L3BlXeVIU" crossorigin="anonymous">
        <div class="TimeTableWrap">
            <ResultTimeTable  :timetable="timetable">
            </ResultTimeTable>
        </div>
        <div class="SearchFormWrap">
            <ResultSearchForm >
            </ResultSearchForm>
        </div>
    </div>
</template>

<script>
    import ResultTimeTable from "./ResultTimeTable";
    import ResultSearchForm from "./ResultSearchForm";

    export default {
        name: "Result",
        components: {ResultSearchForm, ResultTimeTable},
        props: ["timetable"],
        data(){
            return{
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
