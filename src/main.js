import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import PrimeVue from "primevue/config";
import Password from "primevue/password";
import Button from "primevue/button";
import Toast from "primevue/toast";
import ToastService from "primevue/toastservice";
import InputText from "primevue/inputtext";
import Avatar from "primevue/avatar";
import Sidebar from "primevue/sidebar";
import Dropdown from "primevue/dropdown";
import Paginator from "primevue/paginator";
import RadioButton from 'primevue/radiobutton';
import DialogService from 'primevue/dialogservice';
import DynamicDialog from 'primevue/dynamicdialog';



import "primevue/resources/themes/saga-blue/theme.css";
import "./assets/modified-prime.css";
import "primevue/resources/primevue.min.css";
import "primeicons/primeicons.css";
import "/node_modules/primeflex/primeflex.css";
const app = createApp(App);
app.use(store);
app.use(PrimeVue);
app.use(router);
app.use(ToastService);
app.use(DialogService);
app.use({
  install: (app, options) => {
    console.log("Plugin", app.config);
    console.log(options);
    /*  our code for the plugin goes here
              app is the result of createApp()
              options is user options passed in
          */
  },
});
app.component("PrimePassword", Password);
app.component("PrimeInputText", InputText);
app.component("PrimeButton", Button);
app.component("PrimeToast", Toast);
app.component("PrimeAvatar", Avatar);
app.component("PrimeSidebar", Sidebar);
app.component("PrimeDropdown", Dropdown);
app.component("PrimePaginator", Paginator);
app.component("PrimeRadioButton", RadioButton);
app.component("PrimeDynamicDialog", DynamicDialog);
app.config.compilerOptions.isCustomElement = (tag) => {
  return tag.startsWith("prime-"); // (return true)
};
app.mount("#app");
String.prototype.toHHMMSS = function () {
  var sec_num = parseInt(this, 10); // don't forget the second param
  var hours = Math.floor(sec_num / 3600);
  var minutes = Math.floor((sec_num - hours * 3600) / 60);
  var seconds = sec_num - hours * 3600 - minutes * 60;

  if (hours < 10) {
    hours = "0" + hours;
  }
  if (minutes < 10) {
    minutes = "0" + minutes;
  }
  if (seconds < 10) {
    seconds = "0" + seconds;
  }
  return (hours>0?(hours + ":"):'') + minutes + ":" + seconds;
};

console.log("init", app);
export default app.config.globalProperties;
