import { BigInt } from "@graphprotocol/graph-ts"
import {
  NFTAuction,
  NFTAuctionBid,
  NFTAuctionCreated,
  NFTAuctionEnded,
  OwnershipTransferred
} from "../generated/NFTAuction/NFTAuction"
import { AuctionBidEntity } from "../generated/schema"

export function handleNFTAuctionBid(event: NFTAuctionBid): void {
  // Entities can be loaded from the store using a string ID; this ID
  // needs to be unique across all entities of the same type
  let entity = AuctionBidEntity.load(event.transaction.hash.toHex())

  // Entities only exist after they have been saved to the store;
  // `null` checks allow to create entities on demand
  if (entity == null) {
    entity = new AuctionBidEntity(event.transaction.hash.toHex())

    // Entity fields can be set using simple assignments
    // entity.count = BigInt.fromI32(0)
  }

  // BigInt and BigDecimal math are supported
  // entity.count = entity.count + BigInt.fromI32(1)

  // Entity fields can be set based on event parameters
  entity.nftId = event.params.nftId
  entity.bidPrice = event.params.bidPrice
  entity.bidder = event.params.bidder
  entity.time = event.block.timestamp

  // Entities can be written to the store with `.save()`
  entity.save()

  // Note: If a handler doesn't require existing field values, it is faster
  // _not_ to load the entity from the store. Instead, create it fresh with
  // `new Entity(...)`, set the fields that should be updated and save the
  // entity back to the store. Fields that were not set or unset remain
  // unchanged, allowing for partial updates to be applied.

  // It is also possible to access smart contracts from mappings. For
  // example, the contract that has emitted the event can be connected to
  // with:
  //
  // let contract = Contract.bind(event.address)
  //
  // The following functions can then be called on this contract to access
  // state variables and other data:
  //
  // - contract.owner(...)
  // - contract.period(...)
  // - contract.getNFTInAuction(...)
  // - contract.getAuctionById(...)
  // - contract.getInstantedLength(...)
  // - contract.onERC721Received(...)
}

export function handleNFTAuctionCreated(event: NFTAuctionCreated): void {}

export function handleNFTAuctionEnded(event: NFTAuctionEnded): void {}

export function handleOwnershipTransferred(event: OwnershipTransferred): void {}
