import Vue from 'vue'

Vue.filter('localeNum', function(value) {
    if (!value) return ''
    return parseFloat(value).toLocaleString()
})