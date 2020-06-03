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
						<span class="font-weight-bold" style="color:#fddca9; font-size:15px;" >OVERVIEW</span>				
                    </v-card>
                </v-col>
            </v-row>
            <v-row class="pr-6 pl-6">
                <v-col cols="12" sm="12" >
                    <v-card
                        class="pa-2"
                        outlined
                        tile
						id = "OverviewSubTitle1"
                    >
						<v-icon class="mx-4" style="color:#414bb2; font-size:18px;" >  mdi-engine-outline </v-icon>
						<span class="font-weight-bold" style="font-size:15px;" >엔진 관련</span>				
                    </v-card>
                </v-col>
            </v-row> 	
            <v-row class="pr-6 pl-6 mt-n5">
                <v-col cols="12" sm="12" >
					<v-simple-table id="OverviewSubTable1">
						<template v-slot:default>
							<tbody>
								<tr v-for="item in engineAdjustList" :key="item.QualCol">
									<td>{{ item.Classfication }}</td>
									<td>{{ item.QualCol }}</td>
									<td>{{ item.Value }}</td>								
								</tr>
							</tbody>
						</template>
					</v-simple-table>
                </v-col>
            </v-row>
            <v-row class="pr-6 pl-6">
                <v-col cols="12" sm="12" >
                    <v-card
                        class="pa-2"
                        outlined
                        tile
						id = "OverviewSubTitle2"
                    >
						<v-icon class="mx-4" style="color:#9410ac; font-size:18px;" >  mdi-air-filter </v-icon>
						<span class="font-weight-bold" style="font-size:15px;" >소모품 교환 주기</span>				
                    </v-card>
                </v-col>
            </v-row> 	
            <v-row class="pr-6 pl-6 mt-n5">
                <v-col cols="12" sm="12" >
					<v-simple-table id="OverviewSubTable2">
						<template v-slot:default>
							<tbody>
								<tr v-for="item in changeIntervalAdjustList" :key="item.QualCol">
									<td>{{ item.Classfication }}</td>
									<td>{{ item.QualCol }}</td>
									<td>{{ item.Value }}</td>								
								</tr>
							</tbody>
						</template>
					</v-simple-table>
                </v-col>
            </v-row>			
        </v-container>
		<BackToTop></BackToTop>
    </v-content>
</template>

<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
<script>
	import BackToTop from '@/components/Common/BackToTop.vue'
	const url = "https://rmi-services.tecalliance.net/rest/Adjust";
		
	export default {
		name: 'RMI-OVERVIEW',
		data(){
			return{
				manualLists: [],
				desserts: [
					{
					name: 'Frozen Yogurt',
					calories: 159,
					},
					{
					name: 'Ice cream sandwich',
					calories: 237,
					},
					{
					name: 'Eclair',
					calories: 262,
					},
					{
					name: 'Cupcake',
					calories: 305,
					},
				],
				engineAdjustList: [],
				changeIntervalAdjustList: [],
				manualId: '',
				rmiAuthKey: '',	
				carTypeId: '',			
			}
		},
		components: {
			BackToTop
		},
		created () {
			this.$EventBus.$on('RMI-OVERVIEW.InitData', param => {  
				this.rmiAuthKey = param.rmiAuthKey;
				this.carTypeId = param.carTypeId; 
				this.initAuthKey();
				this.setEngineAdjustList();
				this.setChangeIntervalAdjustList();
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
			addListView(viewList, itemMpId, classfication) {
				let languageCode = 'en',
					countryCode = 'kr',
					typeId = this.carTypeId;		
					
				let query = '?languageCode=' + languageCode
					+ '&countryCode=' + countryCode
					+ '&typeId=' + typeId	
					+ '&itemMpId=' + itemMpId

				let xmlHttp = new XMLHttpRequest();
				xmlHttp.open( 'GET', url + '/ItemMpData' + query, false );
				xmlHttp.setRequestHeader( 'Content-type', 'application/json;charset=UTF-8' );
				xmlHttp.setRequestHeader( 'Accept', 'application/json' );
				xmlHttp.setRequestHeader( 'Authorization', this.rmiAuthKey );
				xmlHttp.send( null );
				
				if(xmlHttp.status == 200) {
					viewList = JSON.parse(xmlHttp.responseText).Values.reduce(function (pre, value) {
						let tempText = value.ValueText;
						if(value.QuantityText === "litres") tempText = value.ValueText.replace(",", ".") + " " + value.QuantityText;
						if(value.AdditionalText !== "") tempText = tempText + " (" + value.AdditionalText + ")";
						pre.push({
							"Classfication" : classfication,
							"QualCol" : value.QualColText,
							"Value" : tempText
						});
						return pre;
					}, viewList);
				}
			},
			setEngineAdjustList() {
				this.engineAdjustList = [];

				if(this.carTypeId !== undefined && this.carTypeId !== '' ) {
					///////////////// 1. Engine oil with filter 조회 /////////////////
					this.addListView(this.engineAdjustList, 2645, "1) 엔진오일량");

					///////////////// 2. Engine oil specification 조회 /////////////////
					this.addListView(this.engineAdjustList, 2646, "2) 엔진오일 사양");

					///////////////// 3. Engine oil viscosity 조회 /////////////////
					this.addListView(this.engineAdjustList, 15887, "3) 엔진오일 점도");

					///////////////// 4. Coolant 조회 /////////////////
					this.addListView(this.engineAdjustList, 2659, "4) 엔진 냉각수");
				}       
			},
			setChangeIntervalAdjustList() {
				this.changeIntervalAdjustList = [];

				if(this.carTypeId !== undefined && this.carTypeId !== '' ) {
					///////////////// 1. Air filter change interval 조회 /////////////////
					this.addListView(this.changeIntervalAdjustList, 2691, "1) 에어필터 교환 주기");

					///////////////// 2. Fuel filter change interval 조회 /////////////////
					this.addListView(this.changeIntervalAdjustList, 2692, "2) 연료필터 교환 주기");

					///////////////// 3. Brake fluid change interval 조회 /////////////////
					this.addListView(this.changeIntervalAdjustList, 2693, "3) 브레이크액 교환 주기");

					///////////////// 4. Engine oil and filter change interval 조회 /////////////////
					this.addListView(this.changeIntervalAdjustList, 2700, "4) 엔진오일/필터 교환 주기");

					///////////////// 5. Interior filter change interval 조회 /////////////////
					this.addListView(this.changeIntervalAdjustList, 2707, "5) 에어컨필터 교환 주기");
				}    
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

.contents .adjustSelect {
  background-color: #666;
  font-size: 12px;
}

.contents .border {
  border: 2px dashed orange;
}

#OverviewSubTitle1, #OverviewSubTable1 {
	background: #eee;
	color:#414bb2;
	border-style: solid;
	border-width: 1px;
	border-color: #414bb2;
}
#OverviewSubTitle2, #OverviewSubTable2 {
	background: #eee;
	color: #9410ac;
	border-style: solid;
	border-width: 1px;
	border-color: #9410ac;
}

</style>

