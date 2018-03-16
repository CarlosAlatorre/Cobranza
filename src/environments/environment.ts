// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `angular-cli.json`.

export const environment = {
  production: false,
    firebase: {
        apiKey: "AIzaSyC6YLTADHcTs37v7hatVVxObJkGXx8HKC4",
        authDomain: "cobranza-pruebas.firebaseapp.com",
        databaseURL: "https://cobranza-pruebas.firebaseio.com",
        projectId: "cobranza-pruebas",
        storageBucket: "cobranza-pruebas.appspot.com",
        messagingSenderId: "983930671584"
    }
};
