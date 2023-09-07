
setup-app:
	cd game-app/ && npm i

setup-contracts:
	curl -L https://install.dojoengine.org | bash && dojoup && cd contracts/ && sozo build

setup: setup-app setup-contracts

run-app:
	cd game-app/ && npm run dev

run-contracts:
	katana --disable-fee && sozo migrate

run: run-contracts run-app

test-contracts:
	cd contracts/ && sozo test

# TODO: transform `next link` warnings into errors
test-app:
	cd game-app/ && npm run lint

test: test-contracts test-app