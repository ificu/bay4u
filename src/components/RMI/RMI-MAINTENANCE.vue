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
					<span class="font-weight-bold" style="color:#fddca9; font-size:15px;" >정기 점검 항목</span>
                    </v-card>
                </v-col>
            </v-row>
            <v-row 
                class="pa-2 mt-4 ml-0 mr-0 mainform"
            >
                <v-col   cols="12"
                    sm="12">
                    <v-card
                        class="pa-2"
                        outlined
                        tile
						id = "RMIContents"
                    >
                        <v-card-title class="pa-2 card-title">Main service jobs</v-card-title>
                        <v-treeview
                            dense
                            light
                            :items="itemMainLists"
                            class="tree-contents"
                            open-on-click
                            selectable
                            selected-color="red"
                            v-model="mainJobs"
                            @input="getParts"
                        ></v-treeview>
                    </v-card>
                    <v-card
                        class="pa-2"
                        outlined
                        tile
                        id = "RMIContents"
                    >   
                        <v-card-title  class="pa-2 card-title">Additional service jobs</v-card-title>
                        <v-treeview
                            dense
                            light
                            :items="itemAddLists"
                            class="tree-contents"
                            open-on-click
                            selectable
                            selected-color="red"
                            v-model="addJobs"
                            @input="getParts"
                        ></v-treeview>
                    </v-card>
                </v-col  >
                <!--<v-divider light></v-divider>-->
                <v-col
                    cols="12"
                    sm="12"
                >
                    <template >
                        <v-card
                            class="pa-2"
                            outlined
                            tile
                            id = "RMIContents"
                        >
                            <v-card-title  class="pa-2 card-title">Parts</v-card-title>
                            <v-expansion-panels
                            multiple
                            light
                            flat
                            >
                            <v-expansion-panel  v-for="(item, index) in parts"
                                    :key="index">
                                <v-expansion-panel-header>{{ item[0].genericArticleName }}</v-expansion-panel-header>
                                <v-expansion-panel-content>
                                    <ul>
                                        <li  v-for="(part, i) in item"
                                            :key="i">
                                            <div class="brand-name">{{ part.brandName }}</div>
                                            <div class="item-code">{{ part.articleNo }}</div>
                                            <div class="item-detail">
                                                <v-btn icon x-small @click="getPartsImage(part)">
                                                    <v-icon>far fa-image</v-icon>
                                                </v-btn>
                                            </div>
                                            <div class="item-detail">
                                                <v-btn icon x-small @click="getPartsDetail(part)">
                                                    <v-icon>fas fa-info-circle</v-icon>
                                                </v-btn>
                                            </div>
                                        </li>
                                    </ul>
                                </v-expansion-panel-content>
                            </v-expansion-panel>
                            </v-expansion-panels>
                        </v-card>
                    </template>
                </v-col>
            </v-row>    
        </v-container>
        <BackToTop></BackToTop>
        <!--부품이미지-->
        <v-dialog v-model="imgDialog"  width="600px">
            <v-card light>
                <v-card-title class="headline grey lighten-2">
                    <span style="font-size:0.8em">{{pickArtinf}}</span>
                </v-card-title>           
                <v-card-text class="mt-2">
                    <img :src="imgUrl" class="parts-image">
                </v-card-text>
                <v-divider></v-divider>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn
                    color="primary"
                    text
                    @click="imgDialog = false"
                    >
                    close
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
        <!--부품상세 정보-->
        <v-dialog v-model="dialog"  width="600px">
            <v-card light>
            <v-card-title
                class="headline grey lighten-2"
            >
            <span>Article information</span><span style="font-size:0.75em;margin-left:5px"> - {{pickArtinf}}</span>
            </v-card-title>
           
            <v-card-text class="mt-2">
                <div class="parts-info" v-for="(item, index) in partsDetail" :key="index">
                    <h5 class="info-title" v-if="item !== ''">{{index}}</h5>
                    <div class="assigned-art" v-if="index === 'oenNumbers'">
                        <span class="attr-text">{{setArrayJoin(item.array)}}</span>
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
                            <li v-else-if="index === 'articleDocuments'">
                                <div class="attr-text">{{item2.docFileName}}</div>
                            </li>
                            <li v-else-if="index === 'articleInfo'">
                                <div style="display:flex;">
                                    <div class="attr-name" >{{item2.infoTypeName}}</div>
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
                            <li v-else>
                                <div class="attr-text">{{item2.oeNumber}}</div>
                                <div class="attr-text">{{item2.replaceNumber}}</div>                                
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
            @click="dialog = false"
            >
            close
            </v-btn>
            </v-card-actions>
            </v-card>
        </v-dialog>
    </v-content>
