<template>
    <div>
        <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.5.0/css/all.css" integrity="sha384-B4dIYHKNBt8Bc12p+WXckhzcICo0wtJAoU8YZTY5qE0Id1GSseTk6S+L3BlXeVIU" crossorigin="anonymous">
        <div class="SearchForm">
            <vue-tabs>
                <v-tab icon="fas fa-search" title="">
                    <div class="TabContent">
                        <div class="SearchFormContent">
                            <div class="Search">
                                <form v-on:submit.prevent="search">
                                    <input placeholder="과목명/학과/교수님성함" type="text" v-model="query" class="SearchInput">
                                    <i style="margin-top: 6px; cursor: pointer" @click="search" class="fas fa-search"></i>
                                </form>
                            </div>
                            <div class="LectureContent">
                                <div @click="add_lecture_to_list(lecture)" class="LectureData" v-for="lecture in search_data">
                                    <div class="LectureTitle">{{lecture.title}}</div>
                                    <div class="LectureInfo">
                                        {{lecture.code}}, {{lecture.point}}학점
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </v-tab>
                <v-tab icon="fas fa-tags" title="">
                    <div class="TabContent">
                        <Category v-if="layer === 0" :select_option="'select'" ></Category>
                        <SubCategory v-if="layer === 1" :select_option="'select'" :category="this.push_category"></SubCategory>

                        <ResultLectureList
                                v-if="layer === 2"
                                :category="this.push_category"
                                :subcategory="this.push_subcategory">
                        </ResultLectureList>
                    </div>
                </v-tab>
            </vue-tabs>

                <div class="ListContent" id="select-search-list">
                    <div @click="remove_lecture_from_list(lecture)" class="LectureData" v-for="lecture in lecture_data">
                        <div class="MinusButton">
                            <i class="fas fa-minus-circle"></i>
                        </div>
                        <div class="LectureTitle">{{lecture.title}}</div>
                        <div class="LectureInfo">
                            {{lecture.code}}, {{lecture.point}}학점
                        </div>
                    </div>
                </div>


        </div>
    </div>
</template>

<script>
    import axios from 'axios'
    import Category from './Category'
    import SubCategory from './SubCategory'
    import ResultLectureList from "./ResultLectureList";

    export default {
        name: "ResultSearchForm",
        components: {
            ResultLectureList,
            Category,
            SubCategory
        },
        data(){
            return{
                query: '',
                lecture_data: [],
                search_data: [],
                layer: 0,
                push_category: '',
                push_subcategory: '',
                loading: false,
                page: 1,
            }
        },
        methods:{
            search(){
                this.page = 1;
                this.search_data= [];
                this.get_data();
            },
            get_data(){
                this.loading = true;
                axios.get('lectures/unique/?search='+this.query+'&page='+this.page)
                    .then((response)=>{
                        for(let i = 0;i<response.data.results.length; i++){
                            this.search_data.push(response.data.results[i]);
                        }
                        this.page++;
                        this.loading = false;
                    });
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
            },
            add_lecture_to_list(lecture){
                if (this.lecture_data.indexOf(lecture) === -1) {
                    this.lecture_data.push(lecture);
                    this.$bus.$emit('add_selected_lecture_points', lecture);
                    this.$store.state.submit.selected_counts++;
                }
                else alert('이미 추가된 강의입니다!');
            },
            remove_lecture_from_list(lecture){
                const lecture_index = this.lecture_data.indexOf(lecture);
                if (lecture_index === -1) {
                    alert('옳바르지 않은 접근입니다.');
                    return;
                }
                this.lecture_data.splice(lecture_index, 1);
                this.$store.state.submit.selected_counts--;
            },
            get_select_list(){
                this.$bus.$emit('get_select_list',this.lecture_data);
            }
        },
        mounted() {
            const listElm = document.querySelector('#select-search-list');
            listElm.addEventListener( 'scroll',e =>{
                if(listElm.scrollTop + listElm.clientHeight >= listElm.scrollHeight) {
                    this.get_data();
                }
            });
            this.$bus.$on('category_to_subcategory', this.category_to_subcategory);
            this.$bus.$on('subcategory_to_category', this.subcategory_to_category);
            this.$bus.$on('subcategory_to_list', this.subcategory_to_list);
            this.$bus.$on('list_to_subcategory', this.list_to_subcategory);
            this.$bus.$on('add_lecture_to_list', this.add_lecture_to_list);
            this.$bus.$on('get_result', this.get_select_list);
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
        margin-bottom: 10px;
        margin-top: 1vh;
    }
    .LectureContent{
        display: inline-block;
        height: 195px;
        width: 100%;
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
        margin-top: 10px;
        margin-left: 15px;
        font-weight: bolder;
        font-size: 14px;
        color: rgb(85, 85, 85);
    }
    .LectureInfo{
        margin-left: 15px;
        font-weight: bolder;
        font-size: 12px;
        color: rgb(128, 128, 128);
    }
    .ListContent{
        display: inline-block;
        height: 170px;
        width: 100%;
        overflow-y: scroll;
    }
    .MinusButton{
        display: inline-block;
        float: right;
        margin-top: 16px;
        margin-right: 15px;
        color: rgb(85, 85, 85);
    }
    .SearchForm{
        position: relative;
    }

    .loading {
        text-align: center;
        position: absolute;
        color: #fff;
        z-index: 9;
        background: rgb(200, 200 ,200);
        padding: 8px 18px;
        border-radius: 5px;
        left: calc(50% - 50px);
        top: 30%;
    }

    .fade-enter-active, .fade-leave-active {
        transition: opacity .5s
    }
    .fade-enter, .fade-leave-to {
        opacity: 0
    }
</style>
