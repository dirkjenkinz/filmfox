'use strict';

const fs = require('fs');
const path = require('path');
const { smartLog } = require('../../services/smart-log');
const pdf = require('pdf-creator-node');

// PDF creation options
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
            last: 'Last Page'
        }
    }
};

// Function to generate MasterList PDF
const masterListPDF = async (breakdown, title) => {
    const htmlPath = path.join(__dirname, '../../pages/templates/masterList.html');
    const outPath = path.join(__dirname, `../../data/${title}/paperwork/breakdown/MasterList.PDF`);
    let html = fs.readFileSync(htmlPath, 'utf8');

    const lines = breakdown.flatMap((entity, index) => [
        `SCENE ${index}`,
        ...entity,
        '-------------------------------------------------'
    ]);

    const document = {
        html: html,
        data: {
            title: title,
            lines: lines
        },
        path: outPath,
        type: '',
    };

    try {
        const result = await pdf.create(document, pdfOptions);
        smartLog('info', `Created MasterList PDF: ${result.filename}`);
    } catch (error) {
        smartLog('error', error);
    }
};

// Function to generate Category PDF
const categoryPDF = async (breakdown, title) => {
    const htmlPath = path.join(__dirname, '../../pages/templates/category.html');
    let html = fs.readFileSync(htmlPath, 'utf8');

    const sceneList = breakdown.map(scene => scene.map(category => category));

    const categories = sceneList[0].map(category => category[0]);

    categories.forEach(async (category) => {
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
            html: html,
            data: {
                title: title,
                category: category,
                sceneList: output
            },
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
};

// Function to generate ShotList PDF
const shotListPDF = async (shotList, title, sceneNumber, slug) => {
    pdfOptions.orientation = 'landscape';
    let fileName = '0000' + sceneNumber;
    fileName = 'shots' + fileName.substring(fileName.length - 4) + '.pdf';

    const htmlPath = path.join(__dirname, '../../pages/templates/shots.html');
    const outPath = path.join(__dirname, `../../data/${title}/paperwork/shots/${fileName}`);
    let html = fs.readFileSync(htmlPath, 'utf8');

    const document = {
        html: html,
        data: {
            title: title,
            scene: sceneNumber,
            slug: slug,
            lines: shotList.lines
        },
        path: outPath,
        type: '',
    };

    try {
        const result = await pdf.create(document, pdfOptions);
        smartLog('info', `Created ShotList PDF: ${result.filename}`);
    } catch (error) {
        smartLog('error', error);
    }
};

// Function to generate Sheet PDF
const sheetPDF = async (breakdown, script, title, sceneNumber, shotList) => {
    let fileName = '0000' + sceneNumber;
    fileName = 'sheet' + fileName.substring(fileName.length - 4) + '.pdf';
    const htmlPath = path.join(__dirname, '../../pages/templates/sheet.html');
    const outPath = path.join(__dirname, `../../data/${title}/paperwork/sheets/${fileName}`);
    let html = fs.readFileSync(htmlPath, 'utf8');

    const entities = breakdown.map(entity =>
        entity.map((item, index) => (index === 0 ? `${item.toUpperCase()}:` : `${item}, `))
    );

    const document = {
        html: html,
        data: {
            title: title,
            sceneNumber: sceneNumber,
            slug: script[0].dialogue,
            note: shotList.note,
            entities: entities
        },
        path: outPath,
        type: '',
        header: {
            height: '20mm',  // Adjust the height as needed
            contents: '<img src="../../images/film_fox_logo" style="width: 100%;" />'
        }
    };
    try {
        const result = await pdf.create(document, pdfOptions);
        smartLog('info', `Created Sheet PDF: ${result.filename}`);
    } catch (error) {
        smartLog('error', error);
    }
};

module.exports = { masterListPDF, categoryPDF, shotListPDF, sheetPDF };
