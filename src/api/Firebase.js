import firebase from 'firebase/app';
import 'firebase/firestore';
import configuration from '../config/configuration';

export class Firebase {

    constructor() {
        // Init Firebase configuration
        let fbConfig = {
            apiKey: configuration.apiKeyFirebase,
            authDomain: configuration.authDomainFirebase,
            databaseURL: configuration.databaseURLFirebase,
            storageBucket: configuration.storageBucketFirebase,
            messagingSenderId: configuration.messagingSenderIdFirebase,
            projectId: configuration.projectIdFirebase
        };
        // Init Firebase
        firebase.initializeApp(fbConfig);
        this.db = firebase.firestore();
    }
}