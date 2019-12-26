<template>
  <div class="login">
    <div class="login-title">
      <h1>수입차 부품 견적 시스템</h1>
    </div>
    <div class="login-pannel">
      <div class="login-logo">
        <img src="@/assets/logo.png">
      </div>
      <br>
        <v-alert
          v-model="loginAlert"
          dismissible
          border="left"
          elevation="2"
          icon="mdi-account-alert"
        >
          {{loginAlertMessage}}
        </v-alert>        
      <div class="login-pannel-form">        
        <b-form-input v-model="id" placeholder="이메일 또는 전화번호"></b-form-input>
        <b-form-input type ="password" v-model="pwd" placeholder="비밀번호" v-on:keypress.enter="loginPathTo"></b-form-input>
        <div class="login-pannel-form-button" @click="loginPathTo()">
          로그인
        </div>      
      </div>
      <div class="login-pannel-split">
        <hr>
        <p>또는</p>
        <hr>
      </div>
      <div class="login-pannel-sns">
        <div class="login-pannel-sns-item">
          <img src="@/assets/Kakao.png">
        </div>
        <div class="login-pannel-sns-item">
          <img src="@/assets/Naver.png">
        </div>
        <div class="login-pannel-sns-item">
          <img src="@/assets/Facebook.png">
        </div>
      </div>
      <div class="login-pannel-join">
        <div class="login-pannel-join-new">
          회원가입
        </div>
        <div class="login-pannel-join-find">
          아이디 | 비밀번호 찾기
        </div>
      </div>
    </div>

  </div>
</template>

