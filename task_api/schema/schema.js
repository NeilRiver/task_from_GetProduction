const graphql = require("graphql");

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLID,
  GraphQLSchema,
  GraphQLList,
} = graphql;

const all_list = [
  { id: 0, title: "Some Title", text: "Some Text" },
  { id: 1, title: "Some Title", text: "Some Text" },
  { id: 2, title: "Some Title", text: "Some Text" },
  { id: 3, title: "Some Title", text: "Some Text" },
  { id: 4, title: "Some Title", text: "Some Text" },
  { id: 5, title: "Some Title", text: "Some Text" },
  { id: 6, title: "Some Title", text: "Some Text" },
  { id: 7, title: "Some Title", text: "Some Text" },
  { id: 8, title: "Some Title", text: "Some Text" },
  { id: 9, title: "Some Title", text: "Some Text" },
];

const ListType = new GraphQLObjectType({
  name: "List",
  fields: () => ({
    id: { type: GraphQLID },
    title: { type: GraphQLString },
    text: { type: GraphQLString },
  }),
});

const Query = new GraphQLObjectType({
  name: "Query",
  fields: {
    list: {
      type: ListType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return all_list.find((element) => element.id == args.id);
      },
    },
    all_list: {
      type: new GraphQLList(ListType),
      resolve(parent, args) {
        return all_list;
      },
    },
  },
});

module.exports = new GraphQLSchema({
  query: Query,
});
