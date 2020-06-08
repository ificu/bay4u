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
								@change="changeManualId"
								>
							</v-select>
					</v-card>
					<v-btn id='btnFuncMaingroupDelegate' @click="selectMaingroup" style="display:none;">JSMaingroupDelegate</v-btn>
					<v-btn id='btnFuncSubgroupDelegate' @click="selectSubgroup" style="display:none;">JSSubgroupDelegate</v-btn>
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
									<v-card-text>{{ constens.content }}</v-card-text>
								</v-card>
							</v-tab-item>
						</v-tabs-items>
					</v-card>
                </v-col>
            </v-row>			
        </v-container>
		<BackToTop></BackToTop>
    </v-content>
</template>

<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
<script>
	import BackToTop from '@/components/Common/BackToTop.vue'
//	const axios = require('axios').default;
	const url = "https://rmi-services.tecalliance.net/rest/Graphics";
		
	export default {
		name: 'RMI-GRAPHIC',
		data(){
			return{
				mainGroupLists: [],
				subGroupLists: [],
				itemMpLists: [],
				qualColLists: [],
				tabContentsLists: [
					{ tab: '정비 매뉴얼', content: 'TechinicalManual Content' },
					{ tab: '정비 참고 데이터', content: 'AdjustmentData Content' },
					{ tab: '참고 작업', content: 'WorkPosition Content' },
					{ tab: '관련 부품', content: 'LinkedParts Content' },
				],
				mainGroupId: '',
				subGroupId: '',
				itemMpId: '',
				manualId: '',
				qualColId: '',
				rmiAuthKey: '',	
				carTypeId: '',	
				carTcdTypeId: '',
				tab: null,
			}
		},
		components: {
			BackToTop
		},
		created () {
			this.$EventBus.$on('RMI-GRAPHIC.InitData', param => {  
				this.rmiAuthKey = param.rmiAuthKey;
				this.carTypeId = param.carTypeId; 
				this.carTcdTypeId = param.carTcdTypeId; 

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
			selectBodies() {
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
						this.changeManualId();
					}  					
				}
			},
			changeManualId() {
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
					//console.log(page);
					$("#RMISubgroupContents").html(JSON.parse(page));
				}									
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


</style>

