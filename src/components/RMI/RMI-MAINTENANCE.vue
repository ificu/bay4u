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
            <v-row 
                class="pa-2 mt-4 ml-0 mr-0 mainform"
            >
                <v-col>
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
                            open-on-click
                            selectable
                            selected-color="red"
                            v-model="mainJobs"
                        ></v-treeview>
                    </v-card>
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
                            open-on-click
                            selectable
                            selected-color="red"
                            v-model="addJobs"
                        ></v-treeview>
                    </v-card>
                </v-col>
                <v-divider vertical light></v-divider>
                <v-col
                    cols="4"
                    sm="4"
                >
                    <template >
                    main jobs : {{mainJobs}} 
                    add jobs : {{addJobs}}

                        <v-card
                            class="pa-2"
                            outlined
                            tile
                            id = "RMIContents"
                        >
                            <v-card-title  class="pa-2 card-title">Parts</v-card-title>
                            <v-list dense light>
                                <v-list-item
                                    v-for="(item, i) in parts"
                                    :key="i"
                                >
                                <v-list-item-content>
                                    <v-list-item-title>
                                        {{ item.ItemMpText }}
                                    </v-list-item-title>
                                </v-list-item-content>
                                </v-list-item>
                            </v-list>
                        </v-card>
                    </template>
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
	const url = "https://rmi-services.tecalliance.net/rest/Maintenance";
    const partsUrl = "https://rmi-services.tecalliance.net/rest/Prices";
    
	export default {
		name: 'RMI-MAINTENANCE',
		data(){
			return{
                qualColId: '',
                itemMainLists:[],
                itemAddLists:[],
				rmiAuthKey: '',	
                carTypeId: '',
				carTcdTypeId: '',
                mainJobs: [],
                addJobs:[],
                parts:[]
			}
		},
		components: {
            BackToTop
		},
		created () {
			this.$EventBus.$on('RMI-MAINTENANCE.InitData', param => {  
				this.rmiAuthKey = param.rmiAuthKey;
				this.carTypeId = param.carTypeId; 
				this.carTcdTypeId = param.carTcdTypeId; 
                this.initAuthKey();
                this.initBodiesForMaintenance();
				this.setWorks();
			});
        },	
        updated(){
            var mainJogRoot = document.getElementsByClassName('v-treeview-node__root');
            mainJogRoot.forEach(element => {
                if(element.childNodes.length > 2){
                    element.childNodes[1].style.display = "none";
                }
            });
            
            /*if(this.mainJobs.length > 0){
                console.log('mainJobs : ',this.mainJobs);
                this.getItemMpId();
            }*/
        },
        mounted() {

            /*var self = this;     
            window.addEventListener("scroll", function (e) {
                var scrolled = document.scrollingElement.scrollTop;
            // console.log(scrolled);
                self.initToTopButton(scrolled);
            });
             */
            
            /*var mainTree = document.getElementById('mainjob-tree');
            console.log('mainTree: ',mainTree)
            mainTree.addEventListener("click", function (e) {
                 console.log('click event : ', e);
             });*/
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
                        if(result.length > 0){
                            this.qualColId = result[0].QualColId;
                            console.log('initBodiesForMaintenance 리턴 : ', this.qualColId);
                        }
                        else{
                            this.itemMainLists = [];
                            this.itemAddLists = [];
                        }
					}
				} 
            },
			setWorks() {

                this.itemMainLists = [];
                this.itemAddLists = [];

                this.mainJobs = [];

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

                    this.$nextTick(function(){
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
                    });
				} 
            },
            getItemMpId()
            {
                let languageCode = 'en',
                    countryCode = 'kr',
                    typeId = this.carTypeId;		
                    
                // Build url query string
                let query = '?languageCode=' + languageCode
                    + '&countryCode=' + countryCode
                    + '&typeId=' + typeId
                
                let params = {
					SelectedWorkIds: this.mainJobs,
                    CountryCode: "kr",
                    LanguageCode: "en",
                    TypeId: this.carTypeId,
                    ShowPaint: false
				};
                
                // Send HTTP request
                let xmlHttp = new XMLHttpRequest();
                xmlHttp.open( 'POST', partsUrl + '/PartsForWorks', false );
                xmlHttp.setRequestHeader( 'Content-type', 'application/json;charset=UTF-8' );
				xmlHttp.setRequestHeader( 'Accept', 'application/json' );
				xmlHttp.setRequestHeader( 'Authorization', this.rmiAuthKey );
                xmlHttp.send( JSON.stringify( params ) );

                // Handle HTTP response
                if(xmlHttp.status == 200) {
                    var result = JSON.parse(xmlHttp.responseText);
                    console.log('리턴 : ', result);
                    this.parts = result;
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
.contents .card-title{
    background-color: #37474F;
    color:white;
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

#RMIContents {
	background-color: white; 
	color: black;
    border-radius: 5px;
	/*border-style: solid;
	border-radius: 5px;
	border-width: thick;
	border-color: #fddca9;*/
}

</style>