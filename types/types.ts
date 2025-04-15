import { z } from "zod";

export const SubscanInternalModelEvmAccountDisplay = z.object({
    contract_name: z.string().optional(),
    verify_source: z.string().optional(),
});

export const SubscanInternalModelRegistrationJudgementJson = z.object({
    index: z.number(),
    judgement: z.string(),
});

export const SubscanInternalModelMerkleTag = z.object({
    address_type: z.string().optional(),
    tag_name: z.string().optional(),
    tag_subtype: z.string().optional(),
    tag_type: z.string().optional(),
});

export const Parent = z.object({
    address: z.string().optional(),
    display: z.string().optional(),
    identity: z.boolean().optional(),
    sub_symbol: z.string().optional(),
});

export const SubscanInternalModelSampleIdentity = z.object({
    display: z.string().optional(),
    identity: z.boolean().optional(),
    judgements: z.array(SubscanInternalModelRegistrationJudgementJson).optional(),
    parent: Parent.optional(),
});

export const SubscanInternalModelAccountDisplay = z.object({
    account_index: z.string().optional(),
    address: z.string().optional(),
    display: z.string().optional(),
    evm_address: z.string().optional(),
    evm_contract: SubscanInternalModelEvmAccountDisplay.optional(),
    identity: z.boolean(),
    judgements: z.array(SubscanInternalModelRegistrationJudgementJson).optional(),
    merkle: SubscanInternalModelMerkleTag.optional(),
    parent: Parent.optional(),
    people: SubscanInternalModelSampleIdentity.optional(),
});

export const SubscanInternalModelChainEventJson = z.object({
    block_num: z.number(),
    block_timestamp: z.number(),
    event_id: z.string(),
    event_idx: z.number(),
    event_index: z.string(),
    extrinsic_hash: z.string().optional(),
    extrinsic_idx: z.number().optional(),
    finalized: z.boolean(),
    module_id: z.string(),
    params: z.string().optional(),
    phase: z.number(),
});

export const SubscanInternalModelChainExtrinsicJson = z.object({
    account_display: SubscanInternalModelAccountDisplay.optional(),
    account_id: z.string(),
    account_index: z.string(),
    block_num: z.number(),
    block_timestamp: z.number(),
    call_module: z.string(),
    call_module_function: z.string(),
    extrinsic_hash: z.string(),
    extrinsic_index: z.string(),
    fee: z.number(),
    fee_used: z.number(),
    finalized: z.boolean(),
    from_hex: z.string().optional(),
    nonce: z.number(),
    params: z.string().optional(),
    signature: z.string().optional(),
    success: z.boolean(),
});

export const SubscanInternalModelChainLogJson = z.object({
    block_num: z.number(),
    data: z.string(),
    engine: z.string(),
    id: z.number(),
    log_index: z.string(),
    log_type: z.string(),
});

export const SubscanInternalModelChainBlockJson = z.object({
    account_display: SubscanInternalModelAccountDisplay.optional(),
    additional_meta: z.record(z.any()).optional(),
    block_num: z.number(),
    block_timestamp: z.number(),
    event_count: z.number(),
    events: z.array(SubscanInternalModelChainEventJson).optional(),
    extrinsics: z.array(SubscanInternalModelChainExtrinsicJson).optional(),
    extrinsics_count: z.number(),
    extrinsics_root: z.string().optional(),
    finalized: z.boolean(),
    hash: z.string(),
    logs: z.array(SubscanInternalModelChainLogJson).optional(),
    parent_hash: z.string().optional(),
    spec_version: z.number(),
    state_root: z.string().optional(),
    validator: z.string().optional(),
});

export const BlockResponse = z.object({
    code: z.number().optional(),
    data: SubscanInternalModelChainBlockJson.optional(),
    generated_at: z.number().optional(),
    message: z.string().optional(),
});

// New types for extrinsic details
export const ExtrinsicDetailResponse = z.object({
    code: z.number().optional(),
    data: SubscanInternalModelChainExtrinsicJson.optional(),
    generated_at: z.number().optional(),
    message: z.string().optional(),
});

// Account info response
export const AccountTokenBalance = z.object({
    amount: z.string(),
    decimals: z.number(),
    symbol: z.string(),
    token: z.string().optional(),
    type: z.string().optional()
});

export const AccountInfoData = z.object({
    address: z.string(),
    balance: z.string().optional(),
    balances: z.array(AccountTokenBalance).optional(),
    count_extrinsics: z.number().optional(),
    count_txs: z.number().optional(),
    display: z.string().optional(),
    identity: z.boolean().optional(),
    judgements: z.array(SubscanInternalModelRegistrationJudgementJson).optional(),
    nonce: z.number().optional()
});

export const AccountInfoResponse = z.object({
    code: z.number().optional(),
    data: AccountInfoData.optional(),
    generated_at: z.number().optional(),
    message: z.string().optional(),
});

// Account transactions response
export const AccountTransactionsData = z.object({
    count: z.number(),
    extrinsics: z.array(SubscanInternalModelChainExtrinsicJson),
});

export const AccountTransactionsResponse = z.object({
    code: z.number().optional(),
    data: AccountTransactionsData.optional(),
    generated_at: z.number().optional(),
    message: z.string().optional(),
});