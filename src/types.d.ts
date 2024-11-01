declare module "@capacitor/preferences";
declare module "vuex";
declare module "@stripe/stripe-js";
declare module '*.vue' {
    import { DefineComponent } from 'vue';
    const component: DefineComponent<{}, {}, any>;
    export default component;
}  