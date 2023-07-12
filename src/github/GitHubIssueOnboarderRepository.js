const GitHubOnboardingIssue = require("./GitHubOnboardingIssue");

class GitHubIssueOnboarderRepository {
  constructor(octokit) {
    this.octokit = octokit;
  }

  async findAll() {
    const issues = await this.octokit.paginate(
      this.octokit.rest.issues.listForRepo,
      {
        owner: "department-of-veterans-affairs",
        repo: "va.gov-team",
        labels: "platform-orientation",
        state: "all",
      },
    );

    return issues
      .filter(({ title }) => title.includes("Platform Orientation Template"))
      .map((issue) => new GitHubOnboardingIssue({ issue }).toOnboarder());
  }
}

module.exports = GitHubIssueOnboarderRepository;
