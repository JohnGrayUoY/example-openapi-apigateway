# ds-corporate-services-template

This is the template repository for the Corporate Services Delivery Team.
Once you've used this template to make a new repo, follow the instructions in the 'Getting Started' section below.

-   Repo-Status: Active
-   Repo-Contents: Template
-   Repo-Service-Name: n/a
-   Repo-Ownership-Rating: 5
-   Repo-Quality-Rating: 5
-   Repo-Next-Review-Due: 2025-05-31

## Getting Started

Note that this template is designed for AWS apps. If you are just using this template to generate a Typescript repository you may want to go through and remove references to AWS infrastructure.

1.  Change the metadata in package.json to reflect your new app.
2.  Add the name of the app in `infrastructure/bin/infrastructure.ts` and [update the AWS tags](https://uoy.atlassian.net/l/cp/SnBq91BT)
3.  Add your repo to [the department's Open ID Connect (OIDC) repository](https://github.com/university-of-york/esg-infrastructure-openid-connect). Follow the instructions in that repository's readme to get started.
4.  Set the `sonar.projectKey` field in `sonar-project.properties` to be `aaa--university-of-york--` followed by the name of the repo as it appears in the url (eg. `aaa--university-of-york--sdp-app-chatops`).

Next, update the repo settings in Github

1.  Enable Dependabot alerts (This may have been enabled by default)

    -   Settings -> Code Security -> Dependabot, Dependabot security updates

2.  Have branches deleted automatically after they're merged

    -   Settings -> General, Pull Requests -> Automatically delete head branches

3.  Set up repository permissions and branch protection on the main branch
    -   See [the wiki page on creating a new Github Repository](https://wiki.york.ac.uk/display/ittechdocs/Creating+a+new+Github+repository).
4.  Add the `esg` and `corporate-services` topic tags.
5.  Add `dev`, `staging` and `prod` environments to Github Environments, giving `staging` and `prod` branch protection rules:
    -   Under Settings > Environments > Configure, check 'Required Reviewers' and add `university-of-york/corporate-services`
6.  Navigate to the [esg-lib-snapshot-serializers settings page](https://github.com/orgs/university-of-york/packages/npm/esg-lib-snapshot-serializers/settings) and add the new repo with read access

Finally, update the documentation in the repository to be appropriate to your app.

1. Remove all of the ADRs except for `0001-record-architecture-decisions.md` from [the ADR directory](./docs/decisions/).
2. Edit the metadata in the top of the README to match your new app, ensuring it follows the [README standard format](https://uoy.atlassian.net/wiki/spaces/SEDP/pages/38076640/README.md+standard+format).
3. Once you've completed the above steps and have read the notes further down this document, edit this README to suit your new app. You can delete the `Getting Started` and `Notes on this template` sections. Use the `Example README headers` section to form the outline of your new README. Your README should include:
    - A brief overview of what is contained in the repository.
    - How to contribute, ie. via pull request into main.
    - How to test code in the repository.
    - How to deploy the code, ie. via Github Environments.
    - Links to related repositories and wiki pages.

## Notes on this template

### xo-config

The [`.xo-config.json`](./.xo-config.json) file represents our agreed upon linting rules for all of our repos, and should only be edited with consensus from the team.

### TypeScript

The TypeScript configuration uses the centralized recommendations for projects using Node 20, and applies the strictest checking. `ts-node` doesn't currently (as of 10.9.2) support extending from multiple configs, so we have combined them into a single file locally that we can extend from with our config.

This set up may not be appropriate for you, see the [Github guide on tsconfig configurations](https://github.com/tsconfig/bases/) for more options.

## Example README Headers

**NB**: The levels of these headings might not match up with the rest of your document. Make sure that you aren't skipping any heading levels (for instance by putting a `H3` directly under a `H1`), and that heading levels for different sections are consistent.

### Making Changes

To make a change to this app:

1. Create a feature branch off of `main`. Ideally you should name this branch as the ID of the JIRA ticket you are working on.
    - The [`package.json`](package.json) contains scripts to help troubleshoot your code. Doing `npm run test` in the command line will run all unit tests in the repository. Doing `npm run lint` will check your code for issues against [`.xo-config.json`](./.xo-config.json)
2. Complete your work, and push your ticket to Github. Create a pull request with a descriptive name and a list of changes in the description.
    - Every pull request runs Github Actions that lint and test your code. If either of these fail you will be unable to merge your pull request.
3. Once this pull request has been approved, merge it into the Main branch.

#### Deploying Changes

This app uses Github Environments to deploy. Each environment, `dev`, `staging`, and `prod`, deploys code from `main`.

1. Your PR, if successfully merged into `main`, will have triggered the `deploy-cdk.yml` action. Navigate to this action in Github to find the pending deployments to `dev`, `staging`, and `prod`.
2. Choose whether you want to test your changes on `dev` or `staging`. Check whether anything has been committed to `main` since the last time the deployment to your respective environment ran. You may need to confer with the team if there's anything in `main` thats not been deployed yet.
3. Deploy your changes to `dev` or `staging`. Write QA instructions so that another developer can check your changes.
4. Once your changes have been QA'd, and you are confident that **there is no un-QA'd code in `main`**, return to the Github Environments tab and deploy to `prod`.

### Linting

The linting config in [`.xo-config.json`](./.xo-config.json) represents the team's agreed upon code quality standards. Do not disable rules globally without a team discussion. If you absolutely must ignore a linting rule then add a comment explaining why.

#### ADRs

Architectural decisions are recorded in Architectural Decision Records (ADRs), which in turn are kept in `./docs/decisions`. You can use [adr-tools](https://github.com/npryce/adr-tools) to generate an ADR template, or just write one manually.

### Related Repositories and Wiki pages

Related repositories might include other repos that form part of the same system (eg. frontends and backends), and repos for apps that this system has superseded.
