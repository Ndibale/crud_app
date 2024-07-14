# To recover all files lost in git use "git stash pop" command
#To start a project run "npm run dev"
<!-- To generate a random secret key -->
# require('crypto').randomBytes(64).toString('hex') is run on a terminal








If you have an empty folder that was pushed to GitHub, and there are also untracked folders, you can follow these steps to handle the situation:

1. **Remove the empty folder from the repository**:
   - Navigate to the directory containing the empty folder.
   - Use the `git rm -r` command to remove the empty folder:
     ```
     git rm -r empty_folder
     ```
   - Commit the changes:
     ```
     git commit -m "Remove empty folder"
     ```
   - Push the changes to the remote repository:
     ```
     git push
     ```

2. **Handle the untracked folders**:
   - Navigate to the directory containing the untracked folders.
   - Use the `git status` command to see the list of untracked folders:
     ```
     git status
     ```
   - For each untracked folder, you have two options:
     a. **Add the folder to the repository**:
        - Use the `git add` command to stage the folder for commit:
          ```
          git add untracked_folder
          ```
        - Commit the changes:
          ```
          git commit -m "Add untracked folder"
          ```
        - Push the changes to the remote repository:
          ```
          git push
          ```
     b. **Ignore the folder**:
        - Create a `.gitignore` file (if it doesn't already exist) in the root of your repository.
        - Add the untracked folder to the `.gitignore` file:
          ```
          untracked_folder/
          ```
        - Save the `.gitignore` file and commit the changes:
          ```
          git add .gitignore
          git commit -m "Ignore untracked folder"
          git push
          ```

By following these steps, you can remove the empty folder from the repository and handle the untracked folders either by adding them or ignoring them using the `.gitignore` file.