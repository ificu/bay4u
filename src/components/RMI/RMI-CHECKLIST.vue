<template>
    <v-card light>
        <v-card-title
            class="headline grey lighten-2"
        >
            <span>Check List</span><span style="font-size:0.75em;margin-left:5px"></span>
        </v-card-title>           
        <v-card-title class="pt-4 font-weight-black" v-html="htmlContents" >    
        </v-card-title>
        <v-divider></v-divider>
        <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
                color="primary"
                text
                @click="$emit('close')"
            >
            close
            </v-btn>
        </v-card-actions>
    </v-card>
</template>

<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
<script>

const sosUrl = "https://rmi-services.tecalliance.net/rest/Bulletins";

export default {
    name: 'RMI-CHECKLIST',
    data(){
        return{
            rmiAuthKey: '',
            htmlContents:'',
            manualId: '',
            typeId: ''	
        }   
    },
    props:['RmiAuthKey','TypeID', 'ManualID'],
    created(){

        this.$EventBus.$on('RMI-CHECKLIST.InitData', data => {
            this.InitData();
        });	
    },
    mounted(){
        this.InitData();
    },
    methods: {
        InitData(){
            this.rmiAuthKey = this.RmiAuthKey;
            this.typeId = this.TypeID;
            this.manualId = this.ManualID;
            this.getCheckList();

            console.log('InitData....');
            console.log('typeId :', this.typeId);
            console.log('manualId :', this.manualId);

        },
        getCheckList()
        {
            console.log('getCheckList');
            let languageCode = 'en',
                countryCode = 'kr',
                kindOfWorkTime = 1,
                printView = true,
                linkUrl = '.',
                manualId = this.ManualID,
                typeId = this.TypeID;		
                
            // Build url query string
            let query = '?languageCode=' + languageCode
                + '&countryCode=' + countryCode
                + '&typeId=' + typeId	
                + '&manualId=' + manualId	
                + '&printView=' + printView
                + '&kindOfWorkTime=' + kindOfWorkTime	
                + '&linkUrl=' + linkUrl	
            
            console.log('query:', query);
            // Send HTTP request
            let xmlHttp = new XMLHttpRequest();
            xmlHttp.open( 'GET', sosUrl + '/ManualHtml' + query, false );
            xmlHttp.setRequestHeader( 'Content-type', 'application/json;charset=UTF-8' );
            xmlHttp.setRequestHeader( 'Accept', 'application/json' );
            xmlHttp.setRequestHeader( 'Authorization', this.RmiAuthKey );
            xmlHttp.send( null );
            // Handle HTTP response
            if(xmlHttp.status == 200) {
                //console.log(xmlHttp.responseText);
                this.htmlContents = JSON.parse(xmlHttp.responseText);
            }	
            this.checkDialog = true;
        }    
    },
}
</script>