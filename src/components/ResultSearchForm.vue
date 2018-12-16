<template>
    <div>
        <div>
            남은 학점: {{points}}
        </div>
        <div class="SearchForm">
            <vue-tabs>
                <v-tab icon="fas fa-search" title="">
                    <div class="TabContent">
                        <div class="SearchFormContent">
                            <div class="Search">
                                <input placeholder="과목명/학수번호/교수님성함" type="text" v-model="query" class="SearchInput">
                                <i style="margin-top: 6px; cursor: pointer" @click="search" class="fas fa-search"></i>
                            </div>
                            <div class="LectureContent" id="result-search-list">
                                <transition  name="fade" id="fade">
                                    <div class="loading" v-show="loading">
                                        <span class="fa fa-spinner fa-spin"></span> Loading
                                    </div>
                                </transition>
                                <div class="LectureData" @click="add_lecture(lecture)" v-for="lecture in search_data">
                                    <div class="LectureTitle">{{lecture.title}}</div>
                                    <div class="LectureInfo">
                                        <div class="info">
                                            {{lecture.professor}},
                                        </div>
                                        <div v-if="lecture.timetable.length != 0" class="info">
                                            {{lecture.classroom}},
                                        </div>
                                        <div class="info">
                                            {{lecture.point}}학점
                                        </div>
                                    </div>
                                    <div class="LectureTimeWrap">
                                        <div v-if="lecture.timetable.length !==0">
                                            <div class="LectureTime" v-for="time in lecture.timetable.slice().reverse()">
                                                {{time.day}} {{time.start.split(":")[0]+":"+time.start.split(":")[1]}}~{{time.end.split(":")[0]+":"+time.end.split(":")[1]}}
                                            </div>
                                        </div>
                                        <div v-else class="LectureTime">
                                            온라인
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </v-tab>
                <v-tab icon="fas fa-tags" title="">
                    <div class="TabContent">
                        <Category v-if="layer === 0" :select_option="'pin'"></Category>
                        <SubCategory
                            v-if="layer === 1"
                            :select_option="'pin'"
                            :category="this.push_category">
                        </SubCategory>
                        <ResultLectureList
                            v-if="layer === 2"
                            :breakTime="this.breakTimeList"
                            :category="this.push_category"
                            :subcategory="this.push_subcategory">
                        </ResultLectureList>
                    </div>
                </v-tab>
            </vue-tabs>
            <div class="ListContent">
                <div class="LectureData" @click="remove_lecture(lecture,index)" v-for="(lecture,index) in lecture_data">
                    <div class="MinusButton" v-show="index>=counts">
                        <i class="fas fa-minus-circle"></i>
                    </div>
                    <div class="LectureTitle">{{lecture.title}}</div>
                    <div class="LectureInfo">
                        <div class="info">
                            {{lecture.professor}},
                        </div>
                        <div v-if="lecture.timetable.length != 0" class="info">
                            {{lecture.classroom}},
                        </div>
                        <div class="info">
                            {{lecture.point}}학점
                        </div>
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
</template>

