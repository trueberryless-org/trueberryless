import { Octokit } from "octokit";

const octokit = new Octokit({
  auth: import.meta.env.GITHUB_TOKEN,
});

const SHOWCASE_PROJECTS = [
  "withastro",
  "npmx-dev",
  "all-contributors",
  "withstudiocms",
  "catppuccin",
  "rose-pine",
  "bombshell-dev",
  "emdash-cms",
  "zen-browser",
  "colibri-social",
];

export async function getOwnProjects() {
  try {
    const userRepos = await octokit.paginate(octokit.rest.repos.listForUser, {
      username: "trueberryless",
      per_page: 100,
    });
    const orgRepos = await octokit.paginate(octokit.rest.repos.listForOrg, {
      org: "trueberryless-org",
      per_page: 100,
    });

    const allRepos = [...userRepos, ...orgRepos];

    return allRepos
      .filter((repo: any) => !repo.fork)
      .sort(
        (a: any, b: any) =>
          (b.stargazers_count || 0) - (a.stargazers_count || 0)
      )
      .slice(0, 8)
      .map((repo: any) => ({
        name: repo.name
          .replace(/[-_]/g, " ")
          .replace(
            /\w\S*/g,
            (txt: string) =>
              txt.charAt(0).toUpperCase() + txt.slice(1).toLowerCase()
          ),
        description: repo.description,
        url: repo.html_url,
        stars: repo.stargazers_count,
        language: repo.language,
      }));
  } catch {
    return [];
  }
}

export async function getContributedProjects() {
  try {
    const q =
      "type:pr is:merged author:trueberryless -user:trueberryless -user:trueberryless-org";
    const issues = await octokit.paginate(
      octokit.rest.search.issuesAndPullRequests,
      {
        q,
        per_page: 100,
      }
    );

    const repoCounts: Record<string, { count: number; name: string }> = {};

    for (const pr of issues) {
      const repoUrl = pr.repository_url;
      if (repoUrl) {
        if (!repoCounts[repoUrl]) {
          repoCounts[repoUrl] = {
            count: 0,
            name: repoUrl.split("/").slice(-2).join("/"),
          };
        }
        repoCounts[repoUrl].count++;
      }
    }

    const allContributed = Object.values(repoCounts);

    const showcaseSet = new Set(SHOWCASE_PROJECTS);
    const showcaseRepos = allContributed.filter((repo) => {
      const owner = repo.name.split("/")[0];
      return showcaseSet.has(owner);
    });

    const orgGroups: Record<
      string,
      { owner: string; contributions: number; repos: string[] }
    > = {};

    for (const repo of showcaseRepos) {
      const owner = repo.name.split("/")[0];
      const repoName = repo.name.split("/")[1];

      if (!orgGroups[owner]) {
        orgGroups[owner] = {
          owner,
          contributions: 0,
          repos: [],
        };
      }
      orgGroups[owner].contributions += repo.count;
      orgGroups[owner].repos.push(repoName);
    }

    const enrichedOrgs = await Promise.all(
      Object.values(orgGroups).map(async (group) => {
        try {
          let totalStars = 0;

          for (const repoName of group.repos) {
            try {
              const { data: repoData } = await octokit.rest.repos.get({
                owner: group.owner,
                repo: repoName,
              });
              totalStars += repoData.stargazers_count || 0;
            } catch {}
          }

          let url = `https://github.com/${group.owner}`;
          let description = "";
          let name = group.owner;

          try {
            const { data: userData } = await octokit.rest.users.getByUsername({
              username: group.owner,
            });

            if (userData.blog) {
              url = userData.blog.startsWith("http")
                ? userData.blog
                : `https://${userData.blog}`;
            }
            description = userData.bio || "";
            name = userData.name || group.owner;
          } catch {}

          return {
            owner: group.owner,
            name,
            description,
            url,
            stars: totalStars,
            contributions: group.contributions,
          };
        } catch {
          return {
            owner: group.owner,
            name: group.owner,
            description: "",
            url: `https://github.com/${group.owner}`,
            stars: 0,
            contributions: group.contributions,
          };
        }
      })
    );

    return enrichedOrgs.sort(
      (a, b) =>
        SHOWCASE_PROJECTS.indexOf(a.owner) - SHOWCASE_PROJECTS.indexOf(b.owner)
    );
  } catch {
    return [];
  }
}
