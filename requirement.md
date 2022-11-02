https://github.com/PortalFantasy/smart-contracts-interview-exercises

Section 1: Solidity development

Open NFTMarketplace.sol. This is similar to our NFT marketplace contract. The tasks in this section will involve updating the code in this file in order to meet some requirements that will be important for getting it production ready.

Have a read through the contract and get an understanding of the data structures and functions it uses in order to work as a marketplace.

1. Implement the three modifiers notListed, isNFTOwner and isListed so that the functions already labelled with these modifiers behave as desired. They should encapsulate checks and revert statements so that these modifiers are reusable.

2. Implement the ItemListed, ItemBought and ItemCancelled events, ensuring that all necessary information that we might want to index is included. Emit these events appropriately.

3. Add the re-entrancy guard modifier correctly and add a comment explaining why it is needed.


4. Create an NFT contract called ‘Porbles.sol’. Porbles refer to monsters that can be captured in our game. We want the contract to hold the entire porble token collection. You can assume that it costs 10 WAVAX (Wrapped AVAX) to mint a porble and that WAVAX is a standard ERC-20 token. The contract must implement the ERC-2981 royalty standard, ensuring that the owner of the contract receives a royalty fee whenever the token is traded on the marketplace.

You will find all necessary library contracts under the path contracts/lib/.


5. Implement payment of the royalty to the porble contract owner when a porble NFT is traded on our marketplace via NFTMarketplace.sol.

Section 2: Smart contract indexer design based on TheGraph


We use a smart-contract indexer such as: https://thegraph.com/en/ to index all the event information emitted from our smart contracts. It is important to design a suitable schema for the data that we want to index and query. As TheGraph is based on a GraphQL API, the queries can then be very specific and return all the data we need in one go.

Requirements:

We’d like to be able to create GraphQL queries so that we can get the following data emitted from NFTMarketplace.sol:

- The tokenId, list price and seller of all tokens currently listed for a particular NFT contract
- The last sold price for a particular tokenId corresponding to an NFT contract.
- The highest sold price of a token in the last 24 hours for a particular NFT collection 
- The floor price of each NFT collection in the last 24 hours
- The average price of each NFT collection in the last 24 hours

1. Open the schema.graphql file. Design a schema that’ll allow us to obtain the above data. As part of this you may need to revisit the implementation of the ItemListed, ItemBought and ItemCancelled events in NFTMarketplace.sol. Ensure that all necessary information that we want to index is included, and emit these events appropriately.

You can assume that aggregations/averages can be done after receiving the data (e.g. via some JavaScript utility functions), and that there is no need to do a specific aggregation if the data returned has everything we need to perform the aggregation afterwards.

2. Navigate to subgraph/src/NFTMarketplace.js. This is the data mapping file where we map the event data and store it in the database via generated schema. Your task is to implement the handleItemListed, handleItemBought and handleItemCancelled functions. You may assume an entity can be loaded and saved using the following pattern:

Load: 
let someEntity = someEntity.load(someEntityId);

Save:
someEntity.save();

The code you write doesn’t have to exactly match the TheGraph protocol’s generated types, we just want to see how you would index the data from the emitted events.

3. Write GraphQL queries that would return the data needed in the requirements above. These queries should be aligned with the schema you’ve designed and data you’ve indexed. Remember that you don’t need to do the aggregations (e.g. averages) if the data your query would return can easily be transformed with JavaScript to perform the aggregations.

To be clear, this is a design task - you don’t need to deploy the subgraph or provide us with an endpoint for indexed data!
