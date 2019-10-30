<template>
<div>
    <v-expansion-panels popout>
        <v-expansion-panel
            v-for="(roItem,i) in roList"
            :key="i"
        >
        <v-expansion-panel-header>
            <v-row no-gutters>
                 <v-col>
                     {{roItem.DC_DY_BSN}}
                </v-col>
                 <v-col>
                      <v-flex text-xs-right text-sm-left >
                     {{roItem.RO_AMT}}원
                </v-flex>     
                </v-col>               
                </v-row>
            <template v-slot:actions>
                <v-icon color="primary">$expand</v-icon>
            </template> 
        </v-expansion-panel-header>
        <v-expansion-panel-content>
         <v-row no-gutters>
             <v-col>{{roItem.NM_CR_TEC}}</v-col>
         </v-row>
         <v-row no-gutters>
             <v-col>
                  {{roItem.RO_NM}}
             </v-col>
         </v-row>
        </v-expansion-panel-content>
        </v-expansion-panel>
    </v-expansion-panels>
</div>
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