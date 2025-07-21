import { ApolloServer } from "@apollo/server"
import { buildSchemaSync } from "type-graphql"
import BookResolver from "../../src/resolvers/book.resolver"
import { LIST_BOOKS } from "./query"
import Book from "../../src/entities/book.entity"
import datasource from "../../src/lib/datasource"


/**type  Books */
const booksData: Book[] = [
    { id: "1", title: "Mon Livre 1" },
    { id: "2", title: "Mon Livre 2" },
];

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
        schema: baseSchema
    })
    await datasource.initialize()//initialisation de la datasource
})

afterAll(async () => {
    await datasource.destroy()// destruction de l'instance de la datasource une fois que tous les tests sont terminés.
})


/**Type la réponse du query book() => [] */
type responseData = { books: Book[] }



/** TESTS */
describe('Test sur les livre', () => {
    //il y aura ici nos test
    it('mon premier test', async () => {
        const response = await server.executeOperation<responseData>({ query: LIST_BOOKS })

        console.log('RESPONSE', JSON.stringify(response))
    })

})

