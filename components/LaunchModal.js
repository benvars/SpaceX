import React from 'react';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';
import { View, Text } from 'react-native';
import _ from 'lodash';

const LAUNCHES_QUERY = gql`
	query LaunchesQuery {
		launches {
			flight_number
			mission_name
			launch_success
		}
	}
`;

export default function LaunchModal() {
	const { loading, error, data } = useQuery(LAUNCHES_QUERY);

	let launchNames;
	if (error) {
		launchNames = 'ERROR';
	} else if (loading) {
		launchNames = 'LOADING';
	} else {
		launchNames = _.map(
			data.launches,
			launch => launch.mission_name
		).join();
	}

	return (
		<View>
			<Text>{launchNames}</Text>
		</View>
	);
}
