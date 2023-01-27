/**
 * This is the main entrypoint to your Probot app
 * @param {import('probot').Probot} app
 */
module.exports = (app) => {
  // Your code here
  app.log.info("Yay, the app was loaded!");

  app.on("installation.created", async (context) => {
    const owner = context.payload.installation.account.login;
    // const repo = context.payload.repositories[0].name;
    const repo = "FAIRshare";
    console.log("Checking for a readme file in " + repo);

    try {
      const readme = await context.octokit.rest.repos.getReadme({
        owner,
        repo,
      });
      console.log("Readme: ");
      console.log(readme);

      // Check if a doi is present in the readme
      const readmeContent = Buffer.from(
        readme.data.content,
        "base64"
      ).toString();
      console.log("Readme content: ");
      console.log(readmeContent);
      const doiRegex = /10.\d{4,9}\/[-._;()/:A-Z0-9]+/i;
      const doi = doiRegex.exec(readmeContent);
      console.log("DOI: ");
      console.log(doi);
      if (doi) {
        console.log("DOI found");
      }
    } catch (error) {
      console.log("Opening issue ");
      // const repoIssue = await context.octokit.rest.issues.create({
      //   owner,
      //   repo,
      //   title: "No DOI",
      //   body: "Please add a DOI to your readme",
      // });
      // console.log(repoIssue);
    }

    // try {
    //   const license = await context.octokit.rest.licenses.getForRepo({
    //     owner,
    //     repo,
    //   });
    //   console.log("license: ");
    //   console.log(license);
    // } catch (error) {
    //   console.log("Opening issue ");
    //   const repoIssue = await context.octokit.rest.issues.create({
    //     owner,
    //     repo,
    //     title: "No License",
    //     body: "Please add a license to your repository",
    //   });
    //   console.log(repoIssue);
    // }
  });

  // app.on("issues.opened", async (context) => {

  //   const issueComment = context.issue({
  //     body: "Thanks for opening this issue! Will get back to you soon!",
  //   });
  //   return context.octokit.issues.createComment(issueComment);
  // });

  // For more information on building apps:
  // https://probot.github.io/docs/

  // To get your app running against GitHub, see:
  // https://probot.github.io/docs/development/
};
