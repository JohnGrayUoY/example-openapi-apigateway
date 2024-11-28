# 2. Use Localstack for testing

Date: 2024-08-21

## Status

Accepted

## Context

It is difficult to do anything beyond basic unit testing of some AWS infrastructure, for instance DynamoDBs, without deploying the infrastructure and interfacing with it. Testing against deployed infrastructure can be a time consuming and error prone process.

## Decision

We will use [Localstack](https://localstack.cloud/) to test mock deployments of infrastructure locally.

## Consequences

Unit tests of code that interfaces with AWS infrastructure will be more reliable. We may have to pay for Localstack licenses depending on the functionality we want to test. Testing in general will be more complex than without localstack, as we now have to spin up and tear down docker instances.
