<template>
  <v-app>
    <div class="InfoPage" id="InfoPage">
      <b-card
        header="카센타 정보"
        header-text-variant="white"
        header-tag="header"
        header-bg-variant="dark"
        style="height:113px;"
      >
        <b-card-text class="UserInfo-contents" v-if="showSiteInfo">

          <div class="UserInfo-info">
            <v-row>
              <div class="info-name">{{this.qtInfo.ReqName}}</div>
              <div class="info-tel"><v-icon small class="qt-icon">fas fa-phone-square</v-icon>{{this.siteInfo.TEL}} / <v-icon small class="qt-icon">fas fa-mobile-alt</v-icon>{{this.siteInfo.HP}} / </div>
              <div class="info-addr"><v-icon small class="qt-icon">mdi-domain</v-icon>{{this.siteInfo.ADDR}}</div>
            </v-row>
          </div>
        </b-card-text>
      </b-card>
      <b-card
        header="차량 정보"
        header-text-variant="white"
        header-tag="header"
        header-bg-variant="dark"
      >
        <b-card-text>
          <div class="Car-Info">
            <v-container>
              <v-row  class="mt-n10 mb-n12">
                <v-col cols = "12" md="10">
                  <v-row  class="mb-n10">
                    <v-col cols="12" md="4">
                      <v-text-field label="차량번호" outlined dense color="blue accent-1" :value="(this.qtInfo.CarNo==='*empty*')?'미상차량' : this.qtInfo.CarNo">
                      </v-text-field>
                    </v-col>
                    <v-col cols="12" md="8">
                      <v-text-field label="차대번호" outlined dense color="blue accent-1" :value="this.qtInfo.CarVin">
                      </v-text-field>
                    </v-col>
                  </v-row>
                  <v-row class="mb-n4">
                    <v-col cols="12" md="4">
                      <!--<v-select v-model="qtInfo.CarBrand" :items="carBrand" label="브랜드" :value="this.qtInfo.CarBrand" outlined dense color="success" :menu-props="{ top: true, offsetX: true}"></v-select>-->
                      <b-form-select v-model="qtInfo.CarBrand" :options="carBrand"></b-form-select>
                    </v-col>
                    <v-col cols="12" md="8">
                      <v-text-field label="차정상세" outlined dense clearable color="blue accent-1" v-model="qtInfo.CarSeries" :value="this.qtInfo.CarSeries">
                      </v-text-field>
                    </v-col>
                  </v-row>                  
                </v-col>
                <v-col cols = "12" md="2">
                  <v-btn v-if="qtInfo.IMG !== '*empty*'" class="mt-8" id="CarInfo-Button" x-large outlined color="blue accent-1" @click="showQTImage(qtInfo.IMG)" >
                    <v-icon left>fas fa-camera</v-icon> <span class="font-weight-medium ml-4">사진<br>확인</span>
                  </v-btn>            
                </v-col>
              </v-row>
                        
            </v-container>            
            <!--
              <div class="CarInfo-Left">
                <v-row>
                  <v-text-field label="차량번호" outlined dense width = "100px" :value="(this.qtInfo.CarNo==='*empty*')?'미상차량' : this.qtInfo.CarNo">
                  </v-text-field>
                </v-row>
                <v-row>
                  <div><v-icon x-small class="qt-icon">fas fa-angle-right</v-icon>브랜드 </div>     
                  <div class="QT-Content">{{this.series}}</div>
                </v-row>    
              </div>
              <div class="CarInfo-Right">
                <v-row>
                  <div><v-icon x-small class="qt-icon">fas fa-angle-right</v-icon>차대번호 </div>  
                  <b-form-input v-model="this.qtInfo.CarVin"></b-form-input>
                </v-row>
                <v-row>
                  <div><v-icon x-small class="qt-icon">fas fa-angle-right</v-icon>상세차정 </div>     
                  <div class="QT-Content">{{this.series}}</div>
                </v-row>                      
              </div>
              <div class="CarInfo-Button">
                <v-btn class="ma-2" id="CarInfo-Button" outlined fab color="#acd3ce" elevation="5" @click="showQTImage(qtInfo.IMG)">
                  사진<br>확인
                </v-btn>             
              </div>  
            -->           
          </div>   
        </b-card-text>
      </b-card>
      <b-card no-body class="QT-Detail">
        <b-tabs v-model="tabIndex" card active-nav-item-class="font-weight-bold" >
        <b-tab title="견적 요청" :title-link-class="linkClass(0)">
          <b-card-text> 
            <div class="QTReq-List">
              <v-icon x-small class="qt-icon">fas fa-angle-down</v-icon>견적요청 상세    
              <table class="QTReq-Table mdl-data-table mdl-js-data-table mdl-shadow--2dp">
                <thead>
                  <tr>
                    <th class="QTItem-Title mdl-data-table__cell--non-numeric">요청 부품</th>
                    <th class="QTItem-Qty">수량</th>
                    <th class="QTItem-String">첨부파일</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(item , index) in qtItems" :key="index">
                    <td class="mdl-data-table__cell--non-numeric">{{item.ITM_NM}}</td>
                    <td>{{item.ITM_QTY}}</td>
                    <td>
                      <v-btn outlined small color="#00BFA5" class="float-right" v-if="item.IMG !== undefined" @click="showQTImage(item.IMG)">사진 확인</v-btn>
                    </td>
                  </tr>
                  <!--
                  <tr>
                    <td class="mdl-data-table__cell--non-numeric">오일 필터</td>
                    <td>1</td>
                  </tr>
                  -->
                </tbody>
              </table>
            </div>   
            <div class="QTReq-Memo">
              <v-icon x-small class="qt-icon">fas fa-angle-down</v-icon>Memo
              <b-form-textarea
                id="textarea"
                rows="2"
                max-rows="2"
                v-model="this.qtInfo.Memo"
              ></b-form-textarea>   
            </div>      
          </b-card-text>
        </b-tab>
        <b-tab title="견적 회신" :title-link-class="linkClass(1)">
          <b-card-text>
            <div class="QT-Info"  v-if="UserInfo.UserType === 'DEALER'">
              <div class="QT-Title"><v-icon x-small class="qt-icon">fas fa-angle-down</v-icon>담당자 : </div>
              <div class="QT-Content">{{this.angentNm }}</div>
              <div class="QT-Title"><v-icon x-small  class="qt-icon">fas fa-angle-down</v-icon>견적상태 : </div>
              <div class="QT-ContentSts">{{this.estmStsNm}}</div>
            </div>
            <div class="QTRes-List">
              <div class="QTRes-Title">
                <v-icon x-small class="qt-icon">fas fa-angle-down</v-icon>견적회신 상세
              </div>  
              <div class="QTRes-Button">
                <b-button-group size="sm">
                  <!--<b-button variant="outline-secondary">엑셀 카피 자동 입력</b-button>-->
                  <b-button variant="outline-secondary" v-on:click="GetQtList" v-if="UserInfo.UserType === 'DEALER'">견적서 자동 입력</b-button>
                  <b-button variant="outline-secondary" @click="selectedDeleteItem">선택 삭제</b-button>
                  <b-button id="clipboardBtn" @click="clipboardAdd" style="display:none">Text 붙여넣기 Hidden 버튼</b-button>
                  <b-button id="clipImageBtn" @click="clipImageAdd" style="display:none">Image 붙여넣기 Hidden 버튼</b-button>
                  <!-- <b-button class="QTRes-ButtonAdd" variant="outline-secondary">부품 추가</b-button>-->
                <!--부품추가-->
                 <v-dialog v-model="dialog" width="90%" >
                  <template v-slot:activator="{ on }">
                    <b-button id="btnItmAdd" class="QTRes-ButtonAdd" variant="outline-secondary" v-on="on">부품 추가</b-button>
                  </template>
                  <v-card>
                    <v-card-title>
                     <!-- <span class="headline">{{ formTitle }}</span>-->
                    </v-card-title>
                    <v-card-text>
                      <!--<v-container>-->
                        <v-row>
                          <v-col cols="12" sm="6" md="2">
                           <v-text-field v-model="editedItem.itemCode" label="부품번호" @focus="$event.target.select()"></v-text-field>
                          </v-col>
                          <v-col cols="12" sm="6" lg="1">
                            <v-combobox v-model="editedItem.itemBrand" :items="afterBrand" label="브랜드" ></v-combobox>    
                             <!--<v-text-field v-model="editedItem.itemBrand" label="브랜드"></v-text-field>-->
                          </v-col>
                          <!--<v-col cols="12" sm="6" lg="1">
                            <v-combobox v-model="editedItem.carBrand" :items="carBrand" label="차종" ></v-combobox>
                          </v-col>-->
                          <v-col cols="12" sm="6" md="2">
                              <v-text-field v-model="editedItem.itemName" label="부품명" @focus="$event.target.select()"></v-text-field>
                          </v-col>
                          <!--<v-col cols="12" sm="6" md="2">
                              <v-text-field v-model="editedItem.afterNo" label="After No" @focus="$event.target.select()"></v-text-field>
                          </v-col>-->
                          <v-col cols="12" sm="6" md="1">
                              <v-text-field :value="editedItem.itemQty  | localeNum" label="수량" 
                              @input="value =>editedItem.itemQty = value"  
                              @change="onCalculatorAMT"
                              @focus="$event.target.select()"
                              ></v-text-field>
                          </v-col>
                          <v-col cols="12" sm="6" md="1">
                              <v-text-field :value="editedItem.itemPrice " label="단가"
                                @input="value =>editedItem.itemPrice = value" 
                                @change="onCalculatorAMT"
                                @focus="$event.target.select()" 
                                ></v-text-field>
                          </v-col>
                          <v-col cols="12" sm="6" md="1">
                              <v-text-field :value="editedItem.AMT " label="금액"  
                              @input="value => editedItem.AMT = value"
                              @focus="$event.target.select()"
                              ></v-text-field>
                          </v-col>
                          <v-col cols="12" md="1">
                            <v-combobox v-model="editedItem.delv" :items="delvType" label="배송구분"></v-combobox>
                          </v-col>    
                          <v-col cols="12" md="2">
                              <v-text-field v-model="editedItem.memo" label="비고"  @focus="$event.target.select()"></v-text-field>
                          </v-col>               
                        </v-row>
                       <!-- <v-row>
                          <v-col cols="12" lg="12">
                              <v-text-field v-model="editedItem.memo" label="비고"  @focus="$event.target.select()"></v-text-field>
                          </v-col>
                        </v-row>-->
                     <!-- </v-container>-->
                    </v-card-text>

                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn color="#00BFA5" outlined  @click="close">취소</v-btn>
                      <v-btn color="#A1887F"  @click="addItem">{{btnEditText}}</v-btn>
                    </v-card-actions>
                  </v-card>
                </v-dialog>

                </b-button-group>
              </div>  
            </div>      
            <!-- 
            <table class="QTRes-Table mdl-data-table mdl-js-data-table mdl-shadow--2dp">
              <thead>
                <tr>
                  <th class="QTItem-Title mdl-data-table__cell--non-numeric">브랜드</th>
                  <th class="QTItem-Title mdl-data-table__cell--non-numeric">부 품 명</th>
                  <th class="QTItem-Brand mdl-data-table__cell--non-numeric">부품코드</th>
                  <th class="QTItem-Qty">수량</th>
                  <th class="QTItem-Qty">단가</th>
                  <th class="QTItem-Qty">금액</th>
                  <th class="QTItem-Qty mdl-data-table__cell--non-numeric">배송구분</th>
                </tr>
              </thead>
              <tbody>              
                <tr v-for="(qtItem,i) in detailQTData" :key="i" >
                  <td> </td>
                  <td class="mdl-data-table__cell--non-numeric"><div class="itemNm" v-b-tooltip.hover :title=qtItem.NM_ITM>{{qtItem.NM_ITM}}</div>
                  </td>
                  <td class="mdl-data-table__cell--non-numeric">{{qtItem.CONFIRM_ITM}}</td>
                  <td>{{qtItem.ORDER_QTY | localeNum}}</td>
                  <td>{{qtItem.SAL_PRICE | localeNum}}</td>
                  <td>{{qtItem.AMT | localeNum}}</td>
                  <td class="mdl-data-table__cell--non-numeric">{{qtItem.DELV_DAY}}</td>
                </tr>
              </tbody>
            </table>-->
            <div v-if="UserInfo.UserType === 'DEALER'">
            <v-data-table
              v-model="selected"
              :headers="headers"
              :items="detailQTData"
              class="elevation-1"
              fixed-header
              height="350px"
              :items-per-page="itemsPerPage"
              hide-default-footer
              no-data-text=''
            >   
              <!--header-->
              <template v-slot:header.NM_ITM="{ header }">
                <span class="header-item">{{ header.text }}</span>
              </template>
              <template v-slot:header.CONFIRM_ITM="{ header }">
                <span class="header-item">{{ header.text }}</span>
              </template>
              <template v-slot:header.ORDER_QTY="{ header }">
                <span class="header-item">{{ header.text }}</span>
              </template>
              <template v-slot:header.SAL_PRICE="{ header }">
                <span class="header-item">{{ header.text }}</span>
              </template>
              <template v-slot:header.AMT="{ header }">
                <span class="header-item">{{ header.text }}</span>
              </template>
              <template v-slot:header.DELV_DAY="{ header }">
                <span class="header-item">{{ header.text }}</span>
              </template>
              <!-- contents -->
              <template v-slot:item.NM_ITM="{ item }">
               <div class="item-itemName" v-b-tooltip.hover :title=item.NM_ITM  >{{ item.NM_ITM }}</div>
              </template>
              <template v-slot:item.CONFIRM_ITM="{ item }">
               <div class="item-itemcode">{{ item.CONFIRM_ITM }}</div>
              </template>
              <template v-slot:item.ORDER_QTY="{ item }">
               <span class="item-numeric-qty">{{ item.ORDER_QTY | localeNum}}</span>
              </template>
              <template v-slot:item.SAL_PRICE="{ item }">
               <span class="item-numeric">{{ item.SAL_PRICE | localeNum}}</span>
              </template>
              <template v-slot:item.AMT="{ item }">
               <span class="item-numeric">{{ item.AMT | localeNum}}</span>
              </template>
              <template v-slot:item.DELV_DAY="{ item }">
               <div class="item-delv">{{ item.DELV_DAY }}</div>
              </template>
            </v-data-table>
            <div class="QTRes-footer" v-if="showSum">
              <div class="TotalInfo">
                <span class="TotalInfo-Title">합계금액</span>
                <span class="TotalInfo-Text">{{total | localeNum}}</span>
                <span><b-button v-on:click="sendQTconfirmMsg()">{{txtQTConfirm}}</b-button></span>
                <!--<v-btn @click="SendSMS" >SMS전송</v-btn>-->
              </div>
            </div>
            </div>
            <div  v-else>
            <v-data-table
              v-model="selected"
              :headers="headers2"
              :items="detailQTData"
              class="elevation-1 mytable"
              fixed-header
              height="calc(100vh - 550px)"
              :items-per-page="itemsPerPage"
              hide-default-footer
              no-data-text=''
              show-select
              :single-select="singleSelect"
              item-key="itemCode"
              disable-sort=""
            >      
              <!--header-->
              <template v-slot:header.itemCode="{ header }">
                <span class="header-item2">{{ header.text }}</span>
              </template>
              <template v-slot:header.itemBrand="{ header }">
                <span class="header-item2">{{ header.text }}</span>
              </template>
             <!-- <template v-slot:header.carBrand="{ header }">
                <span class="header-item2">{{ header.text }}</span>
              </template>-->
              <template v-slot:header.itemName="{ header }">
                <span class="header-item2">{{ header.text }}</span>
              </template>
             <!-- <template v-slot:header.afterNo="{ header }">
                <span class="header-item2">{{ header.text }}</span>
              </template>-->
              <template v-slot:header.itemQty="{ header }">
                <span class="header-item2">{{ header.text }}</span>
              </template>
              <template v-slot:header.itemPrice="{ header }">
                <span class="header-item2">{{ header.text }}</span>
              </template>
              <template v-slot:header.AMT="{ header }">
                <span class="header-item2">{{ header.text }}</span>
              </template>
              <template v-slot:header.memo="{ header }">
                <span class="header-item2">{{ header.text }}</span>
              </template>
              <!-- contents -->
              <template v-slot:item.itemCode="{ item }">
               <span class="item-delv">{{ item.itemCode }}</span>
              </template>
              <template v-slot:item.itemBrand="{ item }">
               <span class="item-delv">{{ item.itemBrand }}</span>
              </template>   
             <!-- <template v-slot:item.carBrand="{ item }">
               <span class="item-delv">{{ item.carBrand }}</span>
              </template> -->
              <template v-slot:item.itemName="{ item }">
               <span class="item-delv">{{ item.itemName }}</span>
              </template> 
              <!--<template v-slot:item.afterNo="{ item }">
               <span class="item-delv">{{ item.afterNo }}</span>
              </template> -->
              <template v-slot:item.itemQty="{ item }">
               <span class="item-numeric-qty">{{ item.itemQty|localeNum}}</span>
              </template>
              <template v-slot:item.itemPrice="{ item }">
               <span class="item-numeric">{{ item.itemPrice|localeNum}}</span>
              </template>
              <template v-slot:item.AMT="{ item }">
               <span class="item-numeric">{{ item.AMT|localeNum}}</span>
              </template>       
              <template v-slot:item.action="{ item }">
                <v-icon small class="mr-2" @click="editItem(item)" >
                  edit
                </v-icon>
                <v-icon small @click="deleteItem(item)">
                  delete
                </v-icon>
              </template>
           
            </v-data-table>
            <div class="QTRes-footer">
                <div class="TotalInfo">
                  <span class="TotalInfo-Title">합계금액</span>
                  <span class="TotalInfo-Text">{{total | localeNum}}</span>
                  <span><b-button v-on:click="saveQTConfirm()">{{txtQTConfirm}}</b-button></span>
                  <!--<v-btn @click="SendSMS" >SMS전송</v-btn>-->
                </div>

            </div>
            </div>
          </b-card-text>
        </b-tab>
        <b-tab title="주문 내역" :title-link-class="linkClass(2)"  v-if="UserInfo.UserType !== 'DEALER'">
          <b-card-text>
            <div class="QTRes-List">
              <div class="QTRes-Title">
                <v-icon x-small class="qt-icon">fas fa-angle-down</v-icon>주문 상세
              </div>  
            </div>      
            <div>
            <v-data-table
              :headers="headers3"
              :items="orderHistory"
              class="elevation-1 mytable"
              fixed-header
              height="calc(100vh - 520px)"
              :items-per-page="itemsPerPage"
              hide-default-footer
              no-data-text=''
              :single-select="singleSelect"
              item-key="itemCode"
              disable-sort=""
            >      
              <!--header-->
              <template v-slot:header.itemCode="{ header }">
                <span class="header-item2">{{ header.text }}</span>
              </template>
              <template v-slot:header.itemBrand="{ header }">
                <span class="header-item2">{{ header.text }}</span>
              </template>
              <template v-slot:header.itemName="{ header }">
                <span class="header-item2">{{ header.text }}</span>
              </template>
             <template v-slot:header.itemQty="{ header }">
                <span class="header-item2">{{ header.text }}</span>
              </template>
              <template v-slot:header.itemPrice="{ header }">
                <span class="header-item2">{{ header.text }}</span>
              </template>
              <template v-slot:header.AMT="{ header }">
                <span class="header-item2">{{ header.text }}</span>
              </template>
              <!-- contents -->
              <template v-slot:item.itemCode="{ item }">
               <span class="item-delv">{{ item.itemCode }}</span>
              </template>
              <template v-slot:item.itemBrand="{ item }">
               <span class="item-delv">{{ item.itemBrand }}</span>
              </template>   
             <template v-slot:item.itemName="{ item }">
               <span class="item-delv">{{ item.itemName }}</span>
              </template> 
             <template v-slot:item.itemQty="{ item }">
               <span class="item-numeric-qty">{{ item.itemQty|localeNum}}</span>
              </template>
              <template v-slot:item.itemPrice="{ item }">
               <span class="item-numeric">{{ item.itemPrice|localeNum}}</span>
              </template>
              <template v-slot:item.AMT="{ item }">
               <span class="item-numeric">{{ item.AMT|localeNum}}</span>
              </template>       
            <!--  <template v-slot:item.action="{ item }">
                <v-icon small class="mr-2" @click="editItem(item)" >
                  edit
                </v-icon>
                <v-icon small @click="deleteItem(item)">
                  delete
                </v-icon>
              </template>-->
           
            </v-data-table>
            <div class="QTRes-footer">
                <div class="TotalInfo">
                  <span class="TotalInfo-Title">합계금액</span>
                  <span class="TotalInfo-Text">{{total2 | localeNum}}</span>
                </div>
            </div>
            </div>
          </b-card-text>
        </b-tab>
        </b-tabs>
      </b-card>   

      <v-dialog v-model="showQTImageFlag" width="500px">
        <v-card>
          <v-card-title class="headline" >이미지 확인</v-card-title>
          <v-img class="grey lighten-3 mr-4 ml-4"  v-bind:src="itemImage" max-width="800px"></v-img>

          <v-card-actions>
            <v-spacer></v-spacer>
             <v-btn
              color="#A1887F"
              @click="saveImage"
            >
              저장
            </v-btn>      
            <v-btn
              color="#00BFA5"
              outlined
              @click="showQTImageFlag = false; itemImage = '';"
            >
              닫기
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>  

    </div>   
  </v-app>
