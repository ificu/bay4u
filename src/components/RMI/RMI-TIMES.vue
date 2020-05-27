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
                        <v-treeview
                            dense
                            light
                            :items="itemMpLists"
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
    import {arrayGroupBy, groupBy} from '@/utils/common.js'
//	const axios = require('axios').default;
	const url = "https://rmi-services.tecalliance.net/rest/Times";
		
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
				itemMpId: '',
				rmiAuthKey: '',	
                carTypeId: '',	
                groupList:[],
			}
		},
		components: {
		},
		created () {
			this.$EventBus.$on('RMI-TIMES.InitData', param => {  
				this.rmiAuthKey = param.rmiAuthKey;
				this.carTypeId = param.carTypeId; 
                this.initAuthKey();
                this.initBodiesForTimes();
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
                        this.qualColId = result[0].QualColId;
                        console.log('initBodiesForTimes 리턴 : ', this.qualColId);
					}
				} 
            },
			setMainGroup() {
				this.mainGroupLists = [];
				this.subGroupLists = [];
				this.itemMpLists = [];

				this.mainGroupId = '';
				this.subGroupId = '';
				this.itemMpId = '';

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
				this.itemMpId = '';

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
                    //console.log('리턴 : ', JSON.parse(xmlHttp.responseText));

                    var list = JSON.parse(xmlHttp.responseText);
                    this.itemMpLists = Object.values(groupBy(list, 'ItemMpId', 'ItemMpText')).map(function(obj){
                    var rObj = {};
                    rObj.id = obj.id;
                    rObj.name = obj.name;
                    //rObj.children = obj;
                    rObj.children = Object.values(groupBy(obj, 'KorId', 'KorText')).map(function(subObj){
                        var subItem = {};
                        subItem.id = subObj.id;
                        subItem.name = subObj.name;
                        subItem.children = subObj.map(function(subObj2){

                            var subItem2 = {};
                            subItem2.id = subObj2.WorkId;
                            subItem2.name = subObj2.WorkText + ' [' +subObj2.QualColText+']';
                            return subItem2;
                        });
                        //subItem.children = subObj;
                        return subItem;
                    });
                    return rObj;
                });
                //console.log('리턴 : ', this.itemMpLists);

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

