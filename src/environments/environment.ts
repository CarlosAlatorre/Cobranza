// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `angular-cli.json`.

export const environment = {
    production: false,
    firebase: {
        //PRUEBAS

        apiKey: "AIzaSyC6YLTADHcTs37v7hatVVxObJkGXx8HKC4",
        authDomain: "cobranza-pruebas.firebaseapp.com",
        databaseURL: "https://cobranza-pruebas.firebaseio.com",
        projectId: "cobranza-pruebas",
        storageBucket: "cobranza-pruebas.appspot.com",
        messagingSenderId: "983930671584"

        //PRODUCCION
        // apiKey: "AIzaSyDDP9kaYL9try8p2r0aKcyrofHS53BvEJw",
        // authDomain: "cobranza-f8e23.firebaseapp.com",
        // databaseURL: "https://cobranza-f8e23.firebaseio.com",
        // projectId: "cobranza-f8e23",
        // storageBucket: "cobranza-f8e23.appspot.com",
        // messagingSenderId: "964373370693"
    }
};
