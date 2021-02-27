module.exports = {
  siteMetadata: {
    title: "thejarlid",
    url: "https://thejarlid.github.io", 
    author: `@thejarlid`,
  },
  plugins: [
    "gatsby-plugin-styled-components",
    {
      resolve: "gatsby-plugin-google-analytics",
      options: {
        trackingId: "UA-80241923-1",
      },
    },
    "gatsby-plugin-sharp",
    "gatsby-plugin-react-helmet",
    {
      resolve: "gatsby-plugin-manifest",
      options: {
        icon: "src/images/icon.png",
      },
    },
    "gatsby-transformer-sharp",
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "images",
        path: "./src/assets/images/",
      },
      __key: "images",
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "yaml",
        path: "./src/assets/yaml/",
      },
      __key: "yaml",
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "markdown",
        path: "./src/assets/markdown/",
      },
      __key: "markdown",
    },
    `gatsby-transformer-yaml`,
    `gatsby-transformer-remark`,
    "rehype-react",
  ],
};
