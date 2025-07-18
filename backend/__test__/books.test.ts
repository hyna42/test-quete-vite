import { ApolloServer } from "@apollo/server"
import { buildSchemaSync } from "type-graphql"
import BookResolver from "../src/resolvers/book.resolver"

/**creer notre serveur Appolo avant tous les tests */
let server: ApolloServer

const baseSchema = buildSchemaSync({
    resolvers: [BookResolver],
    authChecker: () => true
})

beforeAll(() => {
    server = new ApolloServer({
        schema: baseSchema
    })
})


/** TESTS */
describe('Test sur les livre', () => {
    //il y aura ici nos test
    it('mon premier test', () => {
        console.log('je passe mon premier test')
    })

})

