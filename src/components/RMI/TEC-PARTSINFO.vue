<template>
    <v-card light>
        <v-card-title
            class="headline grey lighten-2"
        >
        <span>Article information</span><span style="font-size:0.75em;margin-left:5px"> - {{artInfo}}</span>
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
                <div v-if=" partsInfo.images !== undefined && partsInfo.images.length > 0">
                    <v-carousel hide-delimiters>
                        <v-carousel-item
                            v-for="(item,i) in partsInfo.images"
                            :key="i"
                            :src="item.imageURL400"
                        ></v-carousel-item>
                    </v-carousel>
                </div>
                <!--oemNumbers-->
                <div v-if="partsInfo.oemNumbers !== undefined && partsInfo.oemNumbers.length > 0">
                    <h5>oemNumbers</h5>
                    <div style="margin-left:20px">
                        <span class="attr-text">{{setArrayJoin(partsInfo.oemNumbers,'oenNumbers')}}</span>
                    </div>
                </div>
                <!--articleText-->
                <div v-if="partsInfo.articleText !== undefined && partsInfo.articleText.length > 0">
                    <h5>articleText</h5>
                    <ul v-for="(item, index) in partsInfo.articleText" :key="index">
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
        <v-divider></v-divider>
        <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
                color="primary"
                text
                @click="$emit('close')"
            >
            close
            </v-btn>
        </v-card-actions>
        <Progress v-if="isLoaded"></Progress>
    </v-card>
</template>

<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
<script>
    import {division,arrayGroupBy} from '@/utils/common.js'
    import Progress from '@/components/Common/Progress.vue'

    const axios = require('axios').default;
    const tecdocUrl = "https://webservice.tecalliance.services/pegasus-3-0/services/TecdocToCatDLB.jsonEndpoint?js";
    const tecApiKey = '2BeBXg6CxtgP7fnQvXr45SzqpEVDcDTGSJd1viDM6VHGJ7bxjDy5';
    const tecProvider = 22261;

    export default {
        name: 'TEC-PARTSINFO',
        data(){
            return{
                jsonHeader: { 'Accept': 'application/json', 'Content-Type': 'application/json;charset=UTF-8', 'x-api-key': tecApiKey },
                partsInfo :{},
                artInfo: '',
                articleId: '',
                criteriaList : [],
                partsDetail: [],
                itemImage:'',
                linkedCars: [],
                isLoaded: false
            }
        },
        props:['PartsInfo'],
        components: {
			Progress
		},
        created(){
            this.$EventBus.$on('RMI-PARTSINFO.InitData', data => {
                console.log('partsInfo1:' , data);
                this.InitData(data);
            });	
            //console.log('PartsInfo :',this.PartsInfo);
        },
        beforeDestroy(){
            this.$EventBus.$off('RMI-PARTSINFO.InitData');
        },
        mounted(){
            //console.log('partsInfo2:' , this.PartsInfo);
            this.partsInfo = this.PartsInfo.PartsInfo;
            this.articleId = this.PartsInfo.articleId
            this.setPartsInfo();
            this.getLinkedArticles();
        },
        methods:{
            InitData(data){
                this.partsInfo = data.PartsInfo;
                this.articleId = data.articleId;
                this.setPartsInfo();
                this.getLinkedArticles();
            },
            setPartsInfo()
            {
                this.artInfo = this.partsInfo.mfrName + " / " + this.partsInfo.articleNumber;
                var articleList = this.partsInfo.articleCriteria.map(function(item){
                    var obj = {};
                    obj.criteriaId = item.criteriaId;
                    obj.rawValue = item.rawValue;
                    obj.criteriaDescription = item.criteriaDescription;
                    obj.formattedValue = item.formattedValue;
                    return obj;
                });
                var linkageList = this.partsInfo.linkages
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
                this.criteriaList = articleList.concat(linkageList);
                this.criteriaList.sort(function(a,b){
                    return a.criteriaId > b.criteriaId ? 1:-1;
                });
                //console.log('criteriaList : ', this.criteriaList);
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
            getArticleId()
            {
                var aticelId = '';

                let params = {
                    "getArticleDirectSearchAllNumbersWithState": {
                        "articleCountry": "kr",
                        "articleNumber": this.partsInfo.articleNumber,
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
                        aticelId = result[0].articleId;
                    }
                }
                return aticelId;
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
        }
    }
</script>

<style scoped>
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
    }
    .vehicles-detail li{
        margin-left: 10px;
    }
    .vehicles-detail li:last-child{
        margin-left: 10px;
        border: 0px;
    }
</style>