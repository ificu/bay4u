<template>
    <v-card light>
        <v-card-title
            class="headline grey lighten-2"
        >
            <span>Maintenance Plan</span><span style="font-size:0.75em;margin-left:5px"></span>
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

const url = "https://rmi-services.tecalliance.net/rest/Maintenance";

export default {
    name: 'RMI-CHECKLIST',
    data(){
        return{
            rmiAuthKey: '',
            htmlContents:'',
            workId: '',
            typeId: '',
            qualColId : '',
            target : ''	
        }   
    },
    props:['RmiAuthKey','TypeID', 'WorkId', 'QualColId','Target'],
    created(){

        this.$EventBus.$on('RMI-CHECKLIST.InitData', data => {
            this.InitData(data);
        });	
    },
    mounted(){
        this.rmiAuthKey = this.RmiAuthKey;
        this.typeId = this.TypeID;
        this.workId = this.WorkId;
        this.qualColId = this.QualColId;
        this.target = this.Target;
        this.getCheckList();
    },
    methods: {
        InitData(data){
            this.rmiAuthKey = data.RmiAuthKey;
            this.typeId = data.TypeID;
            this.workId = data.WorkId;
            this.qualColId = data.QualColId;
            this.target = data.Target;
            this.getCheckList();
        },
        getCheckList()
        {
            console.log('CheckData....');
            console.log('typeId :', this.typeId);
            console.log('workId :', this.workId);
            console.log('target :', this.target);

            let params = {};
            
            if(this.target == "Main"){
                params.ServiceWorkIds = [this.workId];
            }
            else{
                params.ServiceWorkIds = [0];
                params.AdditionalWorkIds = [this.workId];
            }
            
            params.BodyQualColId = this.qualColId ;
            params.PrintView = true;
            params.ShowTyreTable = false;
            params.CountryCode = "kr";
            params.LanguageCode = "en";
            params.TypeId = this.TypeID;
            params.LinkUrl = ".";

            console.log('check params :', params);
            
            // Send HTTP request
            let xmlHttp = new XMLHttpRequest();
            xmlHttp.open( 'POST', url + '/MaintenancePlanHtml', false );
            xmlHttp.setRequestHeader( 'Content-type', 'application/json;charset=UTF-8' );
            xmlHttp.setRequestHeader( 'Accept', 'application/json' );
            xmlHttp.setRequestHeader( 'Authorization', this.RmiAuthKey );
            xmlHttp.send( JSON.stringify( params ) );
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