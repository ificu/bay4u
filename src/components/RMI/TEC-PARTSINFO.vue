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

    const imgUrl = "https://webservice.tecalliance.services/pegasus-3-0/documents/"

    export default {
        name: 'TEC-PARTSINFO',
        data(){
            return{
                partsInfo :{},
                tecTypeId : '',
                artInfo: '',
                criteriaList : [],
                partsDetail: [],
                itemImage:''
            }
        },
        props:['PartsInfo', 'TecTypeID'],
        created(){
            this.$EventBus.$on('RMI-PARTSINFO.InitData', data => {
                console.log('partsInfo:' , data);
                this.InitData(data);
            });	
        },
        mounted(){
            console.log('partsInfo:' , this.PartsInfo);
            this.partsInfo = this.PartsInfo;
            this.tecTypeId = this.TecTypeID;
            this.setPartsInfo();
            //this.getPartsDetail();
        },
        methods:{
            InitData(data){
                this.partsInfo = data.PartsInfo;
                this.tecTypeId = data.TecTypeId;
                this.setPartsInfo();
                //this.getPartsDetail();
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
                console.log('criteriaList : ', this.criteriaList);
            },
            getPartsDetail(){

                console.log('this.partsInfo.array :', this.partsInfo.array);
                this.partsDetail = [];
                this.artInfo = this.partsInfo.brandName + " / " + this.partsInfo.articleNo;
                let params = {
                    "getAssignedArticlesByIds6": {
                        "articleCountry": "kr",
                        "articleIdPairs": {
                        "array":   this.partsInfo.array
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
                    console.log('result :',this.partsDetail);
				}
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
</style>