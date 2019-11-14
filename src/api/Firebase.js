import firebase from 'firebase/app';
import 'firebase/firestore';
import configuration from '../config/configuration';

// Init Firebase
firebase.initializeApp({
    apiKey: configuration.apiKeyFirebase,
    authDomain: configuration.authDomainFirebase,
    databaseURL: configuration.databaseURLFirebase,
    projectId: configuration.projectIdFirebase
});

export const db = firebase.firestore();
export function cats() { return db.collection('cats') }
export function votes() { return db.collection('votes') }