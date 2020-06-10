<template>
    <v-card light>
                <v-card-title
                    class="headline grey lighten-2"
                >
                <span>Article information</span><span style="font-size:0.75em;margin-left:5px"> - {{artInfo}}</span>
                </v-card-title>           
                <v-card-text class="mt-2">
        <div class="parts-info" v-for="(item, index) in partsDetail" :key="index">
            <h5 class="info-title" v-if="showTitle(item, index)">{{index}}</h5>
            <div class="assigned-art" v-if="index === 'oenNumbers'">
                <span class="attr-text">{{setArrayJoin(item.array,index)}}</span>
            </div>
            <div class="assigned-art" v-else-if="index === 'usageNumbers2'">
                <span class="attr-text">{{setArrayJoin(item.array,index)}}</span>
            </div>
            <div class="assigned-art" v-else-if="index ==='assignedArticle'">
                <span class="attr-name">{{item.articleName}}</span>
                <span class="attr-text">{{item.articleNo}}</span>
            </div>
            <div v-else>
                <ul v-for="(item2, index2) in item.array" :key="index2">                        
                    <li v-if="index === 'articleAttributes'">
                        <div style="display:flex;">
                            <div class="attr-name">{{item2.attrName}}</div>
                            <div class="attr-text">{{item2.attrValue}} {{item2.attrUnit}}</div>                                
                        </div>                            
                    </li>
                    <li v-else-if="index === 'articleDocuments' && item2.docFileTypeName ==='URL'">
                        <div class="attr-text" v-if="item2.docFileTypeName ==='URL'" >
                            <a :href="item2.docUrl" target="_blank">{{item2.docTypeName}}</a>
                        </div>
                        <!--<div class="attr-text" v-else>{{item2.docFileName}}</div>-->
                    </li>
                    <li v-else-if="index === 'articleInfo'">
                        <div style="display:flex;">
                            <!--<div class="attr-name" >{{item2.infoTypeName}}</div>-->
                            <div class="attr-text" v-html="item2.infoText"></div>
                        </div>
                    </li>
                    <li v-else-if="index === 'articleThumbnails'">
                        <div class="attr-text">{{item2.thumbFileName}}</div>
                    </li>
                    <li v-else-if="index === 'eanNumber'">
                        <div class="attr-text">{{item2.eanNumber}}</div>
                    </li>
                    <li v-else-if="index === 'immediateAttributs'">
                        <div style="display:flex;">
                            <div class="attr-name">{{item2.attrName}}</div>
                            <div class="attr-text">{{item2.attrValue}} {{item2.attrUnit}}</div>                             
                        </div> 
                    </li>
                    <li v-else-if="index === 'immediateInfo'">
                        <div class="attr-text">{{item2.infoText}}</div>
                    </li>
                    <li v-else-if="index === 'mainArticle'">
                        <div style="display:flex;">
                            <div class="attr-name">{{item2.articleName}}</div>
                            <div class="attr-text">{{item2.articleNumber}}</div>                             
                        </div> 
                    </li>                        
                    <li v-else-if="index === 'usageNumbers2'">
                        <div class="attr-text">{{item2.usageNumber}}</div>
                    </li>
                    <li v-else-if="index === 'oenNumbers'">
                       <div class="attr-text">{{item2.oeNumber}}</div>
                    </li>
                    <li v-else-if="index === 'replacedNumber'">
                       <div class="attr-text">{{item2.replaceNumber}}</div>
                    </li>
                    <!--<li v-else>                            
                    </li>-->
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
            </v-card>
</template>

<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
<script>
    const tecdocUrl = "https://webservice.tecalliance.services/pegasus-3-0/services/TecdocToCatDLB.jsonEndpoint?js";
    const tecApiKey = '2BeBXg6CxtgP7fnQvXr45SzqpEVDcDTGSJd1viDM6VHGJ7bxjDy5';
    const tecProvider = 22261;

    export default {
        name: 'TEC-PARTSINFO',
        data(){
            return{
                partsInfo :{},
                tecTypeId : '',
                partsDetail: [],
                artInfo: '',
            }
        },
        props:['PartsInfo', 'TecTypeID'],
        created(){
            this.$EventBus.$on('RMI-PARTSINFO.InitData', data => {
                this.InitData(data);
            });	
        },
        mounted(){
            console.log(this.partsInfo);
            this.partsInfo = this.PartsInfo;
            this.tecTypeId = this.TecTypeID;
            this.getPartsDetail();
        },
        methods:{
            InitData(data){
                this.partsInfo = data.PartsInfo;
                this.tecTypeId = data.TecTypeId;
                this.getPartsDetail();
            },
            getPartsDetail(){
                this.partsDetail = [];
                this.artInfo = this.partsInfo.brandName + " / " + this.partsInfo.articleNo;
                let params = {
                    "getAssignedArticlesByIds6": {
                        "articleCountry": "kr",
                        "articleIdPairs": {
                        "array": [
                                {
                                "articleId": this.partsInfo.articleId,
                                "articleLinkId": this.partsInfo.articleLinkId
                                }
                            ]
                        },
                        "attributs": true,
                        "basicData": true,
                        "documents": true,
                        "eanNumbers": true,
                        "immediateAttributs": false,
                        "immediateInfo": true,
                        "info": true,
                        "lang": "en",
                        "linkingTargetId": this.tecTypeId,
                        "linkingTargetType": "P",
                        "mainArticles": true,
                        "manuId": 0,
                        "modId": 0,
                        "normalAustauschPrice": true,
                        "oeNumbers": true,
                        "provider": tecProvider,
                        "replacedByNumbers": true,
                        "replacedNumbers": true,
                        "thumbnails": false,
                        "usageNumbers": true
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
                    this.partsDetail = JSON.parse(xmlHttp.responseText).data.array[0];
                    //console.log('result :',this.partsDetail);
				}
            },
            showTitle(value,text)
            {
                if(value !== ''){
                    if(text === 'articleDocuments'){
                        var urlCount =  value.array.filter(x => x.docFileTypeName ==='URL').length;
                        if(urlCount > 0){
                            return true;
                        }
                        else{
                            return false;
                        }
                    }
                    else{
                        return true;
                    }
                }
                else{
                    return false;
                }
            },
            setArrayJoin(value ,target)
            {   
                if(value !== undefined){
                    var list = ''; 

                    switch (target) {
                        case 'oenNumbers':
                            list = Array.from(new Set(value.map(x=> x.oeNumber))).join(', ');
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
            }
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
</style>