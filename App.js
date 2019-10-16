import React from 'react';
import { StyleSheet, View } from 'react-native';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from '@apollo/react-hooks';
import LaunchModal from './components/LaunchModal';

const client = new ApolloClient({
	uri: 'http://localhost:4000/graphql'
});

export default function App() {
	return (
		<ApolloProvider client={client}>
			<View style={styles.container}>
				<LaunchModal />
			</View>
		</ApolloProvider>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'center'
	}
});
