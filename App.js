import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from '@apollo/react-hooks';
import FlightsSlider from './components/FlightsSlider';

const client = new ApolloClient({
	uri: 'http://localhost:4000/graphql'
});

export default function App() {
	state = {
		flightSelected: null
	};

	selectFlight = flightNumber => {
		this.setState({ flightSelected: flightNumber });
	};

	return (
		<ApolloProvider client={client}>
			<View style={styles.container}>
				<Text style={styles.title}>Flights</Text>
				{this.state.flightSelected === null ? (
					<FlightsSlider selectFlight={this.selectFlight} />
				) : null}
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
		paddingLeft: 25,
		marginTop: 100
	}
});
