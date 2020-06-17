<template>
    <v-content class="contents">
        <v-container>
            <v-row>
                <v-col cols="12" sm="12" >
                  <!--  <v-card
                        class="pa-0"
                        outlined
                        tile
                    >--> 
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
                 <!--   </v-card>-->
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
                            @input="getParts"
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
                            @input="getParts"
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
                            <v-card-title  class="pa-2 card-title">Parts</v-card-title>
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
                                        <li  v-for="(part, i) in item.array"
                                            :key="i">
                                            <div class="brand-name">{{ part.brandName }}</div>
                                            <div class="item-code">{{ part.articleNo }}</div>
                                            <!--<div class="item-detail">
                                                <v-btn icon x-small @click="showPartsImage(part)">
                                                    <v-icon>far fa-image</v-icon>
                                                </v-btn>
                                            </div>-->
                                            <div class="item-detail">
                                                <v-btn icon x-small @click="showPartsDetail(part)">
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
        <v-dialog v-model="dialog"  width="600px">     
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
                        var genArtGroupList = arrayGroupBy(result.data.array, function(item){
                            return [item.genericArticleId];
						});
						
						this.parts = genArtGroupList.map(function(item){
							var obj = {};
							obj.genericArticleId = item[0].genericArticleId
							obj.genericArticleName = item[0].genericArticleName
							obj.array =  arrayGroupBy(item, function(subItem){
								return [subItem.brandNo , subItem.articleNo];
							}).map(function(artItem){
									var obj2 = {};
									obj2.articleNo = artItem[0].articleNo;
									obj2.brandName = artItem[0].brandName;
									obj2.brandNo = artItem[0].brandNo;
									obj2.array = artItem.map(function(subArtItem){
										var obj3 = {};
										obj3.articleId = subArtItem.articleId;
										obj3.articleLinkId = subArtItem.articleLinkId;
										return obj3;
									});
									return obj2;
								});
							return obj;
						});

                        console.log('partsList :', this.parts);
					}
				}
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

				this.partsInfo = value;
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
    color: #01579B;
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