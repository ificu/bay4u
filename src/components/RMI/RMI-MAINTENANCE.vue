<template>
    <v-content class="contents">
        <v-container>
            <v-row>
                <v-col cols="12" sm="12" >
                    <v-container class="pt-0 pb-1 pt-2 contentsTitle">
                        <v-row>
                            <v-col cols="12" sm="10">
                                <v-icon class="mx-4" style="color:#fddca9; font-size:18px;" >  mdi-arrange-send-backward </v-icon>
                                <span class="font-weight-bold" style="color:#fddca9; font-size:15px;" >정기 점검 항목</span>
                            </v-col>
                            <v-col cols="12" sm="2">
                                <v-select
                                    v-model="qualColId"
                                    :items="qualColLists"
                                    item-text="QualColText"
                                    item-value="QualColId"								
                                    label="Body 상세"
                                    outlined
                                    dense
                                    @change="setWorks"
                                    >
                                </v-select>
                            </v-col>
                        </v-row>
                    </v-container>
                </v-col>
            </v-row>
            <v-row 
                class="pa-0 mt-4 ml-0 mr-0 mainform"
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
                            @input="getPartsList"
                        >
                        <template slot="label" slot-scope="{ item }">
                            {{ item.name }} 
                            <v-btn icon x-small class="ml-2" v-if="item.children === undefined" @click="showCheckList(item, 'Main')">
                                <v-icon>mdi-wrench</v-icon>
                            </v-btn>
                        </template>
                        </v-treeview>
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
                            @input="getPartsList"
                        >
                        <template slot="label" slot-scope="{ item }">
                            {{ item.name }} 
                            <v-btn icon x-small class="ml-2" v-if="item.children === undefined"  @click="showCheckList(item, 'Additional')">
                                <v-icon>mdi-wrench</v-icon>
                            </v-btn>
                        </template>
                        </v-treeview>
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
                            <v-card-title class="pt-0 pb-0 card-title">
								<template>
									<v-row>
										<v-col class="pa-1 ml-2 mt-2">Parts</v-col>
                                        <v-col cols="12" sm="5" class="d-flex pa-0">
                                            <div style="width:110px;" class="mr-3"> 
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
                                                @keypress.enter="getPartsList"
                                                @click:append="getPartsList"
                                                @focus="$event.target.select()"
                                            ></v-text-field>
                                            </div> 
                                        </v-col>
									</v-row>
								</template>
							</v-card-title>
                            <v-expansion-panels
                            multiple
                            light
                            flat
                            >
                            <v-expansion-panel  v-for="(item, index) in parts"
                                    :key="index">
                                <v-expansion-panel-header>{{ item.genericArticleName }}</v-expansion-panel-header>
                                <v-expansion-panel-content>
                                    <ul>
                                        <li  v-for="(article, i) in item.array"
                                            :key="i">
                                            <div class="brand-name">{{ article.mfrName }}</div>
                                            <div class="item-code">
                                                {{ article.articleNumber }}
                                                <span class="item-position">{{setCriteriaData(article)}}</span>
                                            </div>

                                            <!--<div v-if="article.images.length > 0">
                                                <v-img class="grey lighten-3 mr-4 ml-4" v-bind:src="article.images[0].imageURL50"></v-img>
                                            </div>-->
                                            <div class="item-detail">
                                                <v-btn icon x-small @click="showPartsDetail(article)">
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
        <v-dialog v-model="imgDialog"  width="650px">
            <PartsImage 
			:PartsInfo="partsInfo"
			:TecTypeID="carTcdTypeId"
			@close="imgDialog=false"
			></PartsImage>
        </v-dialog>
        <!--부품상세 정보-->
        <v-dialog v-model="dialog"  width="700px">     
            <PartsInfo :PartsInfo="partsInfo"
			:TecTypeID="carTcdTypeId"
			@close="dialog=false">
            </PartsInfo>               
        </v-dialog>
        <!-- 체크리스트-->
        <v-dialog v-model="checkDialog"  width="1000px">
            <CheckList 
                :RmiAuthKey="rmiAuthKey" 
                :TypeID="carTypeId"
                :WorkId="workId"
                :QualColId="qualColId"
                :Target="checkTarget"
                @close="checkDialog=false"
            ></CheckList>      
        </v-dialog>
    </v-content>
</template>

