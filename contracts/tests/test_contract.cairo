use array::ArrayTrait;
use result::ResultTrait;
use option::OptionTrait;
use traits::TryInto;
use starknet::ContractAddress;
use starknet::Felt252TryIntoContractAddress;
use cheatcodes::PreparedContract;

use Tsubasa::tsubasa::ICaptainTsubasaSafeDispatcher;
use Tsubasa::tsubasa::ICaptainTsubasaSafeDispatcherTrait;

fn deploy_captain_tsubasa() -> ContractAddress {
    let game_class_hash = declare('Game').unwrap();
    let tsubasa_class_hash = declare('CaptainTsubasa').unwrap();
    let mut constructor_calldata = ArrayTrait::new();
    constructor_calldata.append(game_class_hash);
    let prepared = PreparedContract {
        class_hash: tsubasa_class_hash, constructor_calldata: @constructor_calldata
    };
    let contract_address: ContractAddress = deploy(prepared).unwrap().try_into().unwrap();
    contract_address
}

#[test]
fn test_deploy_contract_with_game_class_hash() {
    let contract_address = deploy_captain_tsubasa();
    let safe_dispatcher = ICaptainTsubasaSafeDispatcher { contract_address };
    assert(safe_dispatcher.get_game_class_hash().unwrap() != 0, 'Game class hash shouldnt be 0')
}

#[test]
fn test_get_deck() {
    let contract_address = deploy_captain_tsubasa();
    let safe_dispatcher = ICaptainTsubasaSafeDispatcher { contract_address };

    assert(
        safe_dispatcher.get_deck(player: Zeroable::<ContractAddress>::zero()).unwrap().len() == 0,
        'Should return empty array'
    );
}

#[test]
fn test_get_card() {
    let contract_address = deploy_captain_tsubasa();
    let safe_dispatcher = ICaptainTsubasaSafeDispatcher { contract_address };

    assert(
        safe_dispatcher
            .get_card(player: Zeroable::<ContractAddress>::zero(), card_nb: 0)
            .unwrap() == 0,
        'Should return empty array'
    );
}

#[test]
fn test_register_deck() {
    let contract_address = deploy_captain_tsubasa();
    let safe_dispatcher = ICaptainTsubasaSafeDispatcher { contract_address };
    assert(
        safe_dispatcher.register_deck(array![0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]).unwrap() == (),
        'Couldnt register deck'
    );
}
