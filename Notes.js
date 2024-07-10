import { Realm } from '@realm/react';
import { useRealm } from '../RealmProvider';
 
export const SCHEMA_NOTES = 'Notes';
/**
 * Defines Structure for the Message Draft.
 *
 */
export class Notes extends Realm.Object {
	static schema = {
		name: SCHEMA_NOTES,
		properties: {
			_id: 'objectId',
			notes: 'string'
		},
		primaryKey: '_id'
	};
}

export const createNotes = (realm, id, data) => {
	console.log('id = ' + id);
	realm.write(() => {
		realm.create(
			SCHEMA_NOTES,
			{
				_id: id,
				notes: data
			},
			'modified'
		);
	});
};


export const deleteDraft = (realm, note) => {
	realm.write(() => {
		realm.delete(note);
	});
};
