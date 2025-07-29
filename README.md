# Flows Community Registry

This repository manages the official Flows community app registry, available at <https://registry.useflows.com/community>.

Community apps are applications contributed by the community and curated by Spacelift. Spacelift however does not endorse or support these apps, and they are not covered by Spacelift's quality and support policies.

## 🚀 How to Publish a Community App

### Step 1: Create Your App

Start with our community app template:

- Visit <https://github.com/spacelift-io/flows-app-template>
- Follow the template instructions to create your app

### Step 2: Publish Your First Version

Once your app is ready:

- Follow the template's publishing guide
- Ensure at least one version is successfully published

### Step 3: Add to Registry

To include your app in the community registry:

1. **Fork this repository**
2. **Create a new branch** in your fork
3. **Create a new directory** under `apps/` with your app name
4. **Add required files**:
   - `manifest.json` - App metadata and configuration
   - `logo.svg` or `logo.png` - App icon
5. **Open a pull request** against the `main` branch

Look at existing apps in the `apps/` directory for examples.

## 🔄 Registry Updates

The registry requires manual synchronization after changes are made:

1. **Run the "Generate registry" workflow** from the Actions tab
2. This will:
   - Process **app manifests** from the `apps/` directory
   - Upload **icons** to cloud storage
   - Generate and publish the **registry index**

Registry synchronization is performed by Spacelift team members.

The live registry is available at <https://registry.useflows.com/community>
