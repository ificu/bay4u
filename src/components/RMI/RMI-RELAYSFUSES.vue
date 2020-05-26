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
					<span class="font-weight-bold" style="color:#fddca9; font-size:15px;" >Fueses & Relay</span>
                    </v-card>
                </v-col>
            </v-row>  			
            <v-row>
                <v-col cols="12" sm="3" >
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
                <v-col cols="12" sm="3" >
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
                <v-col cols="12" sm="3" >
					<v-card>
							<v-select
								class="pa-4 pb-0 pt-6 adjustSelect"
								v-model="itemMpId"
								:items="itemMpLists"
								item-text="ItemMpText"
								item-value="ItemMpId"	
								label="상세 항목"
								outlined
								dense
								@change="changeItemMp"
								>
							</v-select>
					</v-card>
                </v-col>
                <v-col cols="12" sm="3" >
					<v-card>
							<v-select
								class="pa-4 pb-0 pt-6 adjustSelect"
								v-model="boxConfigurationId"
								:items="qualColLists"
								item-text="QualColText"
								item-value="BoxConfigurationId"	
								label="매뉴얼 구분"
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
    </v-content>
</template>

<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
<script>
//	const axios = require('axios').default;
	const url = "https://rmi-services.tecalliance.net/rest/RelaysFuses";
		
	export default {
		name: 'RMI-RELAYSFUSES',
		data(){
			return{
				mainGroupLists: [],
				subGroupLists: [],
				itemMpLists: [],
				qualColLists: [],
				mainGroupId: '',
				subGroupId: '',
				itemMpId: '',
                manualId: '',
                boxConfigurationId:'',
				rmiAuthKey: '',	
				carTypeId: '',
				componentTypeId: 0,		
			}
		},
		components: {
		},
		created () {
			this.$EventBus.$on('RMI-RELAYSFUSES.InitData', param => {  
				this.rmiAuthKey = param.rmiAuthKey;
				this.carTypeId = param.carTypeId; 
				this.initAuthKey();
				this.initComponentsForType();
				this.setMainGroup();
				//this.getBoxOverviewHtml();
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
			initComponentsForType()
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
					xmlHttp.open( 'GET', url + '/ComponentsForType' + query, false );
					xmlHttp.setRequestHeader( 'Content-type', 'application/json;charset=UTF-8' );
					xmlHttp.setRequestHeader( 'Accept', 'application/json' );
					xmlHttp.setRequestHeader( 'Authorization', this.rmiAuthKey );
					xmlHttp.send( null );
					
					// Handle HTTP response
					if(xmlHttp.status == 200) {
						//console.log('initComponentsForType 리턴 : ', JSON.parse(xmlHttp.responseText));
                        var result = JSON.parse(xmlHttp.responseText);
                        this.componentTypeId = result[0].ComponentTypeId;
                        console.log('initComponentsForType 리턴 : ', this.componentTypeId);
					}
				} 
            },
			setMainGroup() {
				this.mainGroupLists = [];
				this.subGroupLists = [];
				this.itemMpLists = [];
				this.qualColLists = [];

				this.mainGroupId = '';
				this.subGroupId = '';
				this.itemMpId = '';
				this.manualId = '';

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
					xmlHttp.open( 'GET', url + '/BoxConfigurations' + query, false );
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
				this.qualColLists = [];

				this.itemMpId = '';
				this.manualId = '';

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
				this.qualColLists = [];

				this.manualId = '';				

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
                var selected = this.itemMpId;
                
                this.qualColLists = this.itemMpLists.reduce(function (pre, value) {
					if(value.ItemMpId === selected) {
						return [...pre, ...value.BoxConfigurations];
					}
					else {
						return pre;
					}
                }, []);	
                
                console.log('changeItemMp 리턴 : ', this.qualColLists);
			},
			changeManualId() {

                console.log('changeManualId 리턴 : ', this.qualColLists);

				let languageCode = 'en',
					countryCode = 'kr',
					printView = true,
					linkUrl = '.',
                    boxConfigurationMappingId = this.boxConfigurationId,
                    buildPeriodQualColId = 0,
                    typeId = this.carTypeId,
                    componentTypeId = this.componentTypeId;		
					
				// Build url query string
                let query = '?languageCode=' + languageCode
                    + '&componentTypeId=' + componentTypeId
					+ '&countryCode=' + countryCode
					+ '&typeId=' + typeId	
                    + '&boxConfigurationMappingId=' + boxConfigurationMappingId
                    + '&buildPeriodQualColId=' + buildPeriodQualColId	
					+ '&printView=' + printView	
					+ '&linkUrl=' + linkUrl	
                
				// Send HTTP request
				let xmlHttp = new XMLHttpRequest();
				xmlHttp.open( 'GET', url + '/BoxDetailHtml' + query, false );
				xmlHttp.setRequestHeader( 'Content-type', 'application/json;charset=UTF-8' );
				xmlHttp.setRequestHeader( 'Accept', 'application/json' );
				xmlHttp.setRequestHeader( 'Authorization', this.rmiAuthKey );
				xmlHttp.send( null );
				// Handle HTTP response
				if(xmlHttp.status == 200) {
                    //console.log(xmlHttp.responseText);
                    //const paragraph = xmlHttp.responseText;
                    //const regex = "<img[^>]*src=[\"']?([^>\"']+)[\"']?[^>]*>";
                    //const found = paragraph.match(regex)[0];
                    //let page = xmlHttp.responseText.replace(found, '');
                    //console.log(page); 
                    //$("#RMIContents").html(JSON.parse(page));
                    $("#RMIContents").html(JSON.parse(xmlHttp.responseText));    
					
					var table = document.getElementsByTagName('table');
                    table[table.length -1].style.display = "none";

                    var hr = document.getElementsByTagName('hr');
                    hr[hr.length -1].style.display = "none";
				}
            },
            
            getBoxOverviewHtml()
            {
                let languageCode = 'en',
					countryCode = 'kr',
					componentTypeId = 0,
					linkUrl = '.',
					typeId = this.carTypeId;		
					
				// Build url query string
                let query = '?componentTypeId='+componentTypeId
                    + '&languageCode=' + languageCode
					+ '&countryCode=' + countryCode
					+ '&typeId=' + typeId	
					+ '&linkUrl=' + linkUrl	
		
				
				// Send HTTP request
				let xmlHttp = new XMLHttpRequest();
				xmlHttp.open( 'GET', url + '/BoxOverviewHtml' + query, false );
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
            },
            getBoxDetailHtml(){
                let languageCode = 'en',
					countryCode = 'kr',
					componentTypeId = 0,
					linkUrl = '.',
                    typeId = this.carTypeId,
                    printView = false,
                    boxConfigurationMappingId = 3652,
                    buildPeriodQualColId = 0;
					
				// Build url query string
                let query = '?componentTypeId='+componentTypeId
                    + '&languageCode=' + languageCode
					+ '&countryCode=' + countryCode
					+ '&typeId=' + typeId	
                    + '&linkUrl=' + linkUrl	
                    + '&printView=' + printView	
                    + '&boxConfigurationMappingId=' + boxConfigurationMappingId
                    + '&buildPeriodQualColId=' + buildPeriodQualColId
				
				// Send HTTP request
				let xmlHttp = new XMLHttpRequest();
				xmlHttp.open( 'GET', url + '/BoxOverviewHtml' + query, false );
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