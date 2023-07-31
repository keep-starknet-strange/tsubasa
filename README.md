<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<div align="center">
  <img src="docs/images/tsubasa-logo.png" height="256">
</div>
<!-- markdownlint-restore -->
<!-- prettier-ignore-end -->

# Tsubasa

Tsubasa onchain game running on Starknet Appchain.

[![Project license](https://img.shields.io/github/license/keep-starknet-strange/tsubasa.svg?style=flat-square)](LICENSE)
[![Pull Requests welcome](https://img.shields.io/badge/PRs-welcome-ff69b4.svg?style=flat-square)](https://github.com/keep-starknet-strange/tsubasa/issues?q=is%3Aissue+is%3Aopen+label%3A%22help+wanted%22)

## About

Tsubasa is a football game based on the popular manga series of the same name. It's a simulation based on the rules of the game, but with a twist: the players are able to use superhuman techniques, such as the Tiger Shot, to make the game more exciting.

The game leverages the [Dojo Engine](https://dojoengine.org/), a provable game engine and toolchain for building onchain games and autonomous worlds with Cairo.

It can run on the public [Starknet](https://www.starknet.io/), or on a Starknet Appchain using [Madara](https://github.com/keep-starknet-strange/madara).

## How to play

> *TBD*

## Components

### Onchain smart contracts

Onchain part of the game is located in `onchain` directory.

It's a set of Starknet smart contracts written in Cairo.

The project is using [straknet-foundry](https://github.com/foundry-rs/starknet-foundry). If you are not familiar with it, please read the [Starknet Foundry Book](https://foundry-rs.github.io/starknet-foundry/).

#### Run tests

Within `contracts` directory run:

```bash
snforge
```

You should see something like this:

```bash
Collected 2 test(s) and 2 test file(s)
Running 0 test(s) from src/lib.cairo
Running 2 test(s) from tests/test_contract.cairo
[PASS] test_contract::test_contract::test_shoot
[PASS] test_contract::test_contract::test_cannot_shoot_with_zero_value
Tests: 2 passed, 0 failed, 0 skipped
```

## Frontend

> *TBD*

## 🤝 Contribute

We're always looking for passionate developers to join our community and
contribute to Tsubasa. Check out our [contributing guide](./docs/CONTRIBUTING.md)
for more information on how to get started.

## 📖 License

This project is licensed under the **MIT license**.

See [LICENSE](LICENSE) for more information.

Happy coding! 🎉

## Contributors ✨

Thanks goes to these wonderful people ([emoji key](https://allcontributors.org/docs/en/emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tbody>
    <tr>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/abdelhamidbakhta"><img src="https://avatars.githubusercontent.com/u/45264458?v=4?s=100" width="100px;" alt="Abdel @ StarkWare "/><br /><sub><b>Abdel @ StarkWare </b></sub></a><br /><a href="https://github.com/keep-starknet-strange/tsubasa/commits?author=abdelhamidbakhta" title="Code">💻</a></td>
    </tr>
  </tbody>
</table>

<!-- markdownlint-restore -->
<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. Contributions of any kind welcome!
