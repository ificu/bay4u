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
					<span class="font-weight-bold" style="color:#fddca9; font-size:15px;" >부품 카테고리</span>
                    </v-card>
                </v-col>
            </v-row> 
			<v-row class="pl-8 pr-8">
				<v-chip class="pa-4 ma-2" 
					v-for="(category, index) in categoryLists" v-bind:key = "index" 
					v-bind:color="colorList[index]" 
					outlined 
					link
					@click="getAssemblyGroup(category.shortCutId)"
				>
					{{category.shortCutName}}
				</v-chip>
			</v-row> 
            <v-row>
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
						<v-container class="pa-0">
							<v-row>
								<v-col cols="12" sm="4">
									<v-treeview
										dense
										light
										color ="red"
										:items="assemblyGroupList"
										class="tree-contents"
										open-on-click
										activatable
										item-key="assemblyGroupNodeId"
										item-text="assemblyGroupName"
										:active.sync="assemblyGroupId"
										@update:active="getParts()">
									</v-treeview>
								</v-col>
								<v-divider vertical></v-divider>
								<v-col>
									<v-expansion-panels
										multiple
										light
										flat
										>
										<v-expansion-panel  v-for="(item, index) in partsList"
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
								</v-col>
							</v-row>
						</v-container>
                    </v-card>
                </v-col>
            </v-row>            
        </v-container>
		<BackToTop></BackToTop>
		<!--부품상세 정보-->
        <v-dialog v-model="dialog"  width="600px">     
            <PartsInfo :PartsInfo="partsInfo"
			@close="dialog=false">
            </PartsInfo>               
        </v-dialog>
    </v-content>
</template>

