<template>
<v-app>
    <v-card light>
        <v-card-title class="headline grey lighten-2">
            <!--<span>Article information</span>-->
            <span class="articleTitle"> {{articleTitle}}</span>
        </v-card-title> 
        <v-card-text class="mt-2">
            <div class="parts-info">
                <!--articleCriteria-->
                <div>
                    <h5>articleCriteria</h5>
                    <ul v-for="(item, index) in criteriaList" :key="index">
                        <li>
                            <div class="attr-name">{{item.criteriaDescription}}</div>
                            <div class="attr-text">{{item.formattedValue}}</div>  
                        </li>
                    </ul>
                </div>
                <!--images-->
                <div v-if=" imageList !== undefined && imageList.length > 0">
                    <v-carousel 
                        hide-delimiters
                        height="250"> 
                        <v-carousel-item
                            v-for="(item,i) in imageList"
                            :key="i"
                        >
                        <v-img :src="item.imageURL800" class="pa-5"></v-img>
                        </v-carousel-item>
                    </v-carousel>
                </div>
                <!--oemNumbers-->
                <div v-if="oeNumberList !== undefined && oeNumberList.length > 0">
                    <h5>oemNumbers</h5>
                    <div style="margin-left:20px">
                        <span class="attr-text">{{setArrayJoin(oeNumberList,'oenNumbers')}}</span>
                    </div>
                </div>
                <!--articleText-->
                <div v-if="articleTextList !== undefined && articleTextList.length > 0">
                    <h5>articleText</h5>
                    <ul v-for="(item, index) in articleTextList" :key="index">
                        <li v-for="(subItem, subIndex) in item.text" :key="subIndex">
                            <div class="attr-name">{{subItem}}</div>
                        </li>
                    </ul>
                </div>
                <!--Vehicles-->
                <div v-if="linkedCars.length > 0">
                    <h5>Vehicles</h5>
                    <ul class="vehicles">
                        <li v-for="(item, index) in linkedCars" :key="index">
                            <div class="attr-name">{{item[0].manuDesc}} {{item[0].modelDesc}} </div>
                            <ul class="vehicles-detail">
                                <li  v-for="(subItem, subIndex) in item" :key="subIndex">
                                    <div class="attr-text">
                                        {{subItem.carDesc}} ({{subItem.powerHpTo}} hp)
                                         [ {{subItem.yearOfConstructionFrom}} ~ {{subItem.yearOfConstructionTo}} ]
                                    </div>
                                </li>
                            </ul>
                        </li>
                    </ul>
                </div>
            </div>
        </v-card-text>
    </v-card>
    <BackToTop></BackToTop>
    <Progress v-if="isLoaded"></Progress>
</v-app>
</template>