<script>
    import axios from 'axios';
    import Category from './Category';
    import SubCategory from "./SubCategory";
    import ResultLectureList from "./ResultLectureList";
    export default {
        name: "SearchForm",
        components:{
            ResultLectureList,
            SubCategory,
            Category,
        },
        data(){
            return{
                query: '',
                search_data: [],
                lecture_data: [],
                layer: 0,
                push_category: '',
                push_subcategory: '',
                breakTimeList: '',
                page: 0,
                bottom: 0,
                counts: 0,
                loading: false,
                points: 0,
                resultIndex: this.$route.params.result_index,
            }
        },//data
        methods:{
            search(){
                this.search_data=[];
                this.page=1;
                this.get_data(this.page);
            },
            get_data(){
                this.loading = true;

                setTimeout(e => {
                    axios.get('lectures/search/?timetable='+this.breakTimeList+'&search='+this.query+'&page='+this.page)
                        .then((response)=>{
                                for (let i = 0; i < response.data.results.length; i++) {
                                    if(this.points >= response.data.results[i].point){
                                        this.search_data.push(response.data.results[i]);
                                    }
                                }
                            });
                            this.loading = false;
                            this.page++;
                    },500);
            },
            add_lecture(lecture){
                if (this.lecture_data.indexOf(lecture) === -1) {
                    this.$bus.$emit('result_add_lecture', lecture);
                }
                else alert('이미 추가된 강의입니다!');
            },
            add_lecture_to_list(lecture){
                this.get_time_table();

            },
            remove_lecture(lecture, index){

                //const index = this.lecture_data.indexOf(lecture);
                //this.lecture_data.splice(index, 1);
                this.$bus.$emit('result_remove_lecture', lecture, index);

                this.get_time_table();
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
            get_fix_lecture(){
                this.$bus.$emit('get_fix_list',this.lecture_data);
            },
            bottomVisible() {
                var scrollY = window.pageYOffset;
                var visible = document.documentElement.clientHeight;
                var pageHeight = document.documentElement.scrollHeight;
                var bottomOfPage = visible + scrollY >= pageHeight;
                return bottomOfPage || pageHeight < visible;
            },
            add_break_time(timetable){
                if(timetable.day == '월') this.breakTimeList+="mon";
                if(timetable.day == '화') this.breakTimeList+="tue";
                if(timetable.day == '수') this.breakTimeList+="wed";
                if(timetable.day == '목') this.breakTimeList+="thu";
                if(timetable.day == '금') this.breakTimeList+="fri";

                this.breakTimeList += ":" ;

                this.breakTimeList+=this.sub_colon(timetable.start);
                this.breakTimeList += ":" ;
                this.breakTimeList+=this.sub_colon(timetable.end);
                this.breakTimeList+=',';
            },
            sub_colon(time){
                return time[0]+time[1]+time[3]+time[4];
            },
            get_time_table() {
                this.lecture_data = [];
                this.breakTimeList = '';
                this.points = this.$store.getters.GET_POINTS;
                this.lecture_data = this.$store.getters.GET_TIMETABLE;
                for (let i = 0; i < this.lecture_data.length; i++) {
                    this.points -= parseFloat(this.lecture_data[i].point);
                    for (let j = 0; j < this.lecture_data[i].timetable.length; j++) {
                        this.add_break_time(this.lecture_data[i].timetable[j]);
                    }
                }
                this.breakTimeList = this.breakTimeList.slice(0, this.breakTimeList.length - 1);

            }
        },//methods
        mounted() {
            const listElm = document.querySelector('#result-search-list');
            listElm.addEventListener( 'scroll',e =>{
                if(listElm.scrollTop + listElm.clientHeight >= listElm.scrollHeight) {
                    this.get_data();
                }
            });
            this.get_time_table();
            this.points = this.$store.getters.GET_POINTS;
            this.counts = this.$store.getters.GET_LENGTH;
            this.$bus.$on('category_to_subcategory', this.category_to_subcategory);
            this.$bus.$on('subcategory_to_category', this.subcategory_to_category);
            this.$bus.$on('subcategory_to_list', this.subcategory_to_list);
            this.$bus.$on('result_list_to_subcategory', this.list_to_subcategory);
            this.$bus.$on('result_timetable_not_collided', this.add_lecture_to_list);
            this.$bus.$on('get_result',this.get_fix_lecture);
            this.$bus.$on('result_upload_class_list',this.get_time_table());
        },//mounted
    }
</script>


<style scoped>
    *{
        margin: 0;
        padding: 0;
    }
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
        position: relative;
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

    .ListContent{
        display: inline-block;
        height: 170px;
        width: 100%;
        overflow-y: scroll;
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
        top: 40%;
    }

    .fade-enter-active, .fade-leave-active {
        transition: opacity .5s
    }
    .fade-enter, .fade-leave-to {
        opacity: 0
    }
    .info{
        display: inline-block;
        width: auto;
    }
</style>
