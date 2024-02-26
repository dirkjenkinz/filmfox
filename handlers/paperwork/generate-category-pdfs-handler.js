'use strict';

const url = require('url');
const fs = require('fs');
const path = require('path');
const { getFile } = require('../../services/file-service');
const { smartLog } = require('../../services/smart-log');
const pdf = require('pdf-creator-node');

// Function to generate Category PDF
const generateCategoryPDFsHandler = async (req, res) => {
    smartLog('info', 'Entering Generate Category PDFs Handler');
    const pdfOptions = {
        format: 'A4',
        orientation: 'portrait',
        border: '5mm',
        header: {
            height: '5mm',
        },
        footer: {
            height: '40mm',
            contents: {
                default: '<span style="color: #444;">{{page}}</span> of <span>{{pages}}</span>',
                last: 'Last Page',
            },
        },
    };
    const u = url.parse(req.originalUrl, true);
    const title = u.query.title;
    const sceneNumber = u.query.sceneNumber;
    const elementNumber = u.query.elementNumber;
    const filmFoxFile = await getFile(`${title}/${title}.fff`);
    const { breakdown } = filmFoxFile;

    const htmlPath = path.join(__dirname, '../../pages/templates/category.html');
    const html = fs.readFileSync(htmlPath, 'utf8');

    const sceneList = breakdown.map(scene => scene.map(category => category));

    const categories = sceneList[0].map(category => category[0]);

    const promises = categories.map(async (category) => {
        const output = [];
        sceneList.forEach((scene, sceneIndex) => {
            if (sceneIndex > 0) {
                scene.forEach((item) => {
                    if (item[0] === category) {
                        item.shift();
                        output.push([`SCENE ${sceneIndex}:`, item]);
                    }
                });
            }
        });

        const outPath = path.join(__dirname, `../../data/${title}/paperwork/breakdown/${category}.pdf`);
        const document = {
            html,
            data: { title, category, sceneList: output },
            path: outPath,
            type: '',
        };

        try {
            const result = await pdf.create(document, pdfOptions);
            smartLog('info', `Created Category PDF for ${category}: ${result.filename}`);
        } catch (error) {
            smartLog('error', error);
        }
    });

    await Promise.all(promises);

    const returnUrl = `/generate-paperwork?title=${title}&sceneNumber=${sceneNumber}&elementNumber=${elementNumber}`;
    res.redirect(returnUrl);
};

module.exports = { generateCategoryPDFsHandler };
