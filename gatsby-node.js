exports.onPreBuild = async ({ actions }) => {
  const { createRedirect } = actions

  createRedirect({
    fromPath: `en/blog/*`,
    toPath: `blog/*`,
  });
};