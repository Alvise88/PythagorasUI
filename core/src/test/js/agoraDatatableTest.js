/**
 * Created by alvise on 28/12/14.
 */
"use strict";

describe('angularjs homepage', function() {
    it('should have a title', function() {
        //browser.get('http://juliemr.github.io/protractor-demo/');
        browser.get('PythagorasUI/core/src/test/html/agoraDatatableTest.html');

        expect(browser.getTitle()).toEqual('agoraDatatable');
    });
});