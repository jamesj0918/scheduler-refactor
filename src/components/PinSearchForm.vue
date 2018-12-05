<template>
    <div>
        <div class="SearchForm">
            <vue-tabs>
                <v-tab icon="fas fa-search" title="">
                    <div class="TabContent">
                        <div class="SearchFormContent">
                            <div class="Search">
                                <input placeholder="과목명/학수번호/교수님성함" type="text" v-model="query" class="SearchInput">
                                <i style="margin-top: 6px; cursor: pointer" @click="search" class="fas fa-search"></i>
                            </div>
                            <div class="LectureContent">
                                <div class="LectureData" @click="add_lecture(lecture)" v-for="lecture in search_data">
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
                        <Category v-if="layer === 0" :select_option="'pin'" :bus="bus"></Category>
                        <SubCategory
                            v-if="layer === 1"
                            :select_option="'pin'"
                            :bus="bus"
                            :category="this.push_category">

                        </SubCategory>
                        <PinLectureList
                            v-if="layer === 2"
                            :bus="bus"
                            :category="this.push_category"
                            :subcategory="this.push_subcategory">
                        </PinLectureList>
                    </div>
                </v-tab>
            </vue-tabs>
            <div class="LectureData" @click="remove_lecture(lecture)" v-for="lecture in lecture_data">
                <div class="MinusButton">
                    <i class="fas fa-minus-circle"></i>
                </div>
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
</template>

<script>
    import axios from 'axios'
    import Category from './Category'
    import SubCategory from "./SubCategory";
    import PinLectureList from "./PinLectureList";
    export default {
        name: "PinSearchForm",
        components:{
            PinLectureList,
            SubCategory,
            Category
        },
        props: ['bus'],
        data(){
            return{
                query: '',
                search_data: [],
                lecture_data: [],
                layer: 0,
                push_category: '',
                push_subcategory: '',
            }
        },
        methods:{
            search(){
                axios.get('lectures/search/?search='+this.query)
                    .then((response)=>{
                        this.search_data = response.data.results;
                    })
            },
            add_lecture(lecture){
                this.bus.$emit('add_lecture', lecture);
            },
            add_lecture_to_list(lecture){
                if (this.lecture_data.indexOf(lecture) === -1) this.lecture_data.push(lecture);
                else alert('이미 추가된 강의입니다!');
            },
            remove_lecture(lecture){
                const index = this.lecture_data.indexOf(lecture);
                this.lecture_data.splice(index, 1);
                this.bus.$emit('remove_lecture', lecture);
            },
            category_to_subcategory(category) {
                this.push_category = category;
                this.layer++;
            },
            subcategory_to_category(){
                this.push_category = "";
                this.layer--;
            },
            subcategory_to_list(subcategory){
                this.push_subcategory = subcategory;
                this.layer++;
            },
            list_to_subcategory(){
                this.push_subcategory = "";
                this.layer--;
            }
        },
        mounted() {
            this.bus.$on('category_to_subcategory', this.category_to_subcategory);
            this.bus.$on('subcategory_to_category', this.subcategory_to_category);
            this.bus.$on('subcategory_to_list', this.subcategory_to_list);
            this.bus.$on('list_to_subcategory', this.list_to_subcategory);
            this.bus.$on('timetable_not_collided', this.add_lecture_to_list);
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
        color: rgb(128, 128, 128);
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
    .MinusButton{
        display: inline-block;
        float: right;
        margin-top: 20px;
        margin-right: 15px;
        color: rgb(85, 85, 85);
    }
</style>