</template>

<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
<script>
    import {arrayGroupBy} from '@/utils/common.js'
    import BackToTop from '@/components/Common/BackToTop.vue'

    const url = "https://rmi-services.tecalliance.net/rest/Maintenance";
    const basketUrl = "https://rmi-services.tecalliance.net/rest/Prices";
    const tecdocUrl = "https://webservice.tecalliance.services/pegasus-3-0/services/TecdocToCatDLB.jsonEndpoint?js";
    const tecApiKey = '2BeBXg6CxtgP7fnQvXr45SzqpEVDcDTGSJd1viDM6VHGJ7bxjDy5';
    const tecProvider = 22261;
    
	export default {
		name: 'RMI-MAINTENANCE',
		data(){
			return{
                qualColId: '',
                itemMainLists:[],
                itemAddLists:[],
				rmiAuthKey: '',	
                carTypeId: '',
				carTcdTypeId: '',
                mainJobs: [],
                addJobs: [],
                genArtNoList: [],
                parts: [],
                partsDetail: [],
                imgDialog: false,
                imgUrl: '',
                dialog: false,
                pickArtinf: '',
			}
		},
		components: {
            BackToTop
		},
		created () {
			this.$EventBus.$on('RMI-MAINTENANCE.InitData', param => {  
                this.rmiAuthKey = param.rmiAuthKey;
				this.carTypeId = param.carTypeId; 
				this.carTcdTypeId = param.carTcdTypeId; 
                this.initAuthKey();
                this.initBodiesForMaintenance();
                this.setWorks();
            });
        },	
        updated(){
            var rootNode = document.getElementsByClassName('v-treeview-node__root');
            rootNode.forEach(element => {
                if(element.childNodes.length > 2){
                    element.childNodes[1].style.display = "none";
                }
            });
        },
		methods: {
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
            initBodiesForMaintenance()
            {
                if(this.carTypeId !== undefined && this.carTypeId !== '' ) {
					
					let languageCode = 'en',
						countryCode = 'kr',
						typeId = this.carTypeId;		
						
					// Build url query string
					let query = '?languageCode=' + languageCode
						+ '&countryCode=' + countryCode
						+ '&typeId=' + typeId	
					
					// Send HTTP request
					let xmlHttp = new XMLHttpRequest();
					xmlHttp.open( 'GET', url + '/BodiesForMaintenance' + query, false );
					xmlHttp.setRequestHeader( 'Content-type', 'application/json;charset=UTF-8' );
					xmlHttp.setRequestHeader( 'Accept', 'application/json' );
					xmlHttp.setRequestHeader( 'Authorization', this.rmiAuthKey );
					xmlHttp.send( null );
					
					// Handle HTTP response
					if(xmlHttp.status == 200) {
                        var result = JSON.parse(xmlHttp.responseText);
                        if(result.length > 0){
                            this.qualColId = result[0].QualColId;
                            console.log('initBodiesForMaintenance 리턴 : ', this.qualColId);
                        }
                        else{
                            this.itemMainLists = [];
                            this.itemAddLists = [];
                        }
					}
				} 
            },
			setWorks() {

                this.itemMainLists = [];
                this.itemAddLists = [];

                this.mainJobs = [];
                this.addJobs = [];
                this.genArtNoList = [];
                this.parts =[];

                let bodyQualColId = this.qualColId,
                    countryCode = 'kr',
					languageCode = 'en',
					typeId = this.carTypeId;
                
                // Build url query string
                let query = '?bodyQualColId='+ bodyQualColId
                    + '&countryCode=' + countryCode
					+ '&languageCode=' + languageCode
					+ '&typeId=' + typeId	
					
				// Send HTTP request
				let xmlHttp = new XMLHttpRequest();
				xmlHttp.open( 'GET', url + '/Works' + query, false );
				xmlHttp.setRequestHeader( 'Content-type', 'application/json;charset=UTF-8' );
				xmlHttp.setRequestHeader( 'Accept', 'application/json' );
				xmlHttp.setRequestHeader( 'Authorization', this.rmiAuthKey );
				xmlHttp.send( null );
				// Handle HTTP response
				if(xmlHttp.status == 200) {
                    //console.log('리턴 : ', JSON.parse(xmlHttp.responseText));
                    
                    var result = JSON.parse(xmlHttp.responseText);
                    var serviceList = result.Services;
                    var additionalWorksList = result.AdditionalWorks;

                    console.log('serviceList : ', serviceList);
                    console.log('additionalWorksList : ', additionalWorksList);

                    this.$nextTick(function(){
                        this.itemMainLists = serviceList.map(function(obj){
                            var mainObj = {};
                            mainObj.id = obj.ItemMpId;
                            mainObj.name = obj.ItemMpText;
                            mainObj.children = obj.WorkSteps.map( s => ({id:s.WorkId , name:s.WorkText}) );;
                            return mainObj;
                        });

                        var mainGenArtNo = this.getItemMpId(this.itemMainLists,'MAIN');

                        this.itemAddLists = additionalWorksList.map(function(obj){
                            var mainObj = {};
                            mainObj.id = obj.ItemMpId;
                            
                            if(obj.AddText.length !== 0)
                                mainObj.name = obj.ItemMpText +  " ["+ obj.AddText+"]";
                            else 
                            mainObj.name = obj.ItemMpText;

                            mainObj.children = obj.WorkSteps.map( s => ({id:s.WorkId , name:s.WorkText}) );;
                            return mainObj;
                        });

                        var subGenArtNo = this.getItemMpId(this.itemAddLists,'SUB');

                        this.genArtNoList = mainGenArtNo.concat(subGenArtNo);
                        console.log('genArtNoList : ', this.genArtNoList);
                    });
				} 
            },
            getGenArtNo(data){

                let result = [];
                let params = {
					ItemMpIds: data
				};
                
                // Send HTTP request
                let xmlHttp = new XMLHttpRequest();
                xmlHttp.open( 'POST', basketUrl + '/GenArtsForItemMpIds', false );
                xmlHttp.setRequestHeader( 'Content-type', 'application/json;charset=UTF-8' );
				xmlHttp.setRequestHeader( 'Accept', 'application/json' );
				xmlHttp.setRequestHeader( 'Authorization', this.rmiAuthKey );
                xmlHttp.send( JSON.stringify( params ) );

                // Handle HTTP response
                if(xmlHttp.status == 200) {
                    result = JSON.parse(xmlHttp.responseText);
                }

                return result;
            },
            getItemMpId(data , target)
            {
                var itemList = [];
                var workList = [];
                data.forEach(element => {
                    element.children.forEach(subElement => {
                        workList.push(subElement.id);
                    });
                });

                var params = {
					SelectedWorkIds: workList,
                    CountryCode: "kr",
                    LanguageCode: "en",
                    TypeId: this.carTypeId,
                    ShowPaint: false
				};
                
                // Send HTTP request
                var xmlHttp = new XMLHttpRequest();
                xmlHttp.open( 'POST', basketUrl + '/PartsForWorks', false );
                xmlHttp.setRequestHeader( 'Content-type', 'application/json;charset=UTF-8' );
				xmlHttp.setRequestHeader( 'Accept', 'application/json' );
				xmlHttp.setRequestHeader( 'Authorization', this.rmiAuthKey );
                xmlHttp.send( JSON.stringify( params ) );

                // Handle HTTP response
                if(xmlHttp.status == 200) {
                    
                    var result = JSON.parse(xmlHttp.responseText);
                    var itemMpIds = result.map(x => x.ItemMpId);
                    
                    var genArtNos = this.getGenArtNo(itemMpIds);
                    //console.log('genArtNos : ', genArtNos);

                    var itemList = result.map(function(obj){
                        var genartObj = {};
                        genartObj.WorkId = obj.WorkId;
                        genartObj.ItemMpId = obj.ItemMpId;
                        genartObj.ItemMpText = obj.ItemMpText;
                        genartObj.GenArtNo = genArtNos.filter(x => x.ItemMpId === obj.ItemMpId)[0].GenArtNo;
                        genartObj.Target = target;
                        return genartObj;
                    });
                }
                return itemList;
            },
            getParts(){
                //console.log('main jobs : ' ,this.mainJobs);
                //console.log('sub jobs : ' ,this.addJobs);
                this.parts = [];
                /// Main service jobs GenArtNo
                let mainWorks = this.mainJobs;
                let mainWorkGenArt = this.genArtNoList.filter(function(item){   
                    var y = false;
                    mainWorks.forEach(element => {
                       if(item.WorkId === element)
                        y = true;
                        return;
                    });
                    return y 
                });

                console.log('mainGenArt : ' ,mainWorkGenArt);

                let mainGenArts = [...new Set(mainWorkGenArt.map(it => it.GenArtNo))];

                /// Additional service jobs GenArtNo
                let addWorks = this.addJobs;
                let addWorkGenArt = this.genArtNoList.filter(function(item){   
                    var y = false;
                    addWorks.forEach(element => {
                       if(item.WorkId === element)
                        y = true;
                        return;
                    });
                    return y 
                });

                console.log('addWorkGenArt : ' ,addWorkGenArt);

                let addGenArts = [...new Set(addWorkGenArt.map(it => it.GenArtNo))];

                console.log('addGenArts : ' ,addGenArts);
                let selctedGenArts = mainGenArts.concat(addGenArts);

                console.log('selctedGenArts : ' ,selctedGenArts);
                if(selctedGenArts.length === 0)return;

                let brnads = [2, 4, 5, 6, 9, 10, 16, 21, 26, 30, 32, 33, 35, 43, 50, 52, 59, 67, 68, 75, 79, 83, 89, 95, 101, 123, 134, 144, 151, 154, 161, 162, 183, 192, 204, 205, 240, 245, 287, 327, 381, 4434, 6020, 6263, 6278, 6441];
				let params = {
					"getArticleIdsWithState": {
                    articleCountry: "kr",
                    "brandNo": {
                        "array": brnads
                    },
                    genericArticleId: {
                        "array": selctedGenArts
                        },
                        lang: "en",
                        linkingTargetId: this.carTcdTypeId,
                        linkingTargetType: "P",
                        provider: tecProvider
                    },
                    "sort": 2
				};

                //console.log('params :' ,params);
                // Send HTTP request
                let xmlHttp = new XMLHttpRequest();
				xmlHttp.open( 'POST', tecdocUrl, false );
				xmlHttp.setRequestHeader( 'Content-type', 'application/json;charset=UTF-8' );
                xmlHttp.setRequestHeader( 'Accept', 'application/json' );
                xmlHttp.setRequestHeader( 'x-api-key', tecApiKey);
				xmlHttp.send( JSON.stringify( params ) );

				// Handle HTTP response
				if(xmlHttp.status == 200) {
                    console.log('result2 :', JSON.parse(xmlHttp.responseText));
                    var result = JSON.parse(xmlHttp.responseText);
                    if(result.data !== ""){
                        this.parts = arrayGroupBy(result.data.array, function(item){
                            return [item.genericArticleId];
                        });
                    }
                    console.log('parts : ',  this.parts);
				}
            },
            getPartsImage(value){
                console.log('img:', value);
                this.imgUrl = '';
                this.pickArtinf = value.brandName + " / " + value.articleNo;
                let params = {
                    "getArticles": {
                        "articleCountry": "kr",
                        "provider": tecProvider,
                        "dataSupplierIds": value.brandNo,
                        "genericArticleIds": value.genericArticleId,
                        "linkageTargetId": this.carTcdTypeId,
                        "linkageTargetType": "P",
                        "lang": "en",
                        "includeImages": true
                    }
                };

                console.log('params :' ,params);
                // Send HTTP request
                let xmlHttp = new XMLHttpRequest();
				xmlHttp.open( 'POST', tecdocUrl, false );
				xmlHttp.setRequestHeader( 'Content-type', 'application/json;charset=UTF-8' );
                xmlHttp.setRequestHeader( 'Accept', 'application/json' );
                xmlHttp.setRequestHeader( 'x-api-key', tecApiKey);
				xmlHttp.send( JSON.stringify( params ) );

				// Handle HTTP response
				if(xmlHttp.status == 200) {
                    console.log('image :',JSON.parse(xmlHttp.responseText));
                    var result = JSON.parse(xmlHttp.responseText).articles[0];
                    if(result.images.length > 0){
                        this.imgDialog = true;
                        this.imgUrl = result.images[0].imageURL800;
                    }
                    else{
                        alert('상세 이미지가 없습니다.')
                    }
				}
            },
            getPartsDetail(value){
                this.partsDetail = [];
                this.pickArtinf = value.brandName + " / " + value.articleNo;
                let params = {
                    "getAssignedArticlesByIds6": {
                        "articleCountry": "kr",
                        "articleIdPairs": {
                        "array": [
                            {
                            "articleId": value.articleId,
                            "articleLinkId": value.articleLinkId
                            }
                        ]
                        },
                        "attributs": true,
                        "basicData": true,
                        "documents": true,
                        "eanNumbers": true,
                        "immediateAttributs": true,
                        "immediateInfo": true,
                        "info": true,
                        "lang": "en",
                        "linkingTargetId": this.carTcdTypeId,
                        "linkingTargetType": "P",
                        "mainArticles": true,
                        "manuId": 0,
                        "modId": 0,
                        "normalAustauschPrice": true,
                        "oeNumbers": true,
                        "provider": tecProvider,
                        "replacedByNumbers": true,
                        "replacedNumbers": true,
                        "thumbnails": true,
                        "usageNumbers": true
                    }
                };

                console.log('params :' ,params);
                // Send HTTP request
                let xmlHttp = new XMLHttpRequest();
				xmlHttp.open( 'POST', tecdocUrl, false );
				xmlHttp.setRequestHeader( 'Content-type', 'application/json;charset=UTF-8' );
                xmlHttp.setRequestHeader( 'Accept', 'application/json' );
                xmlHttp.setRequestHeader( 'x-api-key', tecApiKey);
				xmlHttp.send( JSON.stringify( params ) );

				// Handle HTTP response
				if(xmlHttp.status == 200) {
                    this.dialog = true;
                    this.partsDetail = JSON.parse(xmlHttp.responseText).data.array[0];
                    console.log('result :',this.partsDetail);
				}
            },
            setArrayJoin(value)
            {   
                var list = value.map(x=> x.oeNumber).join(', ');
                return list;
                console.log('array :', list);
            }
		},   		
	}
</script>

<style scoped>
.contents {
    background-color: #f9f9f9;
    color: black;
    font-size: 12px;
}
.contents .card-title{
    background-color: #37474F;
    color:white;
}
.contents .border {
    border: 2px dashed orange;
}
.contents .mainform {
    border: 5px solid #fddca9;;
}
.contents .tree-contents{
    background-color: white;
    color: black;
    font-size: 1.25em
}
.contents  ul {
    list-style-type: none;
}
.contents  li {
    display: flex;
    align-items:center;
    margin-bottom: 8px;
}
.contents .brand-name{
    margin-right: 10px;
    width:200px;
}
.contents .item-code{
    color: #01579B;
}
.contents .item-detail{
    margin-left: 10px;
    font-size: 0.3em;
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
.parts-info ul{
    list-style-type: none;
    margin: 2px;
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
#RMIContents {
	background-color: white; 
	color: black;
    border-radius: 5px;
}
</style>