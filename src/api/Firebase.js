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
export function cats() {
    try { 
        return db.collection('cats');
    } catch (error) {
        throw new Error('Vous ne pouvez plus voter aujourd\'hui !');
    }
}
export function votes() {
    try { 
        return db.collection('votes');
    } catch (error) {
        throw new Error('Vous ne pouvez plus voter aujourd\'hui !');
    }
}