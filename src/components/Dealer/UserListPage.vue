<template>
  <v-app>
  <div class="UserListPage">
  <!--<b-tabs class="UserList-Tab" v-model="tabIndex" content-class="mt-3" fill>
    <b-tab class="tabPage1" title="카센터 대화목록" active :title-link-class="linkClass(0)">-->
  <div class="UserList-title">
    <div class="UserList-title-text" ><span>카센터 대화목록</span></div>
    <div class="UserList-title-agentList">
    <!-- <select v-model="selectedAgent" class="agent-select">
        <option v-for="(item, index) in agentItems"  v-bind:key="index">{{ item.NAME }}</option>
    </select>
    -->
     <b-form-select v-model="selectedAgent" :options="agentItems" class="agent-select" @change="showQTReqList()"></b-form-select>
    </div>
  </div>
      <!--<div class="Chat-search mdl-textfield mdl-js-textfield mdl-textfield--expandable">
        <label class="mdl-button mdl-js-button mdl-button--icon" for="sample6" v-on:click="showQTReqList()">
          <i class="material-icons">search</i>
        </label>
        <div class="mdl-textfield__expandable-holder" >
          <input  class="mdl-textfield__input" type="text" id="sample6" v-model="searchText"  v-on:keypress.enter="showQTReqList">
          <label class="mdl-textfield__label" for="sample-expandable">Expandable Input</label>
        </div>
      </div>-->

    <!-- <div class="Chat-search">
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
        <v-chip class="mr-1 pr-2 pl-2" @click="showQTReqList(4)">미확인</v-chip>
      </v-chip-group>          
    </v-row>
    -->
    <!--검색영역-->
    <div class="search-form">
      <div>
        <v-chip-group
          column
          align="center"
          style="color:#FF8F00"
          multiple
          v-model="searchStsList"
        >
          <v-chip small class="mr-1 pr-2 pl-2" text-color="#D50000" @click="SelectedStatus">미확인
            <b-badge class="ml-1" pill variant="danger" v-if="noReadCnt !== 0" >{{noReadCnt}}</b-badge>
          </v-chip>
          <v-chip small class="mr-1 pr-2 pl-2" text-color="#3F51B5" @click="SelectedStatus">견적요청
            <b-badge class="ml-1"  pill variant="danger" v-if="reqCnt !== 0">{{reqCnt}}</b-badge>
          </v-chip>
          <v-chip small class="mr-1 pr-2 pl-2" text-color="#7B0099" @click="SelectedStatus">견적접수
            <b-badge class="ml-1"  pill variant="danger" v-if="actCnt !==  0">{{actCnt}}</b-badge>
          </v-chip>
          <v-chip small class="mr-1 pr-2 pl-2" text-color="#E53935" @click="SelectedStatus">주문요청
            <b-badge class="ml-1"  pill variant="danger" v-if="ordReqCnt !== 0">{{ordReqCnt}}</b-badge>
          </v-chip>
          <v-chip small class="mr-1 pr-2 pl-2" text-color="#1B5E20" @click="SelectedStatus">견적회신
            <b-badge class="ml-1"  pill variant="secondary" v-if="resCnt !== 0">{{resCnt}}</b-badge>
          </v-chip>
          <v-chip small class="mr-1 pr-2 pl-2" text-color="#FF6D00" @click="SelectedStatus">주문확정
            <b-badge class="ml-1"  pill variant="secondary" v-if="ordResCnt !== 0">{{ordResCnt}}</b-badge>
          </v-chip>
       </v-chip-group>          
      </div>
      <div class="search-form-input">
        <div class="search-form-text">
       <v-text-field
          v-model="searchText"
           :append-icon="'search'"
            single-line
            dense
            filled
            type="text" 
            @click:append="showQTReqList"
            v-on:keypress.enter="showQTReqList"
          ></v-text-field>
        </div>
        <div class="search-form-button" >
          <b-button squared size="sm" @click="showDetail = !showDetail">상세
            <i class="fas fa-sort-down"></i>
          </b-button>
          <b-button size="sm" @click="SetInitData">초기화</b-button>
        </div>
      </div>
      <b-collapse id="collapse-1-inner" class="mt-2" :visible="showDetail">
      <div class="search-date-form">
        <div>
          <div class="search-date-chips">
            <v-chip-group
              column
              align="center"
              style="color:#FF8F00"
              class="search-date-chip"
            > 
              <v-chip small class="mr-1 pr-2 pl-2" @click="SetSearchDate(7)">일주일</v-chip>
              <v-chip small class="mr-1 pr-2 pl-2" @click="SetSearchDate(30)">한달</v-chip>
            </v-chip-group>   
            <div class="search-date-button"><b-button small @click="showQTReqList(5)">검색</b-button></div>      
          </div>
          <div class="search-date">
            <v-row class="pt-0 mt-0">
              <v-col cols="12" md="6" class="pt-0 mt-0">
                <v-menu
                  ref="menu1"
                  v-model="menu"
                  :close-on-content-click="false"
                  :nudge-top="70"
                  transition="scale-transition"
                  offset-y
                  min-width="290px"
                >
                  <template v-slot:activator="{ on }">
                    <v-text-field
                      v-model="fromDate"
                      prepend-icon="event"
                      readonly
                      v-on="on"
                      class="date-input"
                      single-line
                      dense
                    ></v-text-field>
                  </template>
                  <v-date-picker v-model="fromDate" @input="menu = false" no-title locale="ko-KR"></v-date-picker>
                </v-menu>
              </v-col>
              <v-col cols="12" md="6" class="pt-0 mt-0">
                <v-menu
                  v-model="menu2"
                  :close-on-content-click="false"
                  :nudge-right="20"
                  :nudge-top="70"
                  transition="scale-transition"
                  offset-y
                  min-width="290px"
                >
                  <template v-slot:activator="{ on }">
                    <v-text-field
                      v-model="toDate"
                      prepend-icon="event"
                      readonly
                      v-on="on"
                      class="date-input"
                      dense
                    ></v-text-field>
                  </template>
                  <v-date-picker v-model="toDate" @input="menu2 = false" no-title  locale="ko-KR"></v-date-picker>
                </v-menu>
              </v-col>
              <v-spacer></v-spacer>
            </v-row>
          </div>
        </div>      
      </div>
      </b-collapse>
    </div>
      <div class="Chat-list">
        <ul>
         <li v-for="(qtReq, index) in qtReqList" v-bind:key = "index" v-on:click="SetQTInfo(qtReq,index)" >
           <div class="chat-item flex-direction_row" :class="{selectItem : selectedList(index), noReadItem : qtReq.NotReadCnt !== 0}">
             <div class="carBrand">
                <!--<i class="Carcenter-type fas fa-wrench" style="color:#fbc02e;" v-if="qtReq.isRead === true"></i>     
                <i class="Carcenter-type fas fa-wrench" style="color:red;" v-else-if="qtReq.isRead === false"></i>-->    
                <img height='18' v-if="qtReq.CarBrand === 'AUDI'" style="align-self:center;width:36px;" src="@/assets/BRAND-AUDI.png">
                <img height='25' v-if="qtReq.CarBrand === 'BENZ'" style="align-self:center;" src="@/assets/BRAND-BENZ.png">
                <img height='30' v-if="qtReq.CarBrand === 'BMW'" style="align-self:center;width:32px;" src="@/assets/BRAND-BMW.png">
                <img height='30' v-if="qtReq.CarBrand === 'CADILLAC'" style="align-self:center; " src="@/assets/BRAND-CADILLAC.png">
                <img height='10' v-if="qtReq.CarBrand === 'CHRYSLER'" style="align-self:center;width:36px;" src="@/assets/BRAND-CHRYSLER.png">
                <img height='25' v-if="qtReq.CarBrand === 'CITROEN'" style="align-self:center; " src="@/assets/BRAND-CITROEN.png">
                <img height='18' v-if="qtReq.CarBrand === 'DODGE'" style="align-self:center;width:36px;" src="@/assets/BRAND-DODGE.png">
                <img height='30' v-if="qtReq.CarBrand === 'FIAT'" style="align-self:center; " src="@/assets/BRAND-FIAT.png">
                <img height='18' v-if="qtReq.CarBrand === 'FORD'" style="align-self:center;width:36px;" src="@/assets/BRAND-FORD.png">
                <img height='25' v-if="qtReq.CarBrand === 'HONDA'" style="align-self:center;" src="@/assets/BRAND-HONDA.png">
                <img height='15' v-if="qtReq.CarBrand === 'JEEP'" style="align-self:center;width:36px;" src="@/assets/BRAND-JEEP.png">
                <img height='12' v-if="qtReq.CarBrand === 'LANDROVER'" style="align-self:center; " src="@/assets/BRAND-LANDROVER.png">
                <img height='17' v-if="qtReq.CarBrand === 'JAGUAR'" style="align-self:center; " src="@/assets/BRAND-JAGUAR.png">
                <img height='25' v-if="qtReq.CarBrand === 'LEXUS'" style="align-self:center;" src="@/assets/BRAND-LEXUS.png">
                <img height='30' v-if="qtReq.CarBrand === 'LINCOLN'" style="align-self:center;margin-left:6px;" src="@/assets/BRAND-LINCOLN.png">
                <img height='18' v-if="qtReq.CarBrand === 'MINI'" style="align-self:center;width:36px;" src="@/assets/BRAND-MINI.png">
                <img height='25' v-if="qtReq.CarBrand === 'PEUGEOT'" style="align-self:center;" src="@/assets/BRAND-PEUGEOT.png">
                <img height='30' v-if="qtReq.CarBrand === 'PORSCHE'" style="align-self:center;" src="@/assets/BRAND-PORSCHE.png">
                <img height='25' v-if="qtReq.CarBrand === 'TOYOTA'" style="align-self:center;width:34px;" src="@/assets/BRAND-TOYOTA.png">
                <img height='25' v-if="qtReq.CarBrand === 'VOLVO'" style="align-self:center;width:30px;" src="@/assets/BRAND-VOLVO.png">
                <img height='30' v-if="qtReq.CarBrand === 'VW'" style="align-self:center;" src="@/assets/BRAND-VW.png">
                <img height='25' v-if="qtReq.CarBrand === 'NISSAN'" style="align-self:center;" src="@/assets/BRAND-NISSAN.png">
                <img height='27' v-if="qtReq.CarBrand === 'MASERATI'" style="align-self:center;" src="@/assets/BRAND-MASERATI.png">
                <img height='15' v-if="qtReq.CarBrand === 'INFINITI'" style="align-self:center;" src="@/assets/BRAND-INFINITI.png">
                <img height='15' v-if="qtReq.CarBrand === 'GM'" style="align-self:center;" src="@/assets/BRAND-GM.png">
                <i class="Carcenter-type fas fa-wrench" style="color:#fbc02e;" v-if="qtReq.CarBrand === '차종 선택'"></i>  
             </div>
             <div class="chatInfo" :class="{chatInfo2 : checkBrand(qtReq.CarBrand)}">
                <div class="carInfo">
                  <span class="Carcenter-name">{{qtReq.ReqName}} ({{(qtReq.CarNo === "*empty*")?"미상차량" : qtReq.CarNo}})</span> 
                  <span class="Carcenter-reqseq">{{GetUpdateTime(qtReq)}}</span>
                  <span class="Carcenter-reqdt">{{qtReq.ReqDt}}</span><span :class="linkQtSts(qtReq.QTSts)">{{qtReq.QTSts}}</span>
                  <span v-if="qtReq.AgentName !== undefined && qtReq.AgentName !== '*empty*'" class="agent-name" :style="SetColor(qtReq.AgentName)" >{{qtReq.AgentName}}</span>
                  <span class="carSeries">{{qtReq.CarSeries}}</span>
                </div>
                <!--<div>
                  <span :class="linkQtSts(qtReq.QTSts)">{{qtReq.QTSts}}</span>
                </div>-->
             </div>
             <div>
              <b-badge v-show="qtReq.NotReadCnt !== 0" variant="warning" pill class=" mr-1 read-count" >{{qtReq.NotReadCnt}}</b-badge>
              <span type="button" class="Chat-detail">
                <i class="fas fa-angle-double-right"></i>
              </span>
             </div>
           </div>
          </li>
        </ul>        
      </div>

 <!--   </b-tab>
  </b-tabs>-->
  <!--견적접수 메시지-->
  <MessageBox v-if="showQTAccept"  @close="CloseAlerPopup('A')">
    <div slot="header"><h5>알림</h5></div>
    <span slot="body" @click="CloseAlerPopup('A')"><span class="msgBigBody">{{alertMsg}}</span>
    </span>
    <div slot="footer">
      <v-btn depressed small color="#967d5f" dark @click="SaveQtAccept()">확인</v-btn>
      <v-btn depressed small color="blue-grey lighten-2"  @click="CloseAlerPopup('A')">취소</v-btn>
    </div>
  </MessageBox>
  <!--주문접수 메시지-->
  <MessageBox v-if="showOrderAccept"  @close="CloseAlerPopup('O')">
    <div slot="header"><h5>알림</h5></div>
    <span slot="body" @click="CloseAlerPopup('O')"><span class="msgBigBody">{{alertMsg}}</span>
    </span>
    <div slot="footer">
      <v-btn depressed small color="#967d5f" dark @click="SaveOrderAccept()">확인</v-btn>
      <v-btn depressed small color="blue-grey lighten-2"  @click="CloseAlerPopup('O')">취소</v-btn>
    </div>
  </MessageBox>
  <!--확인 메시지-->
  <MessageBox v-if="showAlert"  @close="CloseAlerPopup()">
    <div slot="header"><h5>알림</h5></div>
    <span slot="body" @click="CloseAlerPopup()"><pre>{{alertMsg}}</pre>
    </span>
    <div slot="footer">
      <v-btn depressed small color="#967d5f" dark @click="CloseAlerPopup()">확인</v-btn>
    </div>
  </MessageBox>
  </div>   
  </v-app>
