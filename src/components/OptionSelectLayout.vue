<template>
    <div id="OptionSelectLayoutWrap">
        <TimeTable></TimeTable>
        <OptionSelect></OptionSelect>
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
        }
    }
</script>

<style scoped>
    #OptionSelectLayoutWrap{
        margin: 0 auto;
    }
</style>