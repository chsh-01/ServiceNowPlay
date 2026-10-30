import { leapwork } from "./leapwork";

import { ServiceNowLoginToServiceNow } from "@assets/ServiceNow/ServiceNow_LoginLogout/ServiceNow_LoginToServiceNow";
import { FilterNavMenuSearch as filterNavMenuSearch } from "@assets/ServiceNow/Helpers/filterNavMenuSearch";
import { ServiceNowLogOut } from "@assets/ServiceNow/ServiceNow_LoginLogout/ServiceNow_LogOut";

leapwork.variables.set("location", "", leapwork.storage.LOCAL);
const lw__location = leapwork.variables.get("location", leapwork.storage.LOCAL) as string;

leapwork.variables.set("filter2", "Service Catalog", leapwork.storage.LOCAL);
const lw__filter2 = leapwork.variables.get("filter2", leapwork.storage.LOCAL) as string;

leapwork.configuration({
  timeoutMs: Number(
    leapwork.team.settings.get("timeoutMs")
    ?? leapwork.workspace.settings.get("timeoutMs")
  ) || 5000,
  enableSelfHeal:
    (leapwork.team.settings.get("enableSelfHeal")
      ?? leapwork.workspace.settings.get("enableSelfHeal")) !== "false",
});

// ai-studio-step-id: 5a2818b0
await leapwork.step("Use test case: ServiceNow_LoginToServiceNow", async () => {
    return await ServiceNowLoginToServiceNow();
}, { action: "asset_reference", linkedAssetType: "test-case" });

// ai-studio-step-id: pw7axwcx00
await leapwork.step("Use TypeScript asset: filterNavMenuSearch", async () => {
    return await filterNavMenuSearch(page, "Service Catalog", "Self-Service","Service Catalog");
}, { action: "asset_reference" });

// ai-studio-step-id: 65DHGbPi
await leapwork.step("Click the Edit Widget icon for the Desktops section", async () => {
    // Click button "Edit Widget"
    await page.waitForTimeout(10000);
    const frame = await page.frameLocator('#gsft_main');
    const desktopWidget = await frame.locator('div[id^="window.com.glideapp.servicecatalog.RenderCategory_"]')
    .filter({
        has : frame.getByRole('link', {name: 'Desktops'})
    }).first();
    await desktopWidget.hover();
    const editWidget = await desktopWidget.locator('a[aria-label="Edit Widget"]');
    await editWidget.click();
    //await page.locator('[id="window.com.glideapp.servicecatalog.RenderCategory_0178594263621107"] > .header_decorations > .home-icon.icon-edit').click();
}, { action: "click"});

// ai-studio-step-id: 7fwludrt
await leapwork.step("Click the Location field lookup button on the Desktops category form", async () => {
    // Click span
    //await page.getByRole('button', { name: 'Look up value for field: Location' }).click();
    //await page.waitForSelector('#sys_display\\.original\\.sc_category\\.location');
    const frame = page.frameLocator('#gsft_main');
    await frame.locator("#lookup\\.sc_category\\.location").click();
    // const lookUpBtn = page.frameLocator('#gsft_main').getByRole('button', { name: 'Look up value for field: Location' });
   // await lookUpBtn.click();
});

// ai-studio-step-id: pwx9e8xw00
await leapwork.step("Click United States on the lookup window", async () => {
    // [Leapwork Play self-heal preserved previous code]
    // // Step implementation
    // await page.locator("//a[@role='treeitem' and contains(.,'United States')]").click();
    // [/Leapwork Play self-heal preserved previous code]
    
    const unitedStates = page.getByRole('link', { name: 'United States', exact: true });
    await expect(unitedStates).toHaveCount(1);
    await unitedStates.click({ force: true });
}, {
  action: "click",
  relativeXpath: ".//div[6]/table/tbody/tr/td[3]/a[@name=\"b30330019f22120047a2d126c42e70e5\"]"
});

// ai-studio-step-id: GR5FIqgg
await leapwork.step("Click the Update button on the Desktops category form", async () => {
    // Click button "Update"
    await page.locator('#sysverb_update').click();
}, { action: "click", relativeXpath: "//*[@id=\"sysverb_update\"]" });

// ai-studio-step-id: aXrMcNzS
await leapwork.step("Click Edit Widget for the Desktops section", async () => {
    // Click button "Edit Widget"
    
    const frame = await page.frameLocator('#gsft_main');
    const desktopWidget = await frame.locator('div[id^="window.com.glideapp.servicecatalog.RenderCategory_"]')
    .filter({
        has : frame.getByRole('link', {name: 'Desktops'})
    }).first();
    await desktopWidget.hover();
    const editWidget = await desktopWidget.locator('a[aria-label="Edit Widget"]');
    await editWidget.click();
    
    //await page.locator('[id="window.com.glideapp.servicecatalog.RenderCategory_0178594267745507"] > .header_decorations > .home-icon.icon-edit').click();
}, { action: "click", relativeXpath: "//*[@id=\"window.com.glideapp.servicecatalog.RenderCategory_0178594267745507\"]/div[1]/a[@aria-label=\"Edit Widget\"]" });

// ai-studio-step-id: 6d73Xkmd
await leapwork.step("Validate the Location field on the Desktops category equals \"United States\"", async () => {
    // Assert searchbox "Location" contains "United States"
    await expect(page.getByRole('searchbox', { name: 'Location' })).toHaveValue("United States");
}, { action: "validate", relativeXpath: "//*[@id=\"sys_display.sc_category.location\"]" });

// ai-studio-step-id: k199M5KU
await leapwork.step("Click the Location field and select United States", async () => {
    // Click combobox "Location"
    await page.locator("#sys_display\\.sc_category\\.location").click();
}, { action: "click", relativeXpath: "//*[@id=\"sys_display.sc_category.location\"]" });

// ai-studio-step-id: RTar8syj
await leapwork.step("Fill the Location field for the Desktops category with a value.", async () => {
    // Fill combobox "Location"
    await page.getByRole('combobox', { name: 'Location' }).fill(String(lw__location));
}, { action: "input", relativeXpath: "//*[@id=\"sys_display.sc_category.location\"]" });

// ai-studio-step-id: 88322bb8
await leapwork.step("Use test case: ServiceNow_LogOut", async () => {
    return await ServiceNowLogOut();
}, { action: "asset_reference", linkedAssetType: "test-case" });