</template>

<!--<script src="https://unpkg.com/axios/dist/axios.min.js"></script>-->
<script src="http://code.jquery.com/jquery-latest.min.js"></script>
<script>
import {datePadding} from '@/utils/common.js'
import Constant from '@/Constant';
import {arrayGroupBy} from '@/utils/common.js'
import MessageBox from '@/components/Common/MessageBox.vue'

const axios = require('axios').default;

export default {
  name: 'UserListPage',
  data () {
    return {
      tabIndex: 0,
      qtReqList: [],
      qtItemIndex: -1,
      selectedId:'',
      searchText:'',
      toggle_exclusive: undefined,
      targetQtId:'',
      showQTAccept: false,
      showOrderAccept:false,
      showAlert: false,
      alertMsg: '',
      agentList: [],
      agentItems: [],
      selectedAgent :"",
      fromDate: new Date().toISOString().substr(0, 10),
      toDate : new Date().toISOString().substr(0, 10),
      menu: false,
      menu2: false,
      showDetail: false,
      searchStsList: [],
      noReadCnt:0,  // 미확인 수
      reqCnt:0,     // 견적요청 수
      actCnt: 0,    // 견적접수 수
      resCnt: 0,    // 견적회신 수
      ordReqCnt:0,  // 주문요청 수
      ordResCnt:0,   // 주문회신 수
    }
  },
  props:['chatInfo', 'showQTId'],
  components: {
    MessageBox: MessageBox,
  },
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
    GetUserColor(){
      var param = {};
      param.operation = "list";
      param.tableName = "BAY4U_USER";
      param.payload = {};
      param.payload.ExpressionAttributeValues = {};
      param.payload.FilterExpression = "CODE = :id";
      var key = ":id";
      param.payload.ExpressionAttributeValues[key] = this.UserInfo.BsnID;  

      axios({
        method: 'POST',
        url: Constant.LAMBDA_URL,
        headers: Constant.JSON_HEADER,
        data: param
      })
      .then((result) => {
        this.agentList = result.data.Items;
        var allItem = {};
        allItem.text = "전체";
        allItem.value = "";
        this.agentItems.push(allItem); 

        this.agentList.forEach(x => {
          if(x.MODE !== "VIEW"){
            var agentItem = {};
            agentItem.text = x.NAME;
            agentItem.value = x;
            this.agentItems.push(agentItem); 
          }
        });
        //console.log('agentList : ', this.agentList) ; 
      });
    },
    SetColor(value){
      let idx = this.agentList.findIndex(x => x.NAME === value);
      if(idx > -1){
        if(this.agentList[idx].COLOR === undefined){
          return 'color:#fff;background-color:#37474F';
        }
        else{
          return 'color:#fff;background-color:' + this.agentList[idx].COLOR;
        }
      }
      else{
        return 'color:#fff;background-color:#37474F';
      }
    },
    SelectedStatus(){
      this.$nextTick(function(){
        this.showQTReqList();
      });
    },
    showQTReqList(idx) {
      this.initQTData();
      var now = new Date();
      var beforeDate = new Date();
      var startDate, endDate;

      /*
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
      else if(idx === 4)
      {
        beforeDate.setDate(beforeDate.getMonth() - 1);
        startDate = beforeDate.getFullYear() + '-' + datePadding(beforeDate.getMonth()+1,2) +'-'+ datePadding(beforeDate.getDate(),2);
        endDate = now.getFullYear() + '-' + datePadding(now.getMonth()+1,2) +'-'+ datePadding(now.getDate(),2);
      }
      else {
        beforeDate.setDate(beforeDate.getDate() - 7);
        startDate = beforeDate.getFullYear() + '-' + datePadding(beforeDate.getMonth()+1,2) +'-'+ datePadding(beforeDate.getDate(),2);
        endDate = now.getFullYear() + '-' + datePadding(now.getMonth()+1,2) +'-'+ datePadding(now.getDate(),2);
      }*/

      startDate = this.fromDate;
      endDate = this.toDate;

      // 과거 견적내역 조회
      /*if(idx === 6){
        beforeDate.setFullYear(beforeDate.getFullYear() - 3);
        startDate =  beforeDate.toISOString().substr(0, 10);
        endDate = now.toISOString().substr(0, 10);
      }*/

      var filter = "ResDealer = :id";
      if(this.searchText === '')
      {
        filter = "ResDealer = :id and ReqDt between :startDt and :endDt";
      }
      else{
        if(idx === 5){
          // 상세 검색버튼 클릭 시
          filter = "ResDealer = :id and ReqDt between :startDt and :endDt  and ( contains(CarNo, :searchText) or contains(ReqName, :searchText) or contains(ReqDt, :searchText) )";
        }
        else{
          filter = "ResDealer = :id and ( contains(CarNo, :searchText) or contains(ReqName, :searchText) or contains(ReqDt, :searchText) )";
        }
      }

      var param = {};
      param.operation = "list";
      param.tableName = "BAY4U_QT_LIST";
      param.payload = {};
      param.payload.ExpressionAttributeValues = {};

      var stsFilter = [];  
      var isNotRead = false;
      if(this.searchStsList.length > 0 ){
        for( var i=0; i < this.searchStsList.length; i++){
          var strSts = this.searchStsList[i]; 
          
          switch (strSts) {
            case 1: // 견적요청
              stsFilter.push("(QTSts = :sts1)");
              param.payload.ExpressionAttributeValues[":sts1"] = "견적요청";
              break;
            case 2: // 견적접수
              stsFilter.push("(QTSts = :sts2)");
              param.payload.ExpressionAttributeValues[":sts2"] = "견적접수";
              break;
            case 3: // 주문요청
              stsFilter.push("(QTSts = :sts4)");
              param.payload.ExpressionAttributeValues[":sts4"] = "주문요청";
              break;
            case 4: // 견적회신
              stsFilter.push("(QTSts = :sts3)");
              param.payload.ExpressionAttributeValues[":sts3"] = "견적회신";
              break;
            case 5: // 주문확정
              stsFilter.push("(QTSts = :sts5)");
              param.payload.ExpressionAttributeValues[":sts5"] = "주문확정";
              break;
            case 0: // 미확인
              isNotRead = true;
              break;
          }
        }
      }

      // 상태조회 조건 체크
      if(isNotRead === false){
        if(stsFilter.length > 0){
          if(stsFilter.length === 1)
            filter = filter + " and " + stsFilter[0] ;
          else
            filter = filter + " and (" + stsFilter.join(" or ") + ")";
        }
      }
      else{
        param.payload.ExpressionAttributeValues = {};
      }

      // 담당자 필터 설정이면
      if(this.selectedAgent !== ''){
        if(this.searchStsList.length > 0){
          if(this.searchStsList.includes(1) !== true && isNotRead === false){
            // 견적요청이 선택되어 있지 않을 때
            filter = filter + " and AgentName = :agentName ";
            param.payload.ExpressionAttributeValues[":agentName"] = this.selectedAgent.NAME;
          }
        }
        else{
          filter = filter + " and (AgentName = :agentName or QTSts = :sts)";
          param.payload.ExpressionAttributeValues[":agentName"] = this.selectedAgent.NAME;
          param.payload.ExpressionAttributeValues[":sts"] = "견적요청";
        }
      }
      param.payload.FilterExpression = filter;
      /*
      if(isNotRead){   
        // 미확인 조회 일때는 한달 
        beforeDate.setMonth(beforeDate.getMonth() - 1);
        startDate = beforeDate.toISOString().substr(0, 10);
        endDate =  now.toISOString().substr(0, 10);
        this.fromDate = startDate;
        this.toDate = endDate;        
      }*/
      
      var key = ":id";
      param.payload.ExpressionAttributeValues[key] = this.UserInfo.BsnID;
      
      if(this.searchText === ''){
        var key2 = ":startDt";
        var key3 = ":endDt";
        param.payload.ExpressionAttributeValues[key2] = startDate;
        param.payload.ExpressionAttributeValues[key3] = endDate;
      }
      else{
        var key2 = ":searchText";
        param.payload.ExpressionAttributeValues[key2] = this.searchText;
        
        if(idx === 5){
          // 상세 검색버튼 클릭 시
          var key3 = ":startDt";
          var key4 = ":endDt";
          param.payload.ExpressionAttributeValues[key3] = startDate;
          param.payload.ExpressionAttributeValues[key4] = endDate;
        }
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
          chat.NotReadCnt = 0;
        }

        // 미확인 채팅 건수
        //if(idx === 4){
        if(isNotRead){
          let itemList = result.data.Items;
          this.getChatReadState('F' ,true , itemList);
        }
        else{
          this.qtReqList = result.data.Items;
          this.getChatReadState('');
        }
      });
    },
    getChatReadState(flag,filterRead ,data)
    {
      // flag : C : created 에서 호출 , 나머지 : 공백
      let param = {};
      param.operation = "list";
      param.tableName = "BAY4U_CHAT";
      param.payload = {};
      param.payload.ExpressionAttributeValues = {};

      let filter = "";
      let idx = 1;
      let docIdList = this.qtReqList;
      if(filterRead !== undefined && filterRead === true){
        docIdList = data;
      }
      console.log('docIdList :', docIdList);
      var minDate = Math.min(...docIdList.map(o=> o.ReqDt.replace(/-/gi, "")));
      
      /*
      for(let item of docIdList)
      { 
        if(idx === 1){
          filter = filter + "DocID = :docID"+idx;
        }
        else{
          filter = filter + " OR DocID = :docID"+idx;
        }
        param.payload.ExpressionAttributeValues[":docID"+idx] = item.ID;
        idx++;
      }*/
        
      filter = filter + "ChatTo = :bsnID and ReqTm >= :reqtm";
      param.payload.FilterExpression = filter;
    
      param.payload.ExpressionAttributeValues[":bsnID"] = this.UserInfo.BsnID;
      param.payload.ExpressionAttributeValues[":reqtm"] = minDate + "000000";

      console.log("======= chat state request result ========");
      console.log(JSON.stringify(param));

      axios({
        method: 'POST',
        url: Constant.LAMBDA_URL,
        headers: Constant.JSON_HEADER,
        data: param
      })
      .then((result) => {
        console.log("=======  result ========");
        console.log(result.data);

        let chatList = result.data.Items;
        
        for(let qt of docIdList)
        {
          //console.log('user :' , qt.AgentName + "/" + this.UserInfo.Name);
          //if(qt.AgentName === undefined || qt.AgentName === this.UserInfo.Name){
          if(qt.AgentName === undefined || qt.ResDealer === this.UserInfo.BsnID){
            let newChatState = chatList.filter(x => x.DocID === qt.ID && x.ChatTo === this.UserInfo.BsnID && x.ReadYn === '0' );
            qt.NotChatIDList = newChatState;
            if(flag !== 'C'){
              qt.NotReadCnt = newChatState.length;
            }
          }
        }
        
        // 미확인 조회
        if(filterRead !== undefined && filterRead === true){
          let list = docIdList.filter(y => y.NotReadCnt > 0);
          this.qtReqList = list; 

          // 다른상태 조회 포함 일때
          if(this.searchStsList.length > 0){
            let stsList = [];
            for( var i=0; i < this.searchStsList.length; i++){
              var strSts = this.searchStsList[i]; 
              if(strSts === 0){
                continue;
              }
              else{
                switch (strSts) {
                  case 1: // 견적요청
                    let sts1 = docIdList.filter(x => x.QTSts === "견적요청");
                    stsList = stsList.concat(sts1);
                    break;
                  case 2: // 견적접수
                    let sts2 = docIdList.filter(x => x.QTSts === "견적접수");
                    stsList = stsList.concat(sts2);
                    break;
                  case 3: // 주문요청
                    let sts4 = docIdList.filter(x => x.QTSts === "주문요청");
                    stsList = stsList.concat(sts4);
                    break;
                  case 4: // 견적회신
                    let sts3 = docIdList.filter(x => x.QTSts === "견적회신");
                    stsList = stsList.concat(sts3);
                    break;
                  case 5: // 주문확정
                    let sts5 = docIdList.filter(x => x.QTSts === "주문확정");
                    stsList = stsList.concat(sts5);
                    break;
                }
              }
            }
            stsList.forEach(z =>{
              var vIdx = this.qtReqList.findIndex(w => w.ID === z.ID);
              if(vIdx === -1){
                if(this.selectedAgent !== ""){
                  
                  if(z.QTSts === "견적요청"){
                    this.qtReqList.push(z);  
                  }
                  else{
                    
                    if(z.AgentName === this.selectedAgent.NAME){
                      this.qtReqList.push(z);
                    }
                  }
                }
                else{
                  this.qtReqList.push(z);
                }
              }
            });

            if(this.selectedAgent !== ""){
              var delIndex = [];
              
              this.qtReqList.forEach(x => {
                if(x.QTSts !== "견적요청" && x.AgentName !== this.selectedAgent.NAME){
                  delIndex.push(x.ID);
                }
              });

              delIndex.forEach(y => {
                var findIdx = this.qtReqList.findIndex(z=>z.ID === y);
                console.log('findIdx :' ,findIdx );
                if(findIdx > -1){
                  this.qtReqList.splice(findIdx,1);
                }
              });
            }
            
            if(Array.isArray(this.qtReqList)) {
              this.qtReqList.sort(function(a, b){
                return (a.ReqSeq < b.ReqSeq) ? 1 : -1;
              });
            }
          }
        } 
        console.log('this.qtReqList:', this.qtReqList);
        this.SetStatus();
      });
    },
    SetStatus(){
      var startDate = this.fromDate;
      var endDate = this.toDate;
      var param = {};
      param.operation = "list";
      param.tableName = "BAY4U_QT_LIST";
      param.payload = {};
      
      var filter = "ResDealer = :id and ReqDt between :startDt and :endDt";
      if(this.searchText !== ""){
        filter = filter + " and ( contains(CarNo, :searchText) or contains(ReqName, :searchText) or contains(ReqDt, :searchText) )";
      }
      param.payload.ExpressionAttributeValues = {};

      var key = ":id";
      var key2 = ":startDt";
      var key3 = ":endDt";
      param.payload.ExpressionAttributeValues[key] = this.UserInfo.BsnID;
      param.payload.ExpressionAttributeValues[key2] = startDate;
      param.payload.ExpressionAttributeValues[key3] = endDate;
      
      if(this.searchText !== ""){
        param.payload.ExpressionAttributeValues[":searchText"] = this.searchText;
      }

      if(this.selectedAgent !== ""){
        filter = filter + " and (AgentName = :agentName or QTSts = :sts)";
        param.payload.ExpressionAttributeValues[":agentName"] = this.selectedAgent.NAME;
        param.payload.ExpressionAttributeValues[":sts"] = "견적요청";
      }

      param.payload.FilterExpression = filter;

      axios({
        method: 'POST',
        url: Constant.LAMBDA_URL,
        headers: Constant.JSON_HEADER,
        data: param
      })
      .then((result) => {
        var qtlist = result.data.Items;
        param = {};
        param.operation = "list";
        param.tableName = "BAY4U_CHAT";
        param.payload = {};
        param.payload.ExpressionAttributeValues = {};

        var minDate = Math.min(...qtlist.map(o=> o.ReqDt.replace(/-/gi, "")));
        filter = "";
        filter = filter + "ChatTo = :bsnID and ReqTm >= :reqtm";
        param.payload.FilterExpression = filter;  
        param.payload.ExpressionAttributeValues[":bsnID"] = this.UserInfo.BsnID;
        param.payload.ExpressionAttributeValues[":reqtm"] = minDate + "000000";

        axios({
          method: 'POST',
          url: Constant.LAMBDA_URL,
          headers: Constant.JSON_HEADER,
          data: param
        })
        .then((result) => {
          let chatList = result.data.Items;
          for(let qt of qtlist){
            if(qt.AgentName === undefined || qt.ResDealer === this.UserInfo.BsnID){
              let newChatState = chatList.filter(x => x.DocID === qt.ID && x.ChatTo === this.UserInfo.BsnID && x.ReadYn === '0' );
              qt.NotChatIDList = newChatState;
              qt.NotReadCnt = newChatState.length;
            }
          }
          this.noReadCnt = 0;   // 미확인 수
          this.reqCnt = 0;      // 견적요청 수
          this.actCnt = 0;      // 견적접수 수
          this.resCnt = 0;      // 견적회신 수
          this.ordReqCnt = 0;   // 주문요청 수
          this.ordResCnt = 0;   // 주문확정 수

          qtlist.forEach(x => {
            this.noReadCnt = this.noReadCnt + x.NotReadCnt;   // 미확인 수
            
            switch(x.QTSts){
              case "견적요청":
                this.reqCnt++;      // 견적요청 수
                break;
              case "견적접수":
                this.actCnt++;      // 견적접수 수
                break;
              case "견적회신":
                this.resCnt++;      // 견적회신 수
                break;
              case "주문요청":
                this.ordReqCnt++;   // 주문요청 수
                break;
              case "주문확정":
                this.ordResCnt++;   // 주문확정 수
                break;
            }
          });
        })
        .catch((error) => {
            console.log(error);
        });
      })
      .catch((error) => {
          console.log(error);
      });
    },
    SetQTInfo(item , idx)
    { 
      var viewMode = localStorage.getItem('LoginMode');  
      this.$emit('setQtInfo' ,item);
      this.qtItemIndex = idx;
      this.selectedId = item.ID;
      if(viewMode !== "VIEW")
      this.qtReqList[idx].isRead = true;

      // 부품지원센터 
      if(this.UserInfo.UserType === "DEALER"){ 
        this.$EventBus.$emit('click-qtInfo' , item)
        this.saveChatState(item);
      }
      else{
        if(item.QTSts === "견적요청"){
          this.alertMsg = ((item.CarNo==='*empty*')?'미상' : item.CarNo) + " 차량 견적접수 하시겠습니까?";
          this.showQTAccept = true;
        }
        else if(item.QTSts === "바로주문"){
          this.alertMsg = ((item.CarNo==='*empty*')?'미상' : item.CarNo) + " 차량 주문접수 하시겠습니까?";
          this.showOrderAccept = true;
        }
        else{
          //console.log('AgentName :',item.AgentName + "/" + this.UserInfo.Name);
          this.$EventBus.$emit('click-qtInfo' , item);
          if(item.AgentName === this.UserInfo.Name){
            // 담당자 일때 읽음 처리
            this.saveChatState(item);
          }
        }
      }
    },
    saveChatState(item)
    {
      var viewMode = localStorage.getItem('LoginMode');
      // 관전모드이면 읽음 처리 안함
      if(viewMode === 'VIEW')return; 

      var readCount = item.NotReadCnt;
      var checkForLoop = 1;

      if(item.NotChatIDList === undefined || item.NotChatIDList.length === 0)  return;
      console.log('state : ', item);
      
      for(let chat of item.NotChatIDList)
      {
        let param = {};
        param.operation = "update";
        param.tableName = "BAY4U_CHAT";
        param.payload = {};
        param.payload.Key = {};
        param.payload.Key.ID = chat.ID;
        param.payload.Key.DocID = item.ID;
        param.payload.UpdateExpression = "Set ReadYn = :a";
        param.payload.ConditionExpression = "ChatTo = :p",
        param.payload.ExpressionAttributeValues = {
          ":a" : "1",
          ":p" : this.UserInfo.BsnID,
        };
        console.log("======= chat read update Request ========");
        console.log(JSON.stringify(param));
        axios({
          method: 'POST',
          url: Constant.LAMBDA_URL,
          headers: Constant.JSON_HEADER,
          data: param
        })
        .then((result) => {
          console.log("======= chat read update  result ========");
          console.log(result.data);
          if(readCount > 0 ){
            readCount = readCount-1;
            item.NotReadCnt = readCount;
          }

          if(checkForLoop++ === item.NotChatIDList.length) {
            console.log("======= chat read Command ========");
            this.$sendCommand({
              command: 'ChatRead',
              //userId: this.UserInfo.BsnID,   
              userId: this.UserInfo.UserID,   
              bsnId: this.UserInfo.BsnID,  
              chatId: item.ID
            });
          }
        })
        .catch((error) => {
          console.log(error);
        });
      }
      this.$nextTick(()=>{
        this.SetStatus();
      })
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
      
      if(value === '견적요청'){
        return 'qtSts-1';
      }
      else if(value === '견적접수' || value === '주문접수'){
        return 'qtSts-5';
      }
      else if(value === '견적회신'){
        return 'qtSts-2';
      }
      else if(value === '주문요청'){
        return 'qtSts-3';
      }
      else if(value === '주문확정'){
        return 'qtSts-4';
      }
      else if(value === '바로주문'){
        return 'qtSts-3';
      }
      else{
        return 'qtSts-0';
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
    },
    showQtInfo(id, showYn)
    {
      let index = this.qtReqList.findIndex(i => i.ID === id);
      this.SetQTInfo(this.qtReqList[index], index);
      this.targetQtId = '';
    },
    CloseAlerPopup(Flag){
      this.showQTAccept = false;
      this.showOrderAccept = false;
      this.showAlert = false;
      if(Flag !== undefined && (Flag === 'A' || Flag === 'O') ){
        this.$EventBus.$emit('click-qtInfo' , this.qtReqList[this.qtItemIndex])
      }
    },
    SaveQtAccept()
    {
      let targetQtItem = this.qtReqList[this.qtItemIndex];
        
      // 견적상태 체크 후 견적접수
      var param = {};
      param.operation = "list";
      param.tableName = "BAY4U_QT_LIST";
      param.payload = {};
      param.payload.FilterExpression = "ID = :id";
      param.payload.ExpressionAttributeValues = {};
      var key = ":id";   
      param.payload.ExpressionAttributeValues[key] = targetQtItem.ID;
      
      axios({
        method: 'POST',
        url: Constant.LAMBDA_URL,
        headers: Constant.JSON_HEADER,
        data: param
      })
      .then((result) => {
        let qtSts = result.data.Items[0].QTSts;
        let now = new Date();
        let chatTime = now.getFullYear() + datePadding(now.getMonth()+1,2) + datePadding(now.getDate(),2) 
            + datePadding(now.getHours(),2) + datePadding(now.getMinutes(), 2) + datePadding(now.getSeconds(),2);

        if(qtSts === "견적요청"){
          
          // 견적상태 변경 / 담당자 저장
          param.operation = "update";
          param.tableName = "BAY4U_QT_LIST";
          param.payload = {};
          param.payload.Key = {};
          param.payload.Key.ID = targetQtItem.ID;
          param.payload.UpdateExpression = "Set AgentName = :b, QTSts = :c, ResUserID = :e, ReqSeq = :d " ;
          param.payload.ExpressionAttributeValues = {
              ":b" : this.UserInfo.Name,
              ":c" : "견적접수",
              ":e" : this.UserInfo.UserID,
              ":d" : chatTime
          };      
          console.log("======= QT Update Request ========");
          console.log(JSON.stringify(param));
          axios({
              method: 'POST',
              url: Constant.LAMBDA_URL,
              headers: Constant.JSON_HEADER,
              data: param
          })
          .then((result) => {
            console.log("======= QT Update result ========");
            console.log(result.data);

            targetQtItem.QTSts = "견적접수";
            targetQtItem.AgentName = this.UserInfo.Name;
            targetQtItem.NotReadCnt = 0;
            this.showQTAccept = false;

            // 견적접수 메시지 전송
            let msg = ((targetQtItem.CarNo==='*empty*')?'미상' : targetQtItem.CarNo) + " 차량에 대한 견적이 접수됐습니다.";
            let qtMsg = {};
            qtMsg.from = {'name' : this.UserInfo.BsnID};
            qtMsg.msg  = msg;
            qtMsg.reqTm = chatTime;
            qtMsg.ChatType = "A";
            qtMsg.qtInfo = targetQtItem;
            this.SaveAcceptChatMsg(qtMsg);
            qtMsg.docId = targetQtItem.ID;
            this.TopMoveChat(qtMsg);
            
            // 과거 주문내역 조회
            /*this.$nextTick(()=>{
              if(this.UserInfo.UserType !== "DEALER")
              this.GetCarNoOrdHistory(targetQtItem.CarNo);
            });*/
          })
          .catch((error) => {
            console.log(error);
          });
        }
        else{
          this.alertMsg = "견적요청 상태가 아닙니다.";
          this.showAlert = true;
          targetQtItem.QTSts = qtSts;
          targetQtItem.NotReadCnt = 0;
          targetQtItem.isRead = true;
        }
      })
      .catch((error) => {
        console.log(error);
      })
    },
    SaveOrderAccept()
    {
      let targetQtItem = this.qtReqList[this.qtItemIndex];
        
      // 견적상태 체크 후 주문접수
      var param = {};
      param.operation = "list";
      param.tableName = "BAY4U_QT_LIST";
      param.payload = {};
      param.payload.FilterExpression = "ID = :id";
      param.payload.ExpressionAttributeValues = {};
      var key = ":id";   
      param.payload.ExpressionAttributeValues[key] = targetQtItem.ID;
      
      axios({
        method: 'POST',
        url: Constant.LAMBDA_URL,
        headers: Constant.JSON_HEADER,
        data: param
      })
      .then((result) => {
        let qtSts = result.data.Items[0].QTSts;
        if(qtSts === "바로주문"){

          // 견적상태 변경 / 담당자 저장
          param.operation = "update";
          param.tableName = "BAY4U_QT_LIST";
          param.payload = {};
          param.payload.Key = {};
          param.payload.Key.ID = targetQtItem.ID;
          param.payload.UpdateExpression = "Set AgentName = :b, QTSts = :c, ResUserID = :e" ;
          param.payload.ExpressionAttributeValues = {
              ":b" : this.UserInfo.Name,
              ":c" : "주문접수",
              ":e" : this.UserInfo.UserID
          };
                  
          console.log("======= QT Update Request ========");
          console.log(JSON.stringify(param));

          axios({
              method: 'POST',
              url: Constant.LAMBDA_URL,
              headers: Constant.JSON_HEADER,
              data: param
          })
          .then((result) => {
            console.log("======= QT Update result ========");
            console.log(result.data);

            targetQtItem.QTSts = "주문접수";
            targetQtItem.NotReadCnt = 0;
            targetQtItem.AgentName = this.UserInfo.Name;
            this.showOrderAccept = false;

            // 견적접수 메시지 전송
            let now = new Date();
            let chatTime = now.getFullYear() + datePadding(now.getMonth()+1,2) + datePadding(now.getDate(),2) 
                + datePadding(now.getHours(),2) + datePadding(now.getMinutes(), 2) + datePadding(now.getSeconds(),2);

            let msg = ((targetQtItem.CarNo==='*empty*')?'미상' : targetQtItem.CarNo) + " 차량에 대한 주문이 접수됐습니다.";
            let qtMsg = {};
            qtMsg.from = {'name' : this.UserInfo.BsnID};
            qtMsg.msg  = msg;
            qtMsg.reqTm = chatTime;
            qtMsg.ChatType = "A";
            qtMsg.qtInfo = targetQtItem;
            this.SaveAcceptChatMsg(qtMsg);
          })
          .catch((error) => {
            console.log(error);
          });
        }
        else{
          this.alertMsg = "바로주문 상태가 아닙니다.";
          this.showAlert = true;
          targetQtItem.QTSts = qtSts;
          targetQtItem.NotReadCnt = 0;
          targetQtItem.isRead = true;
        }
      })
      .catch((error) => {
        console.log(error);
      })
    },
    SaveAcceptChatMsg(chatMsg) {
      // 견적접수 메시지 저장
      var param = {};
      var now = new Date();
      var id = '';
      id =  this.UserInfo.BsnID + now.getFullYear()%100 + datePadding(now.getMonth()+1,2) + datePadding(now.getDate(),2) 
                + datePadding(now.getHours(),2) + datePadding(now.getMinutes(), 2) + datePadding(now.getSeconds(),2);

      var key = now.getFullYear() + datePadding(now.getMonth()+1,2) + datePadding(now.getDate(),2) 
                + datePadding(now.getHours(),2) + datePadding(now.getMinutes(), 2) + datePadding(now.getSeconds(),2);

      param.operation = "create";
      param.tableName = "BAY4U_CHAT";
      param.payload = {};
      param.payload.Item = {};
      param.payload.Item.ID = id;
      param.payload.Item.DocID = chatMsg.qtInfo.ID;  //docId
      param.payload.Item.ChatFrom = this.UserInfo.BsnID;
      param.payload.Item.ChatTo = chatMsg.qtInfo.ReqSite;
      param.payload.Item.Message = chatMsg.msg;
      //param.payload.Item.Status = "0";
      param.payload.Item.ReadYn = "0";
      param.payload.Item.ReqTm = chatMsg.reqTm;
      if(chatMsg.ChatType !== undefined){
        param.payload.Item.ChatType = chatMsg.ChatType;
      }
      else{
         param.payload.Item.ChatType = "D";
      }
      param.payload.Item.SaveName = this.UserInfo.Name;
      param.payload.Item.SaveID = this.UserInfo.UserID;

      console.log("======= Chat Save Request ========");
      console.log(JSON.stringify(param));

      axios({
          method: 'POST',
          url: Constant.LAMBDA_URL,
          headers: Constant.JSON_HEADER,
          data: param
      })
      .then((result) => {
        console.log("======= Chat Save result ========");
        console.log(result.data);
        
        chatMsg.qtInfo.SaveFlag = "ACCEPT";
        this.$EventBus.$emit('click-qtInfo' , chatMsg.qtInfo);
        this.saveChatState(chatMsg.qtInfo);

        this.$sendMessage({
          name: this.UserInfo.BsnID,
          msg: chatMsg.msg,
          recv: chatMsg.qtInfo.ReqSite,
          chatId: id, 
          docId: chatMsg.qtInfo.ID,
          reqTm: chatMsg.reqTm,
          chatType: chatMsg.ChatType,
          refId: chatMsg.RefID,
          qtInfo: chatMsg.qtInfo,
          sendId: this.UserInfo.UserID,
          sendName: this.UserInfo.Name,
          sendFlag: "DEALER"
        });

      })
      .catch((error) => {
        console.log(error);
      });
    },
    TopMoveChat(data){
      var findIdx = this.qtReqList.findIndex(x => x.ID === data.docId);
      console.log('Find Index :',findIdx);
      console.log('Selected Index :',this.qtItemIndex);
      if(findIdx > -1){
        this.qtReqList[findIdx].ReqSeq = data.reqTm;

        if(findIdx === this.qtItemIndex){
          this.qtItemIndex = 0;
        }
        else{
          if(this.qtItemIndex < findIdx){
            this.qtItemIndex = this.qtItemIndex + 1;
          }
        }

        if(Array.isArray(this.qtReqList)) {
          this.qtReqList.sort(function(a, b){
          return (a.ReqSeq < b.ReqSeq) ? 1 : -1;
          });
        }

        /*if(this.selectedId === data.docId){
          this.qtItemIndex = 0;
        }*/
      }
      this.SetStatus();
    },
    GetUpdateTime(value){
      var now = new Date();
      var today = now.getFullYear() + "-" + datePadding(now.getMonth()+1,2) + "-" + datePadding(now.getDate(),2);
      
      var beforeDate = new Date();
      beforeDate.setDate(beforeDate.getDate() - 1);
      var yesterDay = beforeDate.getFullYear() + "-" + datePadding(beforeDate.getMonth()+1,2) + "-" + datePadding(beforeDate.getDate(),2);
      
      if(value.ReqSeq.substr(0,8) === today.replace(/-/gi, "")){
        var vStr = value.ReqSeq.substr(8,2) < 12 ? '오전 ' : '오후 ';
        var vHour = value.ReqSeq.substr(8,2);
        if (vHour !== 12) {
          vHour = vHour%12;
        } 
        var vMinute = value.ReqSeq.substr(10,2);
        return vStr + vHour + ":" + vMinute; 
      }
      else if(value.ReqDt === today){
        // 당일이면 시간 리턴
        var vStr = value.ReqSeq.substr(8,2) < 12 ? '오전 ' : '오후 ';
        var vHour = value.ReqSeq.substr(8,2);
        if (vHour !== 12) {
          vHour = vHour%12;
        } 
        var vMinute = value.ReqSeq.substr(10,2);
        return vStr + vHour + ":" + vMinute; 
      }
      else if(yesterDay === value.ReqDt){
        // 어제
        return '어제';
      }
      else{
        return value.ReqDt;
      }
    },
    SetInitData(){
      // 검색조건 초기화
      this.searchStsList = [];

      if(this.showDetail === true)
        this.showDetail = false;

      var now = new Date();
      var beforeDate = new Date();
      beforeDate.setDate(beforeDate.getDate() - 7);
      this.fromDate = beforeDate.toISOString().substr(0, 10);
      this.toDate = now.toISOString().substr(0, 10);
      
      this.searchText="";
      
      this.showQTReqList();
    },
    SetSearchDate(days){
      var now = new Date();
      var beforeDate = new Date();
          
      // 일주일
      if(days === 7){
        beforeDate.setDate(beforeDate.getDate() - 7);
      }
      // 한달
      if(days === 30){
        beforeDate.setMonth(beforeDate.getMonth() - 1);
      }

      this.fromDate = beforeDate.toISOString().substr(0, 10);
      this.toDate = now.toISOString().substr(0, 10);

      this.showQTReqList(5);
    },
    saveReadYn(docId)
    {

      var param = {};
      param.operation = "list";
      param.tableName = "BAY4U_CHAT";
      param.payload = {};
      param.payload.FilterExpression = "DocID = :id and ChatTo = :c and ReadYn = :r";
      param.payload.ExpressionAttributeValues = {};
      var key = ":id";     
      param.payload.ExpressionAttributeValues[key] = docId;
      var key2 = ":c";     
      param.payload.ExpressionAttributeValues[key2] = this.UserInfo.BsnID;
      var key3 = ":r";     
      param.payload.ExpressionAttributeValues[key3] = "0";

      //console.log("======= Chat Msg List param ========");
      //console.log(JSON.stringify(param));

      axios({
        method: 'POST',
        url: Constant.LAMBDA_URL,
        headers: Constant.JSON_HEADER,
        data: param
      })
      .then((result) => {

        console.log("======= Chat Msg List result ========");
        console.log(param);
        var chatList = result.data.Items;
        if(chatList.length > 0){
          chatList.forEach(x =>{
            param.operation = "update";
            param.tableName = "BAY4U_CHAT";
            param.payload = {};
            param.payload.Key = {};
            param.payload.Key.ID = x.ID;
            param.payload.Key.DocID = x.DocID;
            param.payload.UpdateExpression = "Set ReadYn = :a";
            param.payload.ConditionExpression = "ChatTo = :p",
            param.payload.ExpressionAttributeValues = {
              ":a" : "1",
              ":p" : this.UserInfo.BsnID,
            };

            //console.log("======= chat read update Request ========");
            //console.log(param);

            axios({
              method: 'POST',
              url: Constant.LAMBDA_URL,
              headers: Constant.JSON_HEADER,
              data: param
            })
            .then((result) => {
              //console.log("======= chat read update  result ========");
              //console.log(result.data);
            })
            .catch((error) => {
              console.log(error);
            });
          });
        }
      })
      .catch((error) => {
        console.log(error);
      });
    },
  },
  updated(){
    if(this.targetQtId !== '')
    {
      this.showQtInfo(this.targetQtId);
    }
  },
  mounted(){
    this.GetUserColor();
    this.showQTReqList();
  },
  created : function() {

    var now = new Date();
    var beforeDate = new Date();
    beforeDate.setDate(beforeDate.getDate() - 7);
    this.fromDate = beforeDate.toISOString().substr(0, 10);
    this.toDate = now.toISOString().substr(0, 10);

    this.targetQtId = this.showQTId;
    
    if(this.UserInfo.BsnID === '')
      this.UserInfo.BsnID = this.$cookies.get('BsnID');
    if(this.UserInfo.Name === '')
      this.UserInfo.Name = this.$cookies.get('UserNM');
    if(this.UserInfo.UserID === '')
      this.UserInfo.UserID = this.$cookies.get('UserID');
    if(this.UserInfo.UserType === '')
      this.UserInfo.UserType = this.$cookies.get('UserType');

    this.$socket.on('command', (data) => {
      console.log('command : ' , data);
      if(data.command === 'ChatRead' ){       
        let docId = data.chatId;
        let idx = this.qtReqList.findIndex(x => x.ID === docId);
        //console.log('read index : ' , this.qtReqList[idx]);
        if(idx > -1 ){
          // 읽음처리
          if(this.qtReqList[idx].NotReadCnt > 0){
            this.qtReqList[idx].isRead = true;
            this.qtReqList[idx].NotReadCnt = 0;
          }
        }
      }
    });

    this.$EventBus.$on('UserListPage.AddNewChat', data => {  
      console.log('docId : ' , data);
      console.log('QTLIST:' , this.qtReqList);
      var flag = '';
      var checkExist = false;
      var index = 0;
      var delIndex = [];
      for (var chat of this.qtReqList) {
        // 중복체크
        if(chat.NotChatIDList !== undefined && chat.NotChatIDList.length > 0){
          let chkIndex = chat.NotChatIDList.findIndex(c => c.ID === data.chatId);
          if(chkIndex > -1) return;
        }

        if(chat.ID === data.docId) {
          console.log('chat:',chat );
          console.log('chat.NotReadCnt:',chat.NotReadCnt );
          chat.ReqSeq = data.reqTm;
          chat.isRead = false;
          // 대리점 메시지 일때
          if(data.sendFlag === 'DEALER'){           
            if(data.chatType === "A"){
              // 견적접수나 주문접수 채팅이면 읽음 처리 , 담당자 변경
              chat.isRead = true;
              chat.NotReadCnt = 0;
              chat.AgentName = data.sendName;
            }
            else{
              // 다른 User 전송메시지이면 상태 읽음처리
              /*(data.sendName !== this.UserInfo.Name){
                chat.isRead = true;
                chat.NotReadCnt = 0;
              }*/
              // 일반메시지 전송이 아닐 때 담당자 변경
              if(data.chatType !== undefined && data.chatType !== "D"){
                chat.AgentName = data.sendName;
              }
            }

            if(data.autoYn !== undefined && data.autoYn === "auto") {
              chat.isRead = true;
              chat.NotReadCnt = 0;
              this.saveReadYn(data.docId);
            }
          }
          else{
            // 카센터 메시지 일때
            if(chat.NotReadCnt === undefined){
              chat.NotReadCnt = 1;
            }
            else{
              chat.NotReadCnt = chat.NotReadCnt + 1;
            }

            /*
            if(chat.AgentName === this.UserInfo.Name || chat.AgentName === ''){
              if(chat.NotReadCnt === undefined){
                chat.NotReadCnt = 1;
              }
              else{
                chat.NotReadCnt = chat.NotReadCnt + 1;
              }
            }
            else{
              chat.isRead = true;
              chat.NotReadCnt = 0;
            }*/
          }

          checkExist = true;
          
          // 일반 메시지가 아니면 상태 변경
          if(data.qtInfo !== undefined && data.chatType !== undefined && data.chatType !== "D"){
            chat.QTSts = data.qtInfo.QTSts; 
            chat.CarSeries = data.qtInfo.CarSeries; 
          }

          // 담당자 선택 조회 중 일때  
          if(data.sendFlag === 'DEALER' && this.selectedAgent !== "" && this.selectedAgent.ID !== data.qtInfo.ReqUserID){
            console.log('대리점 메시지 담당자 다름! - ',index) ;
            delIndex.push(index);
          }
        }
        index++;
      }

      if(delIndex.length > 0){
        for(var i of delIndex){
          this.qtReqList.splice(i,1);
          this.initQTData();
        }
      }
      console.log('checkExist:',  checkExist);
      // 값이 true가 아니면 현재 리스트에 없다는 의미으로 다시 조회해 와서 표시 하자.
      if(checkExist === false) {

        flag = 'C';
        //console.log('docId.qtInfo : ' , docId.qtInfo);
        if(data.qtInfo !== undefined){
          console.log('Param qtInfo : ' , data.qtInfo);
          var newQtData = {};
          newQtData.CarBrand = data.qtInfo.CarBrand;
          newQtData.CarNo = data.qtInfo.CarNo;
          newQtData.CarVin = data.qtInfo.CarVin;
          newQtData.CarSeries = data.qtInfo.CarSeries; 
          newQtData.ID  = data.qtInfo.ID;
          newQtData.IMG  = data.qtInfo.IMG;
          newQtData.LineItem  = data.qtInfo.LineItem;
          newQtData.Memo  = data.qtInfo.Memo;
          newQtData.ReqDt  = data.qtInfo.ReqDt;
          newQtData.ReqName  = data.qtInfo.ReqName;
          newQtData.ReqSeq  = data.qtInfo.ReqSeq;
          newQtData.ReqSite  = data.qtInfo.ReqSite;
          newQtData.ResDealer  = data.qtInfo.ResDealer;
          newQtData.QTSts  = data.qtInfo.QTSts;
          newQtData.isRead  = false;
          newQtData.NotReadCnt  = 1;
        
          // 전송된 채팅 견적상태가 상태 조회값에 있으면 채팅 추가 
          if(this.searchStsList.length > 0 && this.searchStsList.includes(data.qtInfo.QTSts) === true){
            console.log('상태조회 값 있음!!');
            this.qtReqList.push(newQtData);    
          }
          else{
            console.log('상태조회 값 없음!!');
            if(data.qtInfo.QTSts === "견적요청"){
              this.qtReqList.push(newQtData);
            }
            else{
              if(this.selectedAgent === ""){
                console.log('담당자 전체 조회');
                this.qtReqList.push(newQtData);
              }
              else if(this.selectedAgent.ID === data.qtInfo.ReqUserID){
                console.log('담당자 조회 : ' , data.qtInfo.ReqUserID);
                this.qtReqList.push(newQtData);
              }
            }
          }
        }
      }

      this.TopMoveChat(data);

      if(Array.isArray(this.qtReqList)) {
        this.qtReqList.sort(function(a, b){
          return (a.ReqSeq < b.ReqSeq) ? 1 : -1;
        });
      }

      //this.$nextTick(function(){
        this.getChatReadState(flag);
      //});
    }); 
    
    this.$EventBus.$on('update-Sts', updateData => {
      console.log('updateData :' ,updateData);
   
      let index = this.qtReqList.findIndex(element => element.ID === updateData.ID);
      if(index >= 0){
        // 일반 채팅 메시지가 아닐때는 상태변경
        if(updateData.ChatType !== undefined && updateData.chatType !== "D"){
          this.qtReqList[index].QTSts = updateData.Msg;
        }
        
        if(updateData.AgentName !== undefined && updateData.SendFlag === "DEALER"){
          this.qtReqList[index].AgentName = updateData.AgentName;
        }

        if(updateData.UpdateRead !== undefined && updateData.UpdateRead === "Y"){
          this.saveChatState(this.qtReqList[index]);
        }
        
        // 견적상태 조회 필터 설정 체크
        if(this.searchStsList.length > 0){
          if(this.searchStsList.includes(updateData.Msg) !== true){
             // 견적상태 조회 필터에 Update 견적상태와 다르면 채팅목록에서 삭제
             this.qtReqList.splice(index,1);
             // 선택 한 채팅인데 목록에서 빠지면 상세 초기화 
             if(this.qtItemIndex === index){
               this.initQTData();
             }
          }
          this.SetStatus();
        }
        else{
          this.SetStatus();
        }

        if(this.qtReqList.length === 0){
          // 상세내역 초기화
          this.initQTData();
        }
      }
    });

    // 최신채팅 채팅목록 위로 이동 
    this.$EventBus.$on('UserListPage.TopMoveChat', data => {  
      this.TopMoveChat(data);
    });
  },    
  computed:{
    UserInfo: {
        get() { return this.$store.getters.UserInfo },
        set(value) { this.$store.dispatch('UpdateUserInfo',value) }
    }
  },
  beforeDestroy(){
    this.$EventBus.$off('UserListPage.AddNewChat');
    this.$EventBus.$off('update-Sts');
    this.$EventBus.$off('UserListPage.TopMoveChat');
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
.UserList-title{
  background-color: #6c757d;
  height: 40px;
  border-radius: 3px 3px 0px 0px;
  position: relative;
  display: flex;
  padding-top: 6px;
  /* color: 	#f6c107;
  text-align:center;
  */
}
.UserList-title-text{
  color: 	#f6c107;
  margin-left: 12px;
  font-size: 0.95em;
}
.UserList-title-agentList{
  position: absolute;
  right:5px;
  height: 40px;
}
.agent-select{
  width: 100px;
  height: 25px;
  padding:1px 5px;
  font-size: 0.9em;
  background-color: white;
  border: 1px solid #E0E0E0;
  border-radius: 0px;
}
.UserListPage{
  width: 100%;
  height: 100%;
  padding: 5px;
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
  top:42px;
}
.search-form-input{
  display: flex;
  height: 44px;
  /*
  margin-left: 2px;
  padding-right: 2px;
  border:1px solid #616161;
  border-radius: 5px 5px 5px 5px;*/
}
.search-form-text{
  margin-left: 3px;
  margin-right: 0px;
  flex:60%;
}
.search-form-button{
  margin-top: 1px;
}
.search-form-button button{
  height: 40px;
  padding: 3px;
  background-color: #4E342E;
  border-left: 0px solid #4E342E;
}
.search-form-button :nth-child(2){
  background-color:#6D4C41;
  border-radius: 0px 3px 3px 0px;
}
.search-date-form{
  margin: 0px;
  padding:5px;
  border-radius: 3px 3px 3px 3px;
  border: 1px solid #BCAAA4;
  background-color:#EFEBE9;
}
.search-date{
  height: 35px;
}
.date-input{
  font-size: 0.8em;
  height:30px;
}
.search-date-chips{
  display: flex;
}
.search-date-chip{
  flex: 80%;
}
.search-date-button{
  flex:auto;
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
  padding-left: 24px;
  flex:50%;
}
.Chat-list .carInfo{
  width:95%;
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
  position: absolute;
  line-height: 20px;
}
.Carcenter-reqseq{
  font-size: 0.6em;
  line-height: 10px;
  position: absolute;
  color: #263238;
  margin-right: 5px;
  margin-top: 2px;
  top:0;
  right: 0;
}
.Carcenter-reqdt{
  font-size: 0.85em;
  line-height: 15px;
}
.agent-name{
  font-size: 0.86em;
  /*background-color:#EEE8AA;*/
  margin-left: 8px;
  padding:0px 6px;
  border-radius: 10px 0px 0px 0px;
}
.read-count{
  padding-left: 5px;
  text-align: center;
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
  /*width: 160px;*/
  width:70%;
}
.Chat-detail {
  align-self: center;
  margin-left: auto;
  color: #5d4038;
  -webkit-appearance:none;
  -moz-appearance:none;
}
.qtSts-0{
  font-size: 0.8em;
  font-weight: bold;
  margin-left:10px;
  text-align: right;
}
/*견적요청 */
.qtSts-1{
  font-size: 0.8em;
  font-weight: bold;
  margin-left:10px;
  /*position: absolute;
  right:40px;
  top: 0px;*/
  color:#3F51B5;
}
/*견적회신 */
.qtSts-2{
  font-size: 0.8em;
  font-weight: bold;
  margin-left:10px;
  text-align: right;
  color:#1B5E20;
}
/*주문요청 */
.qtSts-3{
  font-size: 0.8em;
  font-weight: bold;
  margin-left:10px;
  color:#E53935;
}
/*주문완료 */
.qtSts-4{
  font-size: 0.8em;
  font-weight: bold;
  margin-left:10px;
  color:#FF6D00;
}

/*견적접수 */
.qtSts-5{
  font-size: 0.8em;
  font-weight: bold;
  margin-left:10px;
  color:#7B0099;
}
</style>
