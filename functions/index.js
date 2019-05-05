const functions = require('firebase-functions');
const admin = require('firebase-admin');

var serviceAccount = require('./serviceAccountKey.json');
admin.initializeApp({
	credential: admin.credential.cert(serviceAccount),
	databaseURL: 'https://denma-4e0e4.firebaseio.com',
});

// import routes
const contactUs = require('./contact-us');

//export routes to prod.
exports.contactUs = functions.https.onRequest(contactUs);

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });
