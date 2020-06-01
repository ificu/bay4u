<template>
  <v-app id="inspire">
<!--좌측 Navigation-->      
    <v-navigation-drawer
      v-model="drawer"
      app
      clipped
    >
      <v-list dense>
        <v-list-item-group
          v-model="selectedMenu"
          color="#ECEFF1"
        >
          <template v-for="(item, index) in menuItems">
            <v-list-item :key="item.text" 
              v-if="!item.divider" 
              link
              @click="clickMenu(item.rmi)"
            >
              <v-list-item-action>
                <v-icon>{{ item.icon }}</v-icon>
              </v-list-item-action>
              <v-list-item-content>
                <v-list-item-title>
                  {{ item.text }}
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <v-divider
              v-if="menuItems[index].divider"
              :key="index"
            ></v-divider>
          </template>
        </v-list-item-group>
    </v-list>
    </v-navigation-drawer>

<!--상단 Title-->
    <v-app-bar
      app
      clipped-left
      color="#df4f3d"
      dense
    >
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-icon
        class="mx-4"
        large
      >
        mdi-car-cog
      </v-icon>
      <v-toolbar-title class="mr-12 align-center">
        <span class="title">Repair & Maintanance Information</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-row
        align="center"
        style="max-width: 850px"
      >
        <v-autocomplete
            class="pt-8 pr-4"
            v-model="carMakerId"
            :items="carMakerLists"
            item-text="MakeName"
            item-value="MakeId"
            label="제조사"
            small-chips
            clearable
            style="max-width: 200px; font-size:10px;"
            @change="changeMakeName"
            >
        </v-autocomplete>
        <v-autocomplete
            class="pt-8 pr-4"
            v-model="carRangeId"
            :items="carRangeLists"
            item-text="RangeName"
            item-value="RangeId"
            label="차량 종류"
            small-chips
            clearable
            style="max-width: 300px; font-size:10px;"
            @change="changeRangeName"
            >
        </v-autocomplete>   
        <v-autocomplete
            class="pt-8 pr-4"
            v-model="carTypeId"
            :items="carTypeLists"
            item-text="TypeName"
            item-value="TypeId"
            label="차량 타입"
            small-chips
            clearable
            style="max-width: 350px; font-size:10px;"
            @change="changeTypeName"
            >
        </v-autocomplete>         
      </v-row>
    </v-app-bar>
<!--들어갈 내용....-->
      <RMIADJUST v-if="checkShowPage('ADJUST')" ></RMIADJUST>
      <RMIMANUALS v-if="checkShowPage('MANUALS')" ></RMIMANUALS>
      <RMIGRAPHIC v-if="checkShowPage('GRAPHIC')" ></RMIGRAPHIC>
      <RMIMAINTENANCE  v-if="checkShowPage('MAINTENANCE')"></RMIMAINTENANCE>
      <RMITIMES v-if="checkShowPage('TIMES')" ></RMITIMES>
      <RMIDAIGNOSTICVALUES v-if="checkShowPage('DAIGNOSTICVALUES')" ></RMIDAIGNOSTICVALUES>
      <RMIRELAYSFUSES v-if="checkShowPage('RELAYSFUSES')" ></RMIRELAYSFUSES>
      <RMIWIRING v-if="checkShowPage('WIRING')" ></RMIWIRING>
      <RMIWARNING v-if="checkShowPage('WARNING')" ></RMIWARNING>
  </v-app>
</template>

