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
				<v-chip class="pa-4 ma-2" v-for="(category, index) in categoryLists" v-bind:key = "index" v-bind:color="colorList[index]" outlined link>
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
	const url = "https://rmi-services.tecalliance.net/rest/Adjust";
		
	export default {
		name: 'RMI-CATEGORY',
		data(){
			return{
				colorList: ['red', 'pink', 'purple', 'indigo', 'blue', 'cyan', 'teal', 'green', 'orange', 'deep-orange', 'brown', 'blue-grey', 
							'red accent-4', 'pink accent-4', 'purple accent-4', 'indigo accent-4', 'blue accent-4', 'cyan accent-4', 'teal accent-4', 'green accent-4', 'orange accent-4', 'deep-orange accent-4', 'brown accent-4', 'blue-grey accent-4'],
				categoryLists: [
					{
						"shortCutId": 2,
						"shortCutName": "Body"
					},
					{
						"shortCutId": 3,
						"shortCutName": "Engine"
					},
					{
						"shortCutId": 4,
						"shortCutName": "Drive Train"
					},
					{
						"shortCutId": 5,
						"shortCutName": "Filter"
					},
					{
						"shortCutId": 6,
						"shortCutName": "Windows/Window Cleaning"
					},
					{
						"shortCutId": 7,
						"shortCutName": "Fuel Mixture Formation"
					},
					{
						"shortCutId": 8,
						"shortCutName": "Suspension"
					},
					{
						"shortCutId": 9,
						"shortCutName": "Brakes"
					},
					{
						"shortCutId": 10,
						"shortCutName": "Exhaust System"
					},
					{
						"shortCutId": 11,
						"shortCutName": "Cooling/Air Conditioning"
					},
					{
						"shortCutId": 12,
						"shortCutName": "Steering"
					},
					{
						"shortCutId": 13,
						"shortCutName": "Interior Equipment"
					},
					{
						"shortCutId": 14,
						"shortCutName": "Lights"
					},
					{
						"shortCutId": 15,
						"shortCutName": "Electrics"
					},
					{
						"shortCutId": 16,
						"shortCutName": "Spark/Glow Ignition"
					},
					{
						"shortCutId": 17,
						"shortCutName": "Accessories"
					},
					{
						"shortCutId": 18,
						"shortCutName": "Service"
					}
				],
				mainGroupLists: [],
				subGroupLists: [],
				itemMpLists: [],
				mainGroupId: '',
				subGroupId: '',
				itemMpId: '',
				rmiAuthKey: '',	
				carTypeId: '',			
			}
		},
		components: {
			BackToTop
		},
		created () {
			this.$EventBus.$on('RMI-CATEGORY.InitData', param => {  
				this.rmiAuthKey = param.rmiAuthKey;
				this.carTypeId = param.carTypeId; 
				this.initAuthKey();
				this.setMainGroup();
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
			setMainGroup() {
				this.mainGroupLists = [];
				this.subGroupLists = [];
				this.itemMpLists = [];

				this.mainGroupId = '';
				this.subGroupId = '';
				this.itemMpId = '';

				$("#RMIContents").html('');

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
					xmlHttp.open( 'GET', url + '/List' + query, false );
					xmlHttp.setRequestHeader( 'Content-type', 'application/json;charset=UTF-8' );
					xmlHttp.setRequestHeader( 'Accept', 'application/json' );
					xmlHttp.setRequestHeader( 'Authorization', this.rmiAuthKey );
					xmlHttp.send( null );
					
					// Handle HTTP response
					if(xmlHttp.status == 200) {
						console.log('changeMainGroup 리턴 : ', JSON.parse(xmlHttp.responseText));
						this.mainGroupLists = JSON.parse(xmlHttp.responseText);
					}

				}       
			},
			changeMainGroup() {
				var selected = this.mainGroupId;
				this.itemMpLists = [];
				this.itemMpId = '';

				$("#RMIContents").html('');

				this.subGroupLists = this.mainGroupLists.reduce(function (pre, value) {
					if(value.MainGroupId === selected) {
						return [...pre, ...value.SubGroups];
					}
					else {
						return pre;
					}
				}, []);	
			},
			changeSubGroup() {
				var selected = this.subGroupId;

				$("#RMIContents").html('');

				this.itemMpLists = this.subGroupLists.reduce(function (pre, value) {
					if(value.SubGroupId === selected) {
						return [...pre, ...value.ItemMps];
					}
					else {
						return pre;
					}
				}, []);	
			},
			changeItemMp() {
				let languageCode = 'en',
					countryCode = 'kr',
					printView = true,
					linkUrl = '.',
					itemMpId = this.itemMpId,
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
				xmlHttp.open( 'GET', url + '/ItemHtml' + query, false );
				xmlHttp.setRequestHeader( 'Content-type', 'application/json;charset=UTF-8' );
				xmlHttp.setRequestHeader( 'Accept', 'application/json' );
				xmlHttp.setRequestHeader( 'Authorization', this.rmiAuthKey );
				xmlHttp.send( null );
				// Handle HTTP response
				if(xmlHttp.status == 200) {
					console.log(xmlHttp.responseText);
					let page = xmlHttp.responseText.replace('<img src=\"https://rmi-cdn.tecalliance.net/services/Logo.png\" height=\"60px\" border=\"0\" alt=\"\"/>\r\n', '');
					$("#RMIContents").html(JSON.parse(page));
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

#RMIContents {
	background-color: white; 
	color: black;
	border-style: solid;
	border-radius: 5px;
	border-width: thick;
	border-color: #fddca9;
}

</style>

