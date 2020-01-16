<template>
  <div class="UserListPage">
  <b-tabs class="UserList-Tab"  v-model="tabIndex" content-class="mt-3" fill>
    <b-tab  class="tabPage1" title="카센터 대화목록" active :title-link-class="linkClass(0)">
      <!--<div class="Chat-search mdl-textfield mdl-js-textfield mdl-textfield--expandable">
        <label class="mdl-button mdl-js-button mdl-button--icon" for="sample6" v-on:click="showQTReqList()">
          <i class="material-icons">search</i>
        </label>
        <div class="mdl-textfield__expandable-holder" >
          <input  class="mdl-textfield__input" type="text" id="sample6" v-model="searchText"  v-on:keypress.enter="showQTReqList">
          <label class="mdl-textfield__label" for="sample-expandable">Expandable Input</label>
        </div>
      </div>-->
     <div class="Chat-search">
       <v-text-field
          v-model="searchText"
           :append-icon="'fas fa-search'"
            class = "mb-n3"
            filled
            rounded
            dense
            type="text" 
            @click:append="showQTReqList"
            v-on:keypress.enter="showQTReqList"
          ></v-text-field>
     </div>
    <v-row
      align="center"
      justify="center"
      class = "ml-1 mr-1 mb-0"
    > 
      <v-chip-group
        column
        mandatory
        align="center"
        style="color:#FF8F00"
      >
        <v-chip class="mr-1 pr-2 pl-2" @click="showQTReqList(0)">당일</v-chip>
        <v-chip class="mr-1 pr-2 pl-2" @click="showQTReqList(1)">어제</v-chip>
        <v-chip class="mr-1 pr-2 pl-2" @click="showQTReqList(2)">일주일</v-chip>
        <v-chip class="mr-1 pr-2 pl-2" @click="showQTReqList(3)">한달</v-chip>

      </v-chip-group>          
    </v-row>
      <div class="Chat-list">
        <ul>
         <li v-for="(qtReq, index) in qtReqList" v-bind:key = "index" v-on:click="SetQTInfo(qtReq,index)" >
           <div class="chat-item flex-direction_row" :class="{selectItem : selectedList(index), noReadItem : qtReq.isRead === false}">
             <div class="carBrand">
                <!--<i class="Carcenter-type fas fa-wrench" style="color:#fbc02e;" v-if="qtReq.isRead === true"></i>     
                <i class="Carcenter-type fas fa-wrench" style="color:red;" v-else-if="qtReq.isRead === false"></i>-->    
                <img height='18' v-if="qtReq.CarBrand === 'AUDI'" style="align-self:center;" src="@/assets/BRAND-AUDI.png">
                <img height='25' v-if="qtReq.CarBrand === 'BENZ'" style="align-self:center;" src="@/assets/BRAND-BENZ.png">
                <img height='30' v-if="qtReq.CarBrand === 'BMW'" style="align-self:center;width:32px;" src="@/assets/BRAND-BMW.png">
                <img height='30' v-if="qtReq.CarBrand === 'CADILLAC'" style="align-self:center; " src="@/assets/BRAND-CADILLAC.png">
                <img height='10' v-if="qtReq.CarBrand === 'CHRYSLER'" style="align-self:center; " src="@/assets/BRAND-CHRYSLER.png">
                <img height='25' v-if="qtReq.CarBrand === 'CITROEN'" style="align-self:center; " src="@/assets/BRAND-CITROEN.png">
                <img height='18' v-if="qtReq.CarBrand === 'DODGE'" style="align-self:center;width:48px;" src="@/assets/BRAND-DODGE.png">
                <img height='30' v-if="qtReq.CarBrand === 'FIAT'" style="align-self:center; " src="@/assets/BRAND-FIAT.png">
                <img height='25' v-if="qtReq.CarBrand === 'FORD'" style="align-self:center;width:46px;" src="@/assets/BRAND-FORD.png">
                <img height='25' v-if="qtReq.CarBrand === 'HONDA'" style="align-self:center;" src="@/assets/BRAND-HONDA.png">
                <img height='15' v-if="qtReq.CarBrand === 'JEEP'" style="align-self:center;width:46px;" src="@/assets/BRAND-JEEP.png">
                <img height='17' v-if="qtReq.CarBrand === 'LANDROVER'" style="align-self:center; " src="@/assets/BRAND-LANDROVER.png">
                <img height='25' v-if="qtReq.CarBrand === 'LEXUS'" style="align-self:center;" src="@/assets/BRAND-LEXUS.png">
                <img height='30' v-if="qtReq.CarBrand === 'LINCOLN'" style="align-self:center;margin-left:6px;" src="@/assets/BRAND-LINCOLN.png">
                <img height='18' v-if="qtReq.CarBrand === 'MINI'" style="align-self:center;width:46px;" src="@/assets/BRAND-MINI.png">
                <img height='25' v-if="qtReq.CarBrand === 'PEUGEOT'" style="align-self:center;" src="@/assets/BRAND-PEUGEOT.png">
                <img height='30' v-if="qtReq.CarBrand === 'PORSCHE'" style="align-self:center;" src="@/assets/BRAND-PORSCHE.png">
                <img height='25' v-if="qtReq.CarBrand === 'TOYOTA'" style="align-self:center;width:34px;" src="@/assets/BRAND-TOYOTA.png">
                <img height='25' v-if="qtReq.CarBrand === 'VOLVO'" style="align-self:center;width:30px;" src="@/assets/BRAND-VOLVO.png">
                <img height='30' v-if="qtReq.CarBrand === 'VW'" style="align-self:center;" src="@/assets/BRAND-VW.png">
                <i class="Carcenter-type fas fa-wrench" style="color:#fbc02e;" v-if="qtReq.CarBrand === '차종 선택'"></i>  
             </div>
             <div class="chatInfo" :class="{chatInfo2 : checkBrand(qtReq.CarBrand)}">
                <div class="carInfo">
                  <span class="Carcenter-name">{{qtReq.ReqName}} ({{(qtReq.CarNo === "*empty*")?"미상차량" : qtReq.CarNo}})</span>
                  <span class="Carcenter-reqdt">{{qtReq.ReqDt}}</span>
                  <span class="carSeries">{{qtReq.CarSeries}}</span>
                </div>
                <div>
                  <span :class="linkQtSts(qtReq.QTSts)">{{qtReq.QTSts}}</span>
                </div>
             </div>
             <div>
              <span type="button" class="Chat-detail">
                <i class="fas fa-angle-double-right"></i>
              </span>  
             </div>
           </div>
          </li>
        </ul>        
      </div>
    </b-tab>
  </b-tabs>
  </div>   
