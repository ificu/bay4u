import Vue from 'vue'

Vue.filter('localeNum', function(value) {
    if (!value) return ''
    return value.toLocaleString()
})