import React, { useState } from 'react';
import {
	Modal,
	Text,
	TouchableHighlight,
	View,
	StyleSheet,
	Dimensions
} from 'react-native';
import _ from 'lodash';

function ModalTile({ title, renderBody, renderFooter }) {
	return (
		<View style={styles.modalTileContainer}>
			<Text style={styles.modalTileTitle}>{title}</Text>
			{renderBody}
		</View>
	);
}

export default function FlightModal({
	flightData,
	visible,
	setModalVisible,
	isLoading
}) {
	console.log(flightData);
	let modalInner;
	if (isLoading) {
		modalInner = <Text>yo</Text>;
	} else {
		modalInner = (
			<View style={styles.contentContainer}>
				<Text style={styles.modalTitle}>
					{_.get(flightData, 'mission_name')}
				</Text>
				<TouchableHighlight
					onPress={() => {
						setModalVisible(false);
					}}
				>
					<Text>Hide Modal</Text>
				</TouchableHighlight>
				<ModalTile
					title="Launch Year"
					renderBody={
						<Text style={styles.modalTileBodyText}>
							{_.get(flightData, 'launch_year')}
						</Text>
					}
				></ModalTile>
				<ModalTile
					title="Launch Success"
					renderBody={
						<Text>
							{_.get(flightData, 'launch_success')
								? 'TRUE'
								: 'FALSE'}
						</Text>
					}
				></ModalTile>
				<ModalTile
					title="Rocket Name"
					renderBody={
						<Text>{_.get(flightData, 'rocket.rocket_name')}</Text>
					}
				></ModalTile>
				<ModalTile
					title="Rocket Type"
					renderBody={
						<Text>{_.get(flightData, 'rocket.rocket_type')}</Text>
					}
				></ModalTile>
			</View>
		);
	}
	return (
		<Modal
			animationType="slide"
			transparent={true}
			visible={visible}
			style={{
				backgroundColor: 'blue'
			}}
		>
			{modalInner}
		</Modal>
	);
}

const styles = StyleSheet.create({
	modalTitle: {
		color: 'white',
		fontSize: 40,
		fontFamily: 'Arial',
		fontWeight: '600',
		padding: 25
	},
	contentContainer: {
		marginTop: 200,
		height: Dimensions.get('window').height - 200,
		width: Dimensions.get('window').width,
		position: 'absolute',
		backgroundColor: '#121212',
		borderTopLeftRadius: 25,
		borderTopRightRadius: 25,
		flexWrap: 'wrap',
		flexDirection: 'row'
	},
	modalTileTitle: {
		color: 'rgba(0,0,0,0.87)',
		fontSize: 16,
		fontFamily: 'Arial',
		fontWeight: '600',
		padding: 10
	},
	modalTileContainer: {
		width: Dimensions.get('window').width / 2 - 20,
		borderRadius: 10,
		backgroundColor: 'white',
		margin: 10
	},
	modalTileBody: {
		alignItems: 'center'
	},
	modalTileBodyText: {
		color: 'rgba(0,0,0,0.87)',
		fontSize: 60,
		fontFamily: 'Arial',
		fontWeight: '900'
	}
});
