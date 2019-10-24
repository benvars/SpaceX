const {
	GraphQLObjectType,
	GraphQLInt,
	GraphQLString,
	GraphQLBoolean,
	GraphQLList,
	GraphQLSchema
} = require('graphql');

const axios = require('axios');

// Launch Links type
const LaunchLinksType = new GraphQLObjectType({
	name: 'LaunchLinks',
	fields: () => ({
		mission_patch: { type: GraphQLString }
	})
});

// Launch type
const LaunchType = new GraphQLObjectType({
	name: 'Launch',
	fields: () => ({
		flight_number: { type: GraphQLInt },
		mission_name: { type: GraphQLString },
		launch_success: { type: GraphQLBoolean },
		links: { type: LaunchLinksType }
	})
});

const RootQuery = new GraphQLObjectType({
	name: 'RootQueryType',
	fields: {
		launches: {
			type: new GraphQLList(LaunchType),
			resolve(parent, args) {
				return axios
					.get('https://api.spacexdata.com/v3/launches')
					.then(res => res.data);
			}
		},
		launch: {
			type: LaunchType,
			args: {
				flight_number: { type: GraphQLInt }
			},
			resolve(parent, args) {
				return axios
					.get(
						`https://api.spacexdata.com/v3/launches/${args.flight_number}`
					)
					.then(res => res.data);
			}
		}
	}
});

module.exports = new GraphQLSchema({
	query: RootQuery
});