</template>

<!--<script src="https://unpkg.com/axios/dist/axios.min.js"></script>-->
<script src="http://code.jquery.com/jquery-latest.min.js"></script>
<script>
import {datePadding} from '@/utils/common.js'
import Constant from '@/Constant';

const axios = require('axios').default;

export default {
  name: 'UserListPage',
  data () {
    return {
      tabIndex: 0,
      qtReqList: [],
      qtItemIndex: -1,
      searchText:'',
      toggle_exclusive: undefined
    }
  },
  props:['chatInfo'],
  methods: {
    linkClass(idx) {
      if (this.tabIndex === idx) {
        return ['bg-secondary', 'text-warning']
      } else {
        return ['bg-light', 'text-secondary']
      }
    },
    selectedList(idx)
    {
      if (this.qtItemIndex === idx) {
        return true
      } else {
        return false
      }
    },
    showQTReqList(idx) {
      console.log("showQTReqList??????????????????????? : ", idx);

      this.initQTData();

      var now = new Date();
      var beforeDate = new Date();
      var startDate, endDate;

      if(idx === 0) {
        startDate = now.getFullYear() + '-' + datePadding(now.getMonth()+1,2) +'-'+ datePadding(now.getDate(),2);
        endDate = startDate;
      }
      else if(idx === 1) {
        beforeDate.setDate(beforeDate.getDate() - 1);
        startDate = beforeDate.getFullYear() + '-' + datePadding(beforeDate.getMonth()+1,2) +'-'+ datePadding(beforeDate.getDate(),2);
        endDate = startDate;
      }
      else if(idx === 2) {
        beforeDate.setDate(beforeDate.getDate() - 7);
        startDate = beforeDate.getFullYear() + '-' + datePadding(beforeDate.getMonth()+1,2) +'-'+ datePadding(beforeDate.getDate(),2);
        endDate = now.getFullYear() + '-' + datePadding(now.getMonth()+1,2) +'-'+ datePadding(now.getDate(),2);
      }
      else if(idx === 3) {
        beforeDate.setMonth(beforeDate.getMonth() - 1);
        startDate = beforeDate.getFullYear() + '-' + datePadding(beforeDate.getMonth()+1,2) +'-'+ datePadding(beforeDate.getDate(),2);
        endDate = now.getFullYear() + '-' + datePadding(now.getMonth()+1,2) +'-'+ datePadding(now.getDate(),2);
      }
      else {
        beforeDate.setDate(beforeDate.getDate() - 7);
        startDate = beforeDate.getFullYear() + '-' + datePadding(beforeDate.getMonth()+1,2) +'-'+ datePadding(beforeDate.getDate(),2);
        endDate = now.getFullYear() + '-' + datePadding(now.getMonth()+1,2) +'-'+ datePadding(now.getDate(),2);
      }

      var filter = "ResDealer = :id";
      if(this.searchText === '')
      {
          filter = "ResDealer = :id and ReqDt between :startDt and :endDt";
      }
      else{
        filter = "ResDealer = :id and ( contains(CarNo, :searchText) or contains(ReqName, :searchText) or contains(ReqDt, :searchText) )";
      }

      var param = {};
      param.operation = "list";
      param.tableName = "BAY4U_QT_LIST";
      param.payload = {};
      param.payload.FilterExpression = filter;
      param.payload.ExpressionAttributeValues = {};
      var key = ":id";
      param.payload.ExpressionAttributeValues[key] = this.UserInfo.BsnID;
      
      if(this.searchText === '')
      {
        var key2 = ":startDt";
        var key3 = ":endDt";
        param.payload.ExpressionAttributeValues[key2] = startDate;
        param.payload.ExpressionAttributeValues[key3] = endDate;
      }
      else{
        var key2 = ":searchText";
        param.payload.ExpressionAttributeValues[key2] = this.searchText;
      }

      console.log("======= QT Request result ========");
      console.log(JSON.stringify(param));

      axios({
        method: 'POST',
        url: Constant.LAMBDA_URL,
        headers: Constant.JSON_HEADER,
        data: param
      })
      .then((result) => {
        console.log("======= QT List result ========");
        console.log(result.data);

        if(Array.isArray(result.data.Items)) {
          result.data.Items.sort(function(a, b){
            return (a.ReqSeq < b.ReqSeq) ? 1 : -1;
          });
        }

        for (var chat of result.data.Items) {
          chat.isRead = true;
        }

        this.qtReqList = result.data.Items;
/*
        if(this.searchText !== '')
        {
          this.qtReqList = this.searchQTList();
        } 
*/        
      });
    },
    SetQTInfo(item , idx)
    {
       this.$emit('setQtInfo' ,item);
       this.$EventBus.$emit('click-qtInfo' , item)
       this.qtItemIndex = idx;
       this.qtReqList[idx].isRead = true;
    },
    initQTData()
    {
      this.$EventBus.$emit('init-qtInfo', null)
       this.qtItemIndex = -1
    },
    searchQTList(){

      if(this.qtReqList.length > 0)
      {
          var arrSearch = this.qtReqList.filter(item => {
            if(item.ReqName === this.searchText)
            {
              return true;
            }
            else{
              return false;
            }
          });
          
          if(arrSearch.length > 0)
          {
              return arrSearch;
          }
          else{

            arrSearch = this.qtReqList.filter(item => {
              if(item.CarNo === this.searchText)
              {
                return true;
              }
              else{
                return false;
              }
            });

            return arrSearch;
          }
      }
    },
    linkQtSts(value){
      
      if(value === '견적요청')
      {
        return 'qtSts-1';
      }
      else if(value === '견적회신')
      {
        return 'qtSts-2';
      }
      else if(value === '주문요청')
      {
        return 'qtSts-3';
      }
      else if(value === '주문확정')
      {
        return 'qtSts-4';
      }
    },
    checkBrand(value)
    {
      const brands = ['AUDI', 'CHRYSLER','DODGE','FORD','JEEP','MINI'];
      let index = brands.indexOf(value);
      if(index > -1){
        return true;
      }
      else{
        return false;
      }
    }
  },
  mounted(){
    this.showQTReqList();

  },
  created : function() {
    if(this.UserInfo.BsnID === '')
      this.UserInfo.BsnID = this.$cookies.get('BsnID');
    if(this.UserInfo.Name === '')
      this.UserInfo.Name = this.$cookies.get('UserNM');
    if(this.UserInfo.UserID === '')
      this.UserInfo.UserID = this.$cookies.get('UserID');
    if(this.UserInfo.UserType === '')
      this.UserInfo.UserType = this.$cookies.get('UserType');

    this.$EventBus.$on('update-chatMsg', docId => {  
      
      console.log('docId : ' , docId);
      // 같은 대리점 채팅이 아니면 리턴
      //if(this.UserInfo.BsnID !==  docId.qtInfo.ResDealer ) return;

      var checkExist = false;
      
      for (var chat of this.qtReqList) {

        if(chat.ID === docId.chatId) {
          chat.isRead = false;
          checkExist = true;
          chat.QTSts = docId.qtInfo.QTSts; 
        }
      }

      // 값이 true가 아니면 현재 리스트에 없다는 의미으로 다시 조회해 와서 표시 하자.
      if(checkExist === false) {

        //console.log('docId.qtInfo : ' , docId.qtInfo);

        if(docId.qtInfo  !== undefined)
        {
          console.log('Param qtInfo : ' , docId.qtInfo);
          var newQtData = {};
          newQtData.CarBrand   = docId.qtInfo.CarBrand;
          newQtData.CarNo   = docId.qtInfo.CarNo;
          newQtData.CarVin  = docId.qtInfo.CarVin;
          newQtData.ID  = docId.qtInfo.ID;
          newQtData.IMG  = docId.qtInfo.IMG;
          newQtData.LineItem  = docId.qtInfo.LineItem;
          newQtData.Memo  = docId.qtInfo.Memo;
          newQtData.ReqDt  = docId.qtInfo.ReqDt;
          newQtData.ReqName  = docId.qtInfo.ReqName;
          newQtData.ReqSeq  = docId.qtInfo.ReqSeq;
          newQtData.ReqSite  = docId.qtInfo.ReqSite;
          newQtData.ResDealer  = docId.qtInfo.ResDealer;
          newQtData.QTSts  = docId.qtInfo.QTSts;
          newQtData.isRead  = false;
          this.qtReqList.push(newQtData);
          
          //console.log('qtReqList : ' ,this.qtReqList);

          if(Array.isArray(this.qtReqList)) {
            this.qtReqList.sort(function(a, b){
            return (a.ReqSeq < b.ReqSeq) ? 1 : -1;
            });
          }
        }
      }
    }); 
    
    this.$EventBus.$on('update-Sts', updateData => {

      let index = this.qtReqList.findIndex(element => element.ID === updateData.ID);
      if(index >= 0)
      {
        this.qtReqList[index].QTSts = updateData.Msg;
        console.log('update : ', this.qtReqList[index].QTSts);
      }

    });

  },    
  computed:{
    UserInfo: {
        get() { return this.$store.getters.UserInfo },
        set(value) { this.$store.dispatch('UpdateUserInfo',value) }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
/*
#696565 : 더 짙은 브라운
#afabab : 짙은 부라운
#fcf4df : 베이지
#ff9999 : 옅은 붉은색
#acd3ce : 옅은 녹색
#967d5f : 옅은 브라운
*/

.UserListPage{
  width: 100%;
  height: 100%;
}

.UserList-Tab {
  margin: 10px;
  height: 98%;
  position: relative;
}

.UserList-Tab .tabPage1 {
  height: 95%;
  position:absolute;
  right: 0;
  left:0;
}
/*
.Chat-search {
  border: 1px solid #aaa;
  border-radius: 50px;
  width: 100%;
  padding: 5px;
  padding-left: 15px;
  margin-bottom: 20px;
}*/

.Chat-search label {
  margin-top: -10px;
}

.Chat-list {
  margin:auto;
  width: 98%;
  height: 90%;
  /*height: 60px;*/
}

.Chat-list ul {
  list-style-type: none;
  padding: 0px;
  height: calc(100vh - 270px); 
  overflow: auto;
}
.Chat-list .chat-item{
  display: flex;
  min-height: 50px;
  height: 50px;
  line-height: 50px;
  margin:4px 1px;
  padding: 0 0.9rem;
  border-width: thin;
  border-style: solid;
  border-radius: 5px;
  border-color: #bebebe;
  background-color: #fcf4df;
  position: relative;
  align-content: center;
}
.Chat-list .carBrand
{
  position:absolute;
  left:8px;
  padding:0;
}
.Chat-list .chatInfo
{
  padding-left: 20px;
  flex:50%;
}
.Chat-list .chatInfo2
{
  padding-left: 35px;
  flex:50%;
}
.Chat-list .carInfo{
  width:80%;
  font-weight: bold;
  cursor:pointer;
  padding-left: 10px;
}

.flex-direction_row {flex-direction: row; /*default*/}

/*
.Chat-list li {
  display: flex;
  min-height: 50px;
  height: 50px;
  line-height: 50px;
  margin:4px 1px;
  padding: 0 0.9rem;
  border-width: thin;
  border-style: solid;
  border-radius: 5px;
  border-color: #bebebe;
  background-color: #fcf4df;
  position: relative;
}
*/
.Chat-list .selectItem {
  display: flex;
  min-height: 50px;
  height: 50px;
  line-height: 50px;
  margin: 0.5rem 0;
  padding: 0 0.9rem;
  border-width: thin;
  border-style: solid;
  border-radius: 5px;
  border-color: #bebebe;
  background-color: #878f99;
}
.Chat-list .noReadItem {
  display: flex;
  min-height: 50px;
  height: 50px;
  line-height: 50px;
  margin: 0.5rem 0;
  padding: 0 0.9rem;
  border-width: thin;
  border-style: solid;
  border-radius: 5px;
  border-color: #bebebe;
  background-color: #FFAB91;
}

.Carcenter-type {
  align-self: center;
  font-size: 1.5rem;
}

.Carcenter-name {
  position: absolute;;
  line-height: 20px;
}
.Carcenter-reqdt{
  font-size: 0.85em;
  line-height: 15px;
}
.carSeries{
  position: absolute;;
  line-height: 10px;
  left: 45px;
  bottom: 2px;
  font-size: 0.5em;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  width: 160px;
}
.Chat-detail {
  align-self: center;
  margin-left: auto;
  color: #5d4038;
  -webkit-appearance:none;
  -moz-appearance:none;
}
/*견적요청 */
.qtSts-1{
  font-size: 0.8em;
  font-weight: bold;
  position: absolute;
  right:40px;
  top: 0px;
  color:#3F51B5;
}
/*견적회신 */
.qtSts-2{
  font-size: 0.8em;
  font-weight: bold;
  position: absolute;
  right:40px;
  top: 10px;
  color:#1B5E20;
}
/*주문요청 */
.qtSts-3{
  font-size: 0.8em;
  font-weight: bold;
  position: absolute;
  right:40px;
  top: 10px;
  color:#E53935;
}
/*주문완료 */
.qtSts-4{
  font-size: 0.8em;
  font-weight: bold;
  position: absolute;
  right:40px;
  top: 10px;
  color:#FF6D00;
}
</style>
