import dotenv from 'dotenv'
dotenv.config()

import AddBlock from "./lib/Blockchain/Application/AddBlock"
import SearchBlocks from "./lib/Blockchain/Application/SearchBlocks"
import FileRepository from "./lib/Blockchain/Infrastructure/FileRepository"


const main = async () => {
  const repository = new FileRepository()

  const addBlock = new AddBlock(repository)

  await addBlock.addBlock('Third block')

  const searchBlocks = new SearchBlocks(repository)
  const blocks = await searchBlocks.searchBlocks({})
  console.log(blocks)
}

main().catch(console.error)