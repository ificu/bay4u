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
					<span class="font-weight-bold" style="color:#fddca9; font-size:15px;" >표준 공임 시간</span>
                    </v-card>
                </v-col>
            </v-row>  			
            <v-row>
                <v-col cols="12" sm="4" >
					<v-card>
							<v-select
								class="pa-4 pb-0 pt-6 adjustSelect"
								v-model="mainGroupId"
								:items="mainGroupLists"
								item-text="MainGroupName"
								item-value="MainGroupId"								
								label="Main 그룹"
								outlined
								dense
								@change="changeMainGroup"
								>
							</v-select>
					</v-card>
                </v-col>
                <v-col cols="12" sm="4" >
					<v-card>
							<v-select
								class="pa-4 pb-0 pt-6 adjustSelect"
								v-model="subGroupId"
								:items="subGroupLists"
								item-text="SubGroupName"
								item-value="SubGroupId"	
								label="Sub 그룹"
								outlined
								dense
								@change="changeSubGroup"
								>
							</v-select>
					</v-card>
                </v-col>				
            </v-row>
            <v-row class="ma-0 mainform">
                <v-col
                    cols="12"
                    sm="12"
                >
                    <v-card
                        class="pa-2"
                        outlined
                        tile
						id = "RMIContents"
                    >
						<v-card
								class="pa-2"
								tile
								light
								outlined
								id="RMISubContents"							
							>
							<v-card-title class="pa-2 card-title">Repair Items</v-card-title>
							<v-card-text>
								<div class="pa-0 repair-tree">
									<v-treeview
										dense
										light
										:items="itemMpLists"
										class="tree-contents"
										open-on-click
										selectable
										selected-color="red"
										v-model="repairItem"
										@update:open="openNode"
										@input="getParts"
									>
									<!--<template slot="label" slot-scope="{ item }">
										{{ item.name }} 
										<v-btn icon x-small class="ml-2" v-if="item.children !== undefined"  @click="showCheckList(item)">
										<v-icon>mdi-wrench</v-icon>
										</v-btn>
									</template>-->
									</v-treeview>
								</div>
							</v-card-text>								
							</v-card>					
                    </v-card>
                </v-col>
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
        <v-dialog v-model="imgDialog"  width="650px">
            <v-card light>
                <v-card-title class="headline grey lighten-2">
                    <span style="font-size:0.8em">{{pickArtInfo}}</span>
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
                <span>Article information</span><span style="font-size:0.75em;margin-left:5px"> - {{pickArtInfo}}</span>
                </v-card-title>           
                <v-card-text class="mt-2">
                    <PartsInfo :ParsInfoData="partsDetail"></PartsInfo>                
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
		<!-- 체크리스트-->
        <v-dialog v-model="checkDialog"  width="750px">
            <CheckList 
                :RmiAuthKey="rmiAuthKey" 
                :TypeID="carTypeId"
                :ManualID="manualId"
                @close="checkDialog=false"
            ></CheckList>      
        </v-dialog>
    </v-content>
</template>

<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
<script>
    import {groupBy,arrayGroupBy} from '@/utils/common.js'
	import BackToTop from '@/components/Common/BackToTop.vue'
	import PartsInfo from '@/components/RMI/TEC-PARTSINFO.vue'
	import CheckList from '@/components/RMI/RMI-CHECKLIST.vue'

