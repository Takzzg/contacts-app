# contacts-app

This is an exercise project, part of an interview for Front.id

### Visit Deployment here: https://contacts-app-guidoq.vercel.app

## About this app

The goal of this project was to create a simple contacts app using drag and drop functionality. The app is divided in two vertical sections, "Groups" and "Contacts" respectively.

Data is saved to localStorage, so the information can persist through page reloads

Contact information is fetched from https://randomuser.me/api

### Groups

In this section you can see all the groups created with their respective details, and manage each separately. Each group exposes buttons to edit and delete the group in question, as well as a dropdown that can be used to filter the contacts list, showing only the contacts who are in said group

Using the buttons at the top, you can:
- create a new empty group
- delete all groups

### Contacts

Here you can see all the contacts created so far, as well as editing and deleting each contact separately. Each contact card also exposes buttons for editing and deleting said contact

Using the buttons at the top, you can:
- create a new user, with full control over each property
- create 10 new users, each with randomized properties
- delete all contacts

To add a contact to a group, simply drag and drop the contact over the desired group

## Dependencies

- styled-components - https://styled-components.com/
- react-dnd - https://react-dnd.github.io/react-dnd/about
- lorem-ipsum - https://github.com/knicklabs/lorem-ipsum.js#readme

## How to run locally

1. Clone repository `git clone https://github.com/Takzzg/contacts-app.git`

2. Move into root folder `cd contacts-app`

3. Install dependencies `npm install`

4. Run dev server `npm run dev`

5. Open http://localhost:3000 in your browser

--- 

<details>
<summary>Update 2025</summary>

- fix images not working on deployment (use unoptimized tag)
- remove unnecessary images domain from next.config.js
- sort contacts section top buttons
- update README.md
</details>

---

<details>
    <summary>Original Next.js README.md</summary>

### This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.js`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.js`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
</details>