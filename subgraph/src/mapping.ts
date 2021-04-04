import { BigInt, Address } from "@graphprotocol/graph-ts"
import {
  SkillWallet,
  SkillWalletCreated,
  SkillWalletActivated,
  SkillSetUpdated,
  SkillWalletCommunityChanged
} from "../generated/SkillWallet/SkillWallet"
import { SkillWallet, Community, Member, SkillSet, Skill } from "../generated/schema"


export function handleCreate(event: SkillWalletCreated): void {

}

export function handleActivate(event: SkillWalletActivated): void {

}

export function handleSkillSetUpdate(event: SkillSetUpdated): void {

}

export function handleCommunityChange(event: SkillWalletCommunityChanged): void {

}