//	const axios = require('axios').default;
	const url = "https://rmi-services.tecalliance.net/rest/Times";
	const basketUrl = "https://rmi-services.tecalliance.net/rest/Prices";
	const tecdocUrl = "https://webservice.tecalliance.services/pegasus-3-0/services/TecdocToCatDLB.jsonEndpoint?js";
    const tecApiKey = '2BeBXg6CxtgP7fnQvXr45SzqpEVDcDTGSJd1viDM6VHGJ7bxjDy5';
    const tecProvider = 22261;

	export default {
		name: 'RMI-TIMES',
		data(){
			return{
                qualColId: '',
				mainGroupLists: [],
				subGroupLists: [],
				itemMpLists: [],
				mainGroupId: '',
				subGroupId: '',
				repairItem:[],
				rmiAuthKey: '',	
                carTypeId: '',	
				carTcdTypeId: '',
				groupList:[],
				genArtNoList: [],
				parts: [],
				partsDetail: [],
                imgDialog: false,
                imgUrl: '',
                dialog: false,
                pickArtInfo: '',
				checkDialog: false,
				manualId:''
			}
		},
		components: {
			BackToTop,
			PartsInfo,
			CheckList
		},
		created () {
			this.$EventBus.$on('RMI-TIMES.InitData', param => {  
				this.rmiAuthKey = param.rmiAuthKey;
				this.carTypeId = param.carTypeId; 
				this.carTcdTypeId = param.carTcdTypeId; 
                this.initAuthKey();
                this.initBodiesForTimes();
				this.setMainGroup();
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
			openNode(items){
				//console.log('openNode.length :',items);
				items.forEach(element => {
					var index =	this.itemMpLists.findIndex(x => x.id === element);
					//console.log('index :',index);
					if(index !== -1){
						var treeNodes = document.getElementsByClassName('v-treeview')[0];
						var rootNode = treeNodes.children[index].getElementsByClassName('v-treeview-node__root');
						//console.log('rootNode : ',  rootNode);
						rootNode.forEach(element => {
							if(element.childNodes.length > 2){
								element.childNodes[1].style.display = "none";
							}
						});
						this.$forceUpdate();
					}
				});
			},
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
            initBodiesForTimes()
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
					xmlHttp.open( 'GET', url + '/BodiesForTimes' + query, false );
					xmlHttp.setRequestHeader( 'Content-type', 'application/json;charset=UTF-8' );
					xmlHttp.setRequestHeader( 'Accept', 'application/json' );
					xmlHttp.setRequestHeader( 'Authorization', this.rmiAuthKey );
					xmlHttp.send( null );
					
					// Handle HTTP response
					if(xmlHttp.status == 200) {
						var result = JSON.parse(xmlHttp.responseText);
						if(result.length > 0){
                            this.qualColId = result[0].QualColId;
                            console.log('initBodiesForTimes 리턴 : ', this.qualColId);
                        }
                        else{
                            this.mainGroupLists = [];
							this.subGroupLists = [];
							this.itemMpLists = [];
                        }
					}
				} 
            },
			setMainGroup() {
				this.mainGroupLists = [];
				this.subGroupLists = [];
				this.itemMpLists = [];

				this.mainGroupId = '';
				this.subGroupId = '';
				
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
					xmlHttp.open( 'GET', url + '/WorkList' + query, false );
					xmlHttp.setRequestHeader( 'Content-type', 'application/json;charset=UTF-8' );
					xmlHttp.setRequestHeader( 'Accept', 'application/json' );
					xmlHttp.setRequestHeader( 'Authorization', this.rmiAuthKey );
					xmlHttp.send( null );
					
					// Handle HTTP response
					if(xmlHttp.status == 200) {
						console.log('setMainGroup 리턴 : ', JSON.parse(xmlHttp.responseText));
						this.mainGroupLists = JSON.parse(xmlHttp.responseText);
					}

				}       
			},
			changeMainGroup() {
				var selected = this.mainGroupId;
				this.itemMpLists = [];
				
				this.subGroupLists = this.mainGroupLists.reduce(function (pre, value) {
					if(value.MainGroupId === selected) {
						return [...pre, ...value.SubGroups];
					}
					else {
						return pre;
					}
                }, []);	
                
                console.log('changeMainGroup 리턴 : ', this.subGroupLists);
			},
			changeSubGroup() {

                let bodyQualColId = this.qualColId,
                    countryCode = 'kr',
					languageCode = 'en',
					typeId = this.carTypeId,
                    subGroupId = this.subGroupId;
                    
                // Build url query string
                let query = '?bodyQualColId='+ bodyQualColId
                    + '&countryCode=' + countryCode
					+ '&languageCode=' + languageCode
					+ '&typeId=' + typeId	
					+ '&subGroupId=' +subGroupId	
					
				// Send HTTP request
				let xmlHttp = new XMLHttpRequest();
				xmlHttp.open( 'GET', url + '/WorkStepsForSubgroup' + query, false );
				xmlHttp.setRequestHeader( 'Content-type', 'application/json;charset=UTF-8' );
				xmlHttp.setRequestHeader( 'Accept', 'application/json' );
				xmlHttp.setRequestHeader( 'Authorization', this.rmiAuthKey );
				xmlHttp.send( null );
				// Handle HTTP response
				if(xmlHttp.status == 200) {
                    console.log('리턴 : ', JSON.parse(xmlHttp.responseText));

                    var list = JSON.parse(xmlHttp.responseText);
                    this.itemMpLists = Object.values(groupBy(list, 'ItemMpId', 'ItemMpText')).map(function(obj){
						var rObj = {};
						rObj.id = obj.id;
						rObj.name = obj.name;
						rObj.children = Object.values(groupBy(obj, 'KorId', 'KorText')).map(function(subObj){
							var subItem = {};
							subItem.id = obj.id +'/'+ subObj.id;
							subItem.name = subObj.name;
							subItem.children = subObj.map(function(subObj2){
								var subItem2 = {};
								subItem2.id = subObj2.WorkId;
								subItem2.name = subObj2.WorkText + ' [' +subObj2.QualColText+']';
								return subItem2;
							});
							return subItem;
						});
						return rObj;
					});

					this.setGenArtNoList(this.itemMpLists);
				} 
			},
			setGenArtNoList(data)
			{
				var workList = [];
                data.forEach(element => {
                    element.children.forEach(subElement => {
						subElement.children.forEach(workItem => {
							workList.push(workItem.id);
						});
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
					
					this.genArtNoList = result.map(function(obj){
                        var genartObj = {};
                        genartObj.WorkId = obj.WorkId;
                        genartObj.ItemMpId = obj.ItemMpId;
                        genartObj.ItemMpText = obj.ItemMpText;
                        genartObj.GenArtNo = genArtNos.filter(x => x.ItemMpId === obj.ItemMpId).map(y=>y.GenArtNo);
                        return genartObj;
                    });
                }
			},
			getGenArtNo(data){
				
				var result = [];
				var params = {
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
			getParts(){
				console.log('repairItem :',this.repairItem);
				this.parts = [];

				let pickWorks = this.repairItem;
				let picGenArtNr = this.genArtNoList.filter(function(item){   
                    var y = false;
                    pickWorks.forEach(element => {
                       if(item.WorkId === element)
                        y = true;
                        return;
                    });
                    return y 
                });

				//console.log('picGenArtNr : ',picGenArtNr);
				
				let selctedGenArts = [...new Set(picGenArtNr.map(it => it.GenArtNo))];
				selctedGenArts = selctedGenArts.reduce(function(accumulator, currentValue) {
					return accumulator.concat(currentValue);
				},[]);
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
                this.pickArtInfo = value.brandName + " / " + value.articleNo;
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
                this.pickArtInfo = value.brandName + " / " + value.articleNo;
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
                        "immediateAttributs": false,
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
                        "thumbnails": false,
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
            showCheckList(value)
            {
                this.manualId = value.id;
                this.checkDialog = true;
                this.$EventBus.$emit('RMI-CHECKLIST.InitData',null);
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
.contents .adjustSelect {
  background-color: #666;
  font-size: 12px;
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
	border-style: solid;
	border-radius: 5px;
	/*border-width: thick;
	border-color: #fddca9;*/
}
#RMISubContents{
	background-color: white; 
	color: black;
    border-radius: 5px;
	border: 0px;
}
#RMISubContents .repair-tree{
	height: 400px;
	overflow:auto;
	overflow-x:hidden;
}
</style>

