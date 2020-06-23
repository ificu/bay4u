<template>
    <v-content class="contents">
         <v-container>
             <v-row>
                <v-col cols="12" sm="12" >
                    <v-card
                        class="pa-2"
                        outlined
                        tile
                    >
					<v-icon class="mx-4" style="color:#fddca9; font-size:18px;" >  mdi-arrange-send-backward </v-icon>
					<span class="font-weight-bold" style="color:#fddca9; font-size:15px;" >부품 적용차량 조회</span>
                    </v-card>
                </v-col>
            </v-row>
            <v-row>
                <v-col cols="12">
                    <v-card class="textfield">
                        <v-row>
                            <v-col>
                            </v-col>
                            <v-col cols="12" sm="4" class="d-flex pa-0">
                                <div style="width:110px;" class="mr-3"> 
                                    <v-select
                                    v-model="itemType"
                                    :items="itemTypeList"
                                    item-text="text"
                                    item-value="value"
                                    label="구분"
                                ></v-select>
                                </div>
                                <div class="pa-3 mr-5" style="width:300px;">
                                    <v-text-field
                                    label="부품번호"
                                    dense
                                    single-line
                                    append-icon="search"
                                    v-model="itemNo"
                                    @keypress.enter="getItemNo"
                                    @click:append="getItemNo"
                                    @focus="$event.target.select()"
                                ></v-text-field>
                                </div> 
                            </v-col>
                        </v-row>
                    </v-card>
                </v-col>
            </v-row>
            <v-row>
                <v-col
                    cols="12"
                    sm="12"
                >
                    <v-card
                        class="pa-4"
                        outlined
                        tile
						id = "RMIContents"
                    >
                        <ul>
                            <li v-for="(item, index) in linkedCars" :key="index">
                                <div class="attr-name">{{item.manuDesc}} </div>
                                <div class="attr-name">{{item.modelDesc}}</div>
                                <div class="attr-name">{{item.carDesc}} ({{item.powerHpTo}} hp)</div>
                                <div class="attr-name">[ {{item.yearOfConstructionFrom}} ~ {{item.yearOfConstructionTo}} ]</div>
                            </li>
                        </ul>
                    </v-card>
                </v-col>
            </v-row>         
         </v-container>
         <BackToTop></BackToTop>
         <Progress v-if="progress"></Progress>
    </v-content>
</template>

