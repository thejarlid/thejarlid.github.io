# thejarlid.github.io

This is the source for my personal site and blog deployed on github pages. This site was built using React + GatsbyJS.

Due to the way github pages docs the personal page must be deployed from the master branch which causes issues when trying to store the source for gatsby and building the project.

To fix this the master branch holds the generated static artifacts for the website that is generated from gatsby. The actual source is in the branch `master-source`.

# Usage

To work on this repo and make adjustments branch from `master-source` and develop there. Merge into `master-source` and then run:
```
npm run develop
```
which will build the artifacts and deploy them to the master branch where the site will be hosted from. 
