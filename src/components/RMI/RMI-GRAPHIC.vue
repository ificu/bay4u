<template>
    <v-content class="contents">
        <v-container>
            <v-row>
                <v-col cols="12" sm="10" >
                    <v-card
                        class="pa-2 pb-12"
                        outlined
                        tile
                    >
						<v-icon id="titleIcon" class="mx-4" style="color:#fddca9; font-size:18px;" >  mdi-arrange-send-backward </v-icon>
						<span id="titleText" class="font-weight-bold" style="color:#fddca9; font-size:15px;" @click="clearManual">차량 도면</span>				
                    </v-card>
                </v-col>
                <v-col cols="12" sm="2">
					<v-card>
							<v-select
								class="pa-4 pb-0 pt-6 adjustSelect"
								v-model="qualColId"
								:items="qualColLists"
								item-text="QualColText"
								item-value="QualColId"								
								label="Body 상세"
								outlined
								dense
								@change="changequalColId"
								>
							</v-select>
					</v-card>
					<v-btn id='btnFuncMaingroupDelegate' @click="selectMaingroup" style="display:none;">JSMaingroupDelegate</v-btn>
					<v-btn id='btnFuncSubgroupDelegate' @click="selectSubgroup" style="display:none;">JSSubgroupDelegate</v-btn>
					<v-btn id='btnFuncDelegate' @click="selectDelegate" style="display:none;">JSDelegate</v-btn>
                </v-col>
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
						id = "RMIVehicleContents"
                    >
                    </v-card>
                </v-col>
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
						id = "RMIMaingroupContents"
                    >
                    </v-card>
                </v-col>
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
						id = "RMISubgroupContents"
                    >
                    </v-card>
                </v-col>
            </v-row>
            <v-row>
                <v-col
                    cols="12"
                    sm="12"
                >
					<v-card>
						<v-card-title class="pa-2 ml-2">{{tabTitle}}</v-card-title>
						<v-tabs
							v-model="tab"
							id = "RMITabsContents"
							color = "#fddca9"
						>
							<v-tab
								v-for="constens in tabContentsLists"
								:key="constens.tab"
							>
								{{ constens.tab }}
							</v-tab>
						</v-tabs>
						<v-tabs-items v-model="tab">
							<v-tab-item
								v-for="constens in tabContentsLists"
								:key="constens.tab"
							>
								<v-card flat>
									<v-card-text class="pa-2">
										<!--TechinicalManual Content-->
										<div id = "RMIContents" v-if="checkShowTabPage('MANUALS')">
										<v-container  class="pa-0">
											<v-row>
												<v-col cols="12" sm="3"  >
													<v-select
														v-model="manualItemMpId"
														:items="manualItemMpList"
														item-text="ItemMpText"
														item-value="ItemMpId"	
														label="항목"
														outlined
														dense
														light
														@change="changeManualItemMp"
														>
													</v-select>
												</v-col>
												<v-col cols="12" sm="3" >
													<v-select
														v-model="manualId"
														:items="manualList"
														item-text="QualColText"
														item-value="ManualId"	
														label="매뉴얼 구분"
														outlined
														dense
														light
														@change="changeManualId"
													>
													</v-select>
												</v-col>
											</v-row>
											<v-row>
												<div id="HtmlContents" v-html="manualHtmlText">
												</div>
											</v-row>
										</v-container>
										</div>
										<!--AdjustmentData Content-->
										<div id = "RMIContents" v-if="checkShowTabPage('ADJUST')">
											<v-container class="pa-0">
												<v-row>
													<v-col cols="12" sm="4" >
														<v-select
															v-model="adjItemMpId"
															:items="adjItemMpList"
															item-text="ItemMpText"
															item-value="ItemMpId"	
															label="항목"
															outlined
															dense
															light
															@change="changeAdjustItem"
														></v-select>
													</v-col>		
												</v-row>
												<v-row>
													<div id="HtmlContents" v-html="adjHtmlText" >
													</div>
												</v-row>
											</v-container>
										</div>
										<!--WorkPosition Content-->
										<div id = "RMIContents" v-if="checkShowTabPage('WORKPOSITION')">
											<v-container class="pa-0">
												<v-row>
													<v-col cols="12" sm="3"  >
														<v-select
															v-model="workItemMpId"
															:items="workItemMpList"
															item-text="ItemMpText"
															item-value="ItemMpId"	
															label="항목"
															outlined
															dense
															light
															@change="changeWorkItemMpId"
															>
														</v-select>
													</v-col>
													<v-col cols="12" sm="3" >
														<v-select
															v-model="korId"
															:items="korList"
															item-text="KorText"
															item-value="KorId"	
															label="상세 항목"
															outlined
															dense
															light
															@change="chagneKorId"
														>
														</v-select>
													</v-col>
												</v-row>
												<v-row>
													<div class="workSteps">
														<ul>
															<li v-for="(item,index) in workList" :key="index">
																<div class="workText">{{item.QualColText}}</div>
																<div class="workTime">{{item.WorkText.replace(",", ".")}}</div>
															</li>
														</ul>
													</div>
												</v-row>
											</v-container>
										</div>
										<!--LinkedParts Content-->
										<div id = "RMIContents" v-if="checkShowTabPage('PARTS')">
											<v-expansion-panels
												multiple
												light
												flat
											>
												<v-expansion-panel  v-for="(item, index) in partsList" :key="index">
													<v-expansion-panel-header>{{ item.genericArticleName }}</v-expansion-panel-header>
													<v-expansion-panel-content>
														<ul>
															<li  v-for="(part, i) in item.array" :key="i">
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
										</div>
									</v-card-text>
								</v-card>
							</v-tab-item>
						</v-tabs-items>
					</v-card>
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
    </v-content>
