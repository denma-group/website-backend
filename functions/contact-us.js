const admin = require('firebase-admin');
const functions = require('firebase-functions');
const uuidv1 = require('uuid/v1');
const SENDGRID_KEY = functions.config().sendgrid.key;
const sgMail = require('@sendgrid/mail');

sgMail.setApiKey(SENDGRID_KEY);
let db = admin.database();
let ref = db.ref('users');

module.exports = async (req, res) => {
	switch (req.method) {
		case 'GET': {
			return;
		}
		case 'POST': {
			let id = uuidv1();
			let usersRef = ref.child(id);
			const { fullName, email, location, message } = req.body;
			// TODO: change data when front end is ready to make the call.
			try {
				await usersRef.set({
					uid: id,
					full_name: 'Jorge Baralt',
					email: 'jorgebaraltq@gmail.com',
					message: 'Message goes here',
					location: 'USA',
					subscription: false,
					email_confirmed: false,
				});
				const msg = {
					to: 'jorgebaraltq@gmail.com',
					from: 'denma.group@gmail.com',
					subject: 'Welcome to Denma',
					templateId: 'd-dc3d989e708446dd84b6a828bab8fa5c',
					html: ' ',
					substitutionWrappers: ['{{', '}}'],
					substitutions: {
						name: 'Jorge',
					},
				};
				await sgMail.send(msg);
			} catch (e) {
				console.log(e);
				return res.status(500).send({ error: 'Something went wrong.' });
			}
			return res.send({ success: 'Email has been sent' });
		}
		case 'PUT': {
			return;
		}
		case 'DELETE': {
			return;
		}
		default:
			// Only accept the requests above
			return res.status(500).json({
				message: 'Not allowed',
			});
	}
};
