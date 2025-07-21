import { ApolloServer } from "@apollo/server"
import { buildSchemaSync } from "type-graphql"
import BookResolver from "../../src/resolvers/book.resolver"
import { LIST_BOOKS } from "./query"
import Book from "../../src/entities/book.entity"
import { addMocksToSchema } from "@graphql-tools/mock";
import assert from "node:assert"

/**type  Books */
const booksData: Book[] = [
    { id: "1", title: "Mon Livre 1" },
    { id: "2", title: "Mon Livre 2" },
];

/**Type la réponse du query book() => [] */
type responseData = { books: Book[] }

/**creer notre serveur Appolo avant tous les tests */
let server: ApolloServer

const baseSchema = buildSchemaSync({
    resolvers: [BookResolver],
    authChecker: () => true
})

/**Mock des boks */
beforeAll(async () => {
    const mocks = {
        Query: {
            books() {
                return booksData;
            },
        },
    };

    server = new ApolloServer({
        schema: addMocksToSchema({ schema: baseSchema, mocks })
    })

})


/** TESTS */
describe('Test sur les livre', () => {
    //il y aura ici nos test
    it('mon premier test', async () => {
        const response = await server.executeOperation<responseData>({ query: LIST_BOOKS })

        console.log('RESPONSE', JSON.stringify(response))

        // if (response.body.kind === 'single') {
        //     expect(response.body.singleResult.data).toEqual({
        //         books: booksData
        //     })
        // }

        assert(response.body.kind === 'single');
        expect(response.body.singleResult.data).toEqual({ books: booksData })
    })

})



