import { browser, protractor, element } from "protractor";
import {Landing} from "../page-object/homePage/landing.page"
import {SearchForm} from "../page-object/homePage/searchForm.page"
import {HolidayFound} from "../page-object/HolidayResults/holidayFound.page"
import { ElementHelper} from  "../support/elementHelper"
const { Given, And, When, Then } = require("cucumber");
const { assert } = require('chai')
const chai = require("chai").use(require("chai-as-promised"));
const expect = chai.expect;
const EC = protractor.ExpectedConditions;
var {setDefaultTimeout} = require('cucumber');

setDefaultTimeout(60 * 1000000);
Given('I am on virgin holidays home page', async () => {
    await expect(browser.getTitle()).to.eventually.equal("Virgin Holidays | Seize The Holiday");
    await Landing.pageHeader.isPresent()

  });
Given('I do a holiday search', async () => {
     await SearchForm.clearSearch("holiday")
     await SearchForm.setDestination("holiday","Ocean")
    await SearchForm.searchHoliday("holiday")
    browser.wait(function() {
      return HolidayFound.holidayFound.isPresent()});
    await HolidayFound.holidayFound.isDisplayed();

  });
  When('I add a holiday to a hotlist', async ()  =>{
    ElementHelper.scrollIntoViewClick(HolidayFound.addToHotList)

    // Using then to resolve promise
    ElementHelper.scrollIntoView(HolidayFound.addToHotList).then((action) => {
      expect(HolidayFound.addToHotList.getText()).to.eventually.equal('Remove from hotlist')
    })
   
  });

  Then('I can see that a holiday added to the hotlist on top of the page', async () => {
    ElementHelper.scrollIntoViewClick(HolidayFound.hotListHeader)
    
    await expect(browser.getTitle()).to.eventually.equal("Holidays | Indian Ocean | Search | Virgin Holidays");
  
  });
