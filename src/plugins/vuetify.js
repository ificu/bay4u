import '@mdi/font/css/materialdesignicons.css'
import Vue from 'vue';
import Vuetify from 'vuetify/lib';
import 'vuetify/dist/vuetify.min.css'
import colors from 'vuetify/lib/util/colors'

Vue.use(Vuetify);

export default new Vuetify({
  icons: {
    iconfont: 'mdi',
  },
  theme: {
    themes: {
      light: {
        primary: colors.brown.darken3, // #4E342E
        secondary: colors.amber.lighten2, // #FFD54F
        accent: colors.pink.lighten4, // #3F51B5
        error: colors.red.base, // #F44336
        warning: colors.yellow.lighten4, // #3F51B5
        success: colors.teal.lighten3, // #3F51B5
      },
    },
  },
});
