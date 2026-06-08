# Google Sheets Merch Integration Setup

We have skipped Cloudinary completely for the merch page, just like we did in the delegate applications page! 

The client's browser compresses the payment receipt screenshot directly, converts it to base64, and uploads it to Google Drive using your existing `/api/save-to-drive` API.

---

## Part 1: Google Sheets Apps Script Setup

This script writes the order details into the spreadsheet `1fCt-JlSS2rGlKJVhc1hK18x25eNPvt_Fa4j4B5A0fvk` under the exact headers and column ordering requested.

1. Open your target [Google Spreadsheet](https://docs.google.com/spreadsheets/d/1fCt-JlSS2rGlKJVhc1hK18x25eNPvt_Fa4j4B5A0fvk/edit).
2. In the top menu, go to **Extensions** → **Apps Script**.
3. Replace all default code in the editor with this code:

```javascript
const SPREADSHEET_ID = '1fCt-JlSS2rGlKJVhc1hK18x25eNPvt_Fa4j4B5A0fvk';

function doPost(e) {
  try {
    const payload = JSON.parse(e.postData.contents);
    
    const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
    // Use named "Orders" or the first tab in the sheet
    let sheet = ss.getSheetByName("Orders") || ss.getSheets()[0];
    
    // Target headers in order
    const targetHeaders = [
      "Timestamp",
      "Order ID",
      "First Name",
      "Last Name",
      "Email",
      "Phone",
      "Council  / Committee",
      "Bundle",
      "Items",
      "Poster Choice",
      "Magnet Choice",
      "Total",
      "Payment Method",
      "Payment URL"
    ];
    
    // Set headers if the sheet is blank
    if (sheet.getLastRow() === 0) {
      sheet.getRange(1, 1, 1, targetHeaders.length).setValues([targetHeaders]);
    }
    
    // Formatting helper variables
    const timestampVal = payload.timestamp ? new Date(payload.timestamp) : new Date();
    const orderIdVal = payload.orderId ? "'" + payload.orderId : "";
    const phoneVal = payload.phone ? "'" + payload.phone : "";
    
    // Map payload keys to match columns in order
    const rowValues = [
      timestampVal,
      orderIdVal,
      payload.firstName || "",
      payload.lastName || "",
      payload.email || "",
      phoneVal,
      payload.council || "",
      payload.bundle || "",
      payload.items || "",
      payload.posterChoice || "",
      payload.magnetChoice || "",
      payload.total || 0,
      payload.paymentMethod || "",
      payload.paymentConfirmationUrl || ""
    ];
    
    sheet.appendRow(rowValues);
    
    return ContentService.createTextOutput(JSON.stringify({ 
      ok: true,
      message: 'Order logged successfully'
    })).setMimeType(ContentService.MimeType.JSON);
    
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({ 
      ok: false, 
      error: error.toString() 
    })).setMimeType(ContentService.MimeType.JSON);
  }
}
```

4. Save the script (Ctrl+S).
5. Click **Deploy** → **New deployment**.
6. Select **Web app** type (cogwheel icon) and set:
   - **Execute as:** `Me`
   - **Who has access:** `Anyone`
7. Click **Deploy**, authorize permissions, and copy the **Web app URL**.
8. Open your `.env.local` file and paste the copied URL as your `MERCH_WEBHOOK_URL` value:
   ```env
   MERCH_WEBHOOK_URL=https://script.google.com/macros/s/.../exec
   ```

---

## Part 2: Google Drive Webhook Folder Routing

To ensure these merch payment confirmation folders do **not** override your existing delegate application folders, we use unique folder keys:

* **Instapay:** uses folder key `merch_instapay_proofs`
* **Telda:** uses folder key `merch_telda_proofs`

### How to Update Your Existing Google Drive Apps Script:
Open the Apps Script project that currently handles your Google Drive uploads (the one associated with your `NEXT_PUBLIC_DRIVE_WEBHOOK_URL`). 

Add these two keys to your script's folder mapping, pointing to your new merch folders:
* Key **`merch_instapay_proofs`** → Folder ID: `1PqPSJ7_qiZapu39b232JDjXqOx8UCkpx` (Instapay)
* Key **`merch_telda_proofs`** → Folder ID: `1pd3mAXWlw6WqKJKXXF35aiksDcg97CfW` (Telda)

*Make sure to deploy your script changes as a **New Version** in Apps Script so the updates take effect!*
