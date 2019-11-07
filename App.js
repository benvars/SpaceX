import React from 'react';
import { StyleSheet, View, Text, Dimensions } from 'react-native';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from '@apollo/react-hooks';
import FlightsSlider from './components/FlightsSlider';
import { useState } from 'react';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import _ from 'lodash';

const client = new ApolloClient({
	uri: 'http://localhost:4000/graphql'
});

const LAUNCH_QUERY = flightNumber => gql`
	query LaunchesQuery {
		launch(flight_number: ${flightNumber}) {
			flight_number
			mission_name
			launch_success
			links {
				mission_patch
			}
		}
	}
`;

function LaunchView({ flightNumberSelected }) {
	const { loading, error, data } = useQuery(
		LAUNCH_QUERY(flightNumberSelected)
	);
	if (!loading && !error && data) {
		const launch = data.launch;
		const launchNumber = _.get(launch, 'flight_number');
		const launchName = _.get(launch, 'mission_name');
		const launchPatch = _.get(launch, 'links.mission_patch');

		return (
			<View style={styles.launchContainer}>
				<Text style={styles.title}>{launchName}</Text>
			</View>
		);
	}
	return <View></View>;
}

export default function App() {
	const [flightNumberSelected, setFlightNumberSelected] = useState(null);

	return (
		<ApolloProvider client={client}>
			<View style={{ marginTop: 100 }} />
			<View style={styles.container}>
				<Text style={styles.title}>Flights</Text>
				<FlightsSlider selectFlight={setFlightNumberSelected} />
				<LaunchView flightNumberSelected={flightNumberSelected} />
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
