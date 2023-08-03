<picture>
  <source media="(prefers-color-scheme: dark)" srcset=".github/mark-dark.svg">
  <img alt="Dojo logo" align="right" width="120" src=".github/mark-light.svg">
</picture>

<a href="https://twitter.com/dojostarknet">
<img src="https://img.shields.io/twitter/follow/dojostarknet?style=social"/>
</a>
<a href="https://github.com/dojoengine/dojo">
<img src="https://img.shields.io/github/stars/dojoengine/dojo?style=social"/>
</a>

[![discord](https://img.shields.io/badge/join-dojo-green?logo=discord&logoColor=white)](https://discord.gg/PwDa2mKhR4)
[![Telegram Chat][tg-badge]][tg-url]

[tg-badge]: https://img.shields.io/endpoint?color=neon&logo=telegram&label=chat&style=flat-square&url=https%3A%2F%2Ftg.sumanjay.workers.dev%2Fdojoengine
[tg-url]: https://t.me/dojoengine

# Dojo Starter: Official Guide

The official Dojo Starter guide, the quickest and most streamlined way to get your Dojo Autonomous World up and running. This guide will assist you with the initial setup, from cloning the repository to deploying your world.

The Dojo Starter contains the minimum required code to bootstrap your Dojo Autonomous World. This starter package is included in the `dojoup` binary. For more detailed instructions, please refer to the official Dojo Book [here](https://book.dojoengine.org/getting-started/installation.html).

## Prerequisites

-   Rust - install [here](https://www.rust-lang.org/tools/install)
-   Cairo language server - install [here](https://book.dojoengine.org/development/setup.html#3-setup-cairo-vscode-extension)

## Step-by-Step Guide

Follow the steps below to setup and run your first Autonomous World.

### Step 1: Install `dojoup`

Start by installing `dojoup`. This cli tool is a critical component when building with Dojo. It manages dependencies and helps in building your project. Run the following command in your terminal:

```console
curl -L https://install.dojoengine.org | bash
dojoup
```

The command downloads the `dojoup` installation script and executes it.

### Step 2: Clone the Repository

The next step is to clone the repository to your local machine. Open your terminal and type the following command:

```console
git clone https://github.com/dojoengine/dojo-starter.git && cd dojo-starter
```

This command will create a local copy of the Dojo Starter repository and enter the project directory.

### Step 3: Build the Example World

With `dojoup` installed, you can now build your example world using the following command:

```console
sozo build
```

This command compiles your project and prepares it for execution.

### Step 4: Start Katana RPC

[Katana RPC](https://book.dojoengine.org/framework/katana/overview.html) is the communication layer for your Dojo World. It allows different components of your world to communicate with each other. To start Katana RPC, use the following command:

```console
katana --allow-zero-max-fee
```

### Step 5: Migrate (Deploy) the World

Finally, deploy your world using the `sozo migrate` command. This command, deploys your world to Katana!

```console
sozo migrate
```

Congratulations! You've successfully setup and deployed your first Dojo Autonomous World.

---

# Interacting With Your Local World

Explore and interact with your locally deployed world! This guide will help you fetch schemas, inspect entities, and execute actions using `sozo`.

If you have followed the example exactly and deployed on Katana, you can use the world address generated to either:

-   use as an argument to `--world` when calling `sozo` commands
-   add it to [Scarb.toml](Scarb.toml) under `[tool.dojo.env]` table like so

    ```toml
    [tool.dojo.env]
    world_address = "<world_address>"
    ```

-   set it as an environment variable

    ```bash
    export DOJO_WORLD_ADDRESS="<world_address>"
    ```

## Fetching Component Schemas

Let's start by fetching the schema for the `Moves` component. Use the following command

```bash
sozo component schema Moves
```

You should get this in return:

```rust
struct Moves {
   remaining: u8
}
```

This structure indicates that the `Moves` component keeps track of the remaining moves as an 8-bit unsigned integer.

## Inspecting an Entity's Component

Let's check the remaining moves for an entity. In our examples, the entity is based on the caller address, so we'll use the address of the **first** Katana account as an example.

```bash
sozo component entity Moves 0x03ee9e18edc71a6df30ac3aca2e0b02a198fbce19b7480a63a0d71cbd76652e0
```

If you haven't made an entity yet, it will return `0`.

## Adding an Entity

No entity? No problem! You can add an entity to the world by executing the `spawn` system. Remember, there's no need to pass any call data as the system uses the caller's address for the database.

```bash
sozo execute spawn
```

## Refetching an Entity's Component

After adding an entity, let's refetch the remaining moves with the same command we used earlier:

```bash
sozo component entity Moves 0x03ee9e18edc71a6df30ac3aca2e0b02a198fbce19b7480a63a0d71cbd76652e0
```

### Passing the world address as an argument

We can get the same results by executing this command

```bash
sozo component entity Moves --world <WORLD_ADDRESS> 0x03ee9e18edc71a6df30ac3aca2e0b02a198fbce19b7480a63a0d71cbd76652e0
```

Congratulations! You now have `10` remaining moves! You've made it this far, keep up the momentum and keep exploring your world!

### Next steps:

Make sure to read the [Offical Dojo Book](https://book.dojoengine.org/index.html) for detailed instructions including theory and best practices.

---

## Contribution

Your contributions are always welcome and appreciated. Following are the things you can do to contribute to this project:

1. **Report a Bug**

    - If you think you have encountered a bug, and we should know about it, feel free to report it [here](https://github.com/dojoengine/dojo-starter/issues) and we will take care of it.

2. **Request a Feature**

    - You can also request for a feature [here](https://github.com/dojoengine/dojo-starter/issues), and if it's viable, it will be picked for development.

3. **Create a Pull Request**
    - It can't get better then this, your pull request will be appreciated by the community.

For any other questions, feel free to reach out to us [here](https://dojoengine.org/contact).

Happy coding!
