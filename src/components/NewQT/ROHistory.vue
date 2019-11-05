<template>
<v-row align="center">
    <div>       
    <v-expansion-panels focusable>
        <v-expansion-panel
            v-for="(roItem,i) in roList"
            :key="i"
        >
        <v-expansion-panel-header>
            <v-row no-gutters>
                 <v-col>                           
                    <v-icon small color="#A9A9A9">fas fa-calendar-alt</v-icon> {{roItem.DC_DY_BSN}}            
                </v-col>
                 <v-col>
                <v-flex text-xs-right text-sm-left >
                   <v-icon small color="#A9A9A9">far fa-credit-card</v-icon>
                   {{roItem.RO_AMT | localeNum}}원  
                </v-flex>     
                </v-col>               
                </v-row>
            <template v-slot:actions>
                <v-icon color="primary">$expand</v-icon>
            </template> 
        </v-expansion-panel-header>
        <v-expansion-panel-content>
             <v-list-item three-line>
                <v-list-item-content>
                    <v-list-item-title><v-icon small color="indigo">fas fa-car</v-icon> 차정명</v-list-item-title>
                    <v-list-item-subtitle>{{roItem.NM_CR_TEC}}</v-list-item-subtitle>
                </v-list-item-content>
                </v-list-item>
               <!-- <v-divider></v-divider>-->
                <v-list-item two-line>
                <v-list-item-content>
                    <v-list-item-title> <v-icon small color="indigo">mdi-wrench</v-icon> 수리내역</v-list-item-title>
                    <v-list-item-subtitle> {{roItem.RO_NM}}</v-list-item-subtitle>
                </v-list-item-content>
                </v-list-item>
        </v-expansion-panel-content>
        </v-expansion-panel>
    </v-expansion-panels>
    </div>
</v-row>
</template>
<script src="https://unpkg.com/axios/dist/axios.min.js"></script>
<script>
export default {
    data() {
        return {
            roList: [],
            paramCarno: this.value
        }
    },
    mounted() {
    
        var param = {};
        param.BsnId = this.$store.state.UserInfo.BsnID;
        param.CarNo = this.$store.state.CarInfo.CarNo;
      
        console.log("======= ROHistory Request result ========");
        console.log(param); 
        
        var rtnCode = "";
        var rtnCount = 0;
      
    axios({
        method: 'POST',
        url:'http://iparts.sknetworks.co.kr/BAY4UService.svc/GetROList',
        headers:{
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        data: param
    })
    .then((result) => {
        console.log("======= ROHistory Return result ========");
        console.log(result.data); 
        this.rtnCode = result.data.ReturnCode;
        this.rtnCount = Number(result.data.ReturnDataCount);
        this.roList = JSON.parse(result.data.ReturnDataJSON);
    })
    .catch((error) => {
        console.log(error);
    })
    },
}
</script>
<style scoped>

</style>