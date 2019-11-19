<template>
<v-row align="center">
    <div>       
    <v-expansion-panels focusable>
        <v-expansion-panel
            v-for="(roItem,i) in roList"
            :key="i"
        >
        <v-expansion-panel-header  class="roHistory-header">
            <v-row no-gutters>
                <!--
                <v-col cols="12">    
                    <v-icon small color="#A9A9A9">mdi-wrench</v-icon> {{roItem.RO_NM}}                        
                </v-col>  
                <v-col cols="6"><v-icon small color="#A9A9A9">fas fa-calendar-alt</v-icon> {{roItem.DC_DY_BSN}}</v-col>
                <v-spacer></v-spacer>
                 <v-col cols="6">
                <v-icon small color="#A9A9A9">far fa-credit-card</v-icon>
                   <b>{{roItem.RO_AMT | localeNum}}원</b>   
                </v-col>
                -->
                <div class="roHistory-title"><v-icon small class="roHistory-icon">mdi-wrench</v-icon>{{roItem.RO_NM}}</div>
                <div class="roHistory-date"><v-icon x-small class="roHistory-icon">fas fa-calendar-alt</v-icon>{{roItem.DC_DY_BSN}}</div>
                <div class="roHistory-amount"><v-icon x-small class="roHistory-icon">far fa-credit-card</v-icon>{{roItem.RO_AMT | localeNum}}원</div>
            </v-row>
            <template v-slot:actions>
                <v-icon color="primary">$expand</v-icon>
            </template> 
        </v-expansion-panel-header>
        <v-expansion-panel-content>
            <div class="roHistory-content"><v-icon small class="roHistory-icon">fas fa-car</v-icon> {{roItem.NM_CR_TEC}} </div>
            <!--<v-list-item three-line>
                <v-list-item-content>
                    <v-list-item-title><v-icon small color="indigo">fas fa-car</v-icon> 차정명</v-list-item-title>
                    <v-list-item-subtitle>{{roItem.NM_CR_TEC}}</v-list-item-subtitle>
                </v-list-item-content>
                </v-list-item>-->
               <!-- <v-divider></v-divider>-->
               <!-- <v-list-item two-line>
                <v-list-item-content>
                    <v-list-item-title> <v-icon small color="indigo">mdi-wrench</v-icon> 수리내역</v-list-item-title>
                    <v-list-item-subtitle> {{roItem.RO_NM}}</v-list-item-subtitle>
                </v-list-item-content>
                </v-list-item>-->
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
            //url:'http://iparts.sknetworks.co.kr/BAY4UService.svc/GetROList',
            url:'https://bay4u.co.kr/scpif/GetROList',
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
            console.log(this.roList );
        })
        .catch((error) => {
            console.log(error);
        })
    },    
    computed:{
      CarInfo: {
          get() { return this.$store.getters.CarInfo },
          set(value) { this.$store.dispatch('UpdateCarInfo',value) }
      }
    }
}
</script>
<style scoped>
.roHistory-header{
    margin: 0px;
    padding-left : 10px;
    padding-top : 12px;
    padding-bottom : 5px;
}
.roHistory-icon{
  color:#DCDCDC;  
  margin-right: 0.2rem;
}
.roHistory-title {
  flex: 90%;
  font-size: 1rem;
  font-weight: bold;
  margin-bottom:5px;
  font-family: 'Noto Sans KR', sans-serif;
}
.roHistory-date {
  flex: 30%;
  font-size: 0.7rem;
  /*color:#808080;*/
  vertical-align:initial;
  margin-bottom:1px;
  margin-left:2px;
  font-family: 'Noto Sans KR', sans-serif;
}
.roHistory-amount {
  /*flex: 70%;*/
  font-size: 0.9rem;
  font-weight: bold;
  text-align: right;
  color:#F65314;
  vertical-align:initial;
  margin-bottom:1px;
  font-family: 'Noto Sans KR', sans-serif;
}
.roHistory-content
{
  font-size: 0.8rem;
  margin-left:0rem;
  margin-top:0.5rem;
  font-family: 'Noto Sans KR', sans-serif;
}
</style>