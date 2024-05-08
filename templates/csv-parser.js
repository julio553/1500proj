const express = require('express');
const { createObjectCsvWriter } = require('csv-writer');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

app.use(bodyParser.json());

// Rota para lidar com a escrita da mensagem no arquivo CSV
app.post('/write-message', (req, res) => {
    const message = req.body;

    // Escreva a mensagem no arquivo CSV
    const csvWriter = createObjectCsvWriter({
        path: 'messages.csv',
        header: ['conversationId', 'message', 'role', 'timestamp'],
        append: true
    });

    csvWriter.writeRecords([message])
        .then(() => {
            console.log('The message was written successfully');
            res.sendStatus(200);
        })
        .catch(error => {
            console.error('Error writing message:', error);
            res.sendStatus(500);
        });
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});