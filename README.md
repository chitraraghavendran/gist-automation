
# Gist e2e Automation 

This repository contains a suite of automated tests for GitHub Gists, focusing on functional, usability, responsive design, and cross-browser testing.

## Table of Contents
- [Introduction](#introduction)
- [Installation](#installation)
- [Usage](#usage)
- [Contributing](#contributing)

## Introduction
Gists are a simple way to share code snippets and ideas with others. They can be public or secret and are Git repositories, allowing for version control and collaboration.

This project aims to automate the testing of Gist functionalities to ensure reliability and performance across different scenarios and platforms.

## Installation
1. **Clone the repository:**

    ```bash
    git clone https://github.com/chitraraghavendran/gist-automation.git
    cd gist-automation
    ```

2. **Install dependencies:**

    Ensure you have [Node.js](https://nodejs.org/) installed, then run:

    ```bash
    npm install
    ```

## Usage
1. **Configure Environment Variables:**

    Create a `cypress.env.json` file in the root directory and add your GitHub token:

    ```plaintext
    {
    "GITHUB_USERNAME": "<Github Username>",
    "GITHUB_PASSWORD": "<Github Password>",
    "BEARER_TOKEN": "<Fine-grained personal access tokens with permissions to create,update,delete Gists>"
    }   
    ```

2. **Run Tests:**

    - **Execute all tests and generate a report:** After running the tests, reports will be available in the `reports` directory. Open the `report.html` file to view detailed results.

      ```bash
      ./run_all_tests_and_generate_report.sh
      ```

    - **Run a specific test suite:**

      ```bash
      npx cypress run --spec "cypress/features/API/CreateGistAPI.feature"
      ```

    - **See the action in-live:**

      ```bash
      npx cypress open
      ```

3. **View Test Reports:**

   After running the tests using the ./run_all_tests_and_generate_report.sh, reports will be available in the `reports` directory. Open the `report.html` file to view detailed results.

## Contributing
Contributions are welcome! Please fork this repository, make your changes, and submit a pull request. Ensure that your code adheres to the existing style guidelines and includes appropriate tests.
