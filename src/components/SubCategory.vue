<template>
    <div id="SubCategoryWrap">
        <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.5.0/css/all.css" integrity="sha384-B4dIYHKNBt8Bc12p+WXckhzcICo0wtJAoU8YZTY5qE0Id1GSseTk6S+L3BlXeVIU" crossorigin="anonymous">
        <div @click="subcategory_to_category" class="Category">
            <div class="BackIcon">
                <i class="fas fa-chevron-left"></i>
            </div>
            <div class="CategoryName">
                {{category}}
            </div>
            <div class="CategoryCount">
                {{category_count}}개의 강의
            </div>
        </div>
        <div class="SubCategoryList">
            <transition  name="fade" id="fade">
                <div class="loading" v-show="loading">
                    <span class="fa fa-spinner fa-spin"></span> Loading
                </div>
            </transition>
            <div @click="subcategory_to_list(data.subcategory)" class="SubCategoryWrap" v-for="data in subcategory_count" v-show="!loading">
                <div class="SubCategoryName">{{data.subcategory}}</div>
                <div class="NextIcon"><i class="fas fa-chevron-right"></i></div>
                <div class="SubCategoryCount">{{data.count}}개의 강의</div>
            </div>
        </div>
    </div>
</template>

<script>
    import axios from 'axios'
    export default {
        name: "SubCategory",
        props: ["category", "bus", "select_option"],
        data(){
            return{
                subcategories:{
                    상경계: ['경제', '경영', '마케팅/세일즈'],
                    인문학: ['철학', '문학', '역사/문화'],
                    사회과학: ['행정', '심리', '교육학', '법', '사회학', '언론/신문/방송'],
                    과학_공학: ['기계/전기/전자', '도시/토목/건설', '물리학', '생물학', '수학', '천문/지구과학', '화학', '컴퓨터'],
                    예술: ['무용', '미술', '음악', '연극/영화', '대중문화'],
                    국방_군사_경찰: ['국방/군사/경찰'],
                    언어: ['국어', '영어', '일본어', '중국어'],
                    진로: ['창업/취업', '진로', '논술/면접대비', '공무원/자격증', '고시', '자기능력계발'],
                    취미_생활: ['리빙', '레저/스포츠', '여성/패션']
                },
                category_count: 0,
                subcategory_count: [],
                loading: false,
            }
        },
        methods:{
            subcategory_to_category(){
                this.$bus.$emit('subcategory_to_category');
            },
            subcategory_to_list(subcategory){
                this.$bus.$emit('subcategory_to_list', subcategory);
            }
        },
        mounted(){
            let search_url;
            if (this.select_option === 'select'){
                search_url = 'unique';
            }
            else{
                search_url = 'search';
            }
            this.loading = true;

            const category_modified = this.category.replace("/","_").replace("/","_");
            for(let i=0; i<this.subcategories[category_modified].length; i++){
                axios.get('lectures/'+search_url+'/?category='+this.category+'&subcategory='+this.subcategories[category_modified][i])
                    .then((response)=>{
                        this.subcategory_count.push({
                            subcategory: this.subcategories[category_modified][i],
                            count : response.data.count});
                    })
            }
            axios.get('lectures/'+search_url+'/?category='+this.category)
                .then((response)=>{

                    this.category_count = response.data.count;
                    this.loading = false;
                })

        }
    }
</script>

<style scoped>
    #SubCategoryWrap{
        display: inline-block;
        height: 100%;
        width: 100%;
    }
    .BackIcon{
        display: inline-block;
        color: rgb(85, 85, 85);
        margin-left: 10px;
    }
    .Category{
        display: inline-block;
        height: 40px;
        width: 100%;
        border-bottom: 1px solid rgb(221, 221, 221);
    }
    .Category:hover {
        background-color: rgb(244, 244, 244);
        cursor: pointer;
    }
    .CategoryName{
        display: inline-block;
        color: rgb(85, 85, 85);
        font-weight: bolder;
        margin-left: 15px;
        margin-top: 12px;
        font-size: 16px;
    }
    .CategoryCount{
        display: inline-block;
        float: right;
        font-size: 12px;
        color: rgb(128, 128, 128);
        margin-right: 15px;
        margin-top: 14px;
        font-weight: bolder;
    }
    .SubCategoryList{
        position: relative;
        display: inline-block;
        height: 200px;
        width: 100%;
        overflow-y: scroll;
    }

    .SubCategoryWrap{
        display: inline-block;
        width: 100%;
        height: 45px;
        border-bottom: 1px solid rgb(221, 221, 221);
    }
    .SubCategoryWrap:hover{
        background-color: rgb(244, 244, 244);
        cursor: pointer;
    }
    .SubCategoryName{
        margin-top: 14px;
        margin-left: 15px;
        display: inline-block;
        font-weight: bolder;
        font-size: 16px;
        color: rgb(85, 85, 85);

    }

    .NextIcon{
        float: right;
        display: inline-block;
        margin-right: 30px;
        color: rgb(128, 128, 128);
        margin-top: 15px;
    }
    .SubCategoryCount{
        float: right;
        margin-right: 10px;
        display: inline-block;
        font-size: 12px;
        font-weight: bolder;
        color: rgb(128, 128, 128);
        margin-top: 15px;
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
</style>
