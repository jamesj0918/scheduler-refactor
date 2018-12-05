<template>
    <div>
        <div class="SearchForm">
            <vue-tabs>
                <v-tab icon="fas fa-search" title="">
                    <div class="TabContent">
                        <div class="SearchFormContent">
                            <div class="Search">
                                <input type="text" v-model="query" class="SearchInput">
                                <i style="margin-top: 6px; cursor: pointer" @click="search" class="fas fa-search"></i>
                            </div>
                            <div class="LectureContent">
                                <div class="LectureData" @click="add_lecture(lecture)" v-for="lecture in lecture_data">
                                    <div class="LectureTitle">{{lecture.title}}</div>
                                    <div class="LectureInfo">
                                        {{lecture.professor}}, {{lecture.classroom}}
                                    </div>
                                    <div class="LectureTimeWrap" >
                                        <div class="LectureTime" v-for="time in lecture.timetable.slice().reverse()">
                                            {{time.day}} {{time.start.split(":")[0]+":"+time.start.split(":")[1]}}~{{time.end.split(":")[0]+":"+time.end.split(":")[1]}}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </v-tab>
                <v-tab icon="fas fa-tags" title="">
                    <div class="TabContent">
                        <Category v-if="layer === 0" :search_option="'pin'" :bus="bus"></Category>
                        <SubCategory v-if="layer === 1" :bus="bus" :category="this.push_category"></SubCategory>
                    </div>
                </v-tab>
            </vue-tabs>
        </div>
    </div>
</template>

<script>
    import axios from 'axios'
    import Category from './Category'
    import SubCategory from "./SubCategory";
    export default {
        name: "PinSearchForm",
        components:{
            SubCategory,
            Category
        },
        props: ['bus'],
        data(){
            return{
                query: '',
                lecture_data: [],
                layer: 0,
                push_category: ''
            }
        },
        methods:{
            search(){
                axios.get('lectures/search/?search='+this.query)
                    .then((response)=>{
                        this.lecture_data = response.data.results;
                    })
            },
            add_lecture(lecture){
                this.bus.$emit('add_lecture', lecture);
            },
            category_to_subcategory(category) {
                this.push_category = category;
                this.layer++;
            },
            subcategory_to_category(){
                this.push_category = "";
                this.layer--;
            }
        },
        mounted() {
            this.bus.$on('category_to_subcategory', this.category_to_subcategory);
            this.bus.$on('subcategory_to_category', this.subcategory_to_category);
        }
    }
</script>


<style scoped>
    .TabContent{
        background-color: white;
        width: 330px;
        height: 250px;
        border-left: solid 1px rgb(221, 221, 221);
        border-right: solid 1px rgb(221, 221, 221);
        border-bottom: solid 1px rgb(221, 221, 221);
    }
    .SearchFormContent{
        display: inline-block;
        width: 310px;
        height: 250px;
        margin: 0 auto;
        padding-top: 10px;
    }
    .Search{
        background-color: rgb(244, 244, 244);
        height: 30px;
        border-radius: 10px 10px 10px 10px;
        color: rgb(85, 85, 85);
        margin-left: 10px;
    }
    .SearchInput{
        background: none;
        display: flex;
        border-style: none;
        width: 85%;
        float: left;
        margin-left: 10px;
        height: 100%;
        font-size: 12px;
        font-weight: bolder;
        color: rgb(170, 170, 170);
        outline: none;
    }
    .LectureContent{
        display: inline-block;
        height: 205px;
        width: 100%;
        overflow-y: scroll;
        padding-left: 10px;
        padding-right: 10px;
    }
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