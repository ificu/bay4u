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
					<span class="font-weight-bold" style="color:#fddca9; font-size:15px;" >부품번호 조회 ( OE / AM )</span>
                    </v-card>
                </v-col>
            </v-row>
            <v-row>
                <v-col cols="12">
                    <v-card class="textfield">
                        <v-row>
                            <v-col>
                            </v-col>
                            <v-col cols="12" sm="4" class="d-flex pa-0 searchForm">
                                <div style="width:110px;" class="ml-3 mr-2"> 
                                    <v-select
                                    v-model="itemType"
                                    :items="itemTypeList"
                                    item-text="text"
                                    item-value="value"
                                    label="구분"
                                ></v-select>
                                </div>
                                <div class="pa-3" style="width:300px;">
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
                        <li v-for="(item, i) in partsList"
                            :key="i">
                            <div class="brand-name">{{ item.brandName }}</div>
                            <div class="item-name">{{ item.articleName }}</div>
                            <div class="item-code">
                                {{ item.articleNo }}
                                <!--<span class="item-position">{{setCriteriaData(article)}}</span>-->
                            </div>
                            <div class="item-detail">
                                <v-btn icon x-small light @click="showPartsDetail(item)">
                                    <v-icon>fas fa-info-circle</v-icon>
                                </v-btn>
                            </div>
                        </li>
                    </v-card>
                </v-col>
            </v-row>         
         </v-container>
         <BackToTop></BackToTop>
		<!--부품상세 정보-->
        <v-dialog v-model="dialog"  width="700px">     
            <PartsInfo :PartsInfo="partsInfo"
			@close="dialog=false">
            </PartsInfo>               
        </v-dialog>
    </v-content>
</template>

<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
<script>
    import BackToTop from '@/components/Common/BackToTop.vue'
    import PartsInfo from '@/components/RMI/TEC-PARTSINFO.vue'

    const tecdocUrl = "https://webservice.tecalliance.services/pegasus-3-0/services/TecdocToCatDLB.jsonEndpoint?js";
    const tecApiKey = '2BeBXg6CxtgP7fnQvXr45SzqpEVDcDTGSJd1viDM6VHGJ7bxjDy5';
    const tecProvider = 22261;

    export default {
        name: 'RMI-OENUMBERS',
        data(){
            return{
                itemType : 1,
                itemTypeList : [{text:'OE번호', value:1},{text:'AM번호',value:0}],
                itemNo : '',
                partsList : [],
                partsInfo : {},
                dialog : false
            }
        },
        components: {
            BackToTop,
            PartsInfo
        },
        created(){
            this.itemType = 1;
            this.$EventBus.$on('RMI-OENUMBERS.InitData', param => {  
				this.rmiAuthKey = param.rmiAuthKey;
                this.carTypeId = param.carTypeId; 
                this.itemNo = '';
                this.partsList = [];
                this.partsInfo = {};
                this.initAuthKey();
			});
        },
        beforeDestroy(){
            this.$EventBus.$off('RMI-OENUMBERS.InitData');
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
                let brnads = [2, 4, 5, 6, 9, 10, 16, 21, 26, 30, 32, 33, 35, 43, 50, 52, 59, 67, 68, 75, 79, 83, 89, 95, 101, 123, 134, 144, 151, 154, 161, 162, 183, 192, 204, 205, 240, 245, 287, 327, 381, 4434, 6020, 6263, 6278, 6441];
                let params ={
                        "getArticleDirectSearchAllNumbersWithState": {
                            "articleCountry": "kr",
                            "articleNumber": this.itemNo,
                            "lang": "en",
                            "numberType": this.itemType,
                            "provider": 22261
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
                    console.log('getItemNo : ', JSON.parse(xmlHttp.responseText) );
                    var result = JSON.parse(xmlHttp.responseText).data.array;
                    result = result.filter(x => brnads.includes(x.brandNo));

                    // 중복체크
                    result = result.filter((item, idx) => {
                        return result.map(x => x.brandNo + x.articleNo).indexOf(item.brandNo + item.articleNo) === idx;
                    })

                    result.sort(function(a,b){
                        return a.genericArticleId + a.brandName > b.genericArticleId + b.brandName ? 1:-1;
                    });
                    this.partsList = result;
				}
            },
            showPartsDetail(value){
                let params ={
                    "getArticles": {
                        articleCountry: "kr",
                        provider: 22261,
                        searchQuery: value.articleNo,
                        searchType: 0,
                        dataSupplierIds: value.brandNo,
                        genericArticleIds: value.genericArticleId,
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
                    console.log('showPartsDetail : ', JSON.parse(xmlHttp.responseText) );
                    var result = JSON.parse(xmlHttp.responseText).articles[0];
                    var partsData = {};
                    partsData.PartsInfo = result;
                    partsData.articleId = value.articleId;
                    
                    this.partsInfo = partsData;
                    this.$EventBus.$emit('RMI-PARTSINFO.InitData',partsData);
                    this.dialog = true;
				}
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
.contents .brand-name{
    margin-right: 10px;
    width:200px;
}
.contents .item-name{
    margin-right: 15px;
}
.contents .item-code{
    color: #0D47A1;
	font-weight: bold;
}
.contents .item-detail{
    margin-left: 10px;
    font-size: 0.3em;
}
.contents .searchForm{
    background-color: gray;
    border-radius: 5px;
    height: 55px;
    margin: 8px 25px;
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