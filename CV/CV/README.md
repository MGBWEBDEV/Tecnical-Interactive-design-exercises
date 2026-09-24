# CV app

## Back4App setup

1. Create a Back4App backend app and open **App Settings → Security & Keys**.
2. Copy `.env.example` to `.env.local` if the local file does not exist.
3. Fill in `VITE_BACK4APP_APPLICATION_ID` and `VITE_BACK4APP_JAVASCRIPT_KEY` in `.env.local`.
4. Run `npm install` and `npm run dev`. Restart the dev server after changing environment variables.

`.env.local` is ignored by Git. Vite exposes `VITE_` values in the browser bundle, so use only the Application ID and JavaScript Key here, never the Master Key. Control database access with Back4App class permissions and object ACLs.

The SDK initializes on startup when both keys are present. Access it from app code with:

```js
import { getBack4App } from './lib/back4app'

const Parse = getBack4App()
```

## Saving your CV

Each section keeps its own temporary draft: **Submit** applies it to the CV, and **Cancel** discards it. **Save CV** saves only submitted values, even if another section has an open draft. Opening or canceling a draft does not mark the CV as changed; submitting changed values, adding entries, and deleting entries do. Unsubmitted drafts are discarded when leaving the editor. The app stores general information, education, and experience in one `CV` record and updates that record on later saves. It loads the saved CV when opened again.

Visitors start in the editor without an account. Guest work stays in page memory, so refreshing before saving clears it. Clicking **Save CV** opens account creation; existing users can switch to login. **Back to my CV** keeps the current editor and its local drafts. After authentication, submitted guest values are restored; click **Save CV** again to persist them. If the account already has a CV, replacing it requires confirmation. Unsubmitted section drafts are not transferred when authentication succeeds. Parse restores signed-in sessions on refresh. Log out to clear the editor and session; unsaved edits require confirmation. Use the same credentials on another device to access your CV.

Existing anonymous users can choose Create account to add password credentials without changing their user ID or CV ownership. The anonymous provider remains linked because this backend rejects removing it during signup; `hasPasswordAccount` records that registration completed. This flag controls UI flow, while Parse session authentication and owner-only ACLs enforce data access. Logging into a different account does not migrate the anonymous CV.

Authentication uses [Parse.User signup, login, and logout](https://docs.parseplatform.org/js/guide/#users). Each CV retains an owner-only ACL.

Back4App must allow user signup and authenticated users to create, find, and update the `CV` class. The `_User` class uses a Boolean `hasPasswordAccount` field; add it in the dashboard if client field creation is disabled. If client class creation is disabled, create `CV` in the dashboard with `owner` (Pointer to `_User`), `generalInfo` (Object), `education` (Array), and `experience` (Array). Save failures preserve your current edits for retry; load failures block editing to avoid overwriting an existing CV.

## React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
