import React from 'react';
import { StyleSheet, View, Text, Dimensions } from 'react-native';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from '@apollo/react-hooks';
import FlightsSlider from './components/FlightsSlider';
import { useState } from 'react';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import _ from 'lodash';
import FlightModal from './components/FlightModal';

const client = new ApolloClient({
	uri: 'http://localhost:4000/graphql'
});

const LAUNCH_QUERY = gql`
	query LaunchesQuery($flightNumberSelected: Int) {
		launch(flight_number: $flightNumberSelected) {
			flight_number
			launch_success
			launch_year
			links {
				mission_patch
			}
			mission_name
			rocket {
				rocket_name
				rocket_type
			}
			upcoming
		}
	}
`;

function LaunchView({ flightNumberSelected, visible, setModalVisible }) {
	const { loading, error, data } = useQuery(LAUNCH_QUERY, {
		variables: { flightNumberSelected },
		skip: !flightNumberSelected
	});
	// if (!loading && !error && data) {
	// 	const launch = data.launch;
	// 	const launchNumber = _.get(launch, 'flight_number');
	// 	const launchName = _.get(launch, 'mission_name');
	// 	const launchPatch = _.get(launch, 'links.mission_patch');

	// 	return (
	// 		// <View style={styles.launchContainer}>
	// 		// 	<Text style={styles.title}>{launchName}</Text>
	// 		// </View>

	// 	);
	// }
	if (error) return <Text>Error :( {error.message}</Text>;
	// if (!flightNumberSelected) return null;
	return (
		<FlightModal
			flightData={_.get(data, 'launch')}
			visible={visible}
			setModalVisible={setModalVisible}
			isLoading={loading}
		></FlightModal>
	);
}

export default function App() {
	const [flightNumberSelected, setFlightNumberSelected] = useState(null);
	const [modalVisible, setModalVisible] = useState(false);

	return (
		<ApolloProvider client={client}>
			<View style={{ marginTop: 100 }} />
			<View style={styles.container}>
				<Text style={styles.title}>Flights</Text>
				<FlightsSlider
					selectFlight={flightNumber => {
						setFlightNumberSelected(flightNumber);
						setModalVisible(true);
					}}
				/>
				<LaunchView
					flightNumberSelected={flightNumberSelected}
					visible={modalVisible}
					setModalVisible={setModalVisible}
				/>
			</View>
		</ApolloProvider>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff'
	},
	title: {
		color: '#121212',
		fontSize: 40,
		fontFamily: 'Arial',
		fontWeight: '600',
		paddingLeft: 25
	},
	launchContainer: {
		width: Dimensions.get('window').width,
		height: 100
	}
});
