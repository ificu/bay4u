<template lang="html">
  <transition name="maintenanceMaster">
    <div class="modal-mask" @keyup.esc="$emit('close')">
      <div class="modal-wrapper">
        <div class="modal-container">
          <div class="modal-header">
            <slot name="header">
              <!--  -->
            </slot>
          </div>

          <div class="modal-body">
            <b-table striped hover small
            id="maintenance-table"
            :items="items"
            :per-page="perPage"
            :current-page="currentPage"
            :head-variant="headVariant"
            class="maintenance-table"
            ></b-table>
            <b-pagination
              v-model="currentPage"
              :total-rows="rows"
              :per-page="perPage"
              aria-controls="maintenance-table"
              align="center"
              size="sm"
            >
              <span slot="page" slot-scope="{ page, active }">
                <b v-if="active">{{ page }}</b>
                <i v-else>{{ page }}</i>
              </span>
            </b-pagination>
          </div>

          <div class="modal-input">
            <div class="modalInput-title">
              공임 수정
            </div>
            <div class="modalInput-dropbox">
              <b-dropdown class="modalInput-dropbox1" v-bind:text="maintenanceL1" size="sm">
                <b-dropdown-item @click="maintenanceL1='에어컨/히터'">에어컨/히터</b-dropdown-item>
                <b-dropdown-item @click="maintenanceL1='엔진오일'">엔진오일</b-dropdown-item>
                <b-dropdown-item @click="maintenanceL1='자동변속기'">자동변속기</b-dropdown-item>
                <b-dropdown-item @click="maintenanceL1='브레이크'">브레이크</b-dropdown-item>
                <b-dropdown-item @click="maintenanceL1='Cooling 시스템'">Cooling 시스템</b-dropdown-item>
                <b-dropdown-item @click="maintenanceL1='Exhaust 시스템'">Exhaust 시스템</b-dropdown-item>
                <b-dropdown-item @click="maintenanceL1='전기 장비'">전기 장비</b-dropdown-item>
                <b-dropdown-item @click="maintenanceL1='Steering'">Steering</b-dropdown-item>
                <b-dropdown-item @click="maintenanceL1='Suspension'">Suspension</b-dropdown-item>
              </b-dropdown>
              <b-dropdown class="modalInput-dropbox2" text="공임" size="sm">
                <b-dropdown-item>필터 교환</b-dropdown-item>
                <b-dropdown-item>컨트롤 모듈 교환</b-dropdown-item>
                <b-dropdown-item>컴프레셔 교환</b-dropdown-item>
              </b-dropdown>
            </div>
            <div class="modalInput-input">
              <b-form-input size="sm"></b-form-input>
            </div>
            <div class="modalInput-save">
              <b-button class="btn bg-dark">삭제</b-button>
              <b-button class="btn bg-dark">추가</b-button>
            </div>
          </div>

          <div class="modal-footer">
            <slot name="footer">
              <!--  -->
            </slot>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>


export default {
  name: 'MaintenanceMaster',
  data () {
    return {
      perPage: 7,
      currentPage: 1,
      headVariant: 'dark',
      maintenanceL1: '분류',
      items: [
        { 구분: '에어컨/히터', 공임: '필터 교환'},
        { 구분: '에어컨/히터', 공임: '컨트롤 모듈 교환'},
        { 구분: '에어컨/히터', 공임: '컴프레셔 교환'},
        { 구분: '에어컨/히터', 공임: '모터 교환'},
        { 구분: '엔진오일', 공임: '에어필터 교환'},
        { 구분: '엔진오일', 공임: '연료필터 교환'},
        { 구분: '엔진오일', 공임: '카본필터 교환'},
        { 구분: '자동변속기', 공임: '트랜스미션 교환'},
        { 구분: '자동변속기', 공임: '오일 쿨러 교환'},
        { 구분: '자동변속기', 공임: '펌프 교환'},
        { 구분: '브레이크', 공임: '페달 교환'},
        { 구분: '브레이크', 공임: '디스크 교환'},
        { 구분: '브레이크', 공임: '캘리퍼 교환'},
        { 구분: '브레이크', 공임: '실린더 교환'},
        { 구분: 'Cooling 시스템', 공임: '호스 교환'},
        { 구분: 'Cooling 시스템', 공임: '라디에이터 교환'},
        { 구분: 'Cooling 시스템', 공임: '워터 펌프 교환'},
        { 구분: 'Cooling 시스템', 공임: '써모스탯 교환'},
        { 구분: 'Exhaust 시스템', 공임: '파이프 교환'},
        { 구분: 'Exhaust 시스템', 공임: '가스켓 교환'},
        { 구분: '전기 장비', 공임: '헤드램프 교환'},
        { 구분: '전기 장비', 공임: '실내램프 교환'},
        { 구분: '전기 장비', 공임: '퓨즈박스 교환'},
        { 구분: '전기 장비', 공임: '배터리 교환'},
        { 구분: 'Steering', 공임: '챔버 교환'},
        { 구분: 'Steering', 공임: 'ARM 교환'},
        { 구분: 'Steering', 공임: 'Rack 교환'},
        { 구분: 'Steering', 공임: '휠 교환'},
        { 구분: 'Suspension', 공임: 'Suspension 교환'},
        { 구분: 'Suspension', 공임: 'Ball joint 교환'},
        { 구분: 'Suspension', 공임: 'Lower arm 교환'},
        { 구분: 'Suspension', 공임: 'Upper arm 교환'}
      ]
    }
  },
  computed: {
    rows() {
      return this.items.length
    }
  },
  components: {

  }
}
</script>

<style lang="css" scoped>

.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, .3);
  display: table;
  transition: opacity .3s ease;
}

.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}

.modal-container {
  width: 90%;
  margin: 0px auto;
  padding: 20px 30px;
  background-color: #fff;
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, .33);
  transition: all .3s ease;
  font-family: Helvetica, Arial, sans-serif;
}

.modal-header {
  padding: 0;
}

.modal-header h3 {
  margin-top: 0;
  font-weight: bold;
  color: #5d4038;
}

.modal-body {
  height: 300px;
  padding: 5px 0px 0px 0px;
}

.modal-input {
  border: 1px solid #bebebe;
  margin-bottom: 5px;
  border-radius: 5px;
  padding: 5px;
}
.modal-input .modalInput-title {
  font-weight: bold;
}
.modal-input .modalInput-dropbox {
  display: flex;
}
.modal-input .modalInput-dropbox .dropdown {
  padding: 3px;
}


.modal-input .modalInput-input {
  display: flex;
  justify-content: flex-end;
}
.modal-input .modalInput-input input {
  width: 80%
}

.modal-input .modalInput-save {
  display: flex;
  justify-content: flex-end;
}
.modal-input .modalInput-save .btn {
  padding: 3px;
  margin: 3px;
}
.modal-input .modalInput-save .btn:first-child {
  color: #ff9999;
}
.modal-input .modalInput-save .btn:last-child {
  color: #acd3ce;
}


.maintenance-table {
  font-size: small;
}

.modal-default-button {
  float: right;
}

.modal-enter {
  opacity: 0;
}

.modal-leave-active {
  opacity: 0;
}

.modal-footer {
  padding: 10px 0px 0px 0px;
}

.modal-enter .modal-container,
.modal-leave-active .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}

.pagination li .page-item.active .page-link {
  background-color: red;
}
</style>