<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
<script>
    import {division,arrayGroupBy} from '@/utils/common.js'
    import BackToTop from '@/components/Common/BackToTop.vue'
    import Progress from '@/components/Common/Progress.vue'

    const axios = require('axios').default;
    const tecdocUrl = "https://webservice.tecalliance.services/pegasus-3-0/services/TecdocToCatDLB.jsonEndpoint?js";
    const tecApiKey = '2BeBXg6CxtgP7fnQvXr45SzqpEVDcDTGSJd1viDM6VHGJ7bxjDy5';
    const tecProvider = 22261;

    export default {
        name: 'ITEM',
        data(){
            return{
                jsonHeader: { 'Accept': 'application/json', 'Content-Type': 'application/json;charset=UTF-8', 'x-api-key': tecApiKey },
                articleNo: '',
                articleId: '',
                articleTitle: '',
                articleInfo :{},
                criteriaList : [],
                imageList : [],
                oeNumberList : [],
                articleTextList: [],
                linkedCars: [],
                isLoaded: false,
            }
        },
        components: {
            BackToTop,
			Progress
		},
        created(){
            this.$vuetify.theme.dark = true;
            this.$vuetify.theme.themes.dark.primary = '#aaa'
            this.articleNo = this.$route.query.ItemNo;
            this.getArticleInfo();
            this.getArticles();
            this.getLinkedArticles();

            console.log('articleNo:', this.articleNo);
            console.log('articleId:', this.articleId);
            console.log('articleInfo:',this.articleInfo);
        },
        methods:{
            getArticleInfo()
            {
                let params = {
                    "getArticleDirectSearchAllNumbersWithState": {
                        "articleCountry": "kr",
                        "articleNumber": this.articleNo,
                        "lang": "en",
                        "numberType": 0,
                        "provider": tecProvider,
                        "searchExact": true
                    }
                };

                // Send HTTP request
                let xmlHttp = new XMLHttpRequest();
                xmlHttp.open( 'POST', tecdocUrl, false );
                xmlHttp.setRequestHeader( 'Content-type', 'application/json;charset=UTF-8' );
                xmlHttp.setRequestHeader( 'Accept', 'application/json' );
                xmlHttp.setRequestHeader( 'x-api-key', tecApiKey);
                xmlHttp.send( JSON.stringify( params ) );
                // Handle HTTP response
                if(xmlHttp.status == 200) {
                    var result = JSON.parse(xmlHttp.responseText).data.array;
                    if(result.length > 0){
                        this.articleInfo = result[0];
                        this.articleTitle = result[0].brandName + " / " + this.articleNo;
                        this.articleId = result[0].articleId;
                    }
                }
            },
            getArticles(){
                let params ={
                    "getArticles": {
                        articleCountry: "kr",
                        provider: 22261,
                        searchQuery: this.articleInfo.articleNo,
                        searchType: 0,
                        dataSupplierIds: this.articleInfo.brandNo,
                        genericArticleIds: this.articleInfo.genericArticleId,
                        lang: "en",
                        perPage: 1000,
                        page: 1,
                        includeGenericArticles: true,
						includeArticleText: true,
						includeOEMNumbers: true,
						includeReplacesArticles: true,
						includeReplacedByArticles: true,
						includeArticleCriteria: true,
						includeLinkages: true,
						includeImages: true,
						includeLinks: true,
						includeTradeNumbers: true,
						includeCriteriaFacets: true
                    }
				}
		
                // Send HTTP request
                let xmlHttp = new XMLHttpRequest();
				xmlHttp.open( 'POST', tecdocUrl, false );
				xmlHttp.setRequestHeader( 'Content-type', 'application/json;charset=UTF-8' );
                xmlHttp.setRequestHeader( 'Accept', 'application/json' );
                xmlHttp.setRequestHeader( 'x-api-key', tecApiKey);
				xmlHttp.send( JSON.stringify( params ) );

				// Handle HTTP response
				if(xmlHttp.status == 200) {
                    //console.log('getArticles : ', JSON.parse(xmlHttp.responseText));
                    var result = JSON.parse(xmlHttp.responseText).articles;
                    console.log('result : ', result);
                    if(result.length > 0){
                        var articleList = result[0].articleCriteria.map(function(item){
                            var obj = {};
                            obj.criteriaId = item.criteriaId;
                            obj.rawValue = item.rawValue;
                            obj.criteriaDescription = item.criteriaDescription;
                            obj.formattedValue = item.formattedValue;
                            return obj;
                        });

                        var linkageList = result[0].linkages
                                .map(x=>x.linkageCriteria)
                                .reduce(function(pre,curr){
                                return pre.concat(curr);
                            },[]);
                            linkageList = linkageList.map(function(item){
                                var obj = {};
                                obj.criteriaId = item.criteriaId;
                                obj.rawValue = item.rawValue;
                                obj.criteriaDescription = item.criteriaDescription;
                                obj.formattedValue = item.formattedValue;
                                return obj;
                            });

                        articleList = articleList.concat(linkageList);

                        this.criteriaList = articleList;
                        this.criteriaList.sort(function(a,b){
                            return a.criteriaId > b.criteriaId ? 1:-1;
                        });

                        this.imageList = result[0].images;
                        console.log('imageList :',this.imageList);
                        this.oeNumberList = result[0].oemNumbers;
                        this.articleTextList = result[0].articleText;
                    }
				}
            },
            async getLinkedArticles(){

                console.log('articleId :', this.articleId);
                if(this.articleId === undefined){
                   this.articleId = await this.getArticleId();
                }

                this.linkedCars = [];

                let params = {
                    "getArticleLinkedAllLinkingTarget3": {
                        articleCountry: "kr",
                        articleId: this.articleId,
                        lang: "en",
                        linkingTargetType: "P",
                        provider: tecProvider,
                        withMainArticles: true
                    }
                };

                axios({
                    method: 'POST',
                    url: tecdocUrl,
                    headers: this.jsonHeader,
                    data: params
                })
                .then((result) => {
                    var resultData = result.data.data.array;
                    
                    if(resultData.length > 0 && resultData[0].articleLinkages !== ''){
                        resultData = resultData[0].articleLinkages.array.map(function(item){
                            var obj = {};
                            obj.articleLinkId = item.articleLinkId;
                            obj.linkingTargetId = item.linkingTargetId;
                            return obj;
                        });
                        this.isLoaded = true;
                        var self = this;
                        this.getLinkedCars(resultData, function(data){
                            self.isLoaded = false;
                            //console.log('linkedCars:', self.linkedCars);
                        });
                    }
                });
            },
            async getLinkedCars(data , callback)
            {
                var list = division(data,25);
                var linkedList  = [];

                 //list.forEach(element => {
                for(let element of list){
                    let params = {
                        "getArticleLinkedAllLinkingTargetsByIds3": {
                            articleCountry: "kr",
                            articleId: this.articleId,
                            lang: "en",
                            linkedArticlePairs: {
                                array: element
                            },
                            linkingTargetType: "P",
                            provider: tecProvider
                        }
                    };
                    await axios({
                        method: 'POST',
                        url: tecdocUrl,
                        headers: this.jsonHeader,
                        data: params
                    })
                    .then((result) => {
                        var resultData = result.data.data.array;
                        resultData = resultData.map(x => x.linkedVehicles.array);
                        resultData = resultData.reduce(function(pre,curr){
                            return pre.concat(curr);
                        },[]);
                    
                        linkedList = linkedList.concat(resultData);

                        // 중복체크
                        linkedList = linkedList.filter((item, idx) => {
                            return linkedList.map(x => x.manuId + '@' + x.modelId + '@' + x.carDesc + '@' + x.powerHpTo)
                                .indexOf(item.manuId + '@' + item.modelId + '@' + item.carDesc + '@' + item.powerHpTo) === idx;
                        });
                        
                        this.linkedCars = arrayGroupBy(linkedList , function(item){
                            return [item.manuId , item.modelId];
                        });
                    });
                };
                callback(linkedList);
            },
            setArrayJoin(value ,target)
            {   
                if(value !== undefined){
                    var list = ''; 

                    switch (target) {
                        case 'oenNumbers':
                            list = Array.from(new Set(value.map(x=> x.articleNumber))).join(', ');
                            break;
                        case 'usageNumbers2':
                            list = Array.from(new Set(value.map(x=> x.usageNumber))).join(', ');
                            break;
                        default:
                            break;
                    }
                    return list;
                }
                else{
                    return '';
                }
            },
        },
    }
</script>
<style scoped>
    .articleTitle{
        font-weight: bold;
    }
    .parts-image{
        width: auto; height: auto;
        max-width: 500px;
        max-height: 500px;
        display:block;
        margin-left: auto;
        margin-right: auto;
    }
    .info-title
    {
        padding-top: 5px;
        color: #616161;
    }
    .parts-info h5{
        color:black;
        margin-top: 5px;
    }
    .parts-info ul{
        list-style-type: none;
        margin: 2px;
    }
    .parts-info ul a{
        color:blue;
        text-decoration:underline;
    }
    .parts-info li{
        display: flex;
        border-bottom: #EEEEEE 1px solid;
    }
    .parts-info .attr-name{
        margin-right:20px;
        font-size: 0.9em;
        font-weight:500;
        color: #424242;
    }
    .parts-info .attr-text{
        font-size: 0.85em;
        color: #616161;
    }
    .parts-info .assigned-art{
        margin-left: 25px;
    }
    .vehicles li{
        display: block;
        font-size: 0.9em;
    }
    .vehicles-detail li{
        margin-left: 10px;
    }
    .vehicles-detail li:last-child{
        margin-left: 10px;
        border: 0px;
    }
</style>