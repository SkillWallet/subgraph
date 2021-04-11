# SkillWallet subgraph

Subgraph for the SkillWallet contract and the accompanying DistributedTown contract suite.

Currently deployed on Matic mainnet: `https://thegraph.com/explorer/subgraph/skillwallet/skill-wallet`

For config please refer to the `config` directory.

Track events from the `SkillWallet.sol`, `Community.sol`, `CommunitiesRegistry.sol`.

For contract overview please visit: `https://github.com/SkillWallet/contracts`

Entities supported:

### SkillWallet
```
type SkillWallet @entity {
  id: ID!
  owner: Member
  activeCommunity: Community!
  communityHistory: [Community!]
  activated: Boolean!
  createdAt: BigInt!
}
```

### Member
```
type Member @entity {
  id: ID!
  skillWallet: SkillWallet
  ditoCredits: BigInt
}
```


### Community
```
type Community @entity {
  id: ID!
  ditoCredits: BigInt!
  membershipAddress: Bytes!
  name: String!
  skillWallets: [SkillWallet]! @derivedFrom(field: "activeCommunity")
  creator: Member!
  createdAt: BigInt!
}
```