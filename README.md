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

### Rules

#### Decks

* Each player has a deck that he prepared before the game
* Each deck is composed of 8 cards
* There are 24 cards available in the game (for now).

#### Game

1. A game is composed of multiple rounds
2. The first player to win 2 rounds wins the game
3. To win a round a player has to score a goal
4. Each player can place 4 cards at most on the field
5. When you place a card on the board it'll wait on side until your next turn to enter the field
6. To place a card you'll need to spend the amount of energy specified on it
7. The energy level is reset and increased at each turn
8. You can place multiple cards on the board during 1 turn
9. Each card has 2 statistics dribble/defense
10. If you place your card in its real role it will have +1 in dribble and in defense
11. The defense is the ability to counter a dribble. If a card A (6 dribble, 3 defense) attacks a card B (2 dribble, 4 defense). The card A will dribble B for sure because 6 >= 4 and will go out of the game. A will stay in the game because 3 >= 2 but A’s defense will be decremented to 1.
12. You can define your team captain while creating your deck. Your team captain will have +1 in dribble and defense.
13. When the adversary board is empty, your cards will score a goal and you'll win the round
14. If both players don't have cards anymore the round is a draw
15. The number of rounds played to finish a game is unlimited

## Components

### Onchain smart contracts

Onchain part of the game is located in `onchain` directory.

It's a set of Starknet smart contracts written in Cairo.

The project is using [dojo](https://github.com/dojoengine/dojo). If you are not familiar with it, please read the [Dojo book](https://book.dojoengine.org/).

You absolutely need to install the dojo toolchain if you want to do anything related to smart contracts.

```sh
curl -L https://install.dojoengine.org | bash
dojoup
```

For a more detailed onboarding please read the [installation guide](https://book.dojoengine.org/getting-started/installation.html)

#### Run tests

Within `contracts` directory run:

```bash
sozo test
```

You should see something like this:

```bash
Updating git repository https://github.com/dojoengine/dojo
running 2 tests
test tsubasa::card::tests::test_move ... ok
test tsubasa::game::tests::test_move ... ok
test result: ok. 2 passed; 0 failed; 0 ignored; 0 filtered out;
```

## Frontend

Within `game-app` directory run:

```bash
npm i
npm run dev
```

You should see something like this:

```sh
> game-app@0.1.0 dev
> next dev

- ready started server on 0.0.0.0:3000, url: http://localhost:3000
- event compiled client and server successfully in 79 ms (20 modules)
- wait compiling...
- event compiled client and server successfully in 87 ms (20 modules)
```

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
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/LucasLvy"><img src="https://avatars.githubusercontent.com/u/70894690?v=4?s=100" width="100px;" alt="Lucas @ StarkWare "/><br /><sub><b>Lucas @ StarkWare </b></sub></a><br /><a href="https://github.com/keep-starknet-strange/tsubasa/commits?author=LucasLvy" title="Code">💻</a> <a href="https://github.com/keep-starknet-strange/tsubasa/commits?author=LucasLvy" title="Documentation">📖</a> <a href="https://github.com/keep-starknet-strange/tsubasa/commits?author=LucasLvy" title="Tests">⚠️</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/YohanTz"><img src="https://avatars.githubusercontent.com/u/37301269?v=4?s=100" width="100px;" alt="Yohan @ScreenshotLabs"/><br /><sub><b>Yohan @ScreenshotLabs</b></sub></a><br /><a href="https://github.com/keep-starknet-strange/tsubasa/commits?author=YohanTz" title="Code">💻</a> <a href="https://github.com/keep-starknet-strange/tsubasa/commits?author=YohanTz" title="Tests">⚠️</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/rkdud007"><img src="https://avatars.githubusercontent.com/u/76558220?v=4?s=100" width="100px;" alt="Pia"/><br /><sub><b>Pia</b></sub></a><br /><a href="https://github.com/keep-starknet-strange/tsubasa/commits?author=rkdud007" title="Code">💻</a> <a href="https://github.com/keep-starknet-strange/tsubasa/commits?author=rkdud007" title="Tests">⚠️</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/hypekn1ght"><img src="https://avatars.githubusercontent.com/u/95952749?v=4?s=100" width="100px;" alt="A5Farmer"/><br /><sub><b>A5Farmer</b></sub></a><br /><a href="https://github.com/keep-starknet-strange/tsubasa/commits?author=hypekn1ght" title="Code">💻</a> <a href="https://github.com/keep-starknet-strange/tsubasa/commits?author=hypekn1ght" title="Tests">⚠️</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/notV4l"><img src="https://avatars.githubusercontent.com/u/122404722?v=4?s=100" width="100px;" alt="notV4l"/><br /><sub><b>notV4l</b></sub></a><br /><a href="https://github.com/keep-starknet-strange/tsubasa/commits?author=notV4l" title="Code">💻</a> <a href="https://github.com/keep-starknet-strange/tsubasa/commits?author=notV4l" title="Tests">⚠️</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/TeddyNotBear"><img src="https://avatars.githubusercontent.com/u/106410805?v=4?s=100" width="100px;" alt="Teddy Not Bear"/><br /><sub><b>Teddy Not Bear</b></sub></a><br /><a href="https://github.com/keep-starknet-strange/tsubasa/commits?author=TeddyNotBear" title="Code">💻</a> <a href="https://github.com/keep-starknet-strange/tsubasa/commits?author=TeddyNotBear" title="Tests">⚠️</a></td>
    </tr>
    <tr>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/ayushtom"><img src="https://avatars.githubusercontent.com/u/41674634?v=4?s=100" width="100px;" alt="Ayush Tomar"/><br /><sub><b>Ayush Tomar</b></sub></a><br /><a href="https://github.com/keep-starknet-strange/tsubasa/commits?author=ayushtom" title="Code">💻</a> <a href="https://github.com/keep-starknet-strange/tsubasa/commits?author=ayushtom" title="Tests">⚠️</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/remiroyc"><img src="https://avatars.githubusercontent.com/u/11146088?v=4?s=100" width="100px;" alt="Rémi Roycourt"/><br /><sub><b>Rémi Roycourt</b></sub></a><br /><a href="https://github.com/keep-starknet-strange/tsubasa/commits?author=remiroyc" title="Code">💻</a> <a href="https://github.com/keep-starknet-strange/tsubasa/commits?author=remiroyc" title="Tests">⚠️</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/dbejarano820"><img src="https://avatars.githubusercontent.com/u/58019353?v=4?s=100" width="100px;" alt="Daniel Bejarano"/><br /><sub><b>Daniel Bejarano</b></sub></a><br /><a href="https://github.com/keep-starknet-strange/tsubasa/commits?author=dbejarano820" title="Code">💻</a> <a href="https://github.com/keep-starknet-strange/tsubasa/commits?author=dbejarano820" title="Tests">⚠️</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/clicksave"><img src="https://avatars.githubusercontent.com/u/3332646?v=4?s=100" width="100px;" alt="clicksave"/><br /><sub><b>clicksave</b></sub></a><br /><a href="#design-clicksave" title="Design">🎨</a></td>
    </tr>
  </tbody>
</table>

<!-- markdownlint-restore -->
<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. Contributions of any kind welcome!
