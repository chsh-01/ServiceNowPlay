export async function getColumnValue(page: Page, recordName: string, columnName: string){
    
    const frame=page.frameLocator('#gsft_main');
    
    const header = frame.locator('thead th a.column_head');
    const headerCount = await header.count();
    await logInfo( `Total Header Count: ${headerCount}`);
    
    let columnIndex = -1;
    let foundHeaderText = "";
    for(let i = 0; i < headerCount ; i++){
        const headerText = (await header.nth(i).textContent())?.trim();
        if(headerText == columnName){
            columnIndex = i;
            foundHeaderText = headerText;
            break;
        }
    }
    
    if(columnIndex == -1){
        throw new Error(`Could not find ${columnName}`);
    }
    
    //await logInfo(`Column Index: ${columnIndex}, HeaderText: ${foundHeaderText}`);
    
    const row = frame.locator('tbody tr').filter({hasText: recordName});
    await logInfo(`Matching rows: ${await row.count()}`);
    const rowCount = await row.count();
    if(rowCount > 0){
        const cell = row.first().locator('td').nth(columnIndex+2);
        const value = (await cell.innerText()).trim();
        await logInfo(`Value of '${columnName}' for record '${recordName}': ${value}`);
        return value;
    }
    else{
        throw new Error(`No matching record found for ${recordName}`);
    }
    
}   
}