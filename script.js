document.addEventListener('DOMContentLoaded', () => {
    // Collapsible sections
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

    // Single NFT JSON Builder Code
    const jsonForm = document.getElementById('jsonForm');
    const jsonPreview = document.getElementById('jsonPreview');
    const downloadButton = document.getElementById('downloadJson');
    const addAttributeButton = document.getElementById('addAttributeButton');
    const clearAllDataButton = document.getElementById('clearAllDataButton');
    const attributesContainer = document.getElementById('attributesContainer');

    let attributeCount = 2;

    const updateJsonPreview = () => {
        const formData = new FormData(jsonForm);
        const jsonObject = {
            name: formData.get('name'),
            description: formData.get('description'),
            image: formData.get('image'),
            attributes: []
        };
        for (let i = 1; i <= attributeCount; i++) {
            const traitType = formData.get(`trait_type_${i}`);
            const value = formData.get(`value_${i}`);
            if (traitType && value) {
                jsonObject.attributes.push({
                    trait_type: traitType,
                    value: value
                });
            }
        }
        jsonPreview.textContent = JSON.stringify(jsonObject, null, 4);
    };

    const addAttributeField = () => {
        if (attributeCount < 10) {
            attributeCount++;
            const attributeFieldHtml = `
                <div class="mb-2">
                    <input type="text" id="trait_type_${attributeCount}" name="trait_type_${attributeCount}" placeholder="Trait Type ${attributeCount}" class="w-full p-2 border border-gray-300 rounded input-field mb-2">
                    <input type="text" id="value_${attributeCount}" name="value_${attributeCount}" placeholder="Value ${attributeCount}" class="w-full p-2 border border-gray-300 rounded input-field">
                </div>
                <div class="divider"></div>
            `;
            attributesContainer.insertAdjacentHTML('beforeend', attributeFieldHtml);

            // Add event listeners to new fields to update JSON preview on input
            document.getElementById(`trait_type_${attributeCount}`).addEventListener('input', updateJsonPreview);
            document.getElementById(`value_${attributeCount}`).addEventListener('input', updateJsonPreview);

            // Update the JSON preview after adding the new fields
            updateJsonPreview();
        }
    };

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

    jsonForm.addEventListener('input', updateJsonPreview);
    addAttributeButton.addEventListener('click', addAttributeField);
    clearAllDataButton.addEventListener('click', clearAllData);

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

    updateJsonPreview();

    // Crowdfund Form Code
    const crowdfundForm = document.getElementById('crowdfundForm');
    const jsonPreviewCrowdfund = document.getElementById('jsonPreviewCrowdfund');
    const downloadButtonCrowdfund = document.getElementById('downloadJsonCrowdfund');
    const addTokenButton = document.getElementById('addToken');
    const clearAllCrowdfundDataButton = document.getElementById('clearAllCrowdfundDataButton');
    const tokenFieldsContainer = document.getElementById('tokenFields');

    let tokenCount = 1;

    const updateCrowdfundJsonPreview = () => {
        const formData = new FormData(crowdfundForm);

        const tokens = [];
        for (let i = 1; i <= tokenCount; i++) {
            const publisher = formData.get(`publisher_${i}`);
            const tokenId = formData.get(`token_id_${i}`);
            const tokenUri = formData.get(`token_uri_${i}`);
            if (publisher && tokenId && tokenUri) {
                tokens.push({
                    extension: {
                        publisher: publisher
                    },
                    token_id: tokenId,
                    token_uri: tokenUri
                });
            }
        }

        const jsonObject = {
            mint: tokens,
            $type: "mint",
            $version: "0.2.1",
            $class: "modifier",
            $classifier: "",
            $enabled: true,
            $removable: false,
            $required: true
        };

        jsonPreviewCrowdfund.textContent = JSON.stringify(jsonObject, null, 4);
    };

    const addTokenField = () => {
        if (tokenCount < 10) {
            tokenCount++;
            const tokenFieldHtml = `
                <div class="mb-4 p-4 border border-gray-300 rounded">
                    <h3 class="text-lg font-bold mb-2">Token ${tokenCount}</h3>
                    <div class="mb-4">
                        <label class="block text-gray-400">Publisher</label>
                        <input type="text" id="publisher_${tokenCount}" name="publisher_${tokenCount}" class="w-full p-2 border border-gray-300 rounded input-field" placeholder="Enter publisher information">
                    </div>
                    <div class="mb-4">
                        <label class="block text-gray-400">Token ID</label>
                        <input type="text" id="token_id_${tokenCount}" name="token_id_${tokenCount}" class="w-full p-2 border border-gray-300 rounded input-field" placeholder="Enter Token ID ${tokenCount}">
                    </div>
                    <div class="mb-4">
                        <label class="block text-gray-400">Token URI</label>
                        <input type="text" id="token_uri_${tokenCount}" name="token_uri_${tokenCount}" class="w-full p-2 border border-gray-300 rounded input-field" placeholder="Enter Token URI ${tokenCount}">
                    </div>
                </div>
            `;
            tokenFieldsContainer.insertAdjacentHTML('beforeend', tokenFieldHtml);

            // Add event listeners to new fields to update JSON preview on input
            document.getElementById(`publisher_${tokenCount}`).addEventListener('input', updateCrowdfundJsonPreview);
            document.getElementById(`token_id_${tokenCount}`).addEventListener('input', updateCrowdfundJsonPreview);
            document.getElementById(`token_uri_${tokenCount}`).addEventListener('input', updateCrowdfundJsonPreview);

            // Update the JSON preview after adding the new fields
            updateCrowdfundJsonPreview();
        }
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

    crowdfundForm.addEventListener('input', updateCrowdfundJsonPreview);
    addTokenButton.addEventListener('click', addTokenField);
    clearAllCrowdfundDataButton.addEventListener('click', clearAllCrowdfundData);

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

    updateCrowdfundJsonPreview();

    // Standard cw721 ADO Batch Mint Form Code
    const standardBatchMintForm = document.getElementById('standardBatchMintForm');
    const jsonPreviewStandardBatchMint = document.getElementById('jsonPreviewStandardBatchMint');
    const downloadButtonStandardBatchMint = document.getElementById('downloadJsonStandardBatchMint');
    const addStandardTokenButton = document.getElementById('addStandardToken');
    const clearAllStandardDataButton = document.getElementById('clearAllStandardDataButton');
    const standardTokenFieldsContainer = document.getElementById('standardTokenFields');

    let standardTokenCount = 1;

    const updateStandardBatchMintJsonPreview = () => {
        const formData = new FormData(standardBatchMintForm);

        const tokens = [];
        for (let i = 1; i <= standardTokenCount; i++) {
            const tokenId = formData.get(`standard_token_id_${i}`);
            const owner = formData.get(`standard_owner_${i}`);
            const tokenUri = formData.get(`standard_token_uri_${i}`);
            const publisher = formData.get(`standard_publisher_${i}`);
            if (tokenId && owner && tokenUri && publisher) {
                tokens.push({
                    token_id: tokenId,
                    owner: owner,
                    token_uri: tokenUri,
                    extension: {
                        publisher: publisher
                    }
                });
            }
        }

        const jsonObject = {
            batch_mint: {
                tokens: tokens
            }
        };

        jsonPreviewStandardBatchMint.textContent = JSON.stringify(jsonObject, null, 4);
    };

    const addStandardTokenField = () => {
        if (standardTokenCount < 10) {
            standardTokenCount++;
            const tokenFieldHtml = `
                <div class="mb-4 p-4 border border-gray-300 rounded">
                    <h3 class="text-lg font-bold mb-2">Token ${standardTokenCount}</h3>
                    <div class="mb-4">
                        <label class="block text-gray-400">Token ID</label>
                        <input type="text" id="standard_token_id_${standardTokenCount}" name="standard_token_id_${standardTokenCount}" class="w-full p-2 border border-gray-300 rounded input-field" placeholder="Enter Token ID ${standardTokenCount}">
                    </div>
                    <div class="mb-4">
                        <label class="block text-gray-400">Owner</label>
                        <input type="text" id="standard_owner_${standardTokenCount}" name="standard_owner_${standardTokenCount}" class="w-full p-2 border border-gray-300 rounded input-field" placeholder="Enter Owner Address ${standardTokenCount}">
                    </div>
                    <div class="mb-4">
                        <label class="block text-gray-400">Token URI</label>
                        <input type="text" id="standard_token_uri_${standardTokenCount}" name="standard_token_uri_${standardTokenCount}" class="w-full p-2 border border-gray-300 rounded input-field" placeholder="Enter Token URI ${standardTokenCount}">
                    </div>
                    <div class="mb-4">
                        <label class="block text-gray-400">Publisher</label>
                        <input type="text" id="standard_publisher_${standardTokenCount}" name="standard_publisher_${standardTokenCount}" class="w-full p-2 border border-gray-300 rounded input-field" placeholder="Enter Publisher">
                    </div>
                </div>
            `;
            standardTokenFieldsContainer.insertAdjacentHTML('beforeend', tokenFieldHtml);

            // Add event listeners to new fields to update JSON preview on input
            document.getElementById(`standard_token_id_${standardTokenCount}`).addEventListener('input', updateStandardBatchMintJsonPreview);
            document.getElementById(`standard_owner_${standardTokenCount}`).addEventListener('input', updateStandardBatchMintJsonPreview);
            document.getElementById(`standard_token_uri_${standardTokenCount}`).addEventListener('input', updateStandardBatchMintJsonPreview);
            document.getElementById(`standard_publisher_${standardTokenCount}`).addEventListener('input', updateStandardBatchMintJsonPreview);

            // Update the JSON preview after adding the new fields
            updateStandardBatchMintJsonPreview();
        }
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

    standardBatchMintForm.addEventListener('input', updateStandardBatchMintJsonPreview);
    addStandardTokenButton.addEventListener('click', addStandardTokenField);
    clearAllStandardDataButton.addEventListener('click', clearAllStandardData);

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

    updateStandardBatchMintJsonPreview();
});
