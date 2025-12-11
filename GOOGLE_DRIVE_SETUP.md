# Google Drive Integration Setup

To save uploaded files to your Google Drive folder, you need to set up an Apps Script webhook.

## Step 1: Create Apps Script for Drive Upload

1. Go to [Google Apps Script](https://script.google.com)
2. Create a new project
3. Replace the code with the following:

```javascript
const DRIVE_FOLDER_ID = 'YOUR_FOLDER_ID_HERE'; // Replace with your Google Drive folder ID

function doPost(e) {
  try {
    const body = JSON.parse(e.postData.contents);
    const { fileUrl, fileName, fileType } = body;

    if (!fileUrl || !fileName) {
      return ContentService.createTextOutput(JSON.stringify({ 
        ok: false, 
        error: 'Missing fileUrl or fileName' 
      })).setMimeType(ContentService.MimeType.JSON);
    }

    // Download file from Cloudinary
    const fileBlob = UrlFetchApp.fetch(fileUrl).getBlob();
    fileBlob.setName(fileName);
    fileBlob.setContentType(fileType || 'application/octet-stream');

    // Get the folder
    const folder = DriveApp.getFolderById(DRIVE_FOLDER_ID);
    
    // Upload to Drive
    const file = folder.createFile(fileBlob);

    return ContentService.createTextOutput(JSON.stringify({ 
      ok: true, 
      fileId: file.getId() 
    })).setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({ 
      ok: false, 
      error: error.toString() 
    })).setMimeType(ContentService.MimeType.JSON);
  }
}
```

## Step 2: Get Your Google Drive Folder ID

1. Open Google Drive
2. Navigate to or create the folder where you want files saved
3. Right-click the folder → "Get link" or open it
4. The folder ID is in the URL: `https://drive.google.com/drive/folders/FOLDER_ID_HERE`
5. Copy the `FOLDER_ID_HERE` part

## Step 3: Update Apps Script

1. Replace `YOUR_FOLDER_ID_HERE` in the script with your actual folder ID
2. Save the script (Ctrl+S or Cmd+S)
3. Click "Deploy" → "New deployment"
4. Click the gear icon ⚙️ next to "Select type" → "Web app"
5. Set:
   - Description: "Drive Upload Webhook"
   - Execute as: "Me"
   - Who has access: "Anyone"
6. Click "Deploy"
7. Copy the Web App URL

## Step 4: Add to Environment Variables

Add to your `.env.local`:

```
NEXT_PUBLIC_DRIVE_WEBHOOK_URL=https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec
```

Replace `YOUR_SCRIPT_ID` with the ID from your webhook URL.

## Step 5: Restart Your Dev Server

Restart your Next.js dev server for the environment variable to take effect.

## Notes

- Files are first uploaded to Cloudinary (for fast access)
- Then automatically saved to your Google Drive folder
- If Drive save fails, the Cloudinary upload still succeeds
- The form will work even if Drive is not configured (it's optional)

