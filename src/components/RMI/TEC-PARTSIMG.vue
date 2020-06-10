<template>
    <v-card light>
        <v-card-title class="headline grey lighten-2">
        <span style="font-size:0.8em">{{artInfo}}</span>
        </v-card-title>           
        <v-card-text class="mt-2">
            <img :src="imgUrl" class="parts-image">
        </v-card-text>
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
    const tecdocUrl = "https://webservice.tecalliance.services/pegasus-3-0/services/TecdocToCatDLB.jsonEndpoint?js";
    const tecApiKey = '2BeBXg6CxtgP7fnQvXr45SzqpEVDcDTGSJd1viDM6VHGJ7bxjDy5';
    const tecProvider = 22261;

    export default {
        name: 'TEC-PARTSIMG',
        data(){
            return{
                partsInfo :{},
                tecTypeId : '',
                artInfo: '',
                imgUrl : ''
            }   
        },
        props:['PartsInfo', 'TecTypeID'],
        created(){
            this.$EventBus.$on('RMI-PARTSIMG.InitData', data => {
                this.InitData(data);
            });	
        },
        mounted(){
            this.partsInfo = this.PartsInfo;
            this.tecTypeId = this.TecTypeID;
            this.getPartsImage();
        },
        methods:{
            InitData(data){
                this.partsInfo = data.PartsInfo;
                this.tecTypeId = data.TecTypeId;
                this.getPartsImage();
            },
            getPartsImage(){
                console.log('CheckData....');
                console.log('PartsInfo :', this.partsInfo);
                console.log('TecTypeId :', this.tecTypeId);

                this.imgUrl = '';
                this.artInfo = this.partsInfo.brandName + " / " + this.partsInfo.articleNo;
                let params = {
                    "getArticles": {
                        "articleCountry": "kr",
                        "provider": tecProvider,
                        "dataSupplierIds": this.partsInfo.brandNo,
                        "genericArticleIds": this.partsInfo.genericArticleId,
                        "linkageTargetId": this.tecTypeId,
                        "linkageTargetType": "P",
                        "lang": "en",
                        "includeImages": true
                    }
                };

                // Send HTTP request
                let xmlHttp = new XMLHttpRequest();
				xmlHttp.open( 'POST', tecdocUrl, false );
				xmlHttp.setRequestHeader( 'Content-type', 'application/json;charset=UTF-8' );
                xmlHttp.setRequestHeader( 'Accept', 'application/json' );
                xmlHttp.setRequestHeader( 'x-api-key', tecApiKey);
				xmlHttp.send( JSON.stringify( params ) );

				// Handle HTTP response
				if(xmlHttp.status == 200) {
                    console.log('image :',JSON.parse(xmlHttp.responseText));
                    var result = JSON.parse(xmlHttp.responseText).articles[0];
                    if(result.images.length > 0){
                        this.imgUrl = result.images[0].imageURL800;
                    }
                    else{
                        alert('상세 이미지가 없습니다.');
                        this.$emit('close');
                    }
				}
            },
        }
    }
</script>