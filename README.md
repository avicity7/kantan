## Kantan

Welcome to the project repository for Kantan! Kantan is a logistics management app written in [React Native](https://reactnative.dev) that aims to raise communication security standards as well as improve the quality of life for NSMen through clearer logistics and more efficient processes.

This project is our entry for [BrainHack 2022](https://dsta.gov.sg/brainhack), with the following problem statement:

> "How can we leverage digital technologies to enable greater convenience and flexibility for our NSmen in the workspaces in which they live, work, and play?"

## Motivations

Upon getting to know the problem statement, we reached out for quick interviews with NSmen and NSFs to understand the bottlenecks they experience. Many of the raised points involved the management of logistics. In many cases, logistics are still done manually without the aid of a technological tool to make the process more effective and error-free. Therefore, we decided to create Kantan as a solution to these manual logistical systems.

## Getting started

We settled on using [React Native](https://reactnative.dev) as the framework of choice via Expo. This repository also uses [Yarn Classic](https://classic.yarnpkg.com/lang/en/); it is therefore advisable to follow using Yarn Classic, but you may feel free to use your own package manager at your own discretion.

1. Clone the repository using `git clone` and change your directory into this repository.
    ```
    git clone https://github.com/avicity7/kantan && cd kantan
    ```

2. Install all dependencies using your package manager. Assuming you'd use Yarn Classic:
    ```
    yarn
    ```

3. Create a [Firebase project](https://console.firebase.google.com) and store your secrets in an environment variable file (`.env`). The file should look similar to this; remember to replace the values (in `<` and `>`) with your own secrets:
    ```
    API_KEY=<api_key>
    AUTH_DOMAIN=<auth_domain>
    PROJECT_ID=<project_id>
    STORAGE_BUCKET=<storage_bucket>
    MESSAGING_SENDER_ID=<message_sender_id>
    APP_ID=<app_id>
    MEASUREMENT_ID=<measurement_id>
    ```

4. Run the project using the `start` script.
    ```
    yarn start
    ```

    - If you experience issues connecting via Expo, `--tunnel` might help:
        ```
        yarn start --tunnel
        ```

## Licence

This repository is made open-source with the [MIT License](https://github.com/avicity7/kantan/blob/main/LICENSE.md), meaning that you are allowed to modify and distribute the source code as well as use it for private and commercial use provided that the licence and copyright notices are retained. For more information, visit the link above to learn what is permitted by the licence.
