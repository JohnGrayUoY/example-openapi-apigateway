# 3. Removal of Semantic Release

Date: 2023-01-13

## Status

Accepted

## Contexts

We currently do not make use of Semantic Release logs or Github releases and it prevents us from enabling branch protection rules and increases complexity of our build pipeline for no tangible benefit.

## Decision

To remove Semantic Release from our repository and build pipeline.

## Consequences

This decision allows us to protect our Github branches and reduces complexity of our build process.

There will no longer be a changelog or release record for this project but these were not being used so the impact is anticipated to be zero.
