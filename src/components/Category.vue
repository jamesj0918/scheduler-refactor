<template>
    <div id="SelectSearchTabWrap">
        <div class="CategoryWrap" @click="push_layer(data.category)" v-for="(data, index) in lecture_count" :key="index">
            <div class="CategoryName">{{data.category}}</div>
            <div class="NextIcon"><i class="fas fa-chevron-right"></i></div>
            <div class="CategoryCount">{{data.count}}개의 강의</div>
        </div>
    </div>
</template>

<script>
    import axios from 'axios'
    export default {
        name: "Category",
        props:["search_option", "bus"],
        data(){
            return{
                categories:[
                    '인문학',
                    '언어',
                    '사회과학',
                    '상경계',
                    '진로',
                    '과학/공학',
                    '예술',
                    '취미/생활',
                    '국방/군사/경찰',
                ],
                lecture_count:[]
            }
        },
        mounted() {
            let search_url;
            if (this.search_option === 'select'){
                search_url = 'unique';
            }
            else{
                search_url = 'search';
            }
            for (let i=0;i<this.categories.length; i++){
                axios.get('lectures/'+search_url+'/?category='+this.categories[i])
                    .then((response)=>{
                        this.lecture_count.push({category: this.categories[i], count: response.data.count});
                    })
            }
        },
        methods:{
            push_layer(category){
                this.bus.$emit('category_to_subcategory', category);
            }
        }
    }
</script>

<style scoped>
    #SelectSearchTabWrap{
        margin: 0 auto;
        height: 100%;
        width: 100%;
        overflow-y: scroll;
    }
    .CategoryWrap{
        display: inline-block;
        width: 100%;
        height: 45px;
        border-bottom: 1px solid rgb(221, 221, 221);
    }
    .CategoryWrap:hover{
        background-color: rgb(244, 244, 244);
        cursor: pointer;
    }
    .CategoryName{
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
    .CategoryCount{
        float: right;
        margin-right: 10px;
        display: inline-block;
        font-size: 12px;
        font-weight: bolder;
        color: rgb(128, 128, 128);
        margin-top: 15px;
    }
</style>