<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
<script>
	import {arrayGroupBy} from '@/utils/common.js'
	import BackToTop from '@/components/Common/BackToTop.vue'
	import PartsInfo from '@/components/RMI/TEC-PARTSINFO.vue'

	const url = "https://rmi-services.tecalliance.net/rest/Adjust";

	const tecdocUrl = "https://webservice.tecalliance.services/pegasus-3-0/services/TecdocToCatDLB.jsonEndpoint?js";
    const tecApiKey = '2BeBXg6CxtgP7fnQvXr45SzqpEVDcDTGSJd1viDM6VHGJ7bxjDy5';
    const tecProvider = 22261;
		
	export default {
		name: 'RMI-CATEGORY',
		data(){
			return{
				rmiAuthKey: '',	
				carTcdTypeId: '',
				colorList: ['red', 'pink', 'purple', 'indigo', 'blue', 'cyan', 'teal', 'green', 'orange', 'deep-orange', 'brown', 'blue-grey', 
							'red accent-4', 'pink accent-4', 'purple accent-4', 'indigo accent-4', 'blue accent-4', 'cyan accent-4', 'teal accent-4', 'green accent-4', 'orange accent-4', 'deep-orange accent-4', 'brown accent-4', 'blue-grey accent-4'],
				categoryLists: [],
				assemblyGroupList:[],
				assemblyGroupId:[],
				partsList:[],
				partsInfo: {},
				dialog: false,
			}
		},
		components: {
			BackToTop,
			PartsInfo
		},
		created () {
			this.$EventBus.$on('RMI-CATEGORY.InitData', param => {  
				this.rmiAuthKey = param.rmiAuthKey;
				this.carTcdTypeId = param.carTcdTypeId; 
				this.initAuthKey();
				this.setCategoryList();
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
			setCategoryList()
			{
				if(this.carTcdTypeId === '')return;

				this.assemblyGroupList = [];
				this.assemblyGroupId = [];
				this.partsList = [];

				let params ={
					"getShortCuts2": {
						articleCountry: "kr",
						lang: "en",
						linkingTargetId: this.carTcdTypeId,
						linkingTargetType: "P",
						provider: tecProvider
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
					console.log('getShortCuts2 : ', JSON.parse(xmlHttp.responseText) );
					var result = JSON.parse(xmlHttp.responseText);
					this.categoryLists = result.data.array;
				}
			},
			getAssemblyGroup(value)
			{
				console.log('shortCutId : ', value);
				this.partsList  = [];

				let params ={
					"getChildNodesAllLinkingTarget2": {
						articleCountry: "kr",
						childNodes: true,
						lang: "en",
						linked: true,
						linkingTargetId: this.carTcdTypeId,
						linkingTargetType: "P",
						provider: tecProvider,
						shortCutId: value
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
					console.log('getChildNodesAllLinkingTarget2 : ', JSON.parse(xmlHttp.responseText) );
					var result = JSON.parse(xmlHttp.responseText).data.array;
					//this.assemblyGroupList = result.data.array;
					console.log('assemblyGroupList : ', result);
					var list = result.filter(x => x.parentNodeId === undefined && x.hasChilds === true);
					this.assemblyGroupList = list.map(function(item){
						var obj = {};
						obj.assemblyGroupName = item.assemblyGroupName;
						obj.assemblyGroupNodeId = item.assemblyGroupNodeId;
						obj.children = result.filter(y => y.parentNodeId === item.assemblyGroupNodeId).map(function(subItem){
							var obj2 = {};
							obj2.assemblyGroupName = subItem.assemblyGroupName;
							obj2.assemblyGroupNodeId = subItem.assemblyGroupNodeId;
							if(subItem.hasChilds === true){
								obj2.children = result.filter(v => v.parentNodeId === subItem.assemblyGroupNodeId).map(function(subItem2){
									var obj3 = {};
									obj3.assemblyGroupName = subItem2.assemblyGroupName;
									obj3.assemblyGroupNodeId = subItem2.assemblyGroupNodeId;
									return obj3;
								});
							}
							return obj2;
						});
						return obj;
					});
					console.log('list : ', this.assemblyGroupList);
				}
			},
			getParts(){

				console.log('getParts : ', this.assemblyGroupId);
				console.log('carTcdTypeId : ', this.carTcdTypeId);
				if(this.assemblyGroupId.length === 0) return;

				let brnads = [2, 4, 5, 6, 9, 10, 16, 21, 26, 30, 32, 33, 35, 43, 50, 52, 59, 67, 68, 75, 79, 83, 89, 95, 101, 123, 134, 144, 151, 154, 161, 162, 183, 192, 204, 205, 240, 245, 287, 327, 381, 4434, 6020, 6263, 6278, 6441];
				let partsResult = [];
				
				let params = {
					"getArticles": {
						articleCountry: "kr",
						provider: tecProvider,
						assemblyGroupNodeIds: this.assemblyGroupId,
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

				// Send HTTP request
				let xmlHttp = new XMLHttpRequest();
				xmlHttp.open( 'POST', tecdocUrl, false );
				xmlHttp.setRequestHeader( 'Content-type', 'application/json;charset=UTF-8' );
				xmlHttp.setRequestHeader( 'Accept', 'application/json' );
				xmlHttp.setRequestHeader( 'x-api-key', tecApiKey);
				xmlHttp.send( JSON.stringify( params ) );

				// Handle HTTP response
				if(xmlHttp.status == 200) {
					//console.log( JSON.parse(xmlHttp.responseText));
					var result = JSON.parse(xmlHttp.responseText).articles;
					result = result.filter(x => brnads.includes(x.dataSupplierId));
					if(result.length > 0){
						console.log('result :', result);
						result = result.map(function(item){
							var obj = {};
							obj = item;
							obj.genericArticleId = item.genericArticles.map(y =>y.genericArticleId).join(',');
							obj.genericArticleName = item.genericArticles.map(y =>y.genericArticleDescription).join(',');
							return obj;
						});                           
						partsResult = result;
					}
				};

                // 중복체크
                partsResult = partsResult.filter((item, idx) => {
                    return partsResult.map(x => x.dataSupplierId + x.articleNumber).indexOf(item.dataSupplierId + item.articleNumber) === idx;
                })

                // 부품군+ 브랜드 정렬
                partsResult.sort(function(a, b){
                    return (a.genericArticleId + ('000'+ a.dataSupplierId).slice(-3)  >  b.genericArticleId + ('000'+ b.dataSupplierId).slice(-3)) ? 1 : -1;
				});
				
				var genArtGroupList = arrayGroupBy(partsResult, function(item){
                    return [item.genericArticleId];
                });

                this.partsList = genArtGroupList.map(function(item){
                    var obj = {};
                    obj.genericArticleId = item[0].genericArticleId
                    obj.genericArticleName = item[0].genericArticleName
                    obj.array = item;
                    return obj;
				});
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
            showPartsDetail(value){
                var partsData = {};
				partsData.PartsInfo = value;
				partsData.TecTypeId = this.carTcdTypeId;

				this.partsInfo = value;
                this.$EventBus.$emit('RMI-PARTSINFO.InitData',partsData);
                this.dialog = true;
			},
		},   		
	}
</script>

<style scoped>
.contents {
  background-color: #f9f9f9;
  color: black;
  font-size: 12px;
}

.contents .adjustSelect {
  background-color: #666;
  font-size: 12px;
}

.contents .border {
  border: 2px dashed orange;
}
.contents .tree-contents{
    color: black;
    font-size: 1.2em
}
.contents  ul {
    list-style-type: none;
}
.contents  li {
    display: flex;
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
	border-style: solid;
	border-radius: 5px;
	border-width: thick;
	border-color: #fddca9;
}

</style>

