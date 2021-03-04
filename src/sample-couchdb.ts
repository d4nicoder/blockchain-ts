import dotenv from 'dotenv'
dotenv.config()

import AddBlock from "./lib/Blockchain/Application/AddBlock"
import SearchBlocks from "./lib/Blockchain/Application/SearchBlocks"
import CouchDBRepository from './lib/Blockchain/Infrastructure/CouchDBRepository'


const main = async () => {
  const couchRepository = new CouchDBRepository()

  const addBlock = new AddBlock(couchRepository)

  await addBlock.addBlock('Third block')

  const searchBlocks = new SearchBlocks(couchRepository)
  // const blocks = await searchBlocks.searchBlocks({})
  // console.log(blocks)
}

main().catch(console.error)