# Template repo for projects using webpack

## scripts:

 
- ### test:
    "echo \"Error: no test specified\" && exit 1",
- ### set-branch:
    "git branch gh-pages",
- ### change-branch:
    "git checkout gh-pages && git merge main --no-edit",
- ### build:
    "webpack",
- ### dev:
    "webpack serve",
- ### commit-dist:
    "git add dist -f && git commit -m \"Deployment commit\"",
- ### push-gh-pages:
    "git subtree push --prefix dist origin gh-pages",
- ### check-out:
    "git checkout main"