<!--<script src="https://unpkg.com/axios/dist/axios.min.js"></script>-->
<script>
import Constant from '@/Constant';
const axios = require('axios').default;
export default {
  name: 'Login',
  data () {
    return {
      id: '',
      pwd: '',
      loginAlert: false,
      loginAlertMessage: ''
    }
  },
  methods: {
    loginPathTo() {

      this.dealerList = [];

      var param = {};
      param.operation = "list";
      param.tableName = "BAY4U_USER";
      param.payload = {};
      param.payload.FilterExpression = "ID = :id";
      param.payload.ExpressionAttributeValues = {};
      var key = ":id";
      param.payload.ExpressionAttributeValues[key] = this.id;

      if(this.id === '' || this.id === null) {
        this.loginAlertMessage = "아이디 입력 필요";
        this.loginAlert = true;   
        return;
      }      

      axios({
        method: 'POST',
        url: Constant.LAMBDA_URL,
        headers: Constant.JSON_HEADER,
        data: param
      })
      .then((result) => {
        if(result.data.Count == 0){
          this.loginAlertMessage = "등록되지 않은 아이디 입니다.";
          this.loginAlert = true;          
        }
        else {  
          console.log("로그인 성공 : ", JSON.stringify(result));
          var id = result.data.Items[0].ID;
          var name = result.data.Items[0].NAME;
          var pwd = result.data.Items[0].PWD;
          var type = result.data.Items[0].TYPE;
          var siteCode = result.data.Items[0].CODE;
          var entNo = result.data.Items[0].ENTNO;

          console.log('ID 체크 : ', id);

          if(!(pwd === this.pwd)) {
            this.loginAlertMessage = "비밀번호 불일치";
            this.loginAlert = true;   
          }
          else if(type === "SITE") {
            this.$cookies.set('BsnID', siteCode, '86400s');
            this.$cookies.set('UserNM', name, '86400s');
            this.$cookies.set('UserType', type, '86400s');
            this.$router.push('/NewQT');
            this.UserInfo.UserID = id;
            this.UserInfo.BsnID = siteCode;
            this.UserInfo.Name = name;
            this.UserInfo.EntNo = entNo;
          }
          else {

            this.$cookies.set('BsnID', siteCode, '86400s');
            this.$cookies.set('UserID', id, '86400s');
            this.$cookies.set('UserNM', name, '86400s');
            this.$cookies.set('UserType', type, '86400s');
            
            this.$router.push('/MainPage');
            this.UserInfo.UserID = id;
            this.UserInfo.BsnID = siteCode;
            this.UserInfo.Name = name;
            this.UserInfo.UserType = type;
          }
        }
      });
    }
  },    
  computed:{
    UserInfo: {
        get() { return this.$store.getters.UserInfo },
        set(value) { this.$store.dispatch('UpdateUserInfo',value) }
    }
  },
  created : function() {
    /*
    Notification.requestPermission(function(result) {
      if(result === 'granted') {
        navigator.serviceWorker.ready
          .then(function(swreg) {
            //swreg.showNotification('Notice OK', {body:'OOOOKKKK'});
          });
      }
    });*/
    // 이미 로그인이 되어서 캐시에 남아있는 상태면 자동 로그인
    console.log('Cookie Check : ', this.$cookies.get('BsnID'));
    if(this.$cookies.get('BsnID') !== "" && this.$cookies.get('BsnID') !== null) {
      var type = this.$cookies.get('UserType');

      if(type === "SITE") {
        this.$router.push('/NewQT');
      }
      else if(type === "DEALER") {
        this.$router.push('/MainPage');
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.login {
  background-color: #fcf4df;
  position: absolute;
  width: 100%;
  height: 100%;
}

/*PC인 경우*/
@media all and (min-width:800px) {
  .login {
    position:absolute;
    top:calc(50vh - 300px);
    left:calc(50vw - 200px);
    width:400px;height:600px;
    overflow:hidden;
    background-color:#fcf4df;
    -webkit-box-shadow:4px 4px 5px 0 rgba(0,0,0,.33);
    box-shadow:4px 4px 5px 0 rgba(0,0,0,.33);
  }
}

.login-title {
  width: 100%;
  height : 25%;
  margin : auto;
  display: table;
  text-align: center;
  background-color: #afabab;
  box-shadow: 0 2px 3px rgba(0, 0, 0, .33);
  padding-top: 100px;
  text-shadow: 0 0 3px #333;
}
.login-title h1 {
  display: table-cell;
  vertical-align: middle;
  font-weight: bold;
  font-size: 2rem;
  color: white;
}

.login-logo {
  text-align: center;
  margin-top: 30px;
}

.login-pannel {
  width: 90%;
  height : 50%;
  margin : auto;
}

.login-pannel-form {
  position:absolute;
  bottom: 230px;
  width: 90%;
  height : 50px;
}

.login-pannel-form input:focus {
  outline:none;
}

.login-pannel-form input {
  background: white;
  height: 50px;
  line-height: 50px;
  border-style: none;
  width: 99%;
  margin: 0px 0px 10px 0px;
}

.login-pannel-form a {
  text-decoration: none;
  color: black;
}

.login-pannel-form-button {
  border : 1px solid;
  border-radius: 5px;
  height: 50px;
  line-height: 50px;
  text-align: center;
  font-weight: bold;
  font-size: 1.5rem;
  color: #5d4038;
}

.login-pannel-split {
  position:absolute;
  bottom: 85px;
  width: 90%;
  height : 20px;
  display: flex;
}

.login-pannel-split P {
  margin: auto;
  font-size: small;
}

.login-pannel-split hr {
  width: 40%;
  border-top-width:1px;
  border-bottom-width: 0px;
  border-left-width: 0px;
  border-right-width: 0px;
}

.login-pannel-sns {
  position:absolute;
  bottom: 40px;
  width: 90%;
  height : 40px;
  display: flex;
}

.login-pannel-sns-item {
  border : 1px solid;
  border-radius: 5px;
  width: 33%;
  text-align: center;
}

.login-pannel-sns-item:first-child {
  margin: 0px 5px 0px 0px;
}

.login-pannel-sns-item:first-child img {
  height: 30px;
  margin-top: 5px;
}

.login-pannel-sns-item:nth-child(2) {
  margin: 0px 5px 0px 0px;
  background-color: #03cd5e;
}

.login-pannel-sns-item:nth-child(2) img {
  height: 24px;
  margin-top: 7px;
}

.login-pannel-sns-item:last-child {
  margin: 0px 0px 0px 5px;
  background-color: #4267b2;
}

.login-pannel-sns-item:last-child img {
  height: 35px;
  margin-top: 2px;
}

.login-pannel-join {
  position:absolute;
  bottom: 15px;
  width: 90%;
  height : 20px;
  display: flex;
}

.login-pannel-join-new {
  width: 50%;
  font-weight: bold;
  font-size: small;
}

.login-pannel-join-find {
  width: 50%;
  font-weight: bold;
  text-align:right;
  font-size: small;
}


</style>