<script>
  import RMIADJUST from '@/components/RMI/RMI-ADJUST.vue'
  import RMIMANUALS from '@/components/RMI/RMI-MANUALS.vue'
  import RMIGRAPHIC from '@/components/RMI/RMI-GRAPHIC.vue'
  import RMIMAINTENANCE from '@/components/RMI/RMI-MAINTENANCE.vue'
  import RMITIMES from '@/components/RMI/RMI-TIMES.vue'
  import RMIDAIGNOSTICVALUES from '@/components/RMI/RMI-DAIGNOSTICVALUES.vue'
  import RMIRELAYSFUSES from '@/components/RMI/RMI-RELAYSFUSES.vue'
  import RMIWIRING from '@/components/RMI/RMI-WIRING.vue'
  import RMIWARNING from '@/components/RMI/RMI-WARNING.vue'

  const axios = require('axios').default;
  const url = "https://rmi-services.tecalliance.net";

  export default {
    props: {
      source: String,
    },
    data: () => ({
      drawer: null,
      selectedMenu:0,
      subPageList: ['ADJUST', 'MANUALS', 'GRAPHIC','MAINTENANCE','TIMES','DAIGNOSTICVALUES','RELAYSFUSES','WIRING', 'WARNING'],
      showPageList: [],
      //jsonHeader: { 'Accept': 'application/json', 'Content-Type': 'application/json', 'Origin':'https://rmi-services.tecalliance.net', 'User-Agent':'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/81.0.4044.138 Safari/537.36', 'Authorization': 'TecRMI {{AuthToken}}' },
      jsonHeader: { 'Accept': 'application/json', 'Content-Type': 'application/json', 'Authorization': 'TecRMI {{AuthToken}}' },
      menuItems: [
        { icon: 'mdi-cube-scan', text: 'OverView', rmi: 'OVERVIEW', divider: false },
        { divider: true },
        { icon: 'mdi-car-info', text: '정비 참고 정보', rmi: 'ADJUST', divider: false },
        { icon: 'mdi-notebook-multiple', text: '정비 참고 매뉴얼', rmi: 'MANUALS', divider: false },
        { divider: true },
        { icon: 'mdi-floor-plan', text: '차량 분해 도면', rmi: 'GRAPHIC', divider: false },
        { icon: 'mdi-playlist-play', text: '정기 점검 항목', rmi: 'MAINTENANCE', divider: false },
        { icon: 'mdi-history', text: '표준 공임 시간', rmi: 'TIMES', divider: false },
        { divider: true },
        { icon: 'mdi-laptop-chromebook', text: '차량 진단 데이터', rmi: 'DAIGNOSTICVALUES', divider: false },
        { icon: 'mdi-currency-sign', text: 'Fueses & Relay', rmi: 'RELAYSFUSES', divider: false },
        { icon: 'mdi-car-brake-abs', text: '경보등 정보', rmi: 'WARNING', divider: false },
        { icon: 'mdi-car-shift-pattern', text: '배선 정보', rmi: 'WIRING', divider: false },
      ],
      carMakerLists: [],
      carRangeLists: [],
      carTypeLists: [],
      carMakerId: '',
      carRangeId: '',
      carTypeId: '',
      carVin: '',
      carEngine: '',
      rmiAuthKey: '',
    }),
    components: {
        RMIADJUST,
        RMIMANUALS,
        RMIGRAPHIC,
        RMIMAINTENANCE,
        RMITIMES,
        RMIDAIGNOSTICVALUES,
        RMIRELAYSFUSES,
        RMIWIRING,
        RMIWARNING
    },    
    created () {
      this.$vuetify.theme.dark = true;
      this.$vuetify.theme.themes.dark.primary = '#aaa'
      this.getAuthKey();
      this.setShowPage('MANUALS');
      this.selectedMenu = 2;
      this.carVin = this.$route.query.VIN;
      this.carEngine = this.$route.query.ENGINE;
    },
    methods: {
      clickMenu(page) {
        if(this.subPageList.includes(page) === true) {
          this.setShowPage(page);
          this.$nextTick(function(){
            var param = {
              rmiAuthKey: this.rmiAuthKey,
              carTypeId: this.carTypeId
            }          
            console.log('InitData param : ', param);
            this.$EventBus.$emit('RMI-'+page+'.InitData', param);  
          });
        }
      },
      checkShowPage(page) {
        return this.showPageList.find( (n) => {
          return n.view === page;
        })['show']; 
      },
      getShowPage() {
        return this.showPageList.find( (n) => {
          return n.show === true;
        })['view']; 
      },
      setShowPage(page) {
        this.showPageList = [];
        for(var view of this.subPageList) {
          this.showPageList.push({'view':view, 'show': (view===page?true:false)});
        }
      },
      getAuthKey() {
          var param = {};
          param.Company = "SK Network-South Korea_3303624";
          param.Account = "rmi-ws_004553-1-KR";
          param.Password = "SkCho123!";

          axios({
              method: 'POST',
              url: url + "/Auth/Login",
              headers: this.jsonHeader,
              data: param
          })
          .then((result) => {
              this.rmiAuthKey = result.headers['x-authtoken'];

              // 조회 후 Maker List 조회
              param = {};
              param.ShowCar = true;
              param.CountryCode = "kr";
              param.LanguageCode = "en";

              if(this.carVin !== undefined && this.carVin !== "") {
                param.AddInfoKeyFilter = [{"AddInfoKeyId":-8, "AddInfoKeyFilterValue": this.carVin }];
              }

              this.jsonHeader.Authorization = "TecRMI " + this.rmiAuthKey;
              console.log('rmiAuthKey : ', this.rmiAuthKey);

              axios({
                  method: 'POST',
                  url: url + "/rest/VehicleTree/MakeList",
                  headers: this.jsonHeader,
                  data: param
              })
              .then((result) => {
                  console.log('Maker List 조회 : ', result);
                  this.carMakerLists = result.data;

                  /////////////////////////////////////////////////////////////////
                  /*
                  this.carMakerId = 6;
                  this.carRangeId = 8733;
                  this.carTypeId = 90363;

                  this.$nextTick(function(){
                    var param = {
                      rmiAuthKey: this.rmiAuthKey,
                      carTypeId: this.carTypeId
                    }          
                    console.log('InitData param : ', param);
                    this.$EventBus.$emit('RMI-MANUALS.InitData', param);  
                  });*/
                  /////////////////////////////////////////////////////////////////

                  if(result.data.length == 1) {
                      this.carMakerId = result.data[0].MakeId;
                      this.changeMakeName();
                  }                        
              });    
          });            
      },
      changeMakeName() {
          console.log('changeMakeName : ', this.carMakerId);

          this.carRangeLists = [];
          this.carTypeLists = [];

          this.carRangeId = '';
          this.carTypeId = '';

          if(this.carMakerId !== undefined) {
              var param = {};
              param.ShowCar = true;
              param.MakeId = this.carMakerId;
              param.CountryCode = "kr";
              param.LanguageCode = "en";

              if(this.carVin !== undefined && this.carVin !== "") {
                param.AddInfoKeyFilter = [{"AddInfoKeyId":-8, "AddInfoKeyFilterValue": this.carVin }];
              }              

              this.jsonHeader.Authorization = "TecRMI " + this.rmiAuthKey;

              axios({
                  method: 'POST',
                  url: url + "/rest/VehicleTree/RangeList",
                  headers: this.jsonHeader,
                  data: param
              })
              .then((result) => {
                  console.log('RangeList 조회 : ', result);
                  this.carRangeLists = result.data;

                  if(result.data.length == 1) {
                      this.carRangeId = result.data[0].RangeId;
                      this.changeRangeName();
                  }                    
              });       
          }      
      },
      changeRangeName() {
          console.log('changeRangeName : ', this.carRangeId);

          this.carTypeLists = [];
          this.carTypeId = '';                      

          if(this.carRangeId !== undefined) {
              var param = {};
              param.ShowCar = true;
              param.RangeId = this.carRangeId;
              param.CountryCode = "kr";
              param.LanguageCode = "en";

              if(this.carVin !== undefined && this.carVin !== "") {
                param.AddInfoKeyFilter = [{"AddInfoKeyId":-8, "AddInfoKeyFilterValue": this.carVin }];
              }                  

              this.jsonHeader.Authorization = "TecRMI " + this.rmiAuthKey;

              axios({
                  method: 'POST',
                  url: url + "/rest/VehicleTree/TypeList",
                  headers: this.jsonHeader,
                  data: param
              })
              .then((result) => {
                  console.log('TypeList 조회 : ', result);

                  // 차량 상세 정보를 추가로 넣어 줌. (엔진코드, 연식 등)
                  this.carTypeLists = result.data.map(obj=>{
                    var carTypeItem = {};
                    carTypeItem.TypeId = obj.TypeId;

                    var beginDate = obj.TypeDetails.filter(x => x.AddInfoKeyId === 3)[0].AddInfoKeyValue;
                    beginDate = beginDate.substring(0,4) +'-'+ beginDate.substring(4);
                    
                    var endDateList = obj.TypeDetails.filter(x => x.AddInfoKeyId === 4);
                    var endDate = '';
                    if(endDateList.length === 1){
                      endDate = endDateList[0].AddInfoKeyValue;
                      endDate = endDate.substring(0,4) +'-'+ endDate.substring(4);
                    }
                    
                    var enginCodeList = obj.TypeDetails.filter(x => x.AddInfoKeyId === -4);
                    var engineCode = '';
                    if(enginCodeList.length === 1){
                      engineCode = ' ( ' + enginCodeList[0].AddInfoKeyValue +' ) ';
                    }
                    
                    carTypeItem.TypeName = obj.TypeName +  engineCode  + ' [ ' + beginDate + '~' + endDate + ' ]';
                    
                    return carTypeItem;

                  });
                  
                  // 조회 조건에 특정 엔진 코드가 있는 경우 해당하는 코드로 필터링 처리
                  if(this.carEngine !== undefined && this.carEngine !== "") {
                    let findKey = this.carEngine;
                    let engineFilter = result.data.reduce(function (pre, value){
                      let findEngine = value.TypeDetails.find(function(detail){                  
                        return (detail.AddInfoKeyId === -4 && detail.AddInfoKeyValue.replace(/ /gi, "") === findKey);
                      });

                      if(findEngine !== undefined) {
                        pre.push(value);
                      }
                      return pre;
                    },[]);

                    if(engineFilter.length === 0)
                      this.carTypeLists = result.data;
                    else 
                      this.carTypeLists = engineFilter;

                  }
                  else
                    this.carTypeLists = result.data;

                  if(this.carTypeLists.length == 1) {
                      this.carTypeId = this.carTypeLists[0].TypeId;
                      this.changeTypeName();
                  }
              });      
          }       
      },
      changeTypeName() {
          console.log('changeTypeName : ', this.carTypeId);
          var param = {
              rmiAuthKey: this.rmiAuthKey,
              carTypeId: this.carTypeId
          }
          this.$EventBus.$emit('RMI-'+this.getShowPage()+'.InitData', param);  
      }
    },    
  }
</script>


<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.contents {
  background-color: #f9f9f9;
  color: black;
  font-size: 12px;
}


</style>
