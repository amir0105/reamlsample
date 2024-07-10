import { createRealmContext } from '@realm/react';
import RNFS from 'react-native-fs';
import * as SecureStore from 'expo-secure-store';
import * as Crypto from 'expo-crypto';
import { Notes } from './Notes';

export const realmConfig = {
	schema: [Notes],
	path: RNFS.DocumentDirectoryPath + '/sample.realm',
	// encryptionKey: await SecureStore.getItemAsync('workpal_message_db_key', {}),
	// Increment the 'schemaVersion', when need to add additional fields
	// The initial schemaVersion is 1
	schemaVersion: 1
};

export const createRealmSecureContext = (config, onCreate) => {
	var storedKey = SecureStore.getItem('sample_db_key');
	let key = [];
	if (storedKey === null || storedKey === undefined) {
		//This is a fallback option in case storedKey is lost (deleted)
		//As per doc, it is mentioned that Keychain items might get invalidated if biometrics or lock password is changed.
		//In such cases, clean the existing realm db (As app would crash, if encryption key is wrong)
		RNFS.unlink(RNFS.DocumentDirectoryPath + '/sample.realm');

		var bytes = new Uint8Array(64);
		key = Crypto.getRandomValues(bytes);
		SecureStore.setItemAsync('sample_db_key', JSON.stringify(key));
	} else {
		var ret = new Uint8Array(64);
		var parsedObj = JSON.parse(storedKey);
		Object.keys(parsedObj).forEach(function (key) {
			ret[key] = parsedObj[key];
		});
		key = ret;
	}
	config.encryptionKey = key;
	return createRealmContext(config);
};

export const { RealmProvider, useRealm, useQuery, useObject } = createRealmSecureContext(realmConfig);