</template>

<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
<script>
	import {arrayGroupBy} from '@/utils/common.js'
	import BackToTop from '@/components/Common/BackToTop.vue'
	import PartsInfo from '@/components/RMI/TEC-PARTSINFO.vue'
	import PartsImage from '@/components/RMI/TEC-PARTSIMG.vue'

	const url = "https://rmi-services.tecalliance.net/rest/Graphics";
	const adjUrl = "https://rmi-services.tecalliance.net/rest/Adjust";
	const manualUrl = "https://rmi-services.tecalliance.net/rest/Manuals";
	const timeUrl = "https://rmi-services.tecalliance.net/rest/Times";
	const basketUrl = "https://rmi-services.tecalliance.net/rest/Prices";

	const tecdocUrl = "https://webservice.tecalliance.services/pegasus-3-0/services/TecdocToCatDLB.jsonEndpoint?js";
    const tecApiKey = '2BeBXg6CxtgP7fnQvXr45SzqpEVDcDTGSJd1viDM6VHGJ7bxjDy5';
    const tecProvider = 22261;

	export default {
		name: 'RMI-GRAPHIC',
		data(){
			return{
				mainGroupLists: [],
				subGroupLists: [],
				itemMpLists: [],
				qualColLists: [],
				tabContentsLists: [
					{ tab: '정비 매뉴얼', content: 'MANUALS' },
					{ tab: '정비 참고 데이터', content: 'ADJUST' },
					{ tab: '참고 작업', content: 'WORKPOSITION' },
					{ tab: '관련 부품', content: 'PARTS' },
				],
				mainGroupId: '',
				subGroupId: '',
				itemMpId: '',
				qualColId: '',
				rmiAuthKey: '',	
				carTypeId: '',	
				carTcdTypeId: '',
				tab: null,
				tabTitle : '',
				manualItemMpList: [],
				manualItemMpId: '',
				manualList: [],
				manualId: '',
				manualHtmlText: '',
				adjItemMpList: [],
				adjItemMpId: '',
				adjHtmlText: '',
				workItemMpId: '',
				workItemMpList: [],
				korId: '',
				korList: [],
				workList: [],
				partsList:[],
				partsInfo: {},
				dialog: false,
				imgDialog: false,
			}
		},
		components: {
			BackToTop,
			PartsInfo,
			PartsImage
		},
		created () {
			this.$EventBus.$on('RMI-GRAPHIC.InitData', param => {  
				this.rmiAuthKey = param.rmiAuthKey;
				this.carTypeId = param.carTypeId; 
				this.carTcdTypeId = param.carTcdTypeId; 
				
				this.tab = 0;
				this.qualColLists = [];
				this.clearManual();

				this.$nextTick(function() {
					this.initAuthKey();
					this.selectBodies();					
					//this.setMainGroup();
				});
			});
		},	
		methods: {
			clearManual() {
				console.log('clearManual.......');				
				this.qualColId = '';
				$("#RMIVehicleContents").html('');
				$("#RMIMaingroupContents").html('');
				$("#RMISubgroupContents").html('');
				this.clearTabPage();
			},
			clearTabPage()
			{
				this.tabTitle = '';
				this.manualItemMpList = [];
				this.manualItemMpId = '';
				this.manualList = [];
				this.manualId = '';
				this.manualHtmlText = '';
				this.adjItemMpList = [];
				this.adjItemMpId = '';
				this.adjHtmlText = '';
				this.workItemMpId = '';
				this.workItemMpList = [];
				this.korId = '';
				this.korList = [];
				this.workList = [];
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
			checkShowTabPage(page) {
				if(this.tab === null)return;
				var tabPage = this.tabContentsLists.findIndex(x =>x.content === page);
				return (tabPage === this.tab)? true:false;
			},
			selectBodies() {
				if(this.carTypeId === '')return;

				let languageCode = 'en',
					countryCode = 'kr',
					typeId = this.carTypeId;		
					
				// Build url query string
				let query = '?languageCode=' + languageCode
					+ '&countryCode=' + countryCode
					+ '&typeId=' + typeId

				// Send HTTP request
				let xmlHttp = new XMLHttpRequest();
				xmlHttp.open( 'GET', url + '/BodiesForGraphics' + query, false );
				xmlHttp.setRequestHeader( 'Content-type', 'application/json;charset=UTF-8' );
				xmlHttp.setRequestHeader( 'Accept', 'application/json' );
				xmlHttp.setRequestHeader( 'Authorization', this.rmiAuthKey );
				xmlHttp.send( null );
				
				// Handle HTTP response
				if(xmlHttp.status == 200) {
					console.log('selectBodies 리턴 : ', JSON.parse(xmlHttp.responseText));
					this.qualColLists = JSON.parse(xmlHttp.responseText);

					if(this.qualColLists.length == 1) {
						this.qualColId = this.qualColLists[0].QualColId;
						this.changequalColId();
					}  					
				}
			},
			changequalColId() {
				let languageCode = 'en',
					countryCode = 'kr',
					printView = true,
					linkUrl = '.',
					bodyQualColId = this.qualColId,
					typeId = this.carTypeId;		
					
				// Build url query string
				let query = '?languageCode=' + languageCode
					+ '&countryCode=' + countryCode
					+ '&typeId=' + typeId	
					+ '&bodyQualColId=' + bodyQualColId	
					+ '&printView=' + printView	
					+ '&linkUrl=' + linkUrl	

				$("#RMIVehicleContents").html('');
				$("#RMIMaingroupContents").html('');
				$("#RMISubgroupContents").html('');
				this.clearTabPage();

				// Send HTTP request
				let xmlHttp = new XMLHttpRequest();
				xmlHttp.open( 'GET', url + '/VehicleHtml' + query, false );
				xmlHttp.setRequestHeader( 'Content-type', 'application/json;charset=UTF-8' );
				xmlHttp.setRequestHeader( 'Accept', 'application/json' );
				xmlHttp.setRequestHeader( 'Authorization', this.rmiAuthKey );
				xmlHttp.send( null );
				// Handle HTTP response
				if(xmlHttp.status == 200) {
					const regexClick = /clickOnElement/gi;
					const substClick = `clickOnVehicleElement`;
					const regexHref = /href=\\".Þ(..|...)Þ\\"/gi;
					const substHref = `onclick=\\\"clickOnVehicleElement(this.id.substring(1));\\\"`;
					//console.log(xmlHttp.responseText);
					let page = xmlHttp.responseText.replace('document.location.href=\'.Þ\'+id+\'Þ\'', 'document.getElementById(\'btnFuncMaingroupDelegate\').value=id;document.getElementById(\'btnFuncMaingroupDelegate\').click();')
													.replace(regexClick, substClick)
													.replace(regexHref, substHref)
													.replace('x + \'px\';', '(x - 250) + \'px\';')
													.replace('y + \'px\';', '(y - 200) + \'px\';');
					//console.log(page);
					$("#RMIVehicleContents").html(JSON.parse(page));
				}	
			},
			selectMaingroup() {
				console.log('selectMaingroup............. : ', document.getElementById('btnFuncMaingroupDelegate').value);
				this.mainGroupId = document.getElementById('btnFuncMaingroupDelegate').value.substring(1);
				let languageCode = 'en',
					countryCode = 'kr',
					printView = true,
					linkUrl = '.',
					bodyQualColId = this.qualColId,
					typeId = this.carTypeId;
					
				// Build url query string
				let query = '?languageCode=' + languageCode
					+ '&countryCode=' + countryCode
					+ '&typeId=' + typeId	
					+ '&bodyQualColId=' + bodyQualColId	
					+ '&printView=' + printView	
					+ '&linkUrl=' + linkUrl	
					+ '&mainGroupId=' + this.mainGroupId;

				$("#RMIMaingroupContents").html('');
				$("#RMISubgroupContents").html('');
				this.clearTabPage();

				// Send HTTP request
				let xmlHttp = new XMLHttpRequest();
				xmlHttp.open( 'GET', url + '/MaingroupHtml' + query, false );
				xmlHttp.setRequestHeader( 'Content-type', 'application/json;charset=UTF-8' );
				xmlHttp.setRequestHeader( 'Accept', 'application/json' );
				xmlHttp.setRequestHeader( 'Authorization', this.rmiAuthKey );
				xmlHttp.send( null );
				// Handle HTTP response
				if(xmlHttp.status == 200) {
					const regexClick = /clickOnElement/gi;
					const substClick = `clickOnMaingroupElement`;
					const regexHref = /href=\\".Þ(..|...)Þ\\"/gi;
					const substHref = `onclick=\\\"clickOnMaingroupElement(this.id.substring(1));\\\"`;					
					//console.log(xmlHttp.responseText);
					let page = xmlHttp.responseText.replace('document.location.href=\'.Þ\'+id+\'Þ\'', 'document.getElementById(\'btnFuncSubgroupDelegate\').value=id;document.getElementById(\'btnFuncSubgroupDelegate\').click();')
													.replace(regexClick, substClick)
													.replace(regexHref, substHref)
													.replace('x + \'px\';', '(x - 250) + \'px\';')
													.replace('y + \'px\';', '(y - 200) + \'px\';');
					//console.log(page);
					$("#RMIMaingroupContents").html(JSON.parse(page));
				}					
			},
			selectSubgroup() {
				console.log('selectSubgroup............. : ', document.getElementById('btnFuncSubgroupDelegate').value);
				this.subGroupId = document.getElementById('btnFuncSubgroupDelegate').value.substring(1);
				let languageCode = 'en',
					countryCode = 'kr',
					printView = true,
					linkUrl = '.',
					bodyQualColId = this.qualColId,
					typeId = this.carTypeId;
					
				// Build url query string
				let query = '?languageCode=' + languageCode
					+ '&countryCode=' + countryCode
					+ '&typeId=' + typeId	
					+ '&bodyQualColId=' + bodyQualColId	
					+ '&subGroupQualCol=' + '0'	
					+ '&printView=' + printView	
					+ '&linkUrl=' + linkUrl	
					+ '&subGroupId=' + this.subGroupId;

				$("#RMISubgroupContents").html('');					
				this.clearTabPage();

				// Send HTTP request
				let xmlHttp = new XMLHttpRequest();
				xmlHttp.open( 'GET', url + '/SubgroupHtml' + query, false );
				xmlHttp.setRequestHeader( 'Content-type', 'application/json;charset=UTF-8' );
				xmlHttp.setRequestHeader( 'Accept', 'application/json' );
				xmlHttp.setRequestHeader( 'Authorization', this.rmiAuthKey );
				xmlHttp.send( null );
				// Handle HTTP response
				if(xmlHttp.status == 200) {
					const regexClick = /clickOnElement/gi;
					const substClick = `clickOnSubgroupElement`;
					const regexHref = /href=\\".Þ(..|...)Þ\\"/gi;
					const substHref = `onclick=\\\"clickOnSubgroupElement(this.id.substring(1));\\\"`;								
					//console.log(xmlHttp.responseText);
					let page = xmlHttp.responseText.replace('document.location.href=\'.Þ\'+id+\'Þ\'', 'document.getElementById(\'btnFuncDelegate\').value=id;document.getElementById(\'btnFuncDelegate\').click();')
													.replace(regexClick, substClick)
													.replace(regexHref, substHref)
													.replace('x + \'px\';', '(x - 250) + \'px\';')
													.replace('y + \'px\';', '(y - 200) + \'px\';');
					//console.log('page :', page);
					$("#RMISubgroupContents").html(JSON.parse(page));
				}									
			},
			selectDelegate(){
				
				console.log('selectDelegate............. : ', document.getElementById('btnFuncDelegate').value);
				var id = document.getElementById('btnFuncDelegate').value;
				this.itemMpId =  id.substring(1);

				var toolTipElement = '' + document.getElementById(id).onmouseover;
				var startIndex = toolTipElement.indexOf('showToolTip');
				var strToolTip = toolTipElement.substring(startIndex);
				var endIndex = strToolTip.indexOf(';');
				this.tabTitle = strToolTip.substring(0,endIndex)
										.replace("showToolTip('","")
										.replace("', evt)","");
				
				// 1. 정비 메뉴얼
				this.getManualData();
				// 2. 정비 참고 데이터
				this.getAdjustmentData();
				// 3. 참고작업
				this.getWorkPositionData();
				// 4. 관련부품
				this.getLinkedPartsData();
			},
			getManualData(){
				
				this.manualItemMpId = '';
				this.manualList = [];
				this.manualId = '';
				this.manualHtmlText = '';
				
				let itemGroupId = this.itemMpId,
					countryCode = 'kr',
					languageCode = 'en',
					typeId = this.carTypeId;
					
				// Build url query string
				let query = '?itemGroupId='+itemGroupId
					+ '&countryCode=' + countryCode
					+ '&languageCode=' + languageCode
					+ '&typeId=' + typeId;

				// Send HTTP request
				let xmlHttp = new XMLHttpRequest();
				xmlHttp.open( 'GET', url + '/LinkedTechnicalManuals' + query, false );
				xmlHttp.setRequestHeader( 'Content-type', 'application/json;charset=UTF-8' );
				xmlHttp.setRequestHeader( 'Accept', 'application/json' );
				xmlHttp.setRequestHeader( 'Authorization', this.rmiAuthKey );
				xmlHttp.send( null );
				
				// Handle HTTP response
				if(xmlHttp.status == 200) {
					//console.log(xmlHttp.responseText);
					this.manualItemMpList = JSON.parse(xmlHttp.responseText);
					if(this.manualItemMpList.length === 1){
                        this.manualItemMpId = this.manualItemMpList[0]["ItemMpId"];
                        this.changeManualItemMp();
                    }
				}
			},
			changeManualItemMp() {

				this.manualList = [];
				this.manualId = '';
				this.manualHtmlText = '';

				var selected = this.manualItemMpId;
				this.manualList = this.manualItemMpList.reduce(function (pre, value) {
					if(value.ItemMpId === selected) {
						return [...pre, ...value.Manuals];
					}
					else {
						return pre;
					}
                }, []);	
                
                if(this.manualList.length === 1) {
                    this.manualId = this.manualList[0]["ManualId"];
                    this.changeManualId();
                }    
			},
			changeManualId() {

				this.manualHtmlText = '';
                
				let languageCode = 'en',
					countryCode = 'kr',
					printView = true,
					linkUrl = '.',
					manualId = this.manualId,
					typeId = this.carTypeId;		
					
				// Build url query string
				let query = '?languageCode=' + languageCode
					+ '&countryCode=' + countryCode
					+ '&typeId=' + typeId	
					+ '&manualId=' + manualId	
					+ '&printView=' + printView	
					+ '&linkUrl=' + linkUrl	
                
                
				// Send HTTP request
				let xmlHttp = new XMLHttpRequest();
				xmlHttp.open( 'GET', manualUrl + '/ManualHtml' + query, false );
				xmlHttp.setRequestHeader( 'Content-type', 'application/json;charset=UTF-8' );
				xmlHttp.setRequestHeader( 'Accept', 'application/json' );
				xmlHttp.setRequestHeader( 'Authorization', this.rmiAuthKey );
				xmlHttp.send( null );
				// Handle HTTP response
				if(xmlHttp.status == 200) {
					//console.log(xmlHttp.responseText);
					let page = xmlHttp.responseText;
                    this.manualHtmlText = JSON.parse(page);
				}	
			},
			getAdjustmentData(){

				this.adjItemMpId = '';
                this.adjHtmlText= '';

				let bodyQualColId = this.qualColId,
					itemGroupId = this.itemMpId,
					countryCode = 'kr',
					languageCode = 'en',
					typeId = this.carTypeId;
					
				// Build url query string
				let query = '?bodyQualColId='+bodyQualColId
					+ '&itemGroupId='+itemGroupId
					+ '&countryCode=' + countryCode
					+ '&languageCode=' + languageCode
					+ '&typeId=' + typeId;

				// Send HTTP request
				let xmlHttp = new XMLHttpRequest();
				xmlHttp.open( 'GET', url + '/LinkedAdjustmentData' + query, false );
				xmlHttp.setRequestHeader( 'Content-type', 'application/json;charset=UTF-8' );
				xmlHttp.setRequestHeader( 'Accept', 'application/json' );
				xmlHttp.setRequestHeader( 'Authorization', this.rmiAuthKey );
				xmlHttp.send( null );

				// Handle HTTP response
				if(xmlHttp.status == 200) {
					//console.log(xmlHttp.responseText);
					this.adjItemMpList = JSON.parse(xmlHttp.responseText);

					if(this.adjItemMpList.length === 1){
						this.adjItemMpId = this.itemMpList[0]["ItemMpId"];
						this.changeAdjustItem();
					}
				}
			},
			changeAdjustItem() {

				this.adjHtmlText = '';

				let languageCode = 'en',
					countryCode = 'kr',
					printView = true,
					linkUrl = '.',
					itemMpId = this.adjItemMpId,
					typeId = this.carTypeId;		
					
				// Build url query string
				let query = '?languageCode=' + languageCode
					+ '&countryCode=' + countryCode
					+ '&typeId=' + typeId	
					+ '&itemMpId=' + itemMpId	
					+ '&printView=' + printView	
					+ '&linkUrl=' + linkUrl	
				
				// Send HTTP request
				let xmlHttp = new XMLHttpRequest();
				xmlHttp.open( 'GET', adjUrl + '/ItemHtml' + query, false );
				xmlHttp.setRequestHeader( 'Content-type', 'application/json;charset=UTF-8' );
				xmlHttp.setRequestHeader( 'Accept', 'application/json' );
				xmlHttp.setRequestHeader( 'Authorization', this.rmiAuthKey );
				xmlHttp.send( null );
				// Handle HTTP response
				if(xmlHttp.status == 200) {
                    //console.log(xmlHttp.responseText);
                    let page = xmlHttp.responseText;
                    this.adjHtmlText = JSON.parse(page);
				}				
			},
			getWorkPositionData(){

				this.workItemMpId = '';
				this.workItemMpList = [];
				this.korId = '';
				this.korList = [];
				this.workList = [];

				let bodyQualColId = this.qualColId,
					itemGroupId = this.itemMpId,
					countryCode = 'kr',
					languageCode = 'en',
					typeId = this.carTypeId;
					
				// Build url query string
				let query = '?bodyQualColId='+bodyQualColId
					+ '&itemGroupId='+itemGroupId
					+ '&countryCode=' + countryCode
					+ '&languageCode=' + languageCode
					+ '&typeId=' + typeId;

				// Send HTTP request
				let xmlHttp = new XMLHttpRequest();
				xmlHttp.open( 'GET', url + '/LinkedWorkPositions' + query, false );
				xmlHttp.setRequestHeader( 'Content-type', 'application/json;charset=UTF-8' );
				xmlHttp.setRequestHeader( 'Accept', 'application/json' );
				xmlHttp.setRequestHeader( 'Authorization', this.rmiAuthKey );
				xmlHttp.send( null );
				
				// Handle HTTP response
				if(xmlHttp.status == 200) {
					//console.log(xmlHttp.responseText);
					var result = JSON.parse(xmlHttp.responseText);
					this.workItemMpList = arrayGroupBy(result, function(item){
						return [item.ItemMpId];
					});

					this.workItemMpList = this.workItemMpList.map(function(obj){
						var newObj = {};
						newObj.ItemMpId = obj[0].ItemMpId;
						newObj.ItemMpText = obj[0].ItemMpText;
						newObj.Array = obj;
						return newObj;
					});

					console.log('this.workItemMpList : ' , this.workItemMpList.length);

					if(this.workItemMpList.length === 1){
                        this.workItemMpId = this.workItemMpList[0]["ItemMpId"];
                        this.changeWorkItemMpId();
                    }
				}
			},
			changeWorkItemMpId(){

				this.korId = '';
				this.korList = [];
				this.workList = [];

				var selected = this.workItemMpId;
				this.korList = this.workItemMpList.reduce(function (pre, value) {
					if(value.ItemMpId === selected) {
						return [...pre, ...value.Array];
					}
					else {
						return pre;
					}
				}, []);	
                
                if(this.korList.length === 1) {
					this.korId = this.korList[0]["KorId"];
					this.chagneKorId();
                }  
			},
			chagneKorId(){

				let bodyQualColId = this.qualColId,
					korId = this.korId,
					countryCode = 'kr',
					languageCode = 'en',
					typeId = this.carTypeId,
					itemMpId = this.workItemMpId;
					
				// Build url query string
				let query = '?bodyQualColId='+bodyQualColId
					+ '&korId='+korId
					+ '&countryCode=' + countryCode
					+ '&languageCode=' + languageCode
					+ '&typeId=' + typeId
					+ '&itemMpId=' + itemMpId;
				
				// Send HTTP request
				let xmlHttp = new XMLHttpRequest();
				xmlHttp.open( 'GET', timeUrl + '/WorkSteps' + query, false );
				xmlHttp.setRequestHeader( 'Content-type', 'application/json;charset=UTF-8' );
				xmlHttp.setRequestHeader( 'Accept', 'application/json' );
				xmlHttp.setRequestHeader( 'Authorization', this.rmiAuthKey );
				xmlHttp.send( null );
				// Handle HTTP response
				if(xmlHttp.status == 200) {
					//console.log(xmlHttp.responseText);
					this.workList = JSON.parse(xmlHttp.responseText);
					//console.log('workList:' , this.workList );
				}
			},
			getLinkedPartsData(){

				this.partsList = [];

				let bodyQualColId = this.qualColId,
					itemGroupId = this.itemMpId,
					countryCode = 'kr',
					languageCode = 'en',
					typeId = this.carTypeId;
					
				// Build url query string
				let query = '?bodyQualColId='+bodyQualColId
					+ '&itemGroupId='+itemGroupId
					+ '&countryCode=' + countryCode
					+ '&languageCode=' + languageCode
					+ '&typeId=' + typeId;

				// Send HTTP request
				let xmlHttp = new XMLHttpRequest();
				xmlHttp.open( 'GET', url + '/LinkedSpareParts' + query, false );
				xmlHttp.setRequestHeader( 'Content-type', 'application/json;charset=UTF-8' );
				xmlHttp.setRequestHeader( 'Accept', 'application/json' );
				xmlHttp.setRequestHeader( 'Authorization', this.rmiAuthKey );
				xmlHttp.send( null );

				// Handle HTTP response
				if(xmlHttp.status == 200) {
					//console.log(xmlHttp.responseText);
					var result = JSON.parse(xmlHttp.responseText);
					var itemMpIds = result.map(x=>x.ItemMpId);
					console.log('itemMpIds :', itemMpIds);
					this.getGenArtNo(itemMpIds);
				}
			},
			getGenArtNo(data){

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
					var result = JSON.parse(xmlHttp.responseText);
					var selctedGenArts = [...new Set(result.map(it => it.GenArtNo))];
					console.log('genArtnr : ', selctedGenArts);
					this.getParts(selctedGenArts);
				}
			},
			getParts(data){

				if(data.length === 0) return;
				
                let brnads = [2, 4, 5, 6, 9, 10, 16, 21, 26, 30, 32, 33, 35, 43, 50, 52, 59, 67, 68, 75, 79, 83, 89, 95, 101, 123, 134, 144, 151, 154, 161, 162, 183, 192, 204, 205, 240, 245, 287, 327, 381, 4434, 6020, 6263, 6278, 6441];
				let params = {
					"getArticleIdsWithState": {
					articleCountry: "kr",
					"brandNo": {
                        "array": brnads
                    },
                    genericArticleId: {
                        "array": data
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
                    //console.log('result2 :', JSON.parse(xmlHttp.responseText));
                    var result = JSON.parse(xmlHttp.responseText);
                    if(result.data !== ""){
                        var genArtGroupList = arrayGroupBy(result.data.array, function(item){
                            return [item.genericArticleId];
						});
						
						this.partsList = genArtGroupList.map(function(item){
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

						console.log('partsList :', this.partsList);
					}
				}
			},
			showPartsDetail(value){
				var partsData = {};
				partsData.PartsInfo = value;
				partsData.TecTypeId = this.carTcdTypeId;

				this.partsInfo = value;
                this.$EventBus.$emit('RMI-PARTSINFO.InitData',partsData);
                this.dialog = true;
			},
			showPartsImage(value){
				var partsData = {};
				partsData.PartsInfo = value;
				partsData.TecTypeId = this.carTcdTypeId;

				this.partsInfo = value;
				this.$EventBus.$emit('RMI-PARTSIMG.InitData',partsData);
				this.imgDialog = true;
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

.contents .workSteps{
	width:40%;
}

.workSteps  ul {
    list-style-type: none;
}

.workSteps  li {
    display: flex;
	margin-bottom: 8px;
}

.workSteps .workText{
	flex:30%;
	font-weight: bold;
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
#RMIVehicleContents, #RMIMaingroupContents, #RMISubgroupContents {
	background-color: white; 
	color: black;
	border-style: solid;
	border-radius: 5px;
	border-width: thick;
	border-color: #fddca9;
}

#RMITabsContents {
	background-color: white; 
	color: black;
}

#carBody {
  background-color:red;
  color: black;
  font-size: 12px;
}
#RMIContents {
	background-color: white; 
	color: black;
	padding: 10px;
	border-radius: 3px;
	border: 2px solid white;
}
#HtmlContents{
	margin:15px;
}

</style>

