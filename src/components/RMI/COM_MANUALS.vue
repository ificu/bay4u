<template>
    <div id = "RMIContents" >
        <!--TechinicalManual Content-->
        <v-container class="pa-0">
            <v-row>
                <v-col cols="12" sm="3"  >
                    <v-select
                        v-model="itemMpId"
                        :items="itemMpList"
                        item-text="ItemMpText"
                        item-value="ItemMpId"	
                        label="항목"
                        outlined
                        dense
                        light
                        @change="changeItemMp"
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
                        @change="getManual"
                    >
                    </v-select>
                </v-col>
            </v-row>
            <v-row>
                <div id="ManualHtml" v-html="htmlText">
                </div>
            </v-row>
        </v-container>
    </div>
</template>

<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
<script>
    
    const url = "https://rmi-services.tecalliance.net/rest/Manuals";

    export default {
        name: 'COM_MANUALS',
        data(){
            return{
                itemMpList: [],
                itemMpId:'',
                manualList:[],
                manualId:'',
                rmiAuthKey :'',
                carTypeId :'',
                htmlText: ''
            }
        },
        props:['ManualData','CarTypeId', 'RmiAuthKey'],
        created(){
            this.$EventBus.$on('COM_MANUALS.InitData', data => {
                console.log('created :',data );
            
                if(data !== null){
                    this.InitData(data);
                }
                else{
                    this.htmlText = '';
                    this.itemMpList = [];
                    this.manualList = [];
                }
            });	
        },
        mounted(){
            console.log('mounted :', this.ManualData);
            /*this.htmlText = '';
            this.manualList = [];

            if(this.ManualData.length === 0)return;

            this.carTypeId = this.CarTypeId;
            this.rmiAuthKey = this.RmiAuthKey;
            this.itemMpList = this.ManualData;

            if(this.itemMpList.length === 1){
                this.itemMpId = this.itemMpList[0]["ItemMpId"];
                this.changeItemMp();
            }*/
        },
        beforeDestroy(){
            this.$EventBus.$off('COM_MANUALS.InitData');
        },
        methods:{
            InitData(data){

                this.htmlText = '';
                this.manualList = [];

                if(data.ManualData.length === 0)return;

                this.$nextTick(function(){
                    
                    this.carTypeId = data.CarTypeId;
                    this.rmiAuthKey = data.RmiAuthKey;
                    this.itemMpList = this.ManualData;

                    if(this.itemMpList.length === 1){
                        this.itemMpId = this.itemMpList[0]["ItemMpId"];
                        this.changeItemMp();
                    }
                });
            },
            changeItemMp() {
				var selected = this.itemMpId;

                this.htmlText = '';
                this.manualList = [];

				this.manualList = this.itemMpList.reduce(function (pre, value) {
					if(value.ItemMpId === selected) {
						return [...pre, ...value.Manuals];
					}
					else {
						return pre;
					}
                }, []);	
                
                if(this.manualList.length === 1) {
                    this.manualId = this.manualList[0]["ManualId"];
                    this.getManual();
                }    
			},
            getManual() {
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
				xmlHttp.open( 'GET', url + '/ManualHtml' + query, false );
				xmlHttp.setRequestHeader( 'Content-type', 'application/json;charset=UTF-8' );
				xmlHttp.setRequestHeader( 'Accept', 'application/json' );
				xmlHttp.setRequestHeader( 'Authorization', this.rmiAuthKey );
				xmlHttp.send( null );
				// Handle HTTP response
				if(xmlHttp.status == 200) {
					//console.log(xmlHttp.responseText);
					let page = xmlHttp.responseText;
                    this.htmlText = JSON.parse(page);
				}	
			}
        }
    }
</script>
<style scoped>
    #RMIContents {
        background-color: white; 
        color: black;
        padding: 10px;
        border-radius: 3px;
        border: 2px solid white;
    }
    #ManualHtml{
        padding: 15px;
    }
</style>