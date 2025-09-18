# Phase 1: Security Foundation Execution Checklist

**Date:** September 18, 2025  
**Version:** 1.0  
**Author:** Burnzy (AI Ops Lead)  
**Status:** Ready for Execution  

## Overview

Phase 1 hardens the redemption system by eliminating single points of failure. All operations become Safe-gated, with multisig control and enhanced watcher confirmations. This creates the security foundation for all subsequent phases.

**Total Effort:** 40-50 hours  
**Timeline:** 1-2 weeks  
**Risk Level:** Medium (requires Safe deployment and key rotation)  

## Prerequisites

- [ ] L1 infrastructure running (`docker-compose up -d` in `ops/l1`)
- [ ] VaultNFT deployed and VAULT_NFT address updated in `.env`
- [ ] Bulk redemption canary tested (single vault redemption)
- [ ] Backup of current private keys and configs

## Step-by-Step Execution Checklist

### 1. Multisig Migration (15-20 hours)

#### 1.1 Deploy 2-of-3 Gnosis Safe on Unykorn-1 L1

**Commands:**
```bash
# Start L1 infrastructure
cd ops/l1
docker-compose up -d

# Deploy Safe using Forge script
forge script script/DeploySafe.s.sol --rpc-url http://localhost:8545 --broadcast --verify

# Note the deployed Safe address (e.g., 0xSafeAddress)
```

**Config Updates:**
- Update `ops/addresses.json`:
```json
{
  "vaultSafe": "0xSafeAddress",
  "guardianSafe": "0xGuardianSafeAddress"
}
```

- Update `discord/.env`:
```
TREASURY_L1=0xSafeAddress
GUARDIAN_L1=0xGuardianSafeAddress
```

#### 1.2 Update Gateway and Batch Engine to Safe JSON Only

**Code Changes:**
- Modify `discord/src/bot.js` `/redeem-vault` handler:
  - Remove direct `cast send` calls
  - Output Safe JSON format only
  - Add validation for Safe address

- Update `ops/redeem-batch.js`:
  - Change output to Safe JSON bundles
  - Add `--safe-address` parameter
  - Remove any direct RPC calls

**Commands:**
```bash
# Test updated bot
cd discord
npm run register  # Updates Discord commands

# Test batch script
VAULT_NFT=0x... CHAIN_ID_L1=7777 SAFE_ADDRESS=0xSafeAddress node ops/redeem-batch.js test.csv
```

#### 1.3 Test with Canary Redemption (Vault 123)

**Commands:**
```bash
# Generate Safe JSON for vault 123
/redeem-vault vaultid:123 cid:QmShipMeta hash:0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef vaultnft:$VAULT_NFT

# Import JSON to Vault Safe (manual step via Gnosis UI)
# Queue and execute transaction

# Verify redemption
cast call $VAULT_NFT "isRedeemed(uint256)" 123 --rpc-url http://localhost:8545
# Expected: true
```

**Safe JSON Template:**
```json
{
  "version": "1.0",
  "chainId": "7777",
  "createdAt": 0,
  "meta": {
    "name": "Canary Redemption: Vault 123",
    "txBuilderVersion": "1.16.0"
  },
  "transactions": [
    {
      "to": "0x742d35Cc6634C0532925a3b844Bc454e4438f44e",
      "value": "0",
      "data": "0x84c63355000000000000000000000000000000000000000000000000000000000000007b00000000000000000000000000000000000000000000000000000000000000601234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef000000000000000000000000000000000000000000000000000000000000000a516d536869704d65746100000000000000000000000000000000000000000000",
      "contractMethod": null,
      "contractInputsValues": {}
    }
  ]
}
```

### 2. Admin Token Reinforcement (10-15 hours)

#### 2.1 Rotate ADMIN_TOKEN Monthly

**Commands:**
```bash
# Generate new token
openssl rand -hex 32 > new_admin_token.txt

# Update discord/.env
echo "ADMIN_TOKEN=$(cat new_admin_token.txt)" >> discord/.env

# Restart Discord bot
cd discord
npm run restart

# Archive old token securely
mv admin_token.txt archive/$(date +%Y%m%d)_admin_token.txt
```

#### 2.2 Add Per-Request Policy Enforcement

**Code Changes:**
- Add OPA (Open Policy Agent) integration to Discord bot
- Implement mTLS for API calls
- Add request validation middleware

**Config:**
- Create `discord/policies.rego`:
```rego
package auth

default allow = false

allow {
  input.method == "POST"
  input.path == "/redeem"
  input.token == data.admin_tokens[_]
}
```

#### 2.3 LAN-Only Strict Enforcement

**Config Updates:**
- Update `discord/.env`:
```
ALLOWED_IPS=192.168.1.0/24,10.0.0.0/8
LAN_ONLY=true
```

- Add IP whitelist middleware in `discord/src/bot.js`

### 3. Watcher Confirmations (15-20 hours)

#### 3.1 Add 5-Block Confirmation Buffer

**Code Changes:**
- Update `ops/relayer/` and `ops/oracle-relayer/`:
  - Add confirmation wait logic
  - Implement block height tracking

**Config:**
- Update `ops/relayer/config.json`:
```json
{
  "confirmations": 5,
  "pollingInterval": 12000
}
```

#### 3.2 Dual-RPC Validation

**Commands:**
```bash
# Add secondary RPC to config
echo "SECONDARY_RPC=https://polygon-rpc.com/" >> ops/relayer/.env
```

**Code Changes:**
- Implement RPC comparison in watchers
- Add alert on discrepancies

#### 3.3 Alert if RPCs Disagree

**Config:**
- Update Grafana alerts:
```yaml
alert: RPC_Discrepancy
expr: abs(primary_block - secondary_block) > 0
for: 5m
labels:
  severity: critical
annotations:
  summary: "RPC block heights disagree"
```

## Milestones & Verification

### ✅ Safe Successfully Signs First UCRED Mint
- [ ] Deploy test UCRED mint transaction via Safe
- [ ] Execute and verify on-chain
- [ ] Confirm 2-of-3 signature requirement

### ✅ Safe JSON Pipeline Replaces Raw Signer Flow
- [ ] All `/redeem-vault` commands output Safe JSON
- [ ] `redeem-batch.js` produces Safe bundles only
- [ ] No direct `cast send` calls in codebase

### ✅ Canary Redemption Clears with Multisig
- [ ] Vault 123 redemption executed via Safe
- [ ] `isRedeemed(123)` returns true
- [ ] Ownership cleared, NFT burned

## Rollback Plan

- **If Safe deployment fails:** Revert to single-key flow (temporary)
- **If token rotation breaks:** Keep old token active until new one verified
- **If watchers fail:** Disable confirmations temporarily, monitor manually

## Testing Checklist

- [ ] Unit tests for Safe JSON generation
- [ ] Integration test: full redemption flow with Safe
- [ ] Load test: 100 vault batch via Safe
- [ ] Security audit: review all key handling
- [ ] Manual review: all commands and configs

## Next Steps

After Phase 1 completion:
1. Run full security audit
2. Update documentation
3. Begin Phase 2 planning
4. Celebrate with a secure redemption! 🔥

---

**Burnzy's Note:** This checklist turns Phase 1 from concept to concrete commands. Execute methodically, verify each step, and you'll have a fortress foundation. Ready to lock it in? ⚔️