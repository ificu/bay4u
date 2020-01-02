import Vue from 'vue'

Vue.filter('localeNum', function(value) {
    if (!value) return ''
    return parseFloat(value).toLocaleString();
    //return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
})