import React from 'react';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';
import {
	View,
	Text,
	Image,
	StyleSheet,
	ScrollView,
	Dimensions
} from 'react-native';
import _ from 'lodash';

const LAUNCHES_QUERY = gql`
	query LaunchesQuery {
		launches {
			flight_number
			mission_name
			launch_success
			links {
				mission_patch
			}
		}
	}
`;

export default function FlightsSlider({ selectFlight }) {
	const { loading, error, data } = useQuery(LAUNCHES_QUERY);

	let note;
	if (error) {
		note = 'ERROR';
	} else if (loading) {
		note = 'LOADING';
	}

	if (note) {
		return (
			<View style={styles.container}>
				<Text style={styles.title}>note</Text>
			</View>
		);
	} else {
		return (
			<ScrollView
				scrollEventThrottle={5}
				horizontal={true}
				showsHorizontalScrollIndicator={false}
				snapToInterval={325}
				snapToAlignment={'start'}
				decelerationRate="fast"
				// style={styles.scrollContainer}
				// onScroll={this._handleScroll}
			>
				{data.launches.map(launch => {
					const launchNumber = _.get(launch, 'flight_number');
					const launchName = _.get(launch, 'mission_name');
					const launchPatch = _.get(launch, 'links.mission_patch');
					return (
						<View
							key={launchNumber}
							style={styles.container}
							onClick={() => selectFlight(launchNumber)}
						>
							<Text style={styles.title}>{launchName}</Text>
							<Image
								style={styles.patch}
								source={{ uri: `${launchPatch}` }}
							/>
						</View>
					);
				})}
			</ScrollView>
		);
	}
}

const styles = StyleSheet.create({
	scrollContainer: {
		width: Dimensions.get('window').width
	},
	container: {
		backgroundColor: '#121212',
		height: 250,
		width: 275,
		borderRadius: 25,
		margin: 25
	},
	title: {
		color: 'rgba(255,255,255,0.87)',
		fontSize: 40,
		fontFamily: 'Arial',
		fontWeight: '600',
		padding: 25
	},
	patch: {
		width: 150,
		height: 150,
		bottom: 0,
		right: 0,
		position: 'absolute'
	}
});
