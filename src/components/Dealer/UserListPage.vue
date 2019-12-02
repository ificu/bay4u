<template>
  <div class="UserListPage">
  <b-tabs class="UserList-Tab"  v-model="tabIndex" content-class="mt-3" fill>
    <b-tab  class="tabPage1" title="카센터 대화목록" active :title-link-class="linkClass(0)">
      <div class="Chat-search mdl-textfield mdl-js-textfield mdl-textfield--expandable">
        <label class="mdl-button mdl-js-button mdl-button--icon" for="sample6" v-on:click="showQTReqList()">
          <i class="material-icons">search</i>
        </label>
        <div class="mdl-textfield__expandable-holder">
          <input class="mdl-textfield__input" type="text" id="sample6">
          <label class="mdl-textfield__label" for="sample-expandable">Expandable Input</label>
        </div>
      </div>

      <div class="Chat-list">
        <ul>
          <li v-for="(qtReq, index) in qtReqList" v-bind:key = "index" v-on:click="SetQTInfo(qtReq,index)" :class="{selectItem : selectedList(index)}">
            <i class="Carcenter-type fas fa-wrench" style="color:#fbc02e;" v-if="qtReq.isRead === true"></i>     
            <i class="Carcenter-type fas fa-wrench" style="color:red;" v-else-if="qtReq.isRead === false"></i>          
            <p class="Carcenter-name">{{qtReq.ReqName}} ({{qtReq.CarNo}})<br>{{qtReq.ReqDt}}</p>
            <span type="button" class="Chat-detail">
              <i class="fas fa-angle-double-right"></i>
            </span>            
          </li>
        </ul>        
        <!--
        <ul>
          <li>
            <i class="Carcenter-type fas fa-wrench" style="color:#fbc02e;"></i>
            <p class="Carcenter-name">No1. 카센터</p>
            <span type="button" class="Chat-detail">
              <i class="fas fa-angle-double-right"></i>
            </span>
          </li>
          <li>
            <i class="Carcenter-type fas fa-wrench" style="color:#967d5f;"></i>
            <p class="Carcenter-name">동진 카센타</p>
            <span type="button" class="Chat-detail">
              <i class="fas fa-angle-double-right"></i>
            </span>
          </li>
          <li>
            <i class="Carcenter-type fas fa-wrench" style="color:#967d5f;"></i>
            <p class="Carcenter-name">하나 정비</p>
            <span type="button" class="Chat-detail">
              <i class="fas fa-angle-double-right"></i>
            </span>
          </li>
          <li>
            <i class="Carcenter-type fas fa-wrench" style="color:#ccc;"></i>
            <p class="Carcenter-name">스피드 오토</p>
            <span type="button" class="Chat-detail">
              <i class="fas fa-angle-double-right"></i>
            </span>
          </li>
        </ul>-->
      </div>
    </b-tab>
    <b-tab title="대리점 대화목록" :title-link-class="linkClass(1)">

    </b-tab>
  </b-tabs>
  </div>   
</template>

<script src="https://unpkg.com/axios/dist/axios.min.js"></script>
<script>
import Constant from '@/Constant';

export default {
  name: 'UserListPage',
  data () {
    return {
      tabIndex: 0,
      qtReqList: [],
      qtItemIndex: -1
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
    showQTReqList() {

      this.initQTData();

      var param = {};
      param.operation = "list";
      param.tableName = "BAY4U_QT_LIST";
      param.payload = {};
      param.payload.FilterExpression = "ResDealer = :id";
      param.payload.ExpressionAttributeValues = {};
      var key = ":id";
      param.payload.ExpressionAttributeValues[key] = this.UserInfo.BsnID;

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


    this.$EventBus.$on('update-chatMsg', docId => {  
      var checkExist = false;

      for (var chat of this.qtReqList) {
        if(chat.ID === docId) {
          chat.isRead = false;
          checkExist = true;
        }
      }

      // 값이 true가 아니면 현재 리스트에 없다는 의미으로 다시 조회해 와서 표시 하자.
      if(checkExist === false) {
        console.log('checkExist : false');
        var param = {};
        param.operation = "list";
        param.tableName = "BAY4U_QT_LIST";
        param.payload = {};
        param.payload.FilterExpression = "ResDealer = :id";
        param.payload.ExpressionAttributeValues = {};
        var key = ":id";
        param.payload.ExpressionAttributeValues[key] = this.UserInfo.BsnID;

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
              return (a.ReqDt < b.ReqDt) ? 1 : -1;
            });
          }

          for (var chat of result.data.Items) {
            if(chat.ID === docId) {
              chat.isRead = false;
            }            
            else {
              chat.isRead = true;
            }
          }

          this.qtReqList = result.data.Items;    
          
        });
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

.Chat-search {
  border: 1px solid #aaa;
  border-radius: 50px;
  width: 100%;
  padding: 5px;
  padding-left: 15px;
  margin-bottom: 20px;
}
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
  height: 98%; 
  overflow: auto;
}

.Chat-list li {
  display: flex;
  min-height: 50px;
  height: 50px;
  line-height: 50px;
  /*margin: 0.5rem 0;*/
  margin:4px 1px;
  padding: 0 0.9rem;
  border-width: thin;
  border-style: solid;
  border-radius: 5px;
  border-color: #bebebe;
  background-color: #fcf4df;
}

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

.Carcenter-type {
  align-self: center;
  font-size: 1.5rem;
}
.Carcenter-name {
  padding-left: 10px;
  font-weight: bold;
  cursor:pointer;
}
.Chat-detail {
  align-self: center;
  margin-left: auto;
  color: #5d4038;
  -webkit-appearance:none;
  -moz-appearance:none;
}

</style>
