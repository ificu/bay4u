<template>
    <div id = "RMIContents">
        <!--AdjustmentData Content-->
         <v-container class="pa-0">
             <v-row>
                 <v-col cols="12" sm="4" >
                    <v-select
                        v-model="itemMpId"
                        :items="itemMpList"
                        item-text="ItemMpText"
                        item-value="ItemMpId"	
                        label="상세 항목"
                        outlined
                        dense
                        light
                        @change="getAdjust"
                    ></v-select>
                </v-col>		
             </v-row>
             <v-row>
                <div id="AdjustHtml" v-html="htmlText" >
                </div>
            </v-row>
         </v-container>
    </div>
</template>

<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
<script>

    const url = "https://rmi-services.tecalliance.net/rest/Adjust";
    
    export default {
        name: 'COM_ADJUST',
        data(){
            return{
                itemMpList: [],
                itemMpId:'',
                rmiAuthKey :'',
                carTypeId :'',
                htmlText:''
            }
        },
        props:['AdjustData','CarTypeId', 'RmiAuthKey'],
        created(){
            console.log('created');
            this.$EventBus.$on('COM_ADJUST.InitData', data => {
                if(data !== null){
                    this.InitData(data);
                }
                else{
                    console.log('COM_ADJUST.InitData :', null)
                    this.htmlText = '';
                    this.itemMpList = [];
                    this.itemMpId = '';
                }
            });	
        },
        mounted(){
            console.log('mounted');
            //this.htmlText = '';
            //this.itemMpList = [];
            
            /*this.itemMpList = this.AdjustData;
            this.carTypeId = this.CarTypeId;
            this.rmiAuthKey = this.RmiAuthKey;

            if(this.itemMpList.length === 1){
                this.itemMpId = this.itemMpList[0]["ItemMpId"];
                this.getAdjust();
            }*/
        },
        /*beforeDestroy(){
            this.$EventBus.$off('COM_ADJUST.InitData');
        },*/
        methods:{
            InitData(data){
                
                this.htmlText = '';
                this.itemMpList = [];

                this.itemMpList = this.AdjustData;
                this.carTypeId = data.CarTypeId;
                this.rmiAuthKey = data.RmiAuthKey;
                
                if(this.itemMpList.length === 1){
                    this.itemMpId = this.itemMpList[0]["ItemMpId"];
                    this.getAdjust();
                }
            },
            getAdjust() {
                
                this.htmlText = '';

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
                    //console.log(xmlHttp.responseText);
                    let page = xmlHttp.responseText;
                    this.htmlText= JSON.parse(page);
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
    #AdjustHtml{
        margin:15px;
    }
</style>