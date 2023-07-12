const GitHubOnboardingIssue = require("../GitHubOnboardingIssue");

const createOnboardingIssue = (attributes = {}) => ({
  title: "Platform Orientation Template",
  body: "GitHub handle*: octocat\n",
  created_at: "2023-07-01T00:00:00Z",
  user: {
    login: "octocat",
  },
  ...attributes,
});

const createGitHubOnboardingIssue = (attributes = {}) =>
  new GitHubOnboardingIssue({
    issue: createOnboardingIssue(),
    ...attributes,
  });

module.exports = {
  createOnboardingIssue,
  createGitHubOnboardingIssue,
};
