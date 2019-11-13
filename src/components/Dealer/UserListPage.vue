<template>
  <div class="UserListPage">
  <b-tabs class="UserList-Tab"  v-model="tabIndex" content-class="mt-3" fill>
    <b-tab title="카센터 대화목록" active :title-link-class="linkClass(0)">
      <div class="Chat-search mdl-textfield mdl-js-textfield mdl-textfield--expandable">
        <label class="mdl-button mdl-js-button mdl-button--icon" for="sample6">
          <i class="material-icons">search</i>
        </label>
        <div class="mdl-textfield__expandable-holder">
          <input class="mdl-textfield__input" type="text" id="sample6">
          <label class="mdl-textfield__label" for="sample-expandable">Expandable Input</label>
        </div>
      </div>

      <div class="Chat-list">
        <ul>
          <li v-for="(qtReq, index) in qtReqList" v-bind:key = "index" v-on:click="addChat(qtReq)" >
            <i class="Carcenter-type fas fa-wrench" style="color:#fbc02e;"></i>
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
export default {
  name: 'UserListPage',
  data () {
    return {
      tabIndex: 0,
      qtReqList: [],
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
    showQTReqList() {
      var param = {};
      param.operation = "list";
      param.tableName = "BAY4U_QT_LIST";
      param.payload = {};
      param.payload.FilterExpression = "ResDealer = :id";
      param.payload.ExpressionAttributeValues = {};
      var key = ":id";
      if(this.UserInfo.BsnID === "")
        this.UserInfo.BsnID = "PARTS";
      param.payload.ExpressionAttributeValues[key] = this.UserInfo.BsnID;

      axios({
        method: 'POST',
        url: 'https://2fb6f8ww5b.execute-api.ap-northeast-2.amazonaws.com/bay4u/backendService',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        data: param
      })
      .then((result) => {
        console.log("======= QT List result ========");
        console.log(result.data);
        this.qtReqList = result.data.Items;
      });
    },
    addChat(itme)
    {
       this.$emit('setQtInfo' ,itme);
    }
  },
  mounted(){
    this.showQTReqList();
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


.UserList-Tab {
  margin: 10px;
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
  width: 90%;
  height: 60px;
}

.Chat-list ul {
  list-style-type: none;
  padding: 0px;
}

.Chat-list li {
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
  background-color: #fcf4df;
}

.Carcenter-type {
  align-self: center;
  font-size: 1.5rem;
}
.Carcenter-name {
  padding-left: 10px;
  font-weight: bold;
}
.Chat-detail {
  align-self: center;
  margin-left: auto;
  color: #5d4038;
  -webkit-appearance:none;
  -moz-appearance:none;
}

</style>
