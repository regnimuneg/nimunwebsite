# Google Sheets Wave Setup Guide

To support automatic form closing and wave-specific pricing, you need to update the Google Apps Script running at your `NEXT_PUBLIC_APPLY_WEBHOOK`.

---

## Step 1: Update Your Google Apps Script Code

1. Open your [Google Apps Script Project](https://script.google.com).
2. Open the script file (usually `Code.gs`) that runs your form webhook.
3. Replace the code with the following upgraded script:

```javascript
// Upgraded Webhook with Cumulative Wave limits, Dynamic Settings, Source, & Leading Zero Protection

const SPREADSHEET_ID = '1SYTajCxjmDt8r01d-I4lsx-nxBRJU6qWs_FAAT6JmKY';
const SHEET_GID = 898388453;
const DUPLICATE_CHECK_COLUMNS = ['Email Address', 'Phone Number'];

// Helper to open the spreadsheet safely
function getSpreadsheet() {
  try {
    return SpreadsheetApp.getActiveSpreadsheet() || SpreadsheetApp.openById(SPREADSHEET_ID);
  } catch (e) {
    return SpreadsheetApp.openById(SPREADSHEET_ID);
  }
}

function doGet(e) {
  try {
    const waveInfo = getActiveWaveInfo();
    return ContentService.createTextOutput(JSON.stringify({ 
      ok: true, 
      ...waveInfo
    })).setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({ 
      ok: false, 
      error: error.toString() 
    })).setMimeType(ContentService.MimeType.JSON);
  }
}

function doPost(e) {
  try {
    const payload = JSON.parse(e.postData.contents);
    const answers = payload.answers || {};
    
    // Check if form is open and get active wave info
    const waveInfo = getActiveWaveInfo();
    if (!waveInfo.isOpen) {
      return ContentService.createTextOutput(JSON.stringify({ 
        ok: false, 
        error: waveInfo.reason || 'The application limit for ' + waveInfo.activeWave + ' has been reached.'
      })).setMimeType(ContentService.MimeType.JSON);
    }
    
    const ss = getSpreadsheet();
    // Use "Applications" sheet or the first sheet in the spreadsheet
    let sheet = ss.getSheetByName("Applications") || ss.getSheets()[0];
    
    // Duplicate check validation
    if (isDuplicateSubmission(sheet, answers)) {
      return ContentService.createTextOutput(JSON.stringify({ 
        ok: false, 
        error: 'An application with this Email Address or Phone Number has already been submitted.' 
      })).setMimeType(ContentService.MimeType.JSON);
    }
    
    // Get existing headers
    let headers = [];
    if (sheet.getLastRow() > 0) {
      headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];
    }
    
    // Create lowercase, trimmed list of existing headers for flexible matching
    const cleanHeaders = headers.map(function(h) {
      return String(h).trim().toLowerCase();
    });
    
    // 1. Find new answer keys and add them to headers if they don't exist (trimmed/case-insensitive match)
    const newKeys = Object.keys(answers);
    newKeys.forEach(function(key) {
      const cleanKey = key.trim().toLowerCase();
      if (cleanHeaders.indexOf(cleanKey) === -1 && key !== "Timestamp" && key !== "Source" && key !== "Submission Wave") {
        headers.push(key);
        cleanHeaders.push(cleanKey);
      }
    });
    
    // 2. Ensure "Timestamp" is present at the beginning
    if (headers.indexOf("Timestamp") === -1) {
      headers.unshift("Timestamp");
    }
    
    // 3. Ensure "Source" is present, placed right before "Submission Wave"
    let waveIndex = headers.indexOf("Submission Wave");
    if (headers.indexOf("Source") === -1) {
      if (waveIndex !== -1) {
        headers.splice(waveIndex, 0, "Source");
      } else {
        headers.push("Source");
      }
    }
    
    // 4. Ensure "Submission Wave" is present at the very end
    if (headers.indexOf("Submission Wave") === -1) {
      headers.push("Submission Wave");
    }
    
    // Write headers back to ensure they are up to date
    sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
    
    // Build row values matching headers (default to empty string)
    const rowValues = headers.map(function(header) {
      if (header === "Timestamp") {
        return new Date();
      }
      if (header === "Submission Wave") {
        return waveInfo.activeWave;
      }
      if (header === "Source") {
        return payload.source || "website";
      }
      return "";
    });
    
    // Now map incoming answers to the best matching header index
    Object.keys(answers).forEach(function(key) {
      const val = answers[key];
      
      // 1. Try exact match first
      let idx = headers.indexOf(key);
      
      // 2. If no exact match, try trimmed case-insensitive match
      if (idx === -1) {
        const cleanKey = key.trim().toLowerCase();
        for (let i = 0; i < headers.length; i++) {
          const cleanHeader = headers[i].trim().toLowerCase();
          // Ensure we don't map to dynamic wave, source, or timestamp
          if (cleanHeader === cleanKey && headers[i] !== "Timestamp" && headers[i] !== "Source" && headers[i] !== "Submission Wave") {
            idx = i;
            break;
          }
        }
      }
      
      if (idx !== -1) {
        let formattedVal = val;
        // Preserve leading zeros for phone numbers and IDs
        if (typeof val === 'string' && /^0[0-9\s\-+]+$/.test(val)) {
          formattedVal = "'" + val; // Prepend a single quote to force plain text format
        }
        rowValues[idx] = formattedVal;
      }
    });
    
    sheet.appendRow(rowValues);
    
    return ContentService.createTextOutput(JSON.stringify({ 
      ok: true,
      message: 'Application recorded successfully in ' + waveInfo.activeWave,
      activeWave: waveInfo.activeWave
    })).setMimeType(ContentService.MimeType.JSON);
    
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({ 
      ok: false, 
      error: error.toString() 
    })).setMimeType(ContentService.MimeType.JSON);
  }
}

// Duplicate checking helper logic
function isDuplicateSubmission(sheet, answers) {
  const lastRow = sheet.getLastRow();
  if (lastRow <= 1) return false;
  
  const headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];
  const data = sheet.getRange(2, 1, lastRow - 1, sheet.getLastColumn()).getValues();
  
  // Map our target columns to their sheet indices
  const indicesToCheck = DUPLICATE_CHECK_COLUMNS.map(function(colName) {
    return headers.indexOf(colName);
  }).filter(function(idx) {
    return idx !== -1;
  });
  
  if (indicesToCheck.length === 0) return false;
  
  for (let i = 0; i < data.length; i++) {
    const row = data[i];
    for (let j = 0; j < indicesToCheck.length; j++) {
      const colIdx = indicesToCheck[j];
      const headerName = headers[colIdx];
      
      const newAnswer = String(answers[headerName] || '').trim().toLowerCase();
      const existingValue = String(row[colIdx] || '').trim().toLowerCase();
      
      if (newAnswer && newAnswer === existingValue) {
        return true;
      }
    }
  }
  return false;
}

// Helper to load configurations and compute active wave
function getActiveWaveInfo() {
  const ss = getSpreadsheet();
  
  // 1. Get or create WaveConfig sheet
  let configSheet = ss.getSheetByName("WaveConfig");
  if (!configSheet) {
    configSheet = ss.insertSheet("WaveConfig");
    configSheet.appendRow(["Wave Name", "Quantity", "Amounts", "Policy Image"]);
    configSheet.appendRow(["Wave 1", 11, "650, 1300", "/image/png/JNIMUN%2726/Form%20Docs/Wave%201.png"]);
    configSheet.appendRow(["Wave 2", 34, "700, 1400", "/image/png/JNIMUN%2726/Form%20Docs/Wave%202.png"]);
    configSheet.appendRow(["Wave 3", 99, "750, 1500", "/image/png/JNIMUN%2726/Form%20Docs/Wave%203.png"]);
    configSheet.appendRow(["Wave 4", 27, "800, 1600", "/image/png/JNIMUN%2726/Form%20Docs/Wave%201.png"]);
    configSheet.appendRow(["Wave 5", 22, "850, 1700", "/image/png/JNIMUN%2726/Form%20Docs/Wave%201.png"]);
  }
  
  const configData = configSheet.getDataRange().getValues();
  const waves = [];
  
  for (let i = 1; i < configData.length; i++) {
    const name = String(configData[i][0]).trim();
    const qty = Number(configData[i][1]);
    const rawAmounts = String(configData[i][2]).trim();
    const policyImg = String(configData[i][3]).trim();
    
    if (name && !isNaN(qty)) {
      const amounts = rawAmounts.split(",")
        .map(function(val) { return val.trim(); })
        .filter(Boolean);
        
      waves.push({
        name: name,
        limit: qty,
        amounts: amounts,
        policyImage: policyImg || "/image/png/JNIMUN%2726/Form%20Docs/Wave%201.png"
      });
    }
  }
  
  if (waves.length === 0) {
    return {
      isOpen: false,
      reason: "No wave configurations found."
    };
  }
  
  let cumulative = 0;
  const wavesWithCumulative = waves.map(function(w) {
    cumulative += w.limit;
    return {
      name: w.name,
      limit: w.limit,
      amounts: w.amounts,
      policyImage: w.policyImage,
      cumulativeLimit: cumulative
    };
  });
  
  const mainSheet = ss.getSheetByName("Applications") || ss.getSheets()[0];
  const lastRow = mainSheet.getLastRow();
  const totalCount = lastRow > 0 ? lastRow - 1 : 0;
  
  let activeWave = null;
  for (let i = 0; i < wavesWithCumulative.length; i++) {
    if (totalCount < wavesWithCumulative[i].cumulativeLimit) {
      activeWave = wavesWithCumulative[i];
      break;
    }
  }
  
  if (!activeWave) {
    const lastWave = wavesWithCumulative[wavesWithCumulative.length - 1];
    return {
      isOpen: false,
      activeWave: lastWave ? lastWave.name : "None",
      totalCount: totalCount,
      reason: "Applications have closed for all waves."
    };
  }
  
  return {
    isOpen: true,
    activeWave: activeWave.name,
    limit: activeWave.limit,
    cumulativeLimit: activeWave.cumulativeLimit,
    totalCount: totalCount,
    amounts: activeWave.amounts,
    policyImage: activeWave.policyImage
  };
}
```

4. Save the script (Ctrl+S or Cmd+S).
5. Click **Deploy** → **Manage Deployments** → Edit (pencil icon) → Choose "New Version" → Click **Deploy**.
   - *Note: You must select "New Version" when updating Apps Script code, otherwise Google will continue running your old code version!*

---

## Step 2: Verify Your Spreadsheet Layout

On the first application or when you visit the page, the script will automatically create a sheet tab named **`WaveConfig`** in your Google Spreadsheet.

You can modify the values in the **`WaveConfig`** sheet at any time:
- **`Wave Name`**: The name of the wave (e.g. `Wave 1`).
- **`Quantity`**: The capacity limit for this specific wave (e.g. `18`).
- **`Amounts`**: Comma-separated payment options (e.g. `650, 1300`).
- **`Policy Image`**: The website path to the wave's fees policy image (e.g. `/image/png/JNIMUN%2726/Form%20Docs/Wave 2.png`) or any public HTTP image link.

The script automatically calculates the thresholds (e.g. Wave 2 will close at Wave 1 limit + Wave 2 limit) based on the **Quantity** columns you set!
