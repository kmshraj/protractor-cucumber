import { $, ElementFinder, element, by, ElementArrayFinder, $$, browser, protractor } from "protractor";
const EC = protractor.ExpectedConditions;
export class Landing {
    static pageHeader : ElementFinder = $('[class="main-vhols-header"]');
  
    static searchPanel(name): ElementFinder {
        return $(`button[booking-tab-target="${name}"]`);
    }
}