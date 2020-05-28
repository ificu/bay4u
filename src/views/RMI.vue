<template>
  <v-app id="inspire">
<!--좌측 Navigation-->      
    <v-navigation-drawer
      v-model="drawer"
      app
      clipped
    >
      <v-list dense>
        <v-list-item
          v-for="item in menuItems"
          :key="item.text"
          link
          @click="clickMenu(item.rmi)"
        >
          <v-list-item-action v-if="!item.divider">
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content v-if="!item.divider">
            <v-list-item-title>
              {{ item.text }}
            </v-list-item-title>
          </v-list-item-content>
          <v-divider v-if="item.divider"></v-divider>
        </v-list-item>
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
            style="max-width: 250px; font-size:10px;"
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
            style="max-width: 350px; font-size:10px;"
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
            style="max-width: 250px; font-size:10px;"
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
      //carRangeLists: [],
      carRangeLists: [{"RangeId":161,"RangeName":"02 (E10)","ClassId":1,"IsLocked":false,"InfoDataExists":false},{"RangeId":912,"RangeName":"02 Touring (E6)","ClassId":1,"IsLocked":false,"InfoDataExists":false},{"RangeId":2645,"RangeName":"1 (E81)","ClassId":1,"IsLocked":false,"InfoDataExists":false},{"RangeId":10489,"RangeName":"1 (E87)","ClassId":1,"IsLocked":false,"InfoDataExists":false},{"RangeId":9088,"RangeName":"1 (F20)","ClassId":1,"IsLocked":false,"InfoDataExists":false},{"RangeId":7547,"RangeName":"1 Coupe (E82)","ClassId":1,"IsLocked":false,"InfoDataExists":false},{"RangeId":184,"RangeName":"1500-2000 (115, 116, 118, 121)","ClassId":1,"IsLocked":false,"InfoDataExists":false},{"RangeId":12086,"RangeName":"2 Active Tourer (F45)","ClassId":1,"IsLocked":false,"InfoDataExists":false},{"RangeId":11399,"RangeName":"2 Coupe (F22, F87)","ClassId":1,"IsLocked":false,"InfoDataExists":false},{"RangeId":951,"RangeName":"2.6- 3200 V8 Coupe","ClassId":1,"IsLocked":false,"InfoDataExists":false},{"RangeId":218,"RangeName":"2000-3.2 Coupe (E9)","ClassId":1,"IsLocked":false,"InfoDataExists":false},{"RangeId":284,"RangeName":"3 (E30)","ClassId":1,"IsLocked":false,"InfoDataExists":false},{"RangeId":298,"RangeName":"3 (E36)","ClassId":1,"IsLocked":false,"InfoDataExists":false},{"RangeId":1411,"RangeName":"3 (E46)","ClassId":1,"IsLocked":false,"InfoDataExists":false},{"RangeId":4147,"RangeName":"3 (E90)","ClassId":1,"IsLocked":false,"InfoDataExists":false},{"RangeId":9373,"RangeName":"3 (F30, F80)","ClassId":1,"IsLocked":false,"InfoDataExists":false},{"RangeId":19711,"RangeName":"3 (G20)","ClassId":1,"IsLocked":false,"InfoDataExists":false},{"RangeId":293,"RangeName":"3 Compact (E36)","ClassId":1,"IsLocked":false,"InfoDataExists":false},{"RangeId":428,"RangeName":"3 Convertible (E36)","ClassId":1,"IsLocked":false,"InfoDataExists":false},{"RangeId":2200,"RangeName":"3 Convertible (E46)","ClassId":1,"IsLocked":false,"InfoDataExists":false},{"RangeId":5308,"RangeName":"3 Convertible (E93)","ClassId":1,"IsLocked":false,"InfoDataExists":false},{"RangeId":302,"RangeName":"3 Coupe (E36)","ClassId":1,"IsLocked":false,"InfoDataExists":false},{"RangeId":1711,"RangeName":"3 Coupe (E46)","ClassId":1,"IsLocked":false,"InfoDataExists":false},{"RangeId":4806,"RangeName":"3 Coupe (E92)","ClassId":1,"IsLocked":false,"InfoDataExists":false},{"RangeId":10485,"RangeName":"3 Gran Turismo (F34)","ClassId":1,"IsLocked":false,"InfoDataExists":false},{"RangeId":714,"RangeName":"3 Touring (E36)","ClassId":1,"IsLocked":false,"InfoDataExists":false},{"RangeId":1790,"RangeName":"3 Touring (E46)","ClassId":1,"IsLocked":false,"InfoDataExists":false},{"RangeId":4180,"RangeName":"3 Touring (E91)","ClassId":1,"IsLocked":false,"InfoDataExists":false},{"RangeId":9892,"RangeName":"3 Touring (F31)","ClassId":1,"IsLocked":false,"InfoDataExists":false},{"RangeId":11401,"RangeName":"4 Convertible (F33, F83)","ClassId":1,"IsLocked":false,"InfoDataExists":false},{"RangeId":10638,"RangeName":"4 Coupe (F32, F82)","ClassId":1,"IsLocked":false,"InfoDataExists":false},{"RangeId":11846,"RangeName":"4 Gran Coupe (F36)","ClassId":1,"IsLocked":false,"InfoDataExists":false},{"RangeId":450,"RangeName":"5 (E12)","ClassId":1,"IsLocked":false,"InfoDataExists":false},{"RangeId":446,"RangeName":"5 (E28)","ClassId":1,"IsLocked":false,"InfoDataExists":false},{"RangeId":458,"RangeName":"5 (E34)","ClassId":1,"IsLocked":false,"InfoDataExists":false},{"RangeId":782,"RangeName":"5 (E39)","ClassId":1,"IsLocked":false,"InfoDataExists":false},{"RangeId":2554,"RangeName":"5 (E60)","ClassId":1,"IsLocked":false,"InfoDataExists":false},{"RangeId":8733,"RangeName":"5 (F10)","ClassId":1,"IsLocked":false,"InfoDataExists":false},{"RangeId":8625,"RangeName":"5 Gran Turismo (F07)","ClassId":1,"IsLocked":false,"InfoDataExists":false},{"RangeId":453,"RangeName":"5 Touring (E34)","ClassId":1,"IsLocked":false,"InfoDataExists":false},{"RangeId":1201,"RangeName":"5 Touring (E39)","ClassId":1,"IsLocked":false,"InfoDataExists":false},{"RangeId":2617,"RangeName":"5 Touring (E61)","ClassId":1,"IsLocked":false,"InfoDataExists":false},{"RangeId":8769,"RangeName":"5 Touring (F11)","ClassId":1,"IsLocked":false,"InfoDataExists":false},{"RangeId":1404,"RangeName":"503 Convertible","ClassId":1,"IsLocked":false,"InfoDataExists":false},{"RangeId":480,"RangeName":"6 (E24)","ClassId":1,"IsLocked":false,"InfoDataExists":false},{"RangeId":2623,"RangeName":"6 (E63)","ClassId":1,"IsLocked":false,"InfoDataExists":false},{"RangeId":2624,"RangeName":"6 Convertible (E64)","ClassId":1,"IsLocked":false,"InfoDataExists":false},{"RangeId":9056,"RangeName":"6 Convertible (F12)","ClassId":1,"IsLocked":false,"InfoDataExists":false},{"RangeId":9081,"RangeName":"6 Coupe (F13)","ClassId":1,"IsLocked":false,"InfoDataExists":false},{"RangeId":10493,"RangeName":"6 Gran Coupe (F06)","ClassId":1,"IsLocked":false,"InfoDataExists":false},{"RangeId":1713,"RangeName":"600 (111)","ClassId":1,"IsLocked":false,"InfoDataExists":false},{"RangeId":533,"RangeName":"7 (E23)","ClassId":1,"IsLocked":false,"InfoDataExists":false},{"RangeId":538,"RangeName":"7 (E32)","ClassId":1,"IsLocked":false,"InfoDataExists":false},{"RangeId":543,"RangeName":"7 (E38)","ClassId":1,"IsLocked":false,"InfoDataExists":false},{"RangeId":2405,"RangeName":"7 (E65, E66, E67)","ClassId":1,"IsLocked":false,"InfoDataExists":false},{"RangeId":8358,"RangeName":"7 (F01, F02, F03, F04)","ClassId":1,"IsLocked":false,"InfoDataExists":false},{"RangeId":16892,"RangeName":"7 (G11, G12)","ClassId":1,"IsLocked":false,"InfoDataExists":false},{"RangeId":64,"RangeName":"8 (E31)","ClassId":1,"IsLocked":false,"InfoDataExists":false},{"RangeId":10668,"RangeName":"i3 (I01)","ClassId":1,"IsLocked":false,"InfoDataExists":false},{"RangeId":11953,"RangeName":"i8 (I12)","ClassId":1,"IsLocked":false,"InfoDataExists":false},{"RangeId":768,"RangeName":"ISETTA (100, 101, 102, 103)","ClassId":1,"IsLocked":false,"InfoDataExists":false},{"RangeId":1100,"RangeName":"M1 (E26)","ClassId":1,"IsLocked":false,"InfoDataExists":false},{"RangeId":8660,"RangeName":"X1 (E84)","ClassId":1,"IsLocked":false,"InfoDataExists":false},{"RangeId":16959,"RangeName":"X1 (F48)","ClassId":1,"IsLocked":false,"InfoDataExists":false},{"RangeId":2622,"RangeName":"X3 (E83)","ClassId":1,"IsLocked":false,"InfoDataExists":false},{"RangeId":8814,"RangeName":"X3 (F25)","ClassId":1,"IsLocked":false,"InfoDataExists":false},{"RangeId":12054,"RangeName":"X4 (F26)","ClassId":1,"IsLocked":false,"InfoDataExists":false},{"RangeId":1996,"RangeName":"X5 (E53)","ClassId":1,"IsLocked":false,"InfoDataExists":false},{"RangeId":7552,"RangeName":"X5 (E70)","ClassId":1,"IsLocked":false,"InfoDataExists":false},{"RangeId":10605,"RangeName":"X5 (F15, F85)","ClassId":1,"IsLocked":false,"InfoDataExists":false},{"RangeId":7673,"RangeName":"X6 (E71, E72)","ClassId":1,"IsLocked":false,"InfoDataExists":false},{"RangeId":12110,"RangeName":"X6 (F16, F86)","ClassId":1,"IsLocked":false,"InfoDataExists":false},{"RangeId":20305,"RangeName":"X6 (G06, F96)","ClassId":1,"IsLocked":false,"InfoDataExists":false},{"RangeId":19739,"RangeName":"X7 (G07)","ClassId":1,"IsLocked":false,"InfoDataExists":false},{"RangeId":1485,"RangeName":"Z3 Roadster (E36)","ClassId":1,"IsLocked":false,"InfoDataExists":false},{"RangeId":4749,"RangeName":"Z4 Coupe (E86)","ClassId":1,"IsLocked":false,"InfoDataExists":false},{"RangeId":2500,"RangeName":"Z4 Roadster (E85)","ClassId":1,"IsLocked":false,"InfoDataExists":false},{"RangeId":8527,"RangeName":"Z4 Roadster (E89)","ClassId":1,"IsLocked":false,"InfoDataExists":false},{"RangeId":1934,"RangeName":"Z8 Roadster (E52)","ClassId":1,"IsLocked":false,"InfoDataExists":false}],
      //carTypeLists: [],
      carTypeLists: [{"TypeId":78983,"TypeName":"518 d","TypeDetails":[{"KindOfAdditionalDetail":1,"AddInfoKeyId":3,"AddInfoKeyName":"Built in year","AddInfoKeyValue":"201305"},{"KindOfAdditionalDetail":1,"AddInfoKeyId":5,"AddInfoKeyName":"kW","AddInfoKeyValue":"105"},{"KindOfAdditionalDetail":1,"AddInfoKeyId":6,"AddInfoKeyName":"ccm","AddInfoKeyValue":"1995"},{"KindOfAdditionalDetail":1,"AddInfoKeyId":7,"AddInfoKeyName":"Design","AddInfoKeyValue":"Saloon 4-door"},{"KindOfAdditionalDetail":1,"AddInfoKeyId":10,"AddInfoKeyName":"Fuel","AddInfoKeyValue":"Diesel"},{"KindOfAdditionalDetail":2,"AddInfoKeyId":-4,"AddInfoKeyName":"Engine","AddInfoKeyValue":"N47 D20 C"}],"IsLocked":false,"InfoDataExists":false},{"TypeId":90362,"TypeName":"518 d","TypeDetails":[{"KindOfAdditionalDetail":1,"AddInfoKeyId":3,"AddInfoKeyName":"Built in year","AddInfoKeyValue":"201407"},{"KindOfAdditionalDetail":1,"AddInfoKeyId":4,"AddInfoKeyName":"Model year up to","AddInfoKeyValue":"201610"},{"KindOfAdditionalDetail":1,"AddInfoKeyId":5,"AddInfoKeyName":"kW","AddInfoKeyValue":"110"},{"KindOfAdditionalDetail":1,"AddInfoKeyId":6,"AddInfoKeyName":"ccm","AddInfoKeyValue":"1995"},{"KindOfAdditionalDetail":1,"AddInfoKeyId":7,"AddInfoKeyName":"Design","AddInfoKeyValue":"Saloon 4-door"},{"KindOfAdditionalDetail":1,"AddInfoKeyId":10,"AddInfoKeyName":"Fuel","AddInfoKeyValue":"Diesel"},{"KindOfAdditionalDetail":2,"AddInfoKeyId":-4,"AddInfoKeyName":"Engine","AddInfoKeyValue":"B47 D20 A"}],"IsLocked":false,"InfoDataExists":false},{"TypeId":90363,"TypeName":"520 d","TypeDetails":[{"KindOfAdditionalDetail":1,"AddInfoKeyId":3,"AddInfoKeyName":"Built in year","AddInfoKeyValue":"201407"},{"KindOfAdditionalDetail":1,"AddInfoKeyId":5,"AddInfoKeyName":"kW","AddInfoKeyValue":"140"},{"KindOfAdditionalDetail":1,"AddInfoKeyId":6,"AddInfoKeyName":"ccm","AddInfoKeyValue":"1995"},{"KindOfAdditionalDetail":1,"AddInfoKeyId":7,"AddInfoKeyName":"Design","AddInfoKeyValue":"Saloon 4-door"},{"KindOfAdditionalDetail":1,"AddInfoKeyId":10,"AddInfoKeyName":"Fuel","AddInfoKeyValue":"Diesel"},{"KindOfAdditionalDetail":2,"AddInfoKeyId":-4,"AddInfoKeyName":"Engine","AddInfoKeyValue":"B47 D20 A"}],"IsLocked":false,"InfoDataExists":false},{"TypeId":62315,"TypeName":"520 d","TypeDetails":[{"KindOfAdditionalDetail":1,"AddInfoKeyId":3,"AddInfoKeyName":"Built in year","AddInfoKeyValue":"201003"},{"KindOfAdditionalDetail":1,"AddInfoKeyId":4,"AddInfoKeyName":"Model year up to","AddInfoKeyValue":"201406"},{"KindOfAdditionalDetail":1,"AddInfoKeyId":5,"AddInfoKeyName":"kW","AddInfoKeyValue":"135"},{"KindOfAdditionalDetail":1,"AddInfoKeyId":6,"AddInfoKeyName":"ccm","AddInfoKeyValue":"1995"},{"KindOfAdditionalDetail":1,"AddInfoKeyId":7,"AddInfoKeyName":"Design","AddInfoKeyValue":"Saloon 4-door"},{"KindOfAdditionalDetail":1,"AddInfoKeyId":10,"AddInfoKeyName":"Fuel","AddInfoKeyValue":"Diesel"},{"KindOfAdditionalDetail":2,"AddInfoKeyId":-4,"AddInfoKeyName":"Engine","AddInfoKeyValue":"N47 D20 C"}],"IsLocked":false,"InfoDataExists":false},{"TypeId":90364,"TypeName":"520 d xDrive","TypeDetails":[{"KindOfAdditionalDetail":1,"AddInfoKeyId":3,"AddInfoKeyName":"Built in year","AddInfoKeyValue":"201407"},{"KindOfAdditionalDetail":1,"AddInfoKeyId":4,"AddInfoKeyName":"Model year up to","AddInfoKeyValue":"201610"},{"KindOfAdditionalDetail":1,"AddInfoKeyId":5,"AddInfoKeyName":"kW","AddInfoKeyValue":"140"},{"KindOfAdditionalDetail":1,"AddInfoKeyId":6,"AddInfoKeyName":"ccm","AddInfoKeyValue":"1995"},{"KindOfAdditionalDetail":1,"AddInfoKeyId":7,"AddInfoKeyName":"Design","AddInfoKeyValue":"Saloon 4-door"},{"KindOfAdditionalDetail":1,"AddInfoKeyId":10,"AddInfoKeyName":"Fuel","AddInfoKeyValue":"Diesel"},{"KindOfAdditionalDetail":2,"AddInfoKeyId":-4,"AddInfoKeyName":"Engine","AddInfoKeyValue":"B47 D20 A"}],"IsLocked":false,"InfoDataExists":false},{"TypeId":78988,"TypeName":"520 d xDrive","TypeDetails":[{"KindOfAdditionalDetail":1,"AddInfoKeyId":3,"AddInfoKeyName":"Built in year","AddInfoKeyValue":"201305"},{"KindOfAdditionalDetail":1,"AddInfoKeyId":5,"AddInfoKeyName":"kW","AddInfoKeyValue":"135"},{"KindOfAdditionalDetail":1,"AddInfoKeyId":6,"AddInfoKeyName":"ccm","AddInfoKeyValue":"1995"},{"KindOfAdditionalDetail":1,"AddInfoKeyId":7,"AddInfoKeyName":"Design","AddInfoKeyValue":"Saloon 4-door"},{"KindOfAdditionalDetail":1,"AddInfoKeyId":10,"AddInfoKeyName":"Fuel","AddInfoKeyValue":"Diesel"},{"KindOfAdditionalDetail":2,"AddInfoKeyId":-4,"AddInfoKeyName":"Engine","AddInfoKeyValue":"N47 D20 C"}],"IsLocked":false,"InfoDataExists":false},{"TypeId":69349,"TypeName":"520 i","TypeDetails":[{"KindOfAdditionalDetail":1,"AddInfoKeyId":3,"AddInfoKeyName":"Built in year","AddInfoKeyValue":"201109"},{"KindOfAdditionalDetail":1,"AddInfoKeyId":4,"AddInfoKeyName":"Model year up to","AddInfoKeyValue":"201610"},{"KindOfAdditionalDetail":1,"AddInfoKeyId":5,"AddInfoKeyName":"kW","AddInfoKeyValue":"120"},{"KindOfAdditionalDetail":1,"AddInfoKeyId":6,"AddInfoKeyName":"ccm","AddInfoKeyValue":"1997"},{"KindOfAdditionalDetail":1,"AddInfoKeyId":7,"AddInfoKeyName":"Design","AddInfoKeyValue":"Saloon 4-door"},{"KindOfAdditionalDetail":1,"AddInfoKeyId":10,"AddInfoKeyName":"Fuel","AddInfoKeyValue":"Petrol"},{"KindOfAdditionalDetail":2,"AddInfoKeyId":-4,"AddInfoKeyName":"Engine","AddInfoKeyValue":"N20 B20 A"},{"KindOfAdditionalDetail":2,"AddInfoKeyId":-4,"AddInfoKeyName":"Engine","AddInfoKeyValue":"N20 B20 B"}],"IsLocked":false,"InfoDataExists":false},{"TypeId":67996,"TypeName":"520 i","TypeDetails":[{"KindOfAdditionalDetail":1,"AddInfoKeyId":3,"AddInfoKeyName":"Built in year","AddInfoKeyValue":"201109"},{"KindOfAdditionalDetail":1,"AddInfoKeyId":4,"AddInfoKeyName":"Model year up to","AddInfoKeyValue":"201610"},{"KindOfAdditionalDetail":1,"AddInfoKeyId":5,"AddInfoKeyName":"kW","AddInfoKeyValue":"135"},{"KindOfAdditionalDetail":1,"AddInfoKeyId":6,"AddInfoKeyName":"ccm","AddInfoKeyValue":"1997"},{"KindOfAdditionalDetail":1,"AddInfoKeyId":7,"AddInfoKeyName":"Design","AddInfoKeyValue":"Saloon 4-door"},{"KindOfAdditionalDetail":1,"AddInfoKeyId":10,"AddInfoKeyName":"Fuel","AddInfoKeyValue":"Petrol"},{"KindOfAdditionalDetail":2,"AddInfoKeyId":-4,"AddInfoKeyName":"Engine","AddInfoKeyValue":"N20 B20 A"},{"KindOfAdditionalDetail":2,"AddInfoKeyId":-4,"AddInfoKeyName":"Engine","AddInfoKeyValue":"N20 B20 B"}],"IsLocked":false,"InfoDataExists":false},{"TypeId":62318,"TypeName":"523 i","TypeDetails":[{"KindOfAdditionalDetail":1,"AddInfoKeyId":3,"AddInfoKeyName":"Built in year","AddInfoKeyValue":"201003"},{"KindOfAdditionalDetail":1,"AddInfoKeyId":4,"AddInfoKeyName":"Model year up to","AddInfoKeyValue":"201108"},{"KindOfAdditionalDetail":1,"AddInfoKeyId":5,"AddInfoKeyName":"kW","AddInfoKeyValue":"150"},{"KindOfAdditionalDetail":1,"AddInfoKeyId":6,"AddInfoKeyName":"ccm","AddInfoKeyValue":"2996"},{"KindOfAdditionalDetail":1,"AddInfoKeyId":7,"AddInfoKeyName":"Design","AddInfoKeyValue":"Saloon 4-door"},{"KindOfAdditionalDetail":1,"AddInfoKeyId":10,"AddInfoKeyName":"Fuel","AddInfoKeyValue":"Petrol"},{"KindOfAdditionalDetail":2,"AddInfoKeyId":-4,"AddInfoKeyName":"Engine","AddInfoKeyValue":"N53 B30 A"}],"IsLocked":false,"InfoDataExists":false},{"TypeId":79874,"TypeName":"523 i","TypeDetails":[{"KindOfAdditionalDetail":1,"AddInfoKeyId":3,"AddInfoKeyName":"Built in year","AddInfoKeyValue":"201003"},{"KindOfAdditionalDetail":1,"AddInfoKeyId":4,"AddInfoKeyName":"Model year up to","AddInfoKeyValue":"201108"},{"KindOfAdditionalDetail":1,"AddInfoKeyId":5,"AddInfoKeyName":"kW","AddInfoKeyValue":"150"},{"KindOfAdditionalDetail":1,"AddInfoKeyId":6,"AddInfoKeyName":"ccm","AddInfoKeyValue":"2497"},{"KindOfAdditionalDetail":1,"AddInfoKeyId":7,"AddInfoKeyName":"Design","AddInfoKeyValue":"Saloon 4-door"},{"KindOfAdditionalDetail":1,"AddInfoKeyId":10,"AddInfoKeyName":"Fuel","AddInfoKeyValue":"Petrol"},{"KindOfAdditionalDetail":2,"AddInfoKeyId":-4,"AddInfoKeyName":"Engine","AddInfoKeyValue":"N52 B25 A"},{"KindOfAdditionalDetail":2,"AddInfoKeyId":-4,"AddInfoKeyName":"Engine","AddInfoKeyValue":"N52 B25 AF"},{"KindOfAdditionalDetail":2,"AddInfoKeyId":-4,"AddInfoKeyName":"Engine","AddInfoKeyValue":"N52 B25 B"},{"KindOfAdditionalDetail":2,"AddInfoKeyId":-4,"AddInfoKeyName":"Engine","AddInfoKeyValue":"N52 B25 BF"}],"IsLocked":false,"InfoDataExists":false},{"TypeId":69348,"TypeName":"525 d","TypeDetails":[{"KindOfAdditionalDetail":1,"AddInfoKeyId":3,"AddInfoKeyName":"Built in year","AddInfoKeyValue":"201109"},{"KindOfAdditionalDetail":1,"AddInfoKeyId":4,"AddInfoKeyName":"Model year up to","AddInfoKeyValue":"201610"},{"KindOfAdditionalDetail":1,"AddInfoKeyId":5,"AddInfoKeyName":"kW","AddInfoKeyValue":"155"},{"KindOfAdditionalDetail":1,"AddInfoKeyId":6,"AddInfoKeyName":"ccm","AddInfoKeyValue":"1995"},{"KindOfAdditionalDetail":1,"AddInfoKeyId":7,"AddInfoKeyName":"Design","AddInfoKeyValue":"Saloon 4-door"},{"KindOfAdditionalDetail":1,"AddInfoKeyId":10,"AddInfoKeyName":"Fuel","AddInfoKeyValue":"Diesel"},{"KindOfAdditionalDetail":2,"AddInfoKeyId":-4,"AddInfoKeyName":"Engine","AddInfoKeyValue":"N47 D20 D"}],"IsLocked":false,"InfoDataExists":false},{"TypeId":62316,"TypeName":"525 d","TypeDetails":[{"KindOfAdditionalDetail":1,"AddInfoKeyId":3,"AddInfoKeyName":"Built in year","AddInfoKeyValue":"201003"},{"KindOfAdditionalDetail":1,"AddInfoKeyId":4,"AddInfoKeyName":"Model year up to","AddInfoKeyValue":"201108"},{"KindOfAdditionalDetail":1,"AddInfoKeyId":5,"AddInfoKeyName":"kW","AddInfoKeyValue":"150"},{"KindOfAdditionalDetail":1,"AddInfoKeyId":6,"AddInfoKeyName":"ccm","AddInfoKeyValue":"2993"},{"KindOfAdditionalDetail":1,"AddInfoKeyId":7,"AddInfoKeyName":"Design","AddInfoKeyValue":"Saloon 4-door"},{"KindOfAdditionalDetail":1,"AddInfoKeyId":10,"AddInfoKeyName":"Fuel","AddInfoKeyValue":"Diesel"},{"KindOfAdditionalDetail":2,"AddInfoKeyId":-4,"AddInfoKeyName":"Engine","AddInfoKeyValue":"N57 D30 A"}],"IsLocked":false,"InfoDataExists":false},{"TypeId":67989,"TypeName":"525 d","TypeDetails":[{"KindOfAdditionalDetail":1,"AddInfoKeyId":3,"AddInfoKeyName":"Built in year","AddInfoKeyValue":"201109"},{"KindOfAdditionalDetail":1,"AddInfoKeyId":5,"AddInfoKeyName":"kW","AddInfoKeyValue":"160"},{"KindOfAdditionalDetail":1,"AddInfoKeyId":6,"AddInfoKeyName":"ccm","AddInfoKeyValue":"1995"},{"KindOfAdditionalDetail":1,"AddInfoKeyId":7,"AddInfoKeyName":"Design","AddInfoKeyValue":"Saloon 4-door"},{"KindOfAdditionalDetail":1,"AddInfoKeyId":10,"AddInfoKeyName":"Fuel","AddInfoKeyValue":"Diesel"},{"KindOfAdditionalDetail":2,"AddInfoKeyId":-4,"AddInfoKeyName":"Engine","AddInfoKeyValue":"N47 D20 D"}],"IsLocked":false,"InfoDataExists":false},{"TypeId":67990,"TypeName":"525 d xDrive","TypeDetails":[{"KindOfAdditionalDetail":1,"AddInfoKeyId":3,"AddInfoKeyName":"Built in year","AddInfoKeyValue":"201109"},{"KindOfAdditionalDetail":1,"AddInfoKeyId":5,"AddInfoKeyName":"kW","AddInfoKeyValue":"160"},{"KindOfAdditionalDetail":1,"AddInfoKeyId":6,"AddInfoKeyName":"ccm","AddInfoKeyValue":"1995"},{"KindOfAdditionalDetail":1,"AddInfoKeyId":7,"AddInfoKeyName":"Design","AddInfoKeyValue":"Saloon 4-door"},{"KindOfAdditionalDetail":1,"AddInfoKeyId":10,"AddInfoKeyName":"Fuel","AddInfoKeyValue":"Diesel"},{"KindOfAdditionalDetail":2,"AddInfoKeyId":-4,"AddInfoKeyName":"Engine","AddInfoKeyValue":"N47 D20 D"}],"IsLocked":false,"InfoDataExists":false},{"TypeId":69346,"TypeName":"525 d xDrive","TypeDetails":[{"KindOfAdditionalDetail":1,"AddInfoKeyId":3,"AddInfoKeyName":"Built in year","AddInfoKeyValue":"201109"},{"KindOfAdditionalDetail":1,"AddInfoKeyId":4,"AddInfoKeyName":"Model year up to","AddInfoKeyValue":"201610"},{"KindOfAdditionalDetail":1,"AddInfoKeyId":5,"AddInfoKeyName":"kW","AddInfoKeyValue":"155"},{"KindOfAdditionalDetail":1,"AddInfoKeyId":6,"AddInfoKeyName":"ccm","AddInfoKeyValue":"1995"},{"KindOfAdditionalDetail":1,"AddInfoKeyId":7,"AddInfoKeyName":"Design","AddInfoKeyValue":"Saloon 4-door"},{"KindOfAdditionalDetail":1,"AddInfoKeyId":10,"AddInfoKeyName":"Fuel","AddInfoKeyValue":"Diesel"},{"KindOfAdditionalDetail":2,"AddInfoKeyId":-4,"AddInfoKeyName":"Engine","AddInfoKeyValue":"N47 D20 D"}],"IsLocked":false,"InfoDataExists":false},{"TypeId":67997,"TypeName":"528 i","TypeDetails":[{"KindOfAdditionalDetail":1,"AddInfoKeyId":3,"AddInfoKeyName":"Built in year","AddInfoKeyValue":"201109"},{"KindOfAdditionalDetail":1,"AddInfoKeyId":4,"AddInfoKeyName":"Model year up to","AddInfoKeyValue":"201610"},{"KindOfAdditionalDetail":1,"AddInfoKeyId":5,"AddInfoKeyName":"kW","AddInfoKeyValue":"180"},{"KindOfAdditionalDetail":1,"AddInfoKeyId":6,"AddInfoKeyName":"ccm","AddInfoKeyValue":"1997"},{"KindOfAdditionalDetail":1,"AddInfoKeyId":7,"AddInfoKeyName":"Design","AddInfoKeyValue":"Saloon 4-door"},{"KindOfAdditionalDetail":1,"AddInfoKeyId":10,"AddInfoKeyName":"Fuel","AddInfoKeyValue":"Petrol"},{"KindOfAdditionalDetail":2,"AddInfoKeyId":-4,"AddInfoKeyName":"Engine","AddInfoKeyValue":"N20 B20 A"}],"IsLocked":false,"InfoDataExists":false},{"TypeId":62319,"TypeName":"528 i","TypeDetails":[{"KindOfAdditionalDetail":1,"AddInfoKeyId":3,"AddInfoKeyName":"Built in year","AddInfoKeyValue":"201002"},{"KindOfAdditionalDetail":1,"AddInfoKeyId":5,"AddInfoKeyName":"kW","AddInfoKeyValue":"190"},{"KindOfAdditionalDetail":1,"AddInfoKeyId":6,"AddInfoKeyName":"ccm","AddInfoKeyValue":"2996"},{"KindOfAdditionalDetail":1,"AddInfoKeyId":7,"AddInfoKeyName":"Design","AddInfoKeyValue":"Saloon 4-door"},{"KindOfAdditionalDetail":1,"AddInfoKeyId":10,"AddInfoKeyName":"Fuel","AddInfoKeyValue":"Petrol"},{"KindOfAdditionalDetail":2,"AddInfoKeyId":-4,"AddInfoKeyName":"Engine","AddInfoKeyValue":"N53 B30 A"}],"IsLocked":false,"InfoDataExists":false},{"TypeId":67992,"TypeName":"528 i xDrive","TypeDetails":[{"KindOfAdditionalDetail":1,"AddInfoKeyId":3,"AddInfoKeyName":"Built in year","AddInfoKeyValue":"201109"},{"KindOfAdditionalDetail":1,"AddInfoKeyId":5,"AddInfoKeyName":"kW","AddInfoKeyValue":"180"},{"KindOfAdditionalDetail":1,"AddInfoKeyId":6,"AddInfoKeyName":"ccm","AddInfoKeyValue":"1997"},{"KindOfAdditionalDetail":1,"AddInfoKeyId":7,"AddInfoKeyName":"Design","AddInfoKeyValue":"Saloon 4-door"},{"KindOfAdditionalDetail":1,"AddInfoKeyId":10,"AddInfoKeyName":"Fuel","AddInfoKeyValue":"Petrol"},{"KindOfAdditionalDetail":2,"AddInfoKeyId":-4,"AddInfoKeyName":"Engine","AddInfoKeyValue":"N20 B20 A"}],"IsLocked":false,"InfoDataExists":false},{"TypeId":67994,"TypeName":"530 d","TypeDetails":[{"KindOfAdditionalDetail":1,"AddInfoKeyId":3,"AddInfoKeyName":"Built in year","AddInfoKeyValue":"201109"},{"KindOfAdditionalDetail":1,"AddInfoKeyId":4,"AddInfoKeyName":"Model year up to","AddInfoKeyValue":"201610"},{"KindOfAdditionalDetail":1,"AddInfoKeyId":5,"AddInfoKeyName":"kW","AddInfoKeyValue":"190"},{"KindOfAdditionalDetail":1,"AddInfoKeyId":6,"AddInfoKeyName":"ccm","AddInfoKeyValue":"2993"},{"KindOfAdditionalDetail":1,"AddInfoKeyId":7,"AddInfoKeyName":"Design","AddInfoKeyValue":"Saloon 4-door"},{"KindOfAdditionalDetail":1,"AddInfoKeyId":10,"AddInfoKeyName":"Fuel","AddInfoKeyValue":"Diesel"},{"KindOfAdditionalDetail":2,"AddInfoKeyId":-4,"AddInfoKeyName":"Engine","AddInfoKeyValue":"N57 D30 A"}],"IsLocked":false,"InfoDataExists":false},{"TypeId":62317,"TypeName":"530 d","TypeDetails":[{"KindOfAdditionalDetail":1,"AddInfoKeyId":3,"AddInfoKeyName":"Built in year","AddInfoKeyValue":"201003"},{"KindOfAdditionalDetail":1,"AddInfoKeyId":4,"AddInfoKeyName":"Model year up to","AddInfoKeyValue":"201108"},{"KindOfAdditionalDetail":1,"AddInfoKeyId":5,"AddInfoKeyName":"kW","AddInfoKeyValue":"180"},{"KindOfAdditionalDetail":1,"AddInfoKeyId":6,"AddInfoKeyName":"ccm","AddInfoKeyValue":"2993"},{"KindOfAdditionalDetail":1,"AddInfoKeyId":7,"AddInfoKeyName":"Design","AddInfoKeyValue":"Saloon 4-door"},{"KindOfAdditionalDetail":1,"AddInfoKeyId":10,"AddInfoKeyName":"Fuel","AddInfoKeyValue":"Diesel"},{"KindOfAdditionalDetail":2,"AddInfoKeyId":-4,"AddInfoKeyName":"Engine","AddInfoKeyValue":"N57 D30 A"}],"IsLocked":false,"InfoDataExists":false},{"TypeId":65655,"TypeName":"530 d xDrive","TypeDetails":[{"KindOfAdditionalDetail":1,"AddInfoKeyId":3,"AddInfoKeyName":"Built in year","AddInfoKeyValue":"201109"},{"KindOfAdditionalDetail":1,"AddInfoKeyId":5,"AddInfoKeyName":"kW","AddInfoKeyValue":"190"},{"KindOfAdditionalDetail":1,"AddInfoKeyId":6,"AddInfoKeyName":"ccm","AddInfoKeyValue":"2993"},{"KindOfAdditionalDetail":1,"AddInfoKeyId":7,"AddInfoKeyName":"Design","AddInfoKeyValue":"Saloon 4-door"},{"KindOfAdditionalDetail":1,"AddInfoKeyId":10,"AddInfoKeyName":"Fuel","AddInfoKeyValue":"Diesel"},{"KindOfAdditionalDetail":2,"AddInfoKeyId":-4,"AddInfoKeyName":"Engine","AddInfoKeyValue":"N57 D30 A"}],"IsLocked":false,"InfoDataExists":false},{"TypeId":67998,"TypeName":"530 i","TypeDetails":[{"KindOfAdditionalDetail":1,"AddInfoKeyId":3,"AddInfoKeyName":"Built in year","AddInfoKeyValue":"201109"},{"KindOfAdditionalDetail":1,"AddInfoKeyId":4,"AddInfoKeyName":"Model year up to","AddInfoKeyValue":"201306"},{"KindOfAdditionalDetail":1,"AddInfoKeyId":5,"AddInfoKeyName":"kW","AddInfoKeyValue":"200"},{"KindOfAdditionalDetail":1,"AddInfoKeyId":6,"AddInfoKeyName":"ccm","AddInfoKeyValue":"2996"},{"KindOfAdditionalDetail":1,"AddInfoKeyId":7,"AddInfoKeyName":"Design","AddInfoKeyValue":"Saloon 4-door"},{"KindOfAdditionalDetail":1,"AddInfoKeyId":10,"AddInfoKeyName":"Fuel","AddInfoKeyValue":"Petrol"},{"KindOfAdditionalDetail":2,"AddInfoKeyId":-4,"AddInfoKeyName":"Engine","AddInfoKeyValue":"N53 B30 A"}],"IsLocked":false,"InfoDataExists":false},{"TypeId":67995,"TypeName":"535 d","TypeDetails":[{"KindOfAdditionalDetail":1,"AddInfoKeyId":3,"AddInfoKeyName":"Built in year","AddInfoKeyValue":"201109"},{"KindOfAdditionalDetail":1,"AddInfoKeyId":5,"AddInfoKeyName":"kW","AddInfoKeyValue":"230"},{"KindOfAdditionalDetail":1,"AddInfoKeyId":6,"AddInfoKeyName":"ccm","AddInfoKeyValue":"2993"},{"KindOfAdditionalDetail":1,"AddInfoKeyId":7,"AddInfoKeyName":"Design","AddInfoKeyValue":"Saloon 4-door"},{"KindOfAdditionalDetail":1,"AddInfoKeyId":10,"AddInfoKeyName":"Fuel","AddInfoKeyValue":"Diesel"},{"KindOfAdditionalDetail":2,"AddInfoKeyId":-4,"AddInfoKeyName":"Engine","AddInfoKeyValue":"N57 D30 B"}],"IsLocked":false,"InfoDataExists":false},{"TypeId":64161,"TypeName":"535 d","TypeDetails":[{"KindOfAdditionalDetail":1,"AddInfoKeyId":3,"AddInfoKeyName":"Built in year","AddInfoKeyValue":"201009"},{"KindOfAdditionalDetail":1,"AddInfoKeyId":4,"AddInfoKeyName":"Model year up to","AddInfoKeyValue":"201108"},{"KindOfAdditionalDetail":1,"AddInfoKeyId":5,"AddInfoKeyName":"kW","AddInfoKeyValue":"220"},{"KindOfAdditionalDetail":1,"AddInfoKeyId":6,"AddInfoKeyName":"ccm","AddInfoKeyValue":"2993"},{"KindOfAdditionalDetail":1,"AddInfoKeyId":7,"AddInfoKeyName":"Design","AddInfoKeyValue":"Saloon 4-door"},{"KindOfAdditionalDetail":1,"AddInfoKeyId":10,"AddInfoKeyName":"Fuel","AddInfoKeyValue":"Diesel"},{"KindOfAdditionalDetail":2,"AddInfoKeyId":-4,"AddInfoKeyName":"Engine","AddInfoKeyValue":"N57 D30 B"}],"IsLocked":false,"InfoDataExists":false},{"TypeId":67991,"TypeName":"535 d xDrive","TypeDetails":[{"KindOfAdditionalDetail":1,"AddInfoKeyId":3,"AddInfoKeyName":"Built in year","AddInfoKeyValue":"201109"},{"KindOfAdditionalDetail":1,"AddInfoKeyId":5,"AddInfoKeyName":"kW","AddInfoKeyValue":"230"},{"KindOfAdditionalDetail":1,"AddInfoKeyId":6,"AddInfoKeyName":"ccm","AddInfoKeyValue":"2993"},{"KindOfAdditionalDetail":1,"AddInfoKeyId":7,"AddInfoKeyName":"Design","AddInfoKeyValue":"Saloon 4-door"},{"KindOfAdditionalDetail":1,"AddInfoKeyId":10,"AddInfoKeyName":"Fuel","AddInfoKeyValue":"Diesel"},{"KindOfAdditionalDetail":2,"AddInfoKeyId":-4,"AddInfoKeyName":"Engine","AddInfoKeyValue":"N57 D30 B"}],"IsLocked":false,"InfoDataExists":false},{"TypeId":62320,"TypeName":"535 i","TypeDetails":[{"KindOfAdditionalDetail":1,"AddInfoKeyId":3,"AddInfoKeyName":"Built in year","AddInfoKeyValue":"201003"},{"KindOfAdditionalDetail":1,"AddInfoKeyId":4,"AddInfoKeyName":"Model year up to","AddInfoKeyValue":"201610"},{"KindOfAdditionalDetail":1,"AddInfoKeyId":5,"AddInfoKeyName":"kW","AddInfoKeyValue":"225"},{"KindOfAdditionalDetail":1,"AddInfoKeyId":6,"AddInfoKeyName":"ccm","AddInfoKeyValue":"2979"},{"KindOfAdditionalDetail":1,"AddInfoKeyId":7,"AddInfoKeyName":"Design","AddInfoKeyValue":"Saloon 4-door"},{"KindOfAdditionalDetail":1,"AddInfoKeyId":10,"AddInfoKeyName":"Fuel","AddInfoKeyValue":"Petrol"},{"KindOfAdditionalDetail":2,"AddInfoKeyId":-4,"AddInfoKeyName":"Engine","AddInfoKeyValue":"N55 B30 A"}],"IsLocked":false,"InfoDataExists":false},{"TypeId":78991,"TypeName":"535 i","TypeDetails":[{"KindOfAdditionalDetail":1,"AddInfoKeyId":3,"AddInfoKeyName":"Built in year","AddInfoKeyValue":"201003"},{"KindOfAdditionalDetail":1,"AddInfoKeyId":4,"AddInfoKeyName":"Model year up to","AddInfoKeyValue":"201610"},{"KindOfAdditionalDetail":1,"AddInfoKeyId":5,"AddInfoKeyName":"kW","AddInfoKeyValue":"240"},{"KindOfAdditionalDetail":1,"AddInfoKeyId":6,"AddInfoKeyName":"ccm","AddInfoKeyValue":"2979"},{"KindOfAdditionalDetail":1,"AddInfoKeyId":7,"AddInfoKeyName":"Design","AddInfoKeyValue":"Saloon 4-door"},{"KindOfAdditionalDetail":1,"AddInfoKeyId":10,"AddInfoKeyName":"Fuel","AddInfoKeyValue":"Petrol"},{"KindOfAdditionalDetail":2,"AddInfoKeyId":-4,"AddInfoKeyName":"Engine","AddInfoKeyValue":"N55 B30 A"}],"IsLocked":false,"InfoDataExists":false},{"TypeId":78992,"TypeName":"535 i xDrive","TypeDetails":[{"KindOfAdditionalDetail":1,"AddInfoKeyId":3,"AddInfoKeyName":"Built in year","AddInfoKeyValue":"201003"},{"KindOfAdditionalDetail":1,"AddInfoKeyId":4,"AddInfoKeyName":"Model year up to","AddInfoKeyValue":"201610"},{"KindOfAdditionalDetail":1,"AddInfoKeyId":5,"AddInfoKeyName":"kW","AddInfoKeyValue":"240"},{"KindOfAdditionalDetail":1,"AddInfoKeyId":6,"AddInfoKeyName":"ccm","AddInfoKeyValue":"2979"},{"KindOfAdditionalDetail":1,"AddInfoKeyId":7,"AddInfoKeyName":"Design","AddInfoKeyValue":"Saloon 4-door"},{"KindOfAdditionalDetail":1,"AddInfoKeyId":10,"AddInfoKeyName":"Fuel","AddInfoKeyValue":"Petrol"},{"KindOfAdditionalDetail":2,"AddInfoKeyId":-4,"AddInfoKeyName":"Engine","AddInfoKeyValue":"N55 B30 A"}],"IsLocked":false,"InfoDataExists":false},{"TypeId":65656,"TypeName":"535 i xDrive","TypeDetails":[{"KindOfAdditionalDetail":1,"AddInfoKeyId":3,"AddInfoKeyName":"Built in year","AddInfoKeyValue":"201003"},{"KindOfAdditionalDetail":1,"AddInfoKeyId":5,"AddInfoKeyName":"kW","AddInfoKeyValue":"225"},{"KindOfAdditionalDetail":1,"AddInfoKeyId":6,"AddInfoKeyName":"ccm","AddInfoKeyValue":"2979"},{"KindOfAdditionalDetail":1,"AddInfoKeyId":7,"AddInfoKeyName":"Design","AddInfoKeyValue":"Saloon 4-door"},{"KindOfAdditionalDetail":1,"AddInfoKeyId":10,"AddInfoKeyName":"Fuel","AddInfoKeyValue":"Petrol"},{"KindOfAdditionalDetail":2,"AddInfoKeyId":-4,"AddInfoKeyName":"Engine","AddInfoKeyValue":"N55 B30 A"}],"IsLocked":false,"InfoDataExists":false},{"TypeId":62321,"TypeName":"550 i","TypeDetails":[{"KindOfAdditionalDetail":1,"AddInfoKeyId":3,"AddInfoKeyName":"Built in year","AddInfoKeyValue":"201003"},{"KindOfAdditionalDetail":1,"AddInfoKeyId":5,"AddInfoKeyName":"kW","AddInfoKeyValue":"300"},{"KindOfAdditionalDetail":1,"AddInfoKeyId":6,"AddInfoKeyName":"ccm","AddInfoKeyValue":"4395"},{"KindOfAdditionalDetail":1,"AddInfoKeyId":7,"AddInfoKeyName":"Design","AddInfoKeyValue":"Saloon 4-door"},{"KindOfAdditionalDetail":1,"AddInfoKeyId":10,"AddInfoKeyName":"Fuel","AddInfoKeyValue":"Petrol"},{"KindOfAdditionalDetail":2,"AddInfoKeyId":-4,"AddInfoKeyName":"Engine","AddInfoKeyValue":"N63 B44 A"},{"KindOfAdditionalDetail":2,"AddInfoKeyId":-4,"AddInfoKeyName":"Engine","AddInfoKeyValue":"N63 B44 B"}],"IsLocked":false,"InfoDataExists":false},{"TypeId":78993,"TypeName":"550 i","TypeDetails":[{"KindOfAdditionalDetail":1,"AddInfoKeyId":3,"AddInfoKeyName":"Built in year","AddInfoKeyValue":"201307"},{"KindOfAdditionalDetail":1,"AddInfoKeyId":5,"AddInfoKeyName":"kW","AddInfoKeyValue":"330"},{"KindOfAdditionalDetail":1,"AddInfoKeyId":6,"AddInfoKeyName":"ccm","AddInfoKeyValue":"4395"},{"KindOfAdditionalDetail":1,"AddInfoKeyId":7,"AddInfoKeyName":"Design","AddInfoKeyValue":"Saloon 4-door"},{"KindOfAdditionalDetail":1,"AddInfoKeyId":10,"AddInfoKeyName":"Fuel","AddInfoKeyValue":"Petrol"},{"KindOfAdditionalDetail":2,"AddInfoKeyId":-4,"AddInfoKeyName":"Engine","AddInfoKeyValue":"N63 B44 B"}],"IsLocked":false,"InfoDataExists":false},{"TypeId":78994,"TypeName":"550 i xDrive","TypeDetails":[{"KindOfAdditionalDetail":1,"AddInfoKeyId":3,"AddInfoKeyName":"Built in year","AddInfoKeyValue":"201307"},{"KindOfAdditionalDetail":1,"AddInfoKeyId":5,"AddInfoKeyName":"kW","AddInfoKeyValue":"330"},{"KindOfAdditionalDetail":1,"AddInfoKeyId":6,"AddInfoKeyName":"ccm","AddInfoKeyValue":"4395"},{"KindOfAdditionalDetail":1,"AddInfoKeyId":7,"AddInfoKeyName":"Design","AddInfoKeyValue":"Saloon 4-door"},{"KindOfAdditionalDetail":1,"AddInfoKeyId":10,"AddInfoKeyName":"Fuel","AddInfoKeyValue":"Petrol"},{"KindOfAdditionalDetail":2,"AddInfoKeyId":-4,"AddInfoKeyName":"Engine","AddInfoKeyValue":"N63 B44 B"}],"IsLocked":false,"InfoDataExists":false},{"TypeId":64181,"TypeName":"550 i xDrive","TypeDetails":[{"KindOfAdditionalDetail":1,"AddInfoKeyId":3,"AddInfoKeyName":"Built in year","AddInfoKeyValue":"201009"},{"KindOfAdditionalDetail":1,"AddInfoKeyId":4,"AddInfoKeyName":"Model year up to","AddInfoKeyValue":"201306"},{"KindOfAdditionalDetail":1,"AddInfoKeyId":5,"AddInfoKeyName":"kW","AddInfoKeyValue":"300"},{"KindOfAdditionalDetail":1,"AddInfoKeyId":6,"AddInfoKeyName":"ccm","AddInfoKeyValue":"4395"},{"KindOfAdditionalDetail":1,"AddInfoKeyId":7,"AddInfoKeyName":"Design","AddInfoKeyValue":"Saloon 4-door"},{"KindOfAdditionalDetail":1,"AddInfoKeyId":10,"AddInfoKeyName":"Fuel","AddInfoKeyValue":"Petrol"},{"KindOfAdditionalDetail":2,"AddInfoKeyId":-4,"AddInfoKeyName":"Engine","AddInfoKeyValue":"N63 B44 A"}],"IsLocked":false,"InfoDataExists":false},{"TypeId":70431,"TypeName":"ActiveHybrid","TypeDetails":[{"KindOfAdditionalDetail":1,"AddInfoKeyId":3,"AddInfoKeyName":"Built in year","AddInfoKeyValue":"201109"},{"KindOfAdditionalDetail":1,"AddInfoKeyId":5,"AddInfoKeyName":"kW","AddInfoKeyValue":"250"},{"KindOfAdditionalDetail":1,"AddInfoKeyId":6,"AddInfoKeyName":"ccm","AddInfoKeyValue":"2979"},{"KindOfAdditionalDetail":1,"AddInfoKeyId":7,"AddInfoKeyName":"Design","AddInfoKeyValue":"Saloon 4-door"},{"KindOfAdditionalDetail":1,"AddInfoKeyId":10,"AddInfoKeyName":"Fuel","AddInfoKeyValue":"Petrol/electric"},{"KindOfAdditionalDetail":2,"AddInfoKeyId":-4,"AddInfoKeyName":"Engine","AddInfoKeyValue":"N55 B30 A"}],"IsLocked":false,"InfoDataExists":false},{"TypeId":79146,"TypeName":"ActiveHybrid","TypeDetails":[{"KindOfAdditionalDetail":1,"AddInfoKeyId":3,"AddInfoKeyName":"Built in year","AddInfoKeyValue":"201109"},{"KindOfAdditionalDetail":1,"AddInfoKeyId":4,"AddInfoKeyName":"Model year up to","AddInfoKeyValue":"201610"},{"KindOfAdditionalDetail":1,"AddInfoKeyId":5,"AddInfoKeyName":"kW","AddInfoKeyValue":"225"},{"KindOfAdditionalDetail":1,"AddInfoKeyId":6,"AddInfoKeyName":"ccm","AddInfoKeyValue":"2979"},{"KindOfAdditionalDetail":1,"AddInfoKeyId":7,"AddInfoKeyName":"Design","AddInfoKeyValue":"Saloon 4-door"},{"KindOfAdditionalDetail":1,"AddInfoKeyId":10,"AddInfoKeyName":"Fuel","AddInfoKeyValue":"Petrol/electric"},{"KindOfAdditionalDetail":2,"AddInfoKeyId":-4,"AddInfoKeyName":"Engine","AddInfoKeyValue":"N55 B30 A"}],"IsLocked":false,"InfoDataExists":false},{"TypeId":70990,"TypeName":"M 550 d xDrive","TypeDetails":[{"KindOfAdditionalDetail":1,"AddInfoKeyId":3,"AddInfoKeyName":"Built in year","AddInfoKeyValue":"201201"},{"KindOfAdditionalDetail":1,"AddInfoKeyId":5,"AddInfoKeyName":"kW","AddInfoKeyValue":"280"},{"KindOfAdditionalDetail":1,"AddInfoKeyId":6,"AddInfoKeyName":"ccm","AddInfoKeyValue":"2993"},{"KindOfAdditionalDetail":1,"AddInfoKeyId":7,"AddInfoKeyName":"Design","AddInfoKeyValue":"Saloon 4-door"},{"KindOfAdditionalDetail":1,"AddInfoKeyId":10,"AddInfoKeyName":"Fuel","AddInfoKeyValue":"Diesel"},{"KindOfAdditionalDetail":2,"AddInfoKeyId":-4,"AddInfoKeyName":"Engine","AddInfoKeyValue":"N57 D30 C"}],"IsLocked":false,"InfoDataExists":false},{"TypeId":78999,"TypeName":"M5","TypeDetails":[{"KindOfAdditionalDetail":1,"AddInfoKeyId":3,"AddInfoKeyName":"Built in year","AddInfoKeyValue":"201401"},{"KindOfAdditionalDetail":1,"AddInfoKeyId":5,"AddInfoKeyName":"kW","AddInfoKeyValue":"423"},{"KindOfAdditionalDetail":1,"AddInfoKeyId":6,"AddInfoKeyName":"ccm","AddInfoKeyValue":"4395"},{"KindOfAdditionalDetail":1,"AddInfoKeyId":7,"AddInfoKeyName":"Design","AddInfoKeyValue":"Saloon 4-door"},{"KindOfAdditionalDetail":1,"AddInfoKeyId":10,"AddInfoKeyName":"Fuel","AddInfoKeyValue":"Petrol"},{"KindOfAdditionalDetail":2,"AddInfoKeyId":-4,"AddInfoKeyName":"Engine","AddInfoKeyValue":"S63 B44 B"}],"IsLocked":false,"InfoDataExists":false},{"TypeId":90663,"TypeName":"M5","TypeDetails":[{"KindOfAdditionalDetail":1,"AddInfoKeyId":3,"AddInfoKeyName":"Built in year","AddInfoKeyValue":"201407"},{"KindOfAdditionalDetail":1,"AddInfoKeyId":4,"AddInfoKeyName":"Model year up to","AddInfoKeyValue":"201610"},{"KindOfAdditionalDetail":1,"AddInfoKeyId":5,"AddInfoKeyName":"kW","AddInfoKeyValue":"441"},{"KindOfAdditionalDetail":1,"AddInfoKeyId":6,"AddInfoKeyName":"ccm","AddInfoKeyValue":"4395"},{"KindOfAdditionalDetail":1,"AddInfoKeyId":7,"AddInfoKeyName":"Design","AddInfoKeyValue":"Saloon 4-door"},{"KindOfAdditionalDetail":1,"AddInfoKeyId":10,"AddInfoKeyName":"Fuel","AddInfoKeyValue":"Petrol"},{"KindOfAdditionalDetail":2,"AddInfoKeyId":-4,"AddInfoKeyName":"Engine","AddInfoKeyValue":"S63 B44 B"}],"IsLocked":false,"InfoDataExists":false},{"TypeId":67481,"TypeName":"M5","TypeDetails":[{"KindOfAdditionalDetail":1,"AddInfoKeyId":3,"AddInfoKeyName":"Built in year","AddInfoKeyValue":"201106"},{"KindOfAdditionalDetail":1,"AddInfoKeyId":4,"AddInfoKeyName":"Model year up to","AddInfoKeyValue":"201610"},{"KindOfAdditionalDetail":1,"AddInfoKeyId":5,"AddInfoKeyName":"kW","AddInfoKeyValue":"412"},{"KindOfAdditionalDetail":1,"AddInfoKeyId":6,"AddInfoKeyName":"ccm","AddInfoKeyValue":"4395"},{"KindOfAdditionalDetail":1,"AddInfoKeyId":7,"AddInfoKeyName":"Design","AddInfoKeyValue":"Saloon 4-door"},{"KindOfAdditionalDetail":1,"AddInfoKeyId":10,"AddInfoKeyName":"Fuel","AddInfoKeyValue":"Petrol"},{"KindOfAdditionalDetail":2,"AddInfoKeyId":-4,"AddInfoKeyName":"Engine","AddInfoKeyValue":"S63 B44 B"}],"IsLocked":false,"InfoDataExists":false}],
      carMakerId: '',
      carRangeId: '',
      carTypeId: '',
      carVin: '',
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
      this.carVin = this.$route.query.VIN;
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
                  });
                  /////////////////////////////////////////////////////////////////

                  if(result.data.length == 1) {
                      this.carMakeId = result.data[0].MakeId;
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

              this.jsonHeader.Authorization = "TecRMI " + this.rmiAuthKey;

              axios({
                  method: 'POST',
                  url: url + "/rest/VehicleTree/RangeList",
                  headers: this.jsonHeader,
                  data: param
              })
              .then((result) => {
                  console.log('RangeList 조회 : ', result);
                  console.log('RangeList 조회 : ', JSON.stringify(result.data));
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

              this.jsonHeader.Authorization = "TecRMI " + this.rmiAuthKey;

              axios({
                  method: 'POST',
                  url: url + "/rest/VehicleTree/TypeList",
                  headers: this.jsonHeader,
                  data: param
              })
              .then((result) => {
                  console.log('TypeList 조회 : ', result);
                  console.log('TypeList 조회 : ', JSON.stringify(result.data));
                  this.carTypeLists = result.data;

                  if(result.data.length == 1) {
                      this.carTypeId = result.data[0].TypeId;
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
