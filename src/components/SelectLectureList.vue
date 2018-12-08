<template>
    <div id="LectureListWrap">
        <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.5.0/css/all.css" integrity="sha384-B4dIYHKNBt8Bc12p+WXckhzcICo0wtJAoU8YZTY5qE0Id1GSseTk6S+L3BlXeVIU" crossorigin="anonymous">
        <div @click="list_to_subcategory" class="SubCategory">
            <div class="BackIcon">
                <i class="fas fa-chevron-left"></i>
            </div>
            <div class="SubCategoryName">
                {{category}} / {{subcategory}}
            </div>
            <div class="SubCategoryCount">
                {{count}}개의 강의
            </div>
        </div>
        <div class="LectureContent">
            <div @click="add_lecture(lecture)" class="LectureData" v-for="lecture in lecture_data">
                <div class="LectureTitle">{{lecture.title}}</div>
                <div class="LectureInfo">
                    {{lecture.code}}, {{lecture.point}}학점
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import axios from 'axios'
    export default {
        name: "SelectLectureList",
        props:[
            "bus",
            "category",
            "subcategory"
        ],
        data(){
            return{
                lecture_data: [],
                count: 0,
            }
        },
        methods:{
            list_to_subcategory(){
                this.$bus.$emit('list_to_subcategory');
            },
            add_lecture(lecture){
                this.$bus.$emit('add_lecture_to_list', lecture);
            },

        },
        mounted(){
            axios.get('lectures/unique/?category='+this.category+'&subcategory='+this.subcategory)
                .then((response)=>{
                    this.count = response.data.count;
                    this.lecture_data = response.data.results;
                })
        }
    }
</script>

<style scoped>
    #LectureListWrap{
        display: inline-block;
        height: 100%;
        width: 100%;
    }
    .BackIcon{
        display: inline-block;
        color: rgb(85, 85, 85);
        margin-left: 10px;
    }
    .SubCategory{
        display: inline-block;
        height: 40px;
        width: 100%;
        border-bottom: 1px solid rgb(221, 221, 221);
    }
    .SubCategory:hover {
        background-color: rgb(244, 244, 244);
        cursor: pointer;
    }
    .SubCategoryName{
        display: inline-block;
        color: rgb(85, 85, 85);
        font-weight: bolder;
        margin-left: 15px;
        margin-top: 12px;
        font-size: 16px;
    }
    .SubCategoryCount{
        display: inline-block;
        float: right;
        font-size: 12px;
        color: rgb(128, 128, 128);
        margin-right: 15px;
        margin-top: 14px;
        font-weight: bolder;
    }
    .LectureContent{
        display: inline-block;
        height: 195px;
        width: 310px;
        overflow-y: scroll;
        padding-left: 10px;
        padding-right: 10px;
    }
    .LectureData{
        background-color: white;
        height: 50px;
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
        margin-top: 9px;
        margin-left: 15px;
        font-weight: bolder;
        font-size: 16px;
        color: rgb(85, 85, 85);
    }
    .LectureInfo{
        margin-left: 15px;
        font-weight: bolder;
        font-size: 12px;
        color: rgb(128, 128, 128);
    }
</style>
