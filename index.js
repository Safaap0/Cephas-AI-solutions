<script src="https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.10.377/pdf.min.js"></script>


async function getPdfPath() {
// Hardcoded file path
const filePath = 'files/Computer Network- - part 1.pdf';
return filePath;
}

async function searchInPdf(pdfPath, searchTerm, contextLength = 100) {
try {
    const pdf = await pdfjsLib.getDocument(pdfPath).promise;
    const numPages = pdf.numPages;
    let found = false;
    let resultText = '';

    for (let pageNum = 1; pageNum <= numPages; pageNum++) {
        const page = await pdf.getPage(pageNum);
        const textContent = await page.getTextContent();
        let text = '';

        textContent.items.forEach(item => {
            text += item.str + ' ';
        });

        const regex = new RegExp(searchTerm, 'ig');
        let match;
        while ((match = regex.exec(text)) !== null) {
            const startIndex = match.index + match[0].length;
            const endIndex = startIndex + contextLength;
            const context = text.substring(startIndex, endIndex);
            resultText += `Found '${searchTerm}' on page ${pageNum}: ${context}\n`;
            found = true;
        }
    }

    if (!found) {
        resultText = `'${searchTerm}' It is not found in the document. Please wait until the new version is available.`;
    }

    document.getElementById('Res_Q').value = resultText;
} catch (err) {
    document.getElementById('Res_Q').value = `An error occurred: ${err.message}`;
}
}

document.querySelector('.rr').addEventListener('click', async () => {
const searchTerm = document.getElementById('Ent_Q').value;
const pdfPath = await getPdfPath();
if (pdfPath) {
    await searchInPdf(pdfPath, searchTerm);
} else {
    document.getElementById('Res_Q').value = 'No file selected.';
}
});

