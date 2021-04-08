import { BigInt, Address } from "@graphprotocol/graph-ts"
import {
    CommunitiesRegistry,
    CommunityCreated,
} from "../../generated/CommunitiesRegistry/CommunitiesRegistry"
import { Community, Member } from "../../generated/schema"
import { Community as CommunityTemplate } from "../../generated/templates"


export function handleCreateCommunity(event: CommunityCreated): void {

    CommunityTemplate.create(event.params.community)


    let creatorAddressString = event.params.creator.toHexString()
    let communityAddressString = event.params.community.toHexString()
    let membershipAddress = event.params.membership
    let name = event.params.name

    let creator = Member.load(creatorAddressString)
    if (creator == null) {
        creator = new Member(creatorAddressString)
        creator.save()
    }

    let community = new Community(communityAddressString)

    community.ditoCredits = BigInt.fromString("96000000000000000000000")
    community.membershipAddress = membershipAddress
    community.name = name
    community.creator = creatorAddressString
    community.createdAt = event.block.timestamp

    community.save()
}
