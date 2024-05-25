# JSON-form-builder
 Andromeda NFT JSON file builder
# Andromeda NFT JSON Builder Documentation

## Overview

The Andromeda NFT JSON Builder is a web application designed to generate JSON files for different types of NFT metadata. This application includes three main forms:
1. **Individual cw721 JSON Metadata JSON file**
2. **Crowdfund cw721 Batch Mint**
3. **Standard cw721 ADO Batch Mint**

Each form allows users to input data, preview the generated JSON in real-time, and download the JSON files. The application ensures a seamless user experience by mirroring the toggle behavior between the input form and the JSON preview.

## Table of Contents

1. [Setup Instructions](#setup-instructions)
2. [Application Structure](#application-structure)
3. [Form Functionality](#form-functionality)
4. [Event Listeners](#event-listeners)
5. [Helper Functions](#helper-functions)
6. [Collapsible Sections](#collapsible-sections)
7. [Clear All Data](#clear-all-data)
8. [JSON Download](#json-download)

## Setup Instructions

1. **Clone the repository:**
    ```bash
    git clone https://github.com/your-repo/andromeda-nft-json-builder.git
    cd andromeda-nft-json-builder
    ```

2. **Open the project:**
    Open `index.html` in a web browser to start the application.

## Application Structure

### HTML (index.html)

The HTML file contains the structure of the web application, including the form fields and JSON preview sections. It uses Tailwind CSS for styling and Google Fonts for typography.

### CSS

Inline CSS and external links are used to style the application. Key styles include background colors, font colors, border styles, and padding.

### JavaScript (script.js)

The JavaScript file handles the functionality of the application, including form data handling, JSON generation, and event handling.

## Form Functionality

### Individual cw721 JSON Metadata JSON file

- **Fields:**
  - Name
  - Description
  - Image URL
  - Attributes (Trait Type and Value)

- **Features:**
  - Add up to 10 attributes.
  - Real-time JSON preview.
  - Clear all data button.

### Crowdfund cw721 Batch Mint

- **Fields:**
  - Publisher
  - Token ID
  - Token URI

- **Features:**
  - Add up to 10 tokens.
  - Real-time JSON preview.
  - Clear all data button.

### Standard cw721 ADO Batch Mint

- **Fields:**
  - Token ID
  - Owner
  - Token URI
  - Publisher

- **Features:**
  - Add up to 10 tokens.
  - Real-time JSON preview.
  - Clear all data button.

## Event Listeners

The application uses event listeners to handle user interactions and update the JSON preview dynamically.

### Collapsible Sections

Each section (form and corresponding JSON preview) is collapsible. Clicking the section title toggles the visibility of the section content. The toggle state is mirrored between the left (form) and right (preview) sections.

### Form Inputs

Event listeners on form inputs update the corresponding JSON preview in real-time.

### Add Attribute/Token

Buttons to add attributes or tokens dynamically create new input fields and update the JSON preview.

### Clear All Data

Buttons to clear all data reset the form fields and update the JSON preview.

### JSON Download

Buttons to download the JSON file create a Blob object from the JSON string and initiate a download.

## Helper Functions

### `updateJsonPreview()`

Updates the JSON preview for the Individual cw721 JSON Metadata JSON file form.

### `addAttributeField()`

Adds a new attribute input field to the Individual cw721 JSON Metadata JSON file form.

### `clearAllData()`

Clears all data from the Individual cw721 JSON Metadata JSON file form and updates the JSON preview.

### `updateCrowdfundJsonPreview()`

Updates the JSON preview for the Crowdfund cw721 Batch Mint form.

### `addTokenField()`

Adds a new token input field to the Crowdfund cw721 Batch Mint form.

### `clearAllCrowdfundData()`

Clears all data from the Crowdfund cw721 Batch Mint form and updates the JSON preview.

### `updateStandardBatchMintJsonPreview()`

Updates the JSON preview for the Standard cw721 ADO Batch Mint form.

### `addStandardTokenField()`

Adds a new token input field to the Standard cw721 ADO Batch Mint form.

### `clearAllStandardData()`

Clears all data from the Standard cw721 ADO Batch Mint form and updates the JSON preview.

## Collapsible Sections

The sections in the left column (input forms) are collapsible, and their state (open/close) is mirrored on the right column (JSON preview).

### Implementation

```javascript
const collapsibles = document.querySelectorAll('.collapsible');
collapsibles.forEach(collapsible => {
    collapsible.addEventListener('click', () => {
        collapsible.classList.toggle('open');
        const content = collapsible.nextElementSibling;
        content.classList.toggle('open');

        // Find corresponding section on the other side and toggle it as well
        const index = Array.from(collapsibles).indexOf(collapsible);
        const correspondingPreview = document.querySelectorAll('.json-preview .collapsible')[index];
        if (correspondingPreview) {
            correspondingPreview.classList.toggle('open');
            const correspondingContent = correspondingPreview.nextElementSibling;
            correspondingContent.classList.toggle('open');
        }
    });
});
```

## Clear All Data

Each form section includes a "Clear All Data" button that resets the form fields and updates the JSON preview.

### Implementation

```javascript
const clearAllData = () => {
    jsonForm.reset();
    attributesContainer.innerHTML = `
        <div class="mb-2">
            <input type="text" id="trait_type_1" name="trait_type_1" placeholder="Trait Type 1" class="w-full p-2 border border-gray-300 rounded input-field mb-2">
            <input type="text" id="value_1" name="value_1" placeholder="Value 1" class="w-full p-2 border border-gray-300 rounded input-field">
        </div>
        <div class="divider"></div>
        <div class="mb-2">
            <input type="text" id="trait_type_2" name="trait_type_2" placeholder="Trait Type 2" class="w-full p-2 border border-gray-300 rounded input-field mb-2">
            <input type="text" id="value_2" name="value_2" placeholder="Value 2" class="w-full p-2 border border-gray-300 rounded input-field">
        </div>
        <div class="divider"></div>
    `;
    attributeCount = 2;
    updateJsonPreview();
};

const clearAllCrowdfundData = () => {
    crowdfundForm.reset();
    tokenFieldsContainer.innerHTML = `
        <div class="mb-4 p-4 border border-gray-300 rounded">
            <h3 class="text-lg font-bold mb-2">Token 1</h3>
            <div class="mb-4">
                <label class="block text-gray-400">Publisher</label>
                <input type="text" id="publisher_1" name="publisher_1" class="w-full p-2 border border-gray-300 rounded input-field" placeholder="Enter publisher information">
            </div>
            <div class="mb-4">
                <label class="block text-gray-400">Token ID</label>
                <input type="text" id="token_id_1" name="token_id_1" class="w-full p-2 border border-gray-300 rounded input-field" placeholder="Enter Token ID 1">
            </div>
            <div class="mb-4">
                <label class="block text-gray-400">Token URI</label>
                <input type="text" id="token_uri_1" name="token_uri_1" class="w-full p-2 border border-gray-300 rounded input-field" placeholder="Enter Token URI 1">
            </div>
        </div>
    `;
    tokenCount = 1;
    updateCrowdfundJsonPreview();
};

const clearAllStandardData = () => {
    standardBatchMintForm.reset();
    standardTokenFieldsContainer.innerHTML = `
        <div class="mb-4 p-4 border border-gray-300 rounded">
            <h3 class="text-lg font-bold mb-2">Token 1</h3>
            <div class="mb-4">
                <label class="block text-gray-400">Token ID</label>
                <input type="text" id="standard_token_id_1" name="standard_token_id_1" class="w-full p-2 border border-gray-300 rounded input-field" placeholder="Enter Token ID 1">
            </div>
            <div class="mb-4">
                <label class="block text-gray-400">Owner</label>
                <input type="text" id="standard_owner_1" name="standard_owner_1" class="w-full p-2 border border-gray-300 rounded input-field" placeholder="Enter Owner Address 1">
            </div>
            <div class="mb-4">
                <label class="block text-gray-400">Token URI</label>
                <input type="text" id="standard_token_uri_1" name="standard_token_uri_1" class="w-full p-2 border border-gray-300 rounded input-field" placeholder="Enter Token URI 1">
            </div>
            <div class="mb-4">
                <label class="block text-gray-400">Publisher</label>
                <input type="text" id="standard_publisher_1" name="standard_publisher_1" class="w-full p-2 border border-gray-300 rounded input-field" placeholder="Enter Publisher">
            </div>
        </div>
    `;
    standardTokenCount = 1;
    updateStandardBatchMintJsonPreview();
};
```

## JSON Download

Each form section includes a "Download JSON" button that generates a JSON file from the preview and initiates a download.

### Implementation

```javascript
downloadButton.addEventListener('click', () => {
    const jsonStr = jsonPreview.textContent;
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'individual_nft.json';
    a.click();
    URL.revokeObjectURL(url);
});

downloadButtonCrowdfund.addEventListener('click', () => {
    const jsonStr = jsonPreviewCrowdfund.textContent;
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'crowdfund_batch_mint.json';
    a.click();
    URL.revokeObjectURL(url);
});

downloadButtonStandardBatchMint.addEventListener('click', () => {
    const jsonStr = jsonPreviewStandardBatchMint.textContent;
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'standard_batch_mint.json';
    a.click();
    URL.revokeObjectURL(url);
});
```

## Conclusion

The Andromeda NFT JSON Builder provides an intuitive and dynamic interface for creating JSON files for various NFT metadata standards. By mirroring toggle behaviors and providing real-time previews, the application ensures a seamless user experience. The provided helper functions and event listeners handle the core functionalities, ensuring data consistency and ease of use. This documentation serves as a comprehensive guide to understanding and extending the application's functionalities.
