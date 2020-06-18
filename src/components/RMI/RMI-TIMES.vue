<template>
    <v-content class="contents">
        <v-container>
            <v-row>
                <v-col cols="12" sm="12" >
                    <!--<v-card
                        class="pa-2"
                        outlined
                        tile
                    >-->
					<v-container class="pt-0 pb-1 pt-2 contentsTitle">
						<v-row>
							<v-col cols="12" sm="10">
								<v-icon class="mx-4" style="color:#fddca9; font-size:18px;" >  mdi-arrange-send-backward </v-icon>
								<span class="font-weight-bold" style="color:#fddca9; font-size:15px;" >표준 공임 시간</span>
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
                                    @change="setMainGroup"
                                    >
                                </v-select>
							</v-col>
						</v-row>
					</v-container>
					
                    <!--</v-card>-->
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
                        class="pa-1"
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
                                <v-expansion-panel-header>{{ item.genericArticleName }}</v-expansion-panel-header>
                                <v-expansion-panel-content>
                                    <ul>
                                        <li  v-for="(part, i) in item.array"
                                            :key="i">
                                            <div class="brand-name">{{ part.brandName }}</div>
                                            <div class="item-code">{{ part.articleNo }}</div>
                                            <div class="item-detail">
                                                <v-btn icon x-small @click="showPartsImage(part)">
                                                    <v-icon>far fa-image</v-icon>
                                                </v-btn>
                                            </div>
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
	import CheckList from '@/components/RMI/RMI-CHECKLIST.vue'
	import PartsInfo from '@/components/RMI/TEC-PARTSINFO.vue'
	import PartsImage from '@/components/RMI/TEC-PARTSIMG.vue'

	const url = "https://rmi-services.tecalliance.net/rest/Times";
	const basketUrl = "https://rmi-services.tecalliance.net/rest/Prices";

	const tecdocUrl = "https://webservice.tecalliance.services/pegasus-3-0/services/TecdocToCatDLB.jsonEndpoint?js";
    const tecApiKey = '2BeBXg6CxtgP7fnQvXr45SzqpEVDcDTGSJd1viDM6VHGJ7bxjDy5';
    const tecProvider = 22261;

	export default {
		name: 'RMI-TIMES',
		data(){
			return{
				qualColLists: [],
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
				dialog: false,
                pickArtInfo: '',
				checkDialog: false,
				manualId:'',
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
			this.$EventBus.$on('RMI-TIMES.InitData', param => {  
				this.rmiAuthKey = param.rmiAuthKey;
				this.carTypeId = param.carTypeId; 
				this.carTcdTypeId = param.carTcdTypeId; 
                this.initAuthKey();
                this.setBodies();
				//this.setMainGroup();
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
					xmlHttp.open( 'GET', url + '/BodiesForTimes' + query, false );
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
                                this.setMainGroup();
                                console.log('qualColId', this.qualColId);
                            } 
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
                    console.log('WorkStepsForSubgroup : ', JSON.parse(xmlHttp.responseText));

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
								subItem2.name = subObj2.WorkText.replace(",", ".") + ' [' +subObj2.QualColText+']';
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

				let selectedWorks = this.repairItem;
				let picGenArtNr = this.genArtNoList.filter(function(item){   
                    var y = false;
                    selectedWorks.forEach(element => {
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
            showCheckList(value)
            {
				var checkData = {};
                checkData.RmiAuthKey = this.rmiAuthKey;
                checkData.TypeID = this.carTypeId;
                checkData.ManualID = value.id;

                this.manualId = value.id;
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

