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
					<span class="font-weight-bold" style="color:#fddca9; font-size:15px;" >정기 점검 항목</span>
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
                        <v-card-title class="pa-2 card-title">Main service jobs</v-card-title>
                        <v-treeview
                            dense
                            light
                            :items="itemMainLists"
                            class="tree-contents"
                        ></v-treeview>
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
                        <v-card-title  class="pa-2 card-title">Additional service jobs</v-card-title>
                        <v-treeview
                            dense
                            light
                            :items="itemAddLists"
                            class="tree-contents"
                        ></v-treeview>
                    </v-card>
                </v-col>
            </v-row>            
        </v-container>
    </v-content>
</template>

<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
<script>
//	const axios = require('axios').default;
	const url = "https://rmi-services.tecalliance.net/rest/Maintenance";
		
	export default {
		name: 'RMI-MAINTENANCE',
		data(){
			return{
                qualColId: '',
                itemMainLists:[],
                itemAddLists:[],
				rmiAuthKey: '',	
                carTypeId: '',	
			}
		},
		components: {
		},
		created () {
			this.$EventBus.$on('RMI-MAINTENANCE.InitData', param => {  
				this.rmiAuthKey = param.rmiAuthKey;
				this.carTypeId = param.carTypeId; 
                this.initAuthKey();
                this.initBodiesForMaintenance();
				this.setWorks();
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
            initBodiesForMaintenance()
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
                        this.qualColId = result[0].QualColId;
                        console.log('initBodiesForMaintenance 리턴 : ', this.qualColId);
					}
				} 
            },
			setWorks() {

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
                    //console.log('리턴 : ', JSON.parse(xmlHttp.responseText));
                    
                    var result = JSON.parse(xmlHttp.responseText);
                    var serviceList = result.Services;
                    var additionalWorksList = result.AdditionalWorks;

                    console.log('serviceList : ', serviceList);
                    console.log('additionalWorksList : ', additionalWorksList);

                    this.itemMainLists = serviceList.map(function(obj){
                        var mainObj = {};
                        mainObj.id = obj.ItemMpId;
                        mainObj.name = obj.ItemMpText;
                        mainObj.children = obj.WorkSteps.map( s => ({id:s.WorkId , name:s.WorkText}) );;
                        return mainObj;
                    });

                    this.itemAddLists = additionalWorksList.map(function(obj){
                        var mainObj = {};
                        mainObj.id = obj.ItemMpId;
                        
                        if(obj.AddText.length !== 0)
                            mainObj.name = obj.ItemMpText +  " ["+ obj.AddText+"]";
                        else 
                        mainObj.name = obj.ItemMpText;

                        mainObj.children = obj.WorkSteps.map( s => ({id:s.WorkId , name:s.WorkText}) );;
                        return mainObj;
                    });
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

.contents .tree-contents{
    background-color: white;
    color: black;
    font-size: 1.25em
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