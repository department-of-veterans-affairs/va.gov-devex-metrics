const { Octokit } = require("octokit");
const OnboardingTemplateIssueFinder = require("./mean-time-to-first-commit/OnboardingTemplateIssueFinder");
const GitHubHandleExtractor = require("./mean-time-to-first-commit/GitHubHandleExtractor");
const OnboarderMapper = require("./mean-time-to-first-commit/OnboarderMapper");
const DaysToFirstCommitCollector = require("./mean-time-to-first-commit/DaysToFirstCommitCollector");
const FirstCommitFinder = require("./mean-time-to-first-commit/FirstCommitFinder");
const MeanTimeToFirstCommitCalculator = require("./mean-time-to-first-commit/MeanTimeToFirstCommitCalculator");

const octokit = new Octokit({
  auth: process.env.GH_ACCESS_TOKEN,
});

const onboardingTemplateIssueFinder = new OnboardingTemplateIssueFinder(
  octokit
);
const gitHubHandleExtractor = new GitHubHandleExtractor();
const onboarderMapper = new OnboarderMapper(gitHubHandleExtractor);
const firstCommitFinder = new FirstCommitFinder(octokit);
const daysToFirstCommitCollector = new DaysToFirstCommitCollector(
  firstCommitFinder
);

const meanTimeToFirstCommitCalculator = new MeanTimeToFirstCommitCalculator(
  onboardingTemplateIssueFinder,
  onboarderMapper,
  daysToFirstCommitCollector
);

async function main() {
  const meanTimeToFirstCommit =
    await meanTimeToFirstCommitCalculator.calculate();
  console.log(
    `Mean Time to First Commit: ${meanTimeToFirstCommit.toFixed(2)} days`
  );
}

if (require.main === module) {
  main();
}

module.exports = main;