<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
<script>
    import {arrayGroupBy} from '@/utils/common.js'
    import BackToTop from '@/components/Common/BackToTop.vue'
    import CheckList from '@/components/RMI/RMI-CHECKLIST.vue'
    import PartsInfo from '@/components/RMI/TEC-PARTSINFO.vue'
    import PartsImage from '@/components/RMI/TEC-PARTSIMG.vue'
    
    const url = "https://rmi-services.tecalliance.net/rest/Maintenance";
    const basketUrl = "https://rmi-services.tecalliance.net/rest/Prices";
    const tecdocUrl = "https://webservice.tecalliance.services/pegasus-3-0/services/TecdocToCatDLB.jsonEndpoint?js";
    const tecApiKey = '2BeBXg6CxtgP7fnQvXr45SzqpEVDcDTGSJd1viDM6VHGJ7bxjDy5';
    const tecProvider = 22261;
    
	export default {
		name: 'RMI-MAINTENANCE',
		data(){
			return{
                qualColLists: [],
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
                dialog: false,
                checkDialog: false,
                checkTarget:'',
                workId:'',
                partsInfo: {},
                imgDialog: false,
                itemNo : '',
                itemType : 1,
                itemTypeList : [{text:'OE번호', value:1},{text:'AM번호',value:0}],
			}
		},
		components: {
            BackToTop,
            CheckList,
            PartsInfo,
            PartsImage
		},
		created () {
			this.$EventBus.$on('RMI-MAINTENANCE.InitData', param => {  
                this.rmiAuthKey = param.rmiAuthKey;
				this.carTypeId = param.carTypeId; 
                this.carTcdTypeId = param.carTcdTypeId; 
                
                if(this.carTypeId === '' && this.carTcdTypeId === '')return;
                
                this.initAuthKey();
                this.setBodies();
                /*this.setWorks();*/
            });
        },
        beforeDestroy(){
            this.$EventBus.$off('RMI-MAINTENANCE.InitData');
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
            setBodies()
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
                        this.qualColLists = result;
                        
                        if(result.length > 0){

                            if(this.qualColLists.length == 1) {
                                this.qualColId = this.qualColLists[0].QualColId;
                                this.setWorks();
                                console.log('qualColId', this.qualColId);
                            }  
                            
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
                this.itemNo = '';

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
                    console.log('Works : ', JSON.parse(xmlHttp.responseText));
                    
                    var result = JSON.parse(xmlHttp.responseText);
                    var serviceList = result.Services;
                    var additionalWorksList = result.AdditionalWorks;

                    console.log('serviceList : ', serviceList);
                    console.log('additionalWorksList : ', additionalWorksList);

                    this.$nextTick(function(){
                        
                        // Main Service Jobs
                        this.itemMainLists = serviceList.map(function(obj){
                            var mainObj = {};
                            mainObj.id = obj.ItemMpId;
                            mainObj.name = obj.ItemMpText;
                            mainObj.children = obj.WorkSteps.map( s => ({id:s.WorkId , name:s.WorkText.replace(",", ".")}) );;
                            return mainObj;
                        });
                        var mainGenArtNo = this.getItemMpId(this.itemMainLists,'MAIN');

                        // Additional Service Jobs
                        this.itemAddLists = additionalWorksList.map(function(obj){
                            var mainObj = {};
                            mainObj.id = obj.ItemMpId;
                            
                            if(obj.AddText.length !== 0)
                                mainObj.name = obj.ItemMpText +  " ["+ obj.AddText+"]";
                            else 
                            mainObj.name = obj.ItemMpText;

                            mainObj.children = obj.WorkSteps.map( s => ({id:s.WorkId , name:s.WorkText.replace(",", ".")}) );;
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
                   // console.log('GenArtsForItemMpIds :',result);
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
                
                console.log('params : ', params);
                
                // Send HTTP request
                var xmlHttp = new XMLHttpRequest();
                xmlHttp.open( 'POST', basketUrl + '/PartsForWorks', false );
                xmlHttp.setRequestHeader( 'Content-type', 'application/json;charset=UTF-8');
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
                        genartObj.GenArtInfo = genArtNos.filter(x => x.ItemMpId === obj.ItemMpId);
                        genartObj.Target = target;
                        return genartObj;
                    });
                }
                return itemList;
            },
            async getPartsList(){
                
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

                //console.log('mainGenArt : ' ,mainWorkGenArt);

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

                //console.log('addWorkGenArt : ' ,addWorkGenArt);

                let selctedGenArts = mainWorkGenArt.concat(addWorkGenArt).map(x=>x.GenArtInfo).reduce(function(pre,crr){
                    return pre.concat(crr);
                },[]);

                console.log('selctedGenArts : ' ,selctedGenArts);

                if(selctedGenArts.length === 0)return;

                var list = await this.getParts(selctedGenArts);
                //console.log('list:',list.map(x => x.comparableNumbers));

                var genArtGroupList = arrayGroupBy(list, function(item){
                    return [item.genericArticleId];
                });

                this.parts = genArtGroupList.map(function(item){
                    var obj = {};
                    obj.genericArticleId = item[0].genericArticleId
                    obj.genericArticleName = item[0].genericArticleName
                    obj.array = item;
                    return obj;
                });
                console.log('parts:',this.parts)
            },
            getParts(data){
                
                let brnads = [2, 4, 5, 6, 9, 10, 16, 21, 26, 30, 32, 33, 35, 43, 50, 52, 59, 67, 68, 75, 79, 83, 89, 95, 101, 123, 134, 144, 151, 154, 161, 162, 183, 192, 204, 205, 240, 245, 287, 327, 381, 4434, 6020, 6263, 6278, 6441];
                let partsList = [];
                data.forEach(element => {
                    
                    let params = {
                        "getArticles": {
                            articleCountry: "kr",
                            provider: tecProvider,
                            genericArticleIds: element.GenArtNo,
                            criteriaFilters: {
                                criteriaId: element.GenCritNo,
                                rawValue: element.GenCritValue
                            },
                            linkageTargetId: this.carTcdTypeId,
                            linkageTargetType: "V",
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
                    };

                    if(this.itemNo !== ''){
						params.getArticles.searchQuery = this.itemNo;
						params.getArticles.searchType = this.itemType;
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
                        //console.log(JSON.parse(xmlHttp.responseText));
                        var result = JSON.parse(xmlHttp.responseText).articles;
                        result = result.filter(x => brnads.includes(x.dataSupplierId));
                        if(result.length > 0){
                            //console.log('result :', result);
                            result = result.map(function(item){
                                var obj = {};
                                obj = item;
                                obj.genericArticleId = item.genericArticles.map(y =>y.genericArticleId).join(',');
                                obj.genericArticleName = item.genericArticles.map(y =>y.genericArticleDescription).join(',');
                                return obj;
                            });                           
                            partsList = partsList.concat(result);
                        }
                    };
                });

                // 중복체크
                partsList = partsList.filter((item, idx) => {
                    return partsList.map(x => x.dataSupplierId + x.articleNumber).indexOf(item.dataSupplierId + item.articleNumber) === idx;
                })

                // 부품군+ 브랜드 정렬
                partsList.sort(function(a, b){
                    return (a.genericArticleId + a.mfrName  >  b.genericArticleId + b.mfrName) ? 1 : -1;
                });
                return partsList;
            },
            setCriteriaData(value)
            {
                var position = '';
                var articleList = value.articleCriteria.filter(x => x.criteriaId === 100);
                //console.log('articleList :', articleList);
                var linkageList = value.linkages.map(x=>x.linkageCriteria).reduce(function(pre,curr){
                                        return pre.concat(curr);
                                },[]).filter(x=>x.criteriaId === 100);
                //console.log('linkageList :', linkageList);
                var list = articleList.concat(linkageList);
                list = list.filter((item, idx) => {
                    return list.map(x => x.criteriaId).indexOf(item.criteriaId) === idx;
                })
                if(list.length > 0)
                position = list[0].formattedValue;

                return position;
            },
            showPartsImage(value){
                var partsData = {};
				partsData.PartsInfo = value;
				partsData.TecTypeId = this.carTcdTypeId;

				this.partsInfo = value;
                this.$EventBus.$emit('RMI-PARTSIMG.InitData',partsData);
                this.imgDialog = true;
            },
            showPartsDetail(value){
                var partsData = {};
				partsData.PartsInfo = value;
                partsData.TecTypeId = this.carTcdTypeId;
                
				this.partsInfo = partsData;
                this.$EventBus.$emit('RMI-PARTSINFO.InitData',partsData);
                this.dialog = true;
            },
            showCheckList(value , target)
            {   
                var checkData = {};
                checkData.RmiAuthKey = this.rmiAuthKey;
                checkData.QualColId = this.qualColId;
                checkData.TypeID = this.carTypeId;
                checkData.WorkId = value.id;
                checkData.Target = target;

                this.workId = value.id;
                this.checkTarget = target;
                this.$EventBus.$emit('RMI-CHECKLIST.InitData',checkData);
                this.checkDialog = true;
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
.contents .contentsTitle {
  background-color: #424242;
  font-size: 12px;
  height: 80px;
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
  /*  align-items:center;*/
    margin-bottom: 8px;
}
.contents .brand-name{
    margin-right: 10px;
    width:200px;
}
.contents .item-code{
    color: #0D47A1;
	font-weight: bold;
}
.contents .item-position{
    margin-left: 5px;
    color: #616161;
    font-size: 0.9em;
}
.contents .item-detail{
    margin-left: 10px;
    font-size: 0.3em;
}
#RMIContents {
	background-color: white; 
	color: black;
    border-radius: 5px;
}
</style>