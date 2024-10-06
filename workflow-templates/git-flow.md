# GitHub Flow
## Context
This **README** serves as a guide for the developers to work using the same workflow and, to achieve that, there are some rules that need to be respected, such as:
* Only work/add features/fix bugs in the **dev** branch;
* The code only migrates to the **main** branch to deploy releases and it's **DevOps's** responsability;
* Every time that there is a new feature to add or a bugfix to do, a **new** branch from the **dev** must be created;
* When there are more than one person working in a feature/bugfix, a branch may be also created for every major adition;
* Only confirm a pull request after, at least, another contributor checked it.

*Every rule can have some exceptions in specific cases* 

## Working Branch
Go to the **dev**elopment branch. 
```bash
git checkout dev
```

## Create a new branch
You are creating a branch either to work on a **feature** or a **bugfix**, for that you need to make a new branch with the following templates:
* `feature/<FEATURE_NAME>`
* `bugfix/<WHAT_YOU_ARE_FIXING>`

Both names need to be easy to understand of what is adding or what is fixing. Eg. **feature/menu**, **bugfix/menuLoading**.

#### Always check if you are in the **dev** branch!:
```bash
git branch
```

#### Finally, create the new branch:
```bash
git checkout -b feature/<placeholder>
```

*If you want to make a branch from a feature/bugfix, go to the desired branch and name it with the same beginning*

*Eg. feature/menu -> feature/menu/new_animation*

## Add and commit 
Try to add and commit every time you make big changes in important files
```bash
git add .
git commit -m "<message>"
```
## Rebasing
Before pushing you need to **rebase** with the **dev** branch so the **pull request** is possible

```bash
git rebase dev
```

If there are conflicts, you need to go to your editor and resolve them by selecting what do you want inside the **>>>HEAD   >>>branch** tags.

#### Every time you resolve a conflict do:
```bash
git add .
git commit -m "rebasing dev"
git rebase --continue
```
#### Now you can push
```bash
git push
```
#### If occurs an error pushing and you did the rebasing correctly do:
```bash
git push --force
```

## Pull Request
* Go to the repository and click in **Compare & pull request**;
* Choose the **dev** branch in the **base!!!!!!!!**;
* Click in **Create pull request**.

If you are certain of the changes click in **Merge pull request** otherwise wait for another developer to accept.

Finally, click in **Delete branch** and locally do:
```bash
git checkout dev
git branch -D <branch_to_delete>
```









