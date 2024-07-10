/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useState } from 'react';
import {
	FlatList,
	Pressable,
	SafeAreaView,
	ScrollView,
	StatusBar,
	StyleSheet,
	Text,
	TouchableOpacity,
	View
} from 'react-native';
import { RealmProvider, useRealm } from './RealmProvider';
import { Notes, createNotes, deleteDraft } from './Notes';

const App = () => {
	const realm = useRealm();
	const [notes, setNotes] = useState(realm.objects(Notes));

	return (
		<SafeAreaView>
			<StatusBar />
			<View style={styles.scrollViewContainer} contentInsetAdjustmentBehavior="automatic">
				<View style={styles.outerContainer}>
					<Text style={styles.header}>{'Test Realm DB - Notes Creation Sample App'}</Text>

					<View style={{ margin: 16 }}>
						<TouchableOpacity
							onPress={() => {
								id = new Realm.BSON.ObjectId();
								createNotes(realm, id, 'Test - ' + id);
								setNotes(realm.objects(Notes));
							}}
						>
							<Text style={styles.button}>{'Insert Sample Notes'}</Text>
						</TouchableOpacity>
					</View>

					<View style={{ margin: 16 }}>
						<TouchableOpacity
							onPress={() => {
								if (notes && notes.length > 0) {
									deleteDraft(realm, notes[0]);
									setNotes(realm.objects(Notes));
								}
							}}
						>
							<Text style={styles.button}>{'Delete Sample Notes'}</Text>
						</TouchableOpacity>
					</View>

					<View style={{ flex: 1 }}>
						<FlatList
							data={notes}
							renderItem={({ item }) => {
								return (
									<View>
										<Text style={styles.item}>{item.notes}</Text>
									</View>
								);
							}}
							ListHeaderComponent={() => {
								return <Text style={{ fontSize: 16, fontWeight: 'bold', textAlign: 'center' }}>{'Items in DB'}</Text>;
							}}
							ListEmptyComponent={() => {
								return <Text style={{ fontSize: 16, marginTop: 10, textAlign: 'center' }}>{'No items'}</Text>;
							}}
							contentContainerStyle={{ flexGrow: 1 }}
						></FlatList>
					</View>
				</View>
			</View>
		</SafeAreaView>
	);
};

export const AppWrapper = () => {
	return (
		<RealmProvider>
			<App />
		</RealmProvider>
	);
};

const styles = StyleSheet.create({
	scrollViewContainer: {
		flexGrow: 1,
		justifyContent: 'center',
		alignItems: 'center',
		alignContent: 'center'
	},
	outerContainer: {
		alignContent: 'center',
		alignItems: 'center'
	},
	header: { fontSize: 20, fontWeight: 'bold', width: 300, textAlign: 'center' },
	button: {
		borderRadius: 10,
		backgroundColor: '#331111',
		justifyContent: 'center',
		padding: 20,
		shadowRadius: 1,
		shadowOffset: { width: 1, height: 1 },
		shadowColor: 'grey',
		color: 'white',
		textAlign: 'center'
	},
	item: { widht: 100, backgroundColor: 'lightgrey', padding: 10, margin: 5, height: 40 }
});