<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
<script>
    import {division} from '@/utils/common.js'
    import BackToTop from '@/components/Common/BackToTop.vue'
    import Progress from '@/components/Common/Progress.vue'

    const tecdocUrl = "https://webservice.tecalliance.services/pegasus-3-0/services/TecdocToCatDLB.jsonEndpoint?js";
    const tecApiKey = '2BeBXg6CxtgP7fnQvXr45SzqpEVDcDTGSJd1viDM6VHGJ7bxjDy5';
    const tecProvider = 22261;

    export default {
        name: 'RMI-VEHICLES',
        data(){
            return{
                itemType : 0,
                itemTypeList : [{text:'OE번호', value:1},{text:'AM번호',value:0}],
                itemNo : '',
                articleId : '',
                linkedCars : [],
                progress: false
            }
        },
        components: {
            BackToTop,
            Progress
        },
        created(){
            this.$EventBus.$on('RMI-VEHICLES.InitData', param => {  
				this.rmiAuthKey = param.rmiAuthKey;
                this.carTypeId = param.carTypeId; 
                this.itemNo = '';
                this.partsList = [];
                this.partsInfo = {};
                this.initAuthKey();
            });
        },
        beforeDestroy(){
            this.$EventBus.$off('RMI-VEHICLES.InitData');
        },
        methods:{
            initAuthKey() {
				let url = 'https://rmi-services.tecalliance.net/auth/login';
				let params = {
					Company: 'SK Network-South Korea_3303624',
					Account: 'rmi-ws_004553-1-KR',
					Password: 'SkCho123!'
				};

				// Send HTTP request
				let xmlHttp = new XMLHttpRequest();
				xmlHttp.open( 'POST', url, false );
				xmlHttp.setRequestHeader( 'Content-type', 'application/json;charset=UTF-8' );
				xmlHttp.setRequestHeader( 'Accept', 'application/json' );
				xmlHttp.send( JSON.stringify( params ) );

				// Handle HTTP response
				if(xmlHttp.status == 200) {
					this.rmiAuthKey = 'TecRMI ' + xmlHttp.getResponseHeader( 'X-AuthToken' );
				}
			},
            getItemNo()
            {
                this.linkedCars = [];
                let brnads = [2, 4, 5, 6, 9, 10, 16, 21, 26, 30, 32, 33, 35, 43, 50, 52, 59, 67, 68, 75, 79, 83, 89, 95, 101, 123, 134, 144, 151, 154, 161, 162, 183, 192, 204, 205, 240, 245, 287, 327, 381, 4434, 6020, 6263, 6278, 6441];
                let params ={
                        "getArticleDirectSearchAllNumbersWithState": {
                            "articleCountry": "kr",
                            "articleNumber": this.itemNo,
                            "lang": "en",
                            "numberType": this.itemType,
                            "searchExact": true,
                            "provider": 22261
                        }
				}

                this.progress = true;

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
                    console.log('result :',result);
                    if(result !== undefined && result.length > 0){
                        result = result.filter(x => brnads.includes(x.brandNo));

                        // 중복체크
                        result = result.filter((item, idx) => {
                            return result.map(x => x.brandNo + x.articleNo).indexOf(item.brandNo + item.articleNo) === idx;
                        })

                        this.articleId = result[0].articleId;
                        this.getLinkedArticles(result[0].articleId);
                    }
                }

                this.progress = false;
            },
            async getLinkedArticles(value){

                console.log('articleId :', this.articleId);

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
                    if(result.length > 0 && result[0].articleLinkages !== ''){
                        result = result[0].articleLinkages.array.map(function(item){
                            var obj = {};
                            obj.articleLinkId = item.articleLinkId;
                            obj.linkingTargetId = item.linkingTargetId;
                            return obj;
                        });

                        this.linkedCars = await this.getLinkedCars(result);
                        this.linkedCars = this.linkedCars.reduce(function(pre,curr){
                                return pre.concat(curr);
                        },[]);
                        console.log('linkedCars : ', this.linkedCars);
                    } 
				}
            },
            getLinkedCars(data)
            {
                var list = division(data,25);
                var linkedList  = [];

                list.forEach(element => {
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

                    // Send HTTP request
                    let xmlHttp = new XMLHttpRequest();
                    xmlHttp.open( 'POST', tecdocUrl, false );
                    xmlHttp.setRequestHeader( 'Content-type', 'application/json;charset=UTF-8' );
                    xmlHttp.setRequestHeader( 'Accept', 'application/json' );
                    xmlHttp.setRequestHeader( 'x-api-key', tecApiKey);
                    xmlHttp.send( JSON.stringify( params ) );
                    // Handle HTTP response
                    if(xmlHttp.status == 200) {
                        //console.log('getLinkedCars :',JSON.parse(xmlHttp.responseText));
                        var result = JSON.parse(xmlHttp.responseText).data.array;
                        result = result.map(x => x.linkedVehicles.array);
                        linkedList = linkedList.concat(result);
                    }
                });
                return linkedList;
            },
        }
    }
</script>

<style scoped>

.contents {
    background-color: #f9f9f9;
    color: black;
    font-size: 12px;
}
.contents .textfield {
  background-color: #666;
  font-size: 12px;
}
.contents ul {
    list-style-type: none;
}
.contents  li {
    display: flex;
    margin-bottom: 8px;
    font-size: 1.1em;
}
.contents .attr-name{
    margin-right:20px;
    font-size: 0.9em;
    font-weight:500;
}
#RMIContents {
	background-color: white; 
	color: black;
	border-style: solid;
	border-radius: 5px;
	border-width: thick;
	border-color: #fddca9;
    padding: 10px;
}
</style>