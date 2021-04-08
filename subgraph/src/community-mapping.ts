import { BigInt, Address } from "@graphprotocol/graph-ts"
import {
    MemberAdded,
    MemberLeft,
} from "../../generated/Community/Community"
import { Community, Member } from "../../generated/schema"


export function handleMemberAdded(event: MemberAdded): void {

    let memberAddressString = event.params._member.toHexString()
    let skillWalletId = event.params._skillWalletTokenId.toHex()
    let ditoCredits = event.params._transferredTokens

    let member = Member.load(memberAddressString)
    if (member == null) {
        member = new Member(memberAddressString)
    }
    member.skillWallet = skillWalletId
    member.ditoCredits = ditoCredits
    member.save()


}

