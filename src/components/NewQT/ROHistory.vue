<template>
<v-row align="center">
    <v-expansion-panels popout>
        <v-expansion-panel
            v-for="(roItem,i) in roList"
            :key="i"
        >
        <v-expansion-panel-header>
            <v-row no-gutters>
                 <v-col>                           
                    정비일자 : {{roItem.DC_DY_BSN}}                  
                </v-col>
                 <v-col>
                      <v-flex text-xs-right text-sm-left >
                    수리금액 : {{roItem.RO_AMT}}원
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
      param.BsnId = "S009";
      param.CarNo = "11지5432";
      
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
        console.log("======= CheckROHistory result ========");
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
<style>

</style>