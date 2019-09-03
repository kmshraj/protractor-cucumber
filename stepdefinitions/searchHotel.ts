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

Given('I am on virgin holidays', async () => {
    await expect(browser.getTitle()).to.eventually.equal("Virgin Holidays | Seize The Holiday");
    await Landing.pageHeader.isPresent()

  });

  When('I do a hotel search', async () => {
     await Landing.searchPanel("hotel").click()
     await SearchForm.clearSearch("hotel")
     await SearchForm.setDestination("hotel","Ocean")
    await SearchForm.searchHoliday("hotel")
  });

  When('I proceed to hotel options page', async () => {
    browser.wait(function() {
        return HolidayFound.holidayFound.isPresent()});
      await HolidayFound.holidayFound.isDisplayed();
  });

  Then('I can see my board basis', function () {
   ElementHelper.checkElementInList(HolidayFound.hotelOptions, "Board Basis")

  });