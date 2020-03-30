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
        <!--<v-chip class="mr-1 pr-2 pl-2" @click="showQTReqList(1)">어제</v-chip>-->
        <v-chip class="mr-1 pr-2 pl-2" @click="showQTReqList(2)">일주일</v-chip>
        <v-chip class="mr-1 pr-2 pl-2" @click="showQTReqList(3)">한달</v-chip>
        <v-chip class="mr-1 pr-2 pl-2" @click="showQTReqList(4)">미확인</v-chip>
      </v-chip-group>          
    </v-row>
      <div class="Chat-list">
        <ul>
         <li v-for="(qtReq, index) in qtReqList" v-bind:key = "index" v-on:click="SetQTInfo(qtReq,index)" >
           <div class="chat-item flex-direction_row" :class="{selectItem : selectedList(index), noReadItem : qtReq.isRead === false || qtReq.NotReadCnt !== 0}">
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
    </b-tab>
  </b-tabs>
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
      searchText:'',
      toggle_exclusive: undefined,
      targetQtId:'',
      showQTAccept: false,
      showOrderAccept:false,
      showAlert: false,
      alertMsg: '',
      agentList: []
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
    showQTReqList(idx) {
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
      else if(idx === 4)
      {
        beforeDate.setDate(beforeDate.getDate() - 7);
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
          chat.NotReadCnt = 0;
        }

        // 미확인 채팅 건수
        if(idx === 4){
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
      }
      param.payload.FilterExpression = filter;
      //console.log("======= chat state request result ========");
      //console.log(JSON.stringify(param));

      axios({
        method: 'POST',
        url: Constant.LAMBDA_URL,
        headers: Constant.JSON_HEADER,
        data: param
      })
      .then((result) => {
        //console.log("=======  result ========");
        //console.log(result.data);

        let chatList = result.data.Items;
        for(let qt of this.qtReqList)
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
          let list = this.qtReqList.filter(y => y.NotReadCnt > 0);
          this.qtReqList = list;
        }
        console.log('this.qtReqList:', this.qtReqList);
      });
    },
    SetQTInfo(item , idx)
    {
      var viewMode = localStorage.getItem('LoginMode');
      
      this.$emit('setQtInfo' ,item);
      this.qtItemIndex = idx;

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
          if(item.AgentName === this.UserInfo.Name)
          {
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
    showQtInfo(ID)
    {
      let index = this.qtReqList.findIndex(i => i.ID === ID);
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
        if(qtSts === "견적요청"){

          // 견적상태 변경 / 담당자 저장
          param.operation = "update";
          param.tableName = "BAY4U_QT_LIST";
          param.payload = {};
          param.payload.Key = {};
          param.payload.Key.ID = targetQtItem.ID;
          param.payload.UpdateExpression = "Set AgentName = :b, QTSts = :c, ResUserID = :e" ;
          param.payload.ExpressionAttributeValues = {
              ":b" : this.UserInfo.Name,
              ":c" : "견적접수",
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

            targetQtItem.QTSts = "견적접수";
            targetQtItem.AgentName = this.UserInfo.Name;
            targetQtItem.NotReadCnt = 0;
            this.showQTAccept = false;

            // 견적접수 메시지 전송
            let now = new Date();
            let chatTime = now.getFullYear() + datePadding(now.getMonth()+1,2) + datePadding(now.getDate(),2) 
                + datePadding(now.getHours(),2) + datePadding(now.getMinutes(), 2) + datePadding(now.getSeconds(),2);

            let msg = ((targetQtItem.CarNo==='*empty*')?'미상' : targetQtItem.CarNo) + " 차량에 대한 견적이 접수됐습니다.";
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
      var flag = '';
      var checkExist = false;
      
      for (var chat of this.qtReqList) {
        // 중복체크
        if(chat.NotChatIDList !== undefined && chat.NotChatIDList.length > 0){
          let chkIndex = chat.NotChatIDList.findIndex(c => c.ID === data.chatId);
          if(chkIndex > -1) return;
        }

        if(chat.ID === data.docId) {
          console.log('chat:',chat );
          console.log('chat.NotReadCnt:',chat.NotReadCnt );
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
          }
          else{
            // 정비소 메시지 일때
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
          }
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
          this.qtReqList.push(newQtData);    
          //console.log('qtReqList : ' ,this.qtReqList);

          if(Array.isArray(this.qtReqList)) {
            this.qtReqList.sort(function(a, b){
            return (a.ReqSeq < b.ReqSeq) ? 1 : -1;
            });
          }
        }
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
