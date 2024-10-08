export class CSV {
    constructor(filePath) {
        this.filePath = filePath;
        this.data = [];
    }

    // Method to load and parse the CSV file
    async loadCSV() {
        const response = await fetch(this.filePath);
        if (!response.ok) {
            throw new Error("Network response was not ok");
        }
        const text = await response.text();
        this.data = this.parseCSV(text);
    }

    // Method to parse CSV text into an array of objects
    parseCSV(data) {
        const lines = data.split('\n').filter(Boolean); // Split by line and remove empty lines
        const headers = lines[0].split(','); // First row is the header
        const rows = lines.slice(1).map(line => {
            const values = line.split(',');
            let rowObj = {};
            headers.forEach((header, i) => {
                rowObj[header.trim()] = values[i] ? values[i].trim() : null; // Check for existence
            });
            return rowObj;
        });
        return rows;
    }
}

// Global variable to hold loaded data
let loadedData = [];

// Function to load CSV and keep it as a constant
export async function loadCSVData() {
    const csv = new CSV('data/p_estimation.csv');
    await csv.loadCSV(); // Load CSV file
    loadedData = csv.data; // Store loaded data
    return loadedData; // Return the loaded data
}

// Function to get loaded data
export function getLoadedData() {
    return loadedData;
}