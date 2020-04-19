<template>
<v-row align="center">
	<div>
    <div class="roHistoryCarinfo"><v-icon small class="carInfo-icon">fas fa-car</v-icon>{{carName}}</div>
		<div class="roHistoryCarVin" v-show="UserInfo.UserType === 'DEALER'">차대번호 : {{vinNO}}</div>
    <v-divider></v-divider>
    <div>     
			<v-expansion-panels accordion focusable>
					<v-expansion-panel
							v-for="(roItem,i) in roList"
							:key="i"
					>
					<v-expansion-panel-header class="roHistory-header" @click="GetRoItem(roItem)">
							<v-row no-gutters>
									<div class="roHistory-title"><v-icon x-small class="roHistory-icon">mdi-wrench</v-icon>{{roItem.RO_NM}}</div>
									<div class="roHistory-detail">
											<div><!--<v-icon x-small class="roHistory-icon">fas fa-tachometer-alt</v-icon>-->{{roItem.DST_CR | localeNum}} Km</div>
											<div class="roHistory-date"><!--<v-icon x-small class="roHistory-icon">fas fa-calendar-alt</v-icon>-->{{roItem.DC_DY_BSN}}</div>
									</div>
						
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
								<!-- <div class="roHistory-amount"><v-icon x-small class="roHistory-icon">far fa-credit-card</v-icon>{{roItem.RO_AMT | localeNum}}원</div>-->
							</v-row>
							<template v-slot:actions>
									<v-icon color="primary">$expand</v-icon>
							</template> 
					</v-expansion-panel-header>
					<v-expansion-panel-content class="ml-n4 mr-n4">
							<div v-for="(item,idx) in roitemList" :key="idx">
									<div>
											<div class="roHistory-itemName">{{item.NM_ITM}}</div>	
											<div class="roHistory-content">
													<div class="roHistory-itemcode">{{item.ID_ITM}}</div>
													<div v-if="item.MO_PRC_REG !== 0" class="roHistory-amount">
															<span class="amount-title">판매단가</span><span class="amount-info">{{item.MO_PRC_REG | localeNum}} 원</span>                      
													</div>
													<div v-if="item.MO_PRC_REG === 0" class="roHistory-amount">
															<span class="amount-title">판매단가</span><span class="amount-info">0 원</span>
													</div>                        
											</div>
									</div>
									<!--<div class="roHistory-amount">{{item.MO_PRC_REG | localeNum}} 원</div>-->
							</div>
							<!--<div class="roHistory-content"><v-icon small class="roHistory-icon">fas fa-car</v-icon> {{roItem.NM_CR_TEC}} </div>-->
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
	</div>
</v-row>
</template>
<!--<script src="https://unpkg.com/axios/dist/axios.min.js"></script>-->
<script src="http://code.jquery.com/jquery-latest.min.js"></script>
<script>
import Constant from '@/Constant';
import {datePadding} from '@/utils/common.js'

const axios = require('axios').default;