</template>
<!--<script src="https://unpkg.com/axios/dist/axios.min.js"></script>-->
<script src="http://code.jquery.com/jquery-latest.min.js"></script>
<script>
import {datePadding, convertDynamoToString , convertDynamoToArrayString, convertArrayToDynamo} from '@/utils/common.js'
import Constant from '@/Constant';

const axios = require('axios').default;
export default {
  name: 'InfoPage',
  data () {
    return {
      selectedBrand: null,
      tabIndex: 0,
      detailQTData:[],
      series:'',
      angentNm:'',
      estmStsNm:'',
      showSum:false,
      showSiteInfo:false,
      qtInfo:[],
      qtItems:[],
      siteInfo:[],
      showQTImageFlag:false,
      itemImage:'',
      selected: [],
      singleSelect:false,
      dialog: false,
     // carinfoHeight:'height:130px;',
      btnEditText:'추가',
      headers: [
          {
            text: '브랜드',
            align: 'center',
            sortable: false,
          },
          { text: '부품명', value: 'NM_ITM',},
          { text: '부품코드', value: 'CONFIRM_ITM' },
          { text: '수량', value: 'ORDER_QTY' ,align: 'end', },
          { text: '단가', value: 'SAL_PRICE' },
          { text: '금액', value: 'AMT' },
          { text: '배송구분', value: 'DELV_DAY' },
        ],
      headers2: [
          { text: '부품번호', value: 'itemCode', align:'center', },
          { text: '브랜드', value: 'itemBrand', align:'center',},
          { text: '부품명',  value: 'itemName', align:'center',},
         // { text: '애프터번호', value: 'afterNo', align:'center',},
          { text: '수량',  value: 'itemQty', align:'end'},
          { text: '단가', value: 'itemPrice',align:'end' },
          { text: '금액', value: 'AMT',align:'end'},
          { text: '비고', value: 'memo', sortable: false,},
          { text: '', value: 'action', sortable: false, width:'80px', },
        ],
      headers3: [
          { text: '부품번호', value: 'itemCode', align:'center', },
          { text: '브랜드', value: 'itemBrand', align:'center',},
          { text: '부품명',  value: 'itemName', align:'center',},
          { text: '수량',  value: 'itemQty', align:'end'},
          { text: '단가', value: 'itemPrice',align:'end' },
          { text: '금액', value: 'AMT',align:'end'},
        ],
      editedItem: {
        seq:0,
        itemCode: '',
        itemBrand: '',
        carBrand: '',
        itemName: '',
        afterNo: '',
        itemQty:0,
        itemPrice:0,
        AMT:0,
        delv:'택배',
        memo:'',
      },
      itemsPerPage: -1,
      carBrand:['차종 선택', 'BMW', 'BENZ', 'AUDI', 'VW', 'FORD', 'LEXUS', '기타'],
      afterBrand:['MANN','FRAM','MEYLE','BOSCH','TRW'],
      delvType:['택배','퀵'],
      testData: {},      
      txtQTConfirm: '견적 확정 회신', 
      orderHistory:[],
      brandSelected: '차종 선택',    
    }
  },
  methods: {
    onCalculatorAMT(){
     this.editedItem.AMT = this.editedItem.itemPrice * this.editedItem.itemQty;
    },
    linkClass(idx) {
      if (this.tabIndex === idx) {
        return ['text-info']
      } else {
        return ['text-secondary']
      }
    },
    GetQtList(){
      var param = {};
      param.BsnId = this.qtInfo.ReqSite;
      param.CarNo = this.qtInfo.CarNo;
      param.VinNo =  this.qtInfo.CarVin;
      param.RequestDataJSON = this.qtInfo.ID;

      console.log("======= QT LIST Request result ========");
      console.log(param); 

      var rtnCode = "";

      axios({
          method: 'POST',
          url: Constant.SCPIF_URL + 'GetQTData',
          headers: Constant.JSON_HEADER,
          data: param
      })
      .then((result) => {
          console.log("======= QT LIST Return result ========");     
          console.log(result.data); 
         
          this.rtnCode = result.data.ReturnCode;

          if(this.rtnCode === 0)
          {
            var rtnQTData = JSON.parse(result.data.ReturnDataJSON);
            var headQTData = rtnQTData['ESTM_HED'];
            
            if(headQTData.length > 0)
            {
              if(headQTData[0].ESTM_STS !== '1' && rtnQTData['ESTM_DTL'].Length !== 0)
              {
                this.detailQTData = rtnQTData['ESTM_DTL'];
                //console.log(JSON.stringify(rtnQTData['ESTM_DTL'])); 
                this.showSum = !this.showSum; 
              }

              /* var qtKeys = Object.keys(rtnQTData );*/
              /*console.log("ESTM_HED : " + this.headQTData );
              console.log("ESTM_DTL : " + this.detailQTData );*/
              this.series = headQTData[0].SERIES;
              this.angentNm = headQTData[0].AGENT_NM;
              this.estmStsNm = headQTData[0].ESTM_STS_NM;

              this.qtInfo.CarSeries = headQTData[0].SERIES;
            }
          }
          
      })
      .catch((error) => {
          console.log(error);
      })   
    },
    SetQtInfo(){
      console.log('UserType : ' , this.UserInfo );
      console.log("QT Info 설정" + JSON.stringify(this.qtInfo));  
      this.tabIndex = 0;
      
      if( this.qtInfo.LineItem !== undefined)
      { 
        if(this.qtInfo.LineItem.length > 0)
        {  
          this.qtInfo.CarVin = convertDynamoToString(this.qtInfo.CarVin);
          this.qtInfo.Memo = convertDynamoToString(this.qtInfo.Memo); 
          this.qtItems = JSON.parse(convertDynamoToArrayString(this.qtInfo.LineItem));
        }
        else{
          this.qtInfo.CarVin = "";
          this.qtInfo.Memo = "";
          this.qtItems = [];
        }

        var btnAdd =  document.querySelector('#btnItmAdd');
        btnAdd.removeAttribute("disabled", "true");
       
      }

      if(this.qtInfo.CarBrand === undefined) this.qtInfo.CarBrand = "차종 선택";

      // webpos견적 Data 초기화
      this.series = '';
      this.angentNm = '';
      this.estmStsNm = '';
      this.showSum = false;
      this.detailQTData = [];
    },
    GetSiteInfo(){
      this.showSiteInfo = false;
      var param = {};
      param.operation = "list";
      param.tableName = "BAY4U_SITE";
      param.payload = {};
      param.payload.FilterExpression = "CODE = :id";
      param.payload.ExpressionAttributeValues = {};
      var key = ":id";

      param.payload.ExpressionAttributeValues[key] = this.qtInfo.ReqSite;

      axios({
        method: 'POST',
        url: Constant.LAMBDA_URL,
        headers: Constant.JSON_HEADER,
        data: param
      })
      .then((result) => {
        console.log("======= Site result ========");
        console.log(result.data);
        this.siteInfo = result.data.Items[0];
        this.showSiteInfo = true;
      });
    },
    sendQTconfirmMsg()
    {
      var now = new Date();
      var chatTime = now.getFullYear() + datePadding(now.getMonth()+1,2) + datePadding(now.getDate(),2) 
                + datePadding(now.getHours(),2) + datePadding(now.getMinutes(), 2) + datePadding(now.getSeconds(),2);

      var checkMsg = false;
      var msg = '';

      for(var msg of this.msgDatas) {
        if(msg.msgData.msg.indexOf('차량에 대한 견적이 완료') > 0) 
          checkMsg = true;
      }

      if(checkMsg === false)
        msg = ((this.qtInfo.CarNo==='*empty*')?'미상' : this.qtInfo.CarNo) + " 차량에 대한 견적이 완료됐습니다.";
      else
        msg = ((this.qtInfo.CarNo==='*empty*')?'미상' : this.qtInfo.CarNo) + " 차량에 대한 견적이 수정 후 재전송 되었습니다.";      

      var qtMsg = {};
      qtMsg.from = {'name' : this.UserInfo.BsnID};
      qtMsg.msg  = msg;
      qtMsg.reqTm = chatTime;
      this.$EventBus.$emit('send-QTConfirm' , qtMsg)
    },
    showQTImage(img) { 
      console.log("QTInfo : ", this.qtInfo);
      console.log("Image : ", img);
      this.showQTImageFlag = true;
      this.itemImage = Constant.IMG_URL + img;

      var http = new XMLHttpRequest();
      http.open('HEAD', Constant.IMG_URL + img, false);
      http.send(); 
      console.log("Image Check : ", http.status);
    },
    saveImage() {
      console.log("Info : ", this.qtInfo);
      var link   = document.createElement('a');
      link.href = this.itemImage;
      link.target = '_self';
      if(this.qtInfo.CarVin !== '' )
        link.download = this.qtInfo.CarVin + '.png';
      else
        link.download = this.qtInfo.ID + '.png';
      link.click();
    },
    SendSMS()
    {
      var param = {};
      param.TranPhone = "010-0000-0000";
      param.TranCallback = "1600-9691";
      param.TranMsg =  "모바일 견적요청이 완료되었습니다.";

      console.log("======= SendSMS Request result ========");
      console.log(param); 

      axios({
          method: 'POST',
          //url:'http://iparts.sknetworks.co.kr/BAY4UService.svc/SendSMS',
          url:'https://bay4u.co.kr/scpif/SendSMS',
          headers:{
              'Accept': 'application/json',
              'Content-Type': 'application/json'
          },
          data: param
      })
      .then((result) => {
          console.log("======= SendSMS Return result ========");     
          console.log(result.data); 
          console.log(result.data.ReturnMessage)
      })
      .catch((error) => {
          console.log(error);
      })   
    },
    editItem (item) {
        this.btnEditText = '수정';
        this.editedIndex = this.detailQTData.indexOf(item);
        this.editedItem = Object.assign({}, item);
        this.dialog = true;        
      },
    deleteItem (item) {
      const index = this.detailQTData.indexOf(item);
      confirm('삭제하시겠습니까?') && this.detailQTData.splice(index, 1);
    },
    selectedDeleteItem () {
    
      if(this.selected.length > 0 )
      {
          this.selected.forEach(item =>{
             const index = this.detailQTData.indexOf(item);
             this.detailQTData.splice(index, 1);
          });
      }
    },
    close () {
      this.dialog = false
      setTimeout(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      }, 300)
    },
    addItem () {
      this.btnEditText = '추가';
      this.editedItem.seq = this.detailQTData.length + 1;
      if (this.editedIndex > -1) {
        Object.assign(this.detailQTData[this.editedIndex], this.editedItem)
      } else {
        this.detailQTData.push(this.editedItem)
      }

      this.close()
    },
    saveQTConfirm()
    {
      
      if(this.detailQTData.length === 0) return;

      var now = new Date();
      var chatTime = now.getFullYear() + datePadding(now.getMonth()+1,2) + datePadding(now.getDate(),2) 
                + datePadding(now.getHours(),2) + datePadding(now.getMinutes(), 2) + datePadding(now.getSeconds(),2);

      var checkMsg = false;
      var msg = '';

      for(var msg of this.msgDatas) {
        if(msg.msgData.msg.indexOf('차량에 대한 견적이 완료') > 0)
          checkMsg = true;
      }

      if(checkMsg === false)
        msg = ((this.qtInfo.CarNo==='*empty*')?'미상' : this.qtInfo.CarNo) + " 차량에 대한 견적이 완료됐습니다.";
      else
        msg = ((this.qtInfo.CarNo==='*empty*')?'미상' : this.qtInfo.CarNo) + " 차량에 대한 견적이 수정 후 재전송 되었습니다.";

      var id =  this.UserInfo.BsnID + this.qtInfo.ReqSite + now.getFullYear()%100 + datePadding(now.getMonth()+1,2) + datePadding(now.getDate(),2)
      + datePadding(now.getHours(),2) + datePadding(now.getMinutes(), 2) + datePadding(now.getSeconds(),2);;
      var qtMsg = {};
      qtMsg.from = {'name' : this.UserInfo.BsnID};
      qtMsg.msg  = msg;
      qtMsg.reqTm = chatTime;
      qtMsg.ChatType = "R";
      qtMsg.RefID = id;
      //this.$EventBus.$emit('send-QTConfirm' , qtMsg);

      var param = {};

                + datePadding(now.getHours(),2) + datePadding(now.getMinutes(), 2) + datePadding(now.getSeconds(),2);
      var ReqTm = now.getFullYear() + datePadding(now.getMonth()+1,2) + datePadding(now.getDate(),2) 
                        + datePadding(now.getHours(),2) + datePadding(now.getMinutes(), 2) + datePadding(now.getSeconds(),2);
      param.operation = "create";
      param.tableName = "BAY4U_QT_RETURN_LIST";
      param.payload = {};
      param.payload.Item = {};
      param.payload.Item.ID = id;
      param.payload.Item.DocID = this.qtInfo.ID;  //docId
      param.payload.Item.CarNo = this.qtInfo.CarNo;
      param.payload.Item.ResDealer = this.UserInfo.BsnID;
      param.payload.Item.ReqSite = this.qtInfo.ReqSite;
      param.payload.Item.LineItem = convertArrayToDynamo(JSON.stringify(this.detailQTData));
      param.payload.Item.ReqDt = now.getFullYear() + "-" + datePadding(now.getMonth()+1,2) + "-" + datePadding(now.getDate(),2);
      param.payload.Item.ReqTm = ReqTm;
      param.payload.Item.ResDealerNm = this.UserInfo.Name;
              
      console.log("======= QT Return Save Request ========");
      console.log(JSON.stringify(param));

      axios({
          method: 'POST',
          url: Constant.LAMBDA_URL,
          headers: Constant.JSON_HEADER,
          data: param
      })
      .then((result) => {
        console.log("======= QT Return Save result ========");
        console.log(result.data);
        this.txtQTConfirm = "견적 재회신";

        console.log("======= Check QT ========");
        console.log(JSON.stringify(this.qtInfo));

        param.operation = "update";
        param.tableName = "BAY4U_QT_LIST";
        param.payload = {};
        param.payload.Key = {};
        param.payload.Key.ID = this.qtInfo.ID;
        if(this.qtInfo.CarSeries === undefined || this.qtInfo.CarSeries === '') {
          param.payload.UpdateExpression = "Set CarBrand = :b";
          param.payload.ExpressionAttributeValues = {
                ":b" : this.qtInfo.CarBrand
          };
        }
        else {
          param.payload.UpdateExpression = "Set CarBrand = :b, CarSeries = :s";
          param.payload.ExpressionAttributeValues = {
                ":b" : this.qtInfo.CarBrand,
                ":s" : this.qtInfo.CarSeries
          };
        }
                
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
          this.$EventBus.$emit('send-QTConfirm' , qtMsg)
        })
        .catch((error) => {
          console.log(error);
        });


      })
      .catch((error) => {
        console.log(error);
      });

    
    },
    getQTConfirm()
    {
      this.detailQTData = [];

      var param = {};
      param.operation = "list";
      param.tableName = "BAY4U_QT_RETURN_LIST";
      param.payload = {};
      param.payload.FilterExpression = "DocID = :id";
      param.payload.ExpressionAttributeValues = {};
      var key = ":id";

      param.payload.ExpressionAttributeValues[key] = this.qtInfo.ID;

      axios({
        method: 'POST',
        url: Constant.LAMBDA_URL,
        headers: Constant.JSON_HEADER,
        data: param
      })
      .then((result) => {
        console.log("======= QT Confirm result========");
        console.log( result.data);

        if(result.data.Items.length > 0){
          this.txtQTConfirm = "견적 재회신";
          this.GetOrderHistory();
          this.detailQTData = JSON.parse(convertDynamoToArrayString(result.data.Items[0].LineItem));
        }
        else{
          this.txtQTConfirm = "견적확정 회신";
        }
         
      });
    },
    clipImageAdd() { 
      var clipImage = document.getElementById('clipImageBtn').value;
      this.$EventBus.$emit('paste-Image' , clipImage);      
    },
    clipboardAdd() {
      console.log("======= clipboardAdd ========");
      var clipText = document.getElementById('clipboardBtn').value;

      var copyData = clipText.split(/\r\n|\r|\n/);
      console.log('copyData : ', copyData);

      if(copyData[0].indexOf('차종	부품명	애프터번호') > -1) { // 해당 문구가 있다면 대신 화면에서 카피한 케이스
        var idx = -1;
        var itemIdx = 1;
        var newItem = {};
        this.detailQTData = [];

        for(var item of copyData ){
          if(item === '삭제 '){
            idx = 0;
          }

          if(idx >= 0) {

            if(idx === 1) {
              var itemElem = item.split('	');
              newItem.itemCode = itemElem[0];
              newItem.itemBrand = itemElem[1];
            }
            if(idx === 2) {
              newItem.carBrand = item;
              if(this.carBrand.includes(item))
                this.qtInfo.CarBrand = item;
            }
            if(idx === 3) {
              newItem.itemName = item;
            }
            if(idx === 4) {
              if(isNaN(item) === false && item.length <= 2) {idx++;} // 애프터 품번 자리에 2자리 이하의 숫자가 들어갔다면 애프터는 비워지고 숫자가 들어온 케이스 임.
              else newItem.memo = "애프터품번 : " + item;
            }
            if(idx === 5) {
              newItem.itemQty = item.replace(',','');
            }
            if(idx === 6) {
              newItem.itemPrice = item.replace(',','');
            }
            if(idx === 7) {
              newItem.AMT = item.replace(',','');
            }

            if(item === '[수정]'){
              newItem.seq = itemIdx++;
              this.detailQTData.push(newItem);
              console.log('detailQTData : ', this.detailQTData);
              newItem = {};
            }

            idx++;
          }
        }
      }
      else if(copyData[0].indexOf('품목명[규격]	센터가(VAT별도)') > -1) { // 해당 문구가 있다면 대신 화면에서 카피한 케이스
        var idx = 0;

        for (var i = 1; i < copyData.length; i++) {
          var val = copyData[i].split('	');

          if(val.length > 1) {
            var newItem = {};
            newItem.seq = idx++;
            newItem.itemCode = val[0];
            var nameParse = [];
            
            for(var substr1 of val[1].split('[')){
              for(var substr2 of substr1.split(']')){
                if(substr2 !== '')
                  nameParse.push(substr2);
              }
            }
            if(nameParse.length > 1) {
              newItem.itemName = val[1];
              newItem.itemBrand = nameParse[nameParse.length-1];
              //var checkStr = "[" + newItem.itemBrand + "]";
              //newItem.itemName = val[1].replace("/" + checkStr + "/g", "");
            }
            else {
              newItem.itemName = val[1];
            }
            newItem.itemQty = val[3].replace(',','');
            newItem.itemPrice = val[4].replace(',','');
            newItem.AMT = val[5].replace(',','');
            newItem.memo = '센터가 : ' + val[2];
    
            this.detailQTData.push(newItem);       
          }   
        }      
      }
      /*
      else {  // 아니면 엑셀에서 카피한 케이스
        var idx = 0;

        for(var item of copyData ){
          var newItem = {};
          newItem.seq = idx++;
          var val = item.split('	');
          newItem.itemCode = val[0];
          newItem.itemBrand =  val[1];
          newItem.carBrand =  val[2];
          newItem.itemName =  val[3];
          newItem.afterNo =  val[4];
          newItem.itemQty =  val[5].replace(',','');
          newItem.itemPrice =  val[6].replace(',','');
          newItem.AMT =  val[7].replace(',','');
          newItem.memo =  val[8];
  
          this.detailQTData.push(newItem);
        }
      }*/
    },
    GetOrderHistory()
    {
      this.orderHistory = [];
      var param = {};
      param.operation = "list";
      param.tableName = "BAY4U_ORDER_LIST";
      param.payload = {};
      param.payload.FilterExpression = "DocID = :id";
      param.payload.ExpressionAttributeValues = {};
      var key = ":id";
      param.payload.ExpressionAttributeValues[key] = this.qtInfo.ID;
     
      console.log("======= 주문내역 조회 Request result ========");
      console.log(param); 

      axios({
        method: 'POST',
        url: Constant.LAMBDA_URL,
        headers: Constant.JSON_HEADER,
        data: param
      })
      .then((result) => {
        if(result.data.Items.length > 0 && result.data.Items[0].LineItem.length > 0 ){
          console.log("=======주문내역 조회 result ========");
          console.log( result.data.Items[0].LineItem);
          this.tabIndex = 2;
          this.orderHistory  = JSON.parse(convertDynamoToArrayString(result.data.Items[0].LineItem));
        }
        else{
           this.tabIndex = 1 ;
        }
      });  
      
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
    msgDatas: {
        get() { return this.$store.getters.msgDatas },
        set(value) { this.$store.dispatch('UpdateMsgData',value) }
    },        
      total: function() {
        let sum = 0;
        this.detailQTData.forEach(function(item) {
          sum += (parseFloat(item.AMT));
        });
        return sum;
      },
      total2: function()
      {
        let sum = 0;
        this.orderHistory.forEach(function(item) {
          sum += (parseFloat(item.AMT));
        });
        return sum;
      }
      
  },

  created: function(){

    this.$EventBus.$on('click-qtInfo', qtItem => {   
        this.qtInfo = qtItem;
        this.SetQtInfo();
        this.GetSiteInfo();
        if(this.UserInfo.UserType !== 'DEALER'){
          this.getQTConfirm();
        }
    });

    this.$EventBus.$on('init-qtInfo', chatItem => {   
        this.qtInfo = [];
        this.SetQtInfo();
        this.siteInfo = [];
        this.showSiteInfo = false;
    });

    this.$EventBus.$on('click-showImage', img => {   
        this.itemImage = img;
        this.showQTImageFlag = true;
    });    

    //document.getElementById('InfoPage').addEventListener('paste', handlePaste, true);
    //console.log('event..........', );

    document.addEventListener('paste', function (event) {
      var clipText = event.clipboardData.getData('Text');
      var clipItem = event.clipboardData.items;

      if(clipText.length > 0) {
        console.log('clipText : ', clipText);
        document.getElementById('clipboardBtn').value = clipText;
        document.getElementById('clipboardBtn').click();
      }
      else {
        for (var i = 0; i < clipItem.length; i++) {
          console.log('clipItem : ', clipItem[i]);

          if (clipItem[i].type.indexOf("image") == -1) continue;

          var blob = clipItem[i].getAsFile();
          console.log('blob : ', blob);

          var reader = new FileReader();
          reader.onload = function(event){
            document.getElementById('clipImageBtn').value = event.target.result;
            document.getElementById('clipImageBtn').click();            
          }; 
          var source = reader.readAsDataURL(blob);
        }
      }
      
    });
  },
  mounted: function()
  {
    if(this.qtInfo.length === 0)
    {
        var btnAdd =  document.querySelector('#btnItmAdd');
        btnAdd.setAttribute("disabled", "true");
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
.card {
  margin-top: 10px;
  margin-right: 10px;
}
.card-body {
  padding: 10px;
}
.v-application{
  width: 100%;
  height: 100%;
}
.InfoPage {
 height: 90%;
}

.UserInfo-contents {
  display: flex;
}

.UserInfo-img {
  flex: 25%;
  margin:auto;
  width: 90%;
  text-align: center;
}

.UserInfo-info {
  flex: 75%;
  padding: 10px;
}

.UserInfo-info .info-name {
  font-weight: bold;
  font-size: 1.8rem;
  color: #455a63;
  text-align: center; 
  padding-left: 10px;
  padding-right: 30px;
}
.UserInfo-info .info-tel {
  margin-top: 5px;
  font-weight: bold;
  font-size: 1.1rem;
  color: #5d4038;
}
.UserInfo-info .info-addr {
  margin-top: 5px;
  font-size: 0.9rem;
}

.QT-Info {
  display:flex;
  flex-direction: row;
}
.QT-Title {
  font-weight: bold;
  color: #5d4038;
  margin-right: 5px;
  margin-bottom: 5px;
  width: 72px;
}
.QT-Content {
  flex: auto;
  font-size: 0.8rem;
}
.QT-ContentSts{
  flex: auto;
  font-size: 1rem;
  color:#008080;
  font-weight: bold;
}
.QTReq-List {
  font-weight: bold;
  color: #5d4038;
  height: calc(100vh - 560px);
}
.QTReq-Table {
  width: 100%;
  display: block;
  overflow-y: scroll;
  height: 400px;
  height: calc(100vh - 580px);
}
.QTReq-Memo {
  font-weight: bold;
  color: #5d4038;
  margin-top: 10px;
}

.QTRes-List {
  display: flex;
}
.QTRes-List .QTRes-Title {
  font-weight: bold;
  color: #5d4038;
  text-align: left;
  flex: 20%;
}
.QTRes-List .QTRes-Button {
  text-align: right;
  flex: 80%;
  margin-bottom: 10px;
}
.QTRes-ButtonAdd {
  font-weight: bold;
  color: #ff9999;
}
.QTRes-ButtonAdd:hover {
  color: #fff;
}
.QTRes-Table {
  width: 100%;
} 
.QTRes-Table th, tr {
  font-size: 0.8rem;
} 

.QTItem-Brand{
  font-weight: bold;
  color: #967d5f;
}
.QTItem-Title{
  width: 70%;
  font-weight: bold;
  color: #967d5f;
}
.QTItem-Qty{
  width: 15%;
  font-weight: bold;
  color: #967d5f;
}
.QTItem-String{
  width: 5%;
  font-weight: bold;
  color: #967d5f;
  text-align: center;
}

.QT-Detail {
  height: calc(100vh - 385px);
}

.QTRes-footer{
  padding: 0.5rem 1rem;
  font-size: 1.25rem;
  line-height: 1.5;
  border-radius: 0.3rem;
    display: flex;
  justify-content: flex-end;
}
.QTRes-footer .TotalInfo{
  margin-right: -1px;
}
.QTRes-footer .TotalInfo-Title{
    align-items: center;
    padding: 0.375rem 0.75rem;
    margin-bottom: 0;
    font-size: 1rem;
    font-weight: 400;
    color: #5d4038;
    text-align: center;
    white-space: nowrap;
    border-radius: 0.25rem;
}
.QTRes-footer .TotalInfo-Text{
     -webkit-box-align: center;
    align-items: center;
    padding: 0.375rem 0.75rem;
    margin-bottom: 0;
    font-size: 1.1rem;
    font-weight: 400;
    color: #E50914;
    text-align: center;
    white-space: nowrap;
    border-radius: 0.25rem;
}
.qt-icon{
  color:#5d4038;  
  margin-right: 0.2rem;
}
.card .itemNm{
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  width: 145px;
}
.header-item
{
  font-size: 0.9rem;
  font-weight: bold;
  color: #967d5f;
  width: 100px;
}
/*
.mytable {
 
     border: #ff9999 solid 2px;
}*/

.header-item2
{
  font-size: 0.8rem;
  font-weight: bold;
  color: #967d5f;
  padding: 0;
 
}
.item-itemName
{
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  width: 200px;
  font-size: 0.8rem;
}
.item-delv
{
  width: 55px;
  font-size: 0.8rem;
}
.item-itemcode
{
   font-size: 0.8rem;
   font-weight: bold;
   width: 120px;

}
.item-numeric  {
  width: 55px;
  font-size: 0.8rem;
  text-align: right;
  float:right;
}
.item-numeric-qty  {
  width: 35px;
  font-size: 0.8rem;
  text-align: right;
  float:right;
}
td.text-center{
  font-size: 1.2em;
  padding:0;
}
</style>
