<template>
    <div>
        <div class="LectureData" @click="add_lecture(lecture)" v-for="lecture in search_data">
            <div class="LectureTitle">{{lecture.title}}</div>
            <div class="LectureInfo">
                {{lecture.professor}}, {{lecture.classroom}}, {{lecture.point}}
            </div>
            <div class="LectureTimeWrap" >
                <div class="LectureTime" v-for="time in lecture.timetable.slice().reverse()">
                    {{time.day}} {{time.start.split(":")[0]+":"+time.start.split(":")[1]}}~{{time.end.split(":")[0]+":"+time.end.split(":")[1]}}
                </div>
            </div>
        </div>
    </div>

</template>

<script>
    export default {
        name: "ResultSearchResult",
        mounted(){
            this.$bus.$on('pin_result',this.get_data)
        }
    }
</script>

<style scoped>
    .LectureData{
        background-color: white;
        height: 60px;
        border-left: solid 1px rgb(221, 221, 221);
        border-right: solid 1px rgb(221, 221, 221);
        border-bottom: solid 1px rgb(221, 221, 221);
        border-top: solid 1px rgb(221, 221, 221);
        border-radius: 10px 10px 10px 10px;
        margin-top: 10px;
        cursor: pointer;
    }
    .LectureData:hover{
        background-color: rgb(244, 244, 244);
    }
    .LectureTitle{
        margin-top: 6px;
        margin-left: 15px;
        font-weight: bolder;
        font-size: 14px;
        color: rgb(85, 85, 85);
    }
    .LectureInfo{
        margin-top: 2px;
        margin-left: 15px;
        font-weight: bolder;
        font-size: 12px;
        color: rgb(128, 128, 128);
    }
    .LectureTimeWrap{
        margin-left: 15px;
    }
    .LectureTime{
        display: inline-block;
        font-weight: bolder;
        font-size: 12px;
        color: rgb(128, 128, 128);
        margin-right: 3px;
    }
</style>

