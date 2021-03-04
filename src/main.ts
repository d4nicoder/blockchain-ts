import dotenv from 'dotenv'
import FileRepository from './lib/Blockchain/Infrastructure/FileRepository'
import CouchDBRepository from './lib/Blockchain/Infrastructure/CouchDBRepository'
import { IBlockchainRepository } from './lib/Blockchain/Domain/Models/IBlockchainRepository'
import AddBlock from './lib/Blockchain/Application/AddBlock'


dotenv.config()

const args = process.argv.splice(2)
let message = ''

// Let's find the message data to store
for (let i = 0; i < args.length; i++) {
  if (i + 1 < args.length) {
    if (args[i].startsWith('-m')) {
      message = args[i + 1]
    }
  }
}

if (!message) {
  // Message needed
  console.error(`
Error: Missing message
------------------------
Usage: [yarn|npm] start -m "<message_to_store>"
`)
  process.exit(1)
}

const main = async () => {
  let repository: IBlockchainRepository = new FileRepository()

  if (process.env.REPOSITORY === 'couchdb') {
    repository = new CouchDBRepository()
  }

  const addBlock = new AddBlock(repository)

  await addBlock.addBlock(message)
}

main().catch(console.error)