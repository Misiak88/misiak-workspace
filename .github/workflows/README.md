# CI Workflows in NX Monorepo Misiak-Workspace

---

## 1. `ci-common.yml`

A **reusable workflow** containing all shared CI/CD logic for every app in the monorepo:

- **Permissions**:
  ```yaml
  permissions:
    contents: read
    packages: write
  ```
- **Trigger**: invoked via `workflow_call` from stub workflows.
- **Steps**:
    1. **Checkout** full Git history (`fetch-depth: 0`)
    2. **Setup Node.js** (v20)
    3. **Cache** dependencies (`~/.cache/yarn`, `node_modules`) and NX’s local cache (`.nx/cache`) via `actions/cache@v3`
    4. **Install** packages (`yarn install --frozen-lockfile`)
    5. **Lint** _(optional)_
       ```yaml
       - name: Lint ${{ inputs.project_name }}
         if: ${{ inputs.run_lint }}
         run: yarn nx run ${{ inputs.project_name }}:lint
       ```
    6. **Build**
       ```yaml
       - name: Build ${{ inputs.project_name }}
         run: yarn nx run ${{ inputs.project_name }}:build
       ```
    7. **Build & Push Docker** (multi-arch, on push to `master`):
        - QEMU setup
        - Docker Buildx
        - Login to GHCR (uses `GHCR_PAT` secret)
        - Build & push the image at `inputs.workspace_path`/Dockerfile to `inputs.docker_image:latest`

### Inputs

| Input            | Type    | Description                                        | Default        |
|------------------|---------|----------------------------------------------------|----------------|
| `project_name`   | string  | NX project name (e.g. `hello-world`)               | _(required)_   |
| `workspace_path` | string  | Path to the app folder (e.g. `apps/hello-world`)   | _(required)_   |
| `docker_image`   | string  | GHCR image name without tag (e.g. `ghcr.io/owner/hello-world`) | _(required)_   |
| `run_lint`       | boolean | Whether to run the lint step                       | `true`         |

---

## 2. Example: `ci-hello-world.yml`

A **stub workflow** for the `hello-world` app. Triggers `ci-common.yml` when relevant files change and **skips** linting by setting `run_lint: false`.

```yaml
#############################
# Hello-World               #
#############################

name: CI Hello-World

permissions:
  contents: read
  packages: write

on:
  pull_request:
    branches: [ master ]
    paths:
      - 'apps/hello-world/**'
      - 'apps/hello-world-e2e/**'
      - '.github/workflows/ci-common.yml'
      - '.github/workflows/ci-hello-world.yml'
  push:
    branches: [ master ]
    paths:
      - 'apps/hello-world/**'
      - 'apps/hello-world-e2e/**'
      - '.github/workflows/ci-common.yml'
      - '.github/workflows/ci-hello-world.yml'

jobs:
  call-common:
    uses: ./.github/workflows/ci-common.yml
    with:
      project_name: hello-world
      workspace_path: apps/hello-world
      docker_image: ghcr.io/${{ github.repository_owner }}/hello-world
      run_lint: false    # skip lint for hello-world
    secrets:
      GHCR_PAT: ${{ secrets.GHCR_PAT }}
```

---

## 3. Template for a New App

To add CI for a new app (e.g. `my-app`):

1. **Create** a new file:  
   `.github/workflows/ci-my-app.yml`
2. **Copy & adjust** this stub:

   ```yaml
   #############################
   # My-App                    #
   #############################

   name: CI My-App

   permissions:
     contents: read
     packages: write

   on:
     pull_request:
       branches: [ master ]
       paths:
         - 'apps/my-app/**'
         - 'apps/my-app-e2e/**'    # if you have e2e tests
         - '.github/workflows/ci-common.yml'
         - '.github/workflows/ci-my-app.yml'
     push:
       branches: [ master ]
       paths:
         - 'apps/my-app/**'
         - 'apps/my-app-e2e/**'
         - '.github/workflows/ci-common.yml'
         - '.github/workflows/ci-my-app.yml'

   jobs:
     call-common:
       uses: ./.github/workflows/ci-common.yml
       with:
         project_name: my-app
         workspace_path: apps/my-app
         docker_image: ghcr.io/${{ github.repository_owner }}/my-app
         run_lint: true      # default true; set to false to skip lint
       secrets:
         GHCR_PAT: ${{ secrets.GHCR_PAT }}
   ```
3. **Commit & merge** your new stub. CI will now run only when files under `apps/my-app/` change.
