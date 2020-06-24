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
						<v-icon class="mx-4" style="color:#fddca9; font-size:18px;" >  mdi-arrange-send-backward </v-icon>
						<span class="font-weight-bold" style="color:#fddca9; font-size:15px;" >차량 경보등</span>				
                    </v-card>
                </v-col>
                <v-col cols="12" sm="2">
					<v-card>
							<v-select
								class="pa-4 pb-0 pt-4 adjustSelect"
								v-model="manualId"
								:items="manualLists"
								item-text="ManualName"
								item-value="ManualId"								
								label="색상"
								outlined
								dense
								@change="changeManualId"
								>
							</v-select>
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
						id = "RMIContents"
                    >
                    </v-card>
                </v-col>
            </v-row>   			
        </v-container>
		<BackToTop></BackToTop>
		<Progress v-if="isLoaded"></Progress>
    </v-content>
</template>

<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
<script>
	import BackToTop from '@/components/Common/BackToTop.vue'
	import Progress from '@/components/Common/Progress.vue'

//	const axios = require('axios').default;
	const url = "https://rmi-services.tecalliance.net/rest/Manuals";
		
	export default {
		name: 'RMI-WARNING',
		data(){
			return{
				manualLists: [{'ManualId': '141337', 'ManualName': 'Blue'}, {'ManualId': '141349', 'ManualName': 'Green'}, {'ManualId': '141351', 'ManualName': 'Red'}, {'ManualId': '141350', 'ManualName': 'Yellow'}],
				manualId: '',
				rmiAuthKey: '',	
				carTypeId: '',
				isLoaded: false	
			}
		},
		components: {
			BackToTop,
			Progress
		},
		created () {
			this.$EventBus.$on('RMI-WARNING.InitData', param => {  
				this.rmiAuthKey = param.rmiAuthKey;
				this.carTypeId = param.carTypeId; 
				this.initAuthKey();
				$("#RMIContents").html('');
				
				if(this.manualId !== ''){
					this.changeManualId();
				}
			});
		},
		beforeDestroy(){
            this.$EventBus.$off('RMI-WARNING.InitData');
		},
		updated () {
            this.$nextTick(() => {
                if(this.isLoaded){
                    this.isLoaded = false;
                }
            })
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
			changeManualId() {
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
				
				this.isLoaded = true;

				// Send HTTP request
				let xmlHttp = new XMLHttpRequest();
				xmlHttp.open( 'GET', url + '/ManualHtml' + query, false );
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


#carBody {
  background-color:red;
  color: black;
  font-size: 12px;
}


</style>

