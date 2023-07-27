use array::ArrayTrait;
use result::ResultTrait;
use option::OptionTrait;
use traits::TryInto;
use starknet::ContractAddress;
use starknet::Felt252TryIntoContractAddress;
use cheatcodes::PreparedContract;

use starknet_forge_template::ICaptainTsubasaSafeDispatcher;
use starknet_forge_template::ICaptainTsubasaSafeDispatcherTrait;

fn deploy_captain_tsubasa() -> ContractAddress {
    let class_hash = declare('CaptainTsubasa').unwrap();
    let prepared = PreparedContract {
        class_hash: class_hash, constructor_calldata: @ArrayTrait::new()
    };
    let contract_address = deploy(prepared).unwrap();

    let contract_address: ContractAddress = contract_address.try_into().unwrap();

    contract_address
}

#[test]
fn test_shoot() {
    let contract_address = deploy_captain_tsubasa();

    let safe_dispatcher = ICaptainTsubasaSafeDispatcher { contract_address };

    let score_before = safe_dispatcher.get_score().unwrap();
    assert(score_before == 0, 'Invalid score');

    safe_dispatcher.shoot(42).unwrap();

    let score_after = safe_dispatcher.get_score().unwrap();
    assert(score_after == 42, 'Invalid score');
}

#[test]
fn test_cannot_shoot_with_zero_value() {
    let contract_address = deploy_captain_tsubasa();

    let safe_dispatcher = ICaptainTsubasaSafeDispatcher { contract_address };

    let score_before = safe_dispatcher.get_score().unwrap();
    assert(score_before == 0, 'Invalid score');

    match safe_dispatcher.shoot(0) {
        Result::Ok(_) => panic_with_felt252('Should have panicked'),
        Result::Err(panic_data) => {
            assert(*panic_data.at(0) == 'Amount cannot be 0', *panic_data.at(0));
        }
    };
}
