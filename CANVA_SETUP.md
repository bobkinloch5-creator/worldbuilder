# Canva App Setup Guide

This guide explains how to upload and configure your custom Canva App for **SL World Builder**.

## 1. Project Location

The underlying code for your Canva App is located in:
`second-life-world-builder/canva-app`

This directory has been pushed to your GitHub repository:
[https://github.com/bobkinloch5-creator/worldbuilder](https://github.com/bobkinloch5-creator/worldbuilder)

## 2. Prepare for Upload

Wait, the starter kit builds a `dist/app.js` file.

If you want to view/edit the code locally:
1.  Open terminal in `second-life-world-builder/canva-app`.
2.  Run `npm install` (dependencies are already installed).
3.  Run `npm start` to get a local preview URL.
4.  Paste that URL into the **Development URL** field in the Canva Developer Portal.

## 3. Upload for Submission

To share with others or submit:
1.  Run `npm run build` locally.
2.  Go to the **Canva Developer Portal**: [https://www.canva.com/developers/apps](https://www.canva.com/developers/apps)
3.  Click on your app (ID: `AAHAAOlTPK4`).
4.  Go to **Code upload**.
5.  Upload the `dist/app.js` file.

## 5. Website Integration (Canva Connect API)

To enable the "Connect Canva Pro" button on your website, you need distinct API credentials.

1.  Go to the **Canva Developer Portal**: [https://www.canva.com/developers/integrations](https://www.canva.com/developers/integrations)
2.  Click **Create an integration** (or select your existing one).
3.  Copy the **Client ID** and generate a **Client Secret**.
4.  Open the file `second-life-world-builder/.env.local` in your project.
5.  Paste them into the placeholders:
    ```env
    CANVA_CLIENT_ID=your_client_id
    CANVA_CLIENT_SECRET=your_client_secret
    ```
6.  Set the **Redirect URL** in the Canva integration settings to:
    `http://localhost:3000/api/canva/callback`

## 6. Using the App

Once uploaded and previewed:
1.  Open a design in Canva.
2.  Find your app in the "Apps" sidebar (under "Your apps").
3.  Click it to open the SL World Builder panel.
4.  Choose an asset type, click prompts to insert them, or use the link to open the full website.