export default {
    data() {
        return {
            roList: [],
            roitemList: [],
            paramCarno: this.value,
						carName : "",
						vinNO : "",
        }
    },
    props:['RoHistoryData'],
    mounted() {

			this.roList = this.RoHistoryData;
			this.carName = this.roList[0].NM_CR_TEC;
			this.vinNO = this.roList[0].VIN_NO;

       datePadding();
    /*
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
            if(this.rtnCount > 0)
            {
                this.carName = this.roList[0].NM_CR_TEC;
            }
        })
        .catch((error) => {
            console.log(error);
        })
        */
		},   
		created: function()
		{
			this.$EventBus.$on('ROHistory.SetROInfo', data => {
				this.SetROInfo(data);
			});	
		},
    methods:
    {
        GetRoItem(item)
        {
            if(this.UserInfo.UserType === 'SITE' || this.UserInfo.UserType === 'SITEF' || this.UserInfo.UserType === 'DEALER' ) {
                var param = {};
                param.RequestDataJSON = "ID_TRN:" + item.ID_TRN + ","+"RO_CD:" + item.RO_CD;
                
                console.log("======= GetRoItem Request result ========");
                console.log(param); 

                var rtnCode = "";
                var rtnCount = 0;

                axios({
                    method: 'POST',
                    url: Constant.SCPIF_URL + 'GetROItemList',
                    headers: Constant.JSON_HEADER,
                    data: param
                })
                .then((result) => {
                        console.log("======= GetRoItem Return result ========");
                    console.log(result.data); 
                    this.rtnCode = result.data.ReturnCode;
                    this.rtnCount = Number(result.data.ReturnDataCount);
                    this.roitemList = JSON.parse(result.data.ReturnDataJSON);

                })
                .catch((error) => {
                    console.log(error);
                })
            }
            else {
                var now = new Date();
                var startDate = (now.getFullYear() - 1) + "-" + datePadding(now.getMonth()+1,2) + "-" + datePadding(now.getDate(),2);        

                var param = {};
                param.carNo = this.CarInfo.CarNo;
                param.idNo = this.UserInfo.BsnID;
                param.sDate = startDate;

                console.log("======= GetRoItem Request result ========");
                console.log(param); 

                var rtnCode = "";
                var rtnCount = 0;
                var selectedDate = item.DC_DY_BSN;
                
                axios({
                    method: 'POST',
                    url: Constant.INTRA_HISTIF_URL,
                    headers: Constant.JSON_HEADER,
                    data: param
                })
                .then((result) => {
                    console.log("======= GetRoItem Return result ========");
                    console.log(result.data); 
                    var rtnData = result.data;
                    this.CarInfo.VinNo = "";
                    if(rtnData.data.result === 'ok') {
                        var roItemList = [];

                        for(var his of rtnData.data.dataset) {
                            if(his.inDay === selectedDate) {
                                console.log("his : ", his); 

                                var item = {};
                                item.NM_ITM = his.partName;
                                item.QU_ITM_LM_RTN_SLS = his.qty;
                                item.MO_PRC_REG = his.paysum / (his.qty === '0' ? 1 : parseInt(his.qty));
                                //item.MO_PRC_REG = his.paysum;
                                item.MO_EXTND = his.paysum;

                                roItemList.push(item);
                            }
                        }
                        this.roitemList = roItemList;
                    }
                })
                .catch((error) => {
                    console.log(error);
                })
            }
				},
				SetROInfo(data)
				{
					this.roList = data;
					this.carName = this.roList[0].NM_CR_TEC;
					this.vinNO = this.roList[0].VIN_NO;
				},
    },
    computed:{
      CarInfo: {
          get() { return this.$store.getters.CarInfo },
          set(value) { this.$store.dispatch('UpdateCarInfo',value) }
      },
      UserInfo: {
          get() { return this.$store.getters.UserInfo },
          set(value) { this.$store.dispatch('UpdateUserInfo',value) }
      },      
		},
		beforeDestroy(){
			this.$EventBus.$off('ROHistory.SetROInfo');
		}
}
</script>
<style scoped>
.roHistory-header{
    width: 100%px;
    padding : 0px 10px;
    display:flex;
}
.roHistory-icon{
  color:#DCDCDC;  
  margin-right: 0.2rem;
}
.carInfo-icon{
  color:#4B1004;
  margin-right: 0.2rem;
}
.roHistoryCarinfo{
    color:#000;
    font-size: 0.9rem;
    font-weight: bold;
}
.roHistoryCarVin{
	margin-top: 5px;
	color:#0D47A1;
}
.roHistory-title {
    flex: 60%;
    font-size: 0.92rem;
    font-weight: bold;
    margin-bottom:5px;
    font-family: 'Noto Sans KR', sans-serif;
}
.roHistory-detail{
    flex: 40%;
    font-size: 0.8rem;
    color: #0D47A1;
    font-family: 'Noto Sans KR', sans-serif;
}
.roHistory-detail div{
    float:right;
    margin-right: 4px;
}
.roHistory-date  {
    vertical-align:initial;
    margin-top: 3px;
}
.roHistory-content
{
	display:flex;
}
.roHistory-itemcode
{
	font-size: 0.8rem;
	margin-top: 5px;
	flex:40%;
}
.roHistory-amount{
	font-size: 0.8rem;
	font-weight: bold;
	margin-top: 5px;
	float:right;
}
.amount-title
{
	margin-right: 5px;
}
.amount-info
{
	color:#F65314;
}
.roHistory-itemName
{
	font-size: 0.9rem;
	margin-top: 5px;
	font-weight: bold;
}
</style>