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
            default: '<span style="color: #444;">{{page}}</span> of <span>{{pages}}</span>', // fallback value
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
        smartLog('info', `created: ${result.filename}`);
    } catch (error) {
        smartLog('error', error);
    }
};

// Function to generate Category PDF
const categoryPDF = async (breakdown, title) => {
    const htmlPath = path.join(__dirname, '../../pages/templates/category.html');
    let html = fs.readFileSync(htmlPath, 'utf8');

    const categories = breakdown[0].map(line => [line[0].replace(' ', '_'), line]);

    categories.forEach(async (category) => {
        const categoryName = category[0];
        const sceneList = category.slice(1).map((scene, index) => {
            let items = `SCENE ${index + 1}: `;
            for (let i = 1; i < scene.length; i++) {
                items += `${scene[i]} - `;
            }
            return items;
        });

        const outPath = path.join(__dirname, `../../data/${title}/paperwork/breakdown/${categoryName}.pdf`);
        const document = {
            html: html,
            data: {
                title: title,
                category: categoryName,
                sceneList: sceneList
            },
            path: outPath,
            type: '',
        };

        try {
            const result = await pdf.create(document, pdfOptions);
            smartLog('info', `created: ${result.filename}`);
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
            scene: sceneNumber,
            slug: slug,
            lines: shotList.lines
        },
        path: outPath,
        type: '',
    };

    try {
        const result = await pdf.create(document, pdfOptions);
        smartLog('info', `created: ${result.filename}`);
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
    };

    try {
        const result = await pdf.create(document, pdfOptions);
        smartLog('info', `created: ${result.filename}`);
    } catch (error) {
        smartLog('error', error);
    }
};

module.exports = { masterListPDF, categoryPDF, shotListPDF, sheetPDF };
