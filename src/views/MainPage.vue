<template>
  <div class="mdl-layout mdl-js-layout mdl-layout--fixed-header
              mdl-layout--fixed-tabs">
    <header class="mdl-layout__header">
      <div class="mdl-layout__header-row">
        <!-- Title -->
        <span class="mdl-layout-title"><h2>수입차 부품 견적 시스템<img src="@/assets/logo.png"></h2></span>
      </div>
      <!-- Tabs -->
      <div class="mdl-layout__tab-bar mdl-js-ripple-effect">
        <a class="mdl-layout__tab">HOME</a>
        <a href="#tab-page" class="mdl-layout__tab is-active"><div class="tab-focus">견적 작업</div></a>
        <a class="mdl-layout__tab">이력 조회</a>
        <a class="mdl-layout__tab">부품/정비 Tip</a>
        <a class="mdl-layout__tab">영업관리</a>
      </div>
    </header>
    <div class="mdl-layout__drawer">
      <span class="mdl-layout-title">준비중...</span>
    </div>
    <main class="mdl-layout__content">
      <section class="mdl-layout__tab-panel is-active" id="tab-page">
        <div class="page-content">
          <!-- Your content goes here -->
          <div class="content-userList">
            <UserListPage v-on:selectChat="setQtInfo" :chatInfo="chatInfo"  v-on:setQtInfo="setQtInfo"></UserListPage>
          </div>

          <div class="content-chatTab">
            <ChatingPage></ChatingPage>
          </div>

          <div class="content-info">
            <InfoPage></InfoPage>
          </div>
          
        </div>
      </section>
    </main>
  </div>   
</template>

<script>
import UserListPage from '@/components/Dealer/UserListPage.vue'
import ChatingPage from '@/components/Dealer/ChatingPage.vue'
import InfoPage from '@/components/Dealer/InfoPage.vue'

export default {
  name: 'MainPage',
  data () {
    return {
      qtKey: '',
      chatInfo:[]
    }
  },
  methods: {
    setQtInfo(info) {
      this.chatInfo = info;
      console.log(this.chatInfo);
    }
  },
  components: {
    UserListPage,
    ChatingPage,
    InfoPage
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

.tab-focus {
  color: #fcf4df;
  font-weight: bold;
}

h2 {
  color: white;
  font-weight: bold;
  text-shadow: 7px 7px 7px #ddd;
}

a:hover {
  text-decoration: none;
}

.mdl-layout__tab-panel {
  height: 100%;
}

.page-content {
  display: flex;
  height: 100%;
}

.page-content .content-userList{
  flex: 20%;
  border-right: 1px solid #aaa;
  height: 100%;
  background: #f8f9fa;
}
.page-content .content-chatTab{
  flex: 30%;
  padding: 10px;
  height: 100%;
}
.page-content .content-info{
  flex: 50%;
}


</style>
