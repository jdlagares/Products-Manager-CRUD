import {connectdb} from "../server"
import db from "../config/db"

jest.mock('../config/db')

describe('connectDB', () => {
    it('should handle database connection error', async () => {
        jest.spyOn(db, 'authenticate')
            .mockRejectedValueOnce(new Error('error connection'))
        const consoleSpy = jest.spyOn(console, 'log')

        await connectdb()

        expect(consoleSpy).toHaveBeenCalledWith(
            expect.stringContaining('error connection')
        )
    })
})