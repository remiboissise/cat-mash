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
// export function cats() { return db.collection('cats') }
export function cats() {
    try {
        return db.collection('cats')
    }catch(e) {
        console.log('lallalalzdaldz');
    } 
}
export function votes() {
    return db.collection('votes').get().catch((error) => {
        throw new Error('Vous ne pouvez plus voter aujourd\'hui !');
    })
}