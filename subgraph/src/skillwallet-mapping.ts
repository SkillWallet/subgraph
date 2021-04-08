import { BigInt, Address } from "@graphprotocol/graph-ts"
import {
  SkillWalletCreated,
  SkillWalletActivated,
  SkillWalletCommunityChanged
} from "../../generated/SkillWallet/SkillWallet"
import { SkillWallet, Community, Member } from "../../generated/schema"


export function handleCreate(event: SkillWalletCreated): void {

  let skillWalletOwnerString = event.params.skillWalletOwner.toHexString()
  let communityAddressString = event.params.community.toHexString()
  let tokenId = event.params.skillWalletId.toHex()

  // TODO: Parse skillSet into Skill and wrap it into SkillSet

  let community = Community.load(communityAddressString);
  if(community == null) {
    community = new Community(communityAddressString);
    community.save();
  }


  let skillWallet = new SkillWallet(tokenId);

  skillWallet.owner = skillWalletOwnerString;
  skillWallet.activeCommunity = communityAddressString;
  skillWallet.communityHistory.push(communityAddressString);
  // skillWallet.skillSet = skillSet.toTupleArray();
  skillWallet.activated = false;
  skillWallet.createdAt = event.block.timestamp

  skillWallet.save();

  let member = Member.load(skillWalletOwnerString)
  if(member == null) {
    member = new Member(skillWalletOwnerString)
    member.skillWallet = tokenId;
  }

}

export function handleActivate(event: SkillWalletActivated): void {

  let tokenId = event.params.skillWalletId.toHex()

  let skillWallet = SkillWallet.load(tokenId);
  skillWallet.activated = true;
  skillWallet.save();

}

// export function handleSkillSetUpdate(event: SkillSetUpdated): void {
//
//   let tokenId = event.params.skillWalletId.toHex()
//   let newSkillSet = event.params.newSkillSet;
//
//   let skillWallet = SkillWallet.load(tokenId);
//
//   skillWallet.skillSet = newSkillSet;
//
//   skillWallet.save();
//
// }

export function handleCommunityChange(event: SkillWalletCommunityChanged): void {

  let tokenId = event.params.skillWalletId.toHex()
  let newCommunityAddressString = event.params.newCommunity.toHexString()

  let skillWallet = SkillWallet.load(tokenId);

  skillWallet.activeCommunity = newCommunityAddressString;
  skillWallet.communityHistory.push(newCommunityAddressString);

  skillWallet.save();

}