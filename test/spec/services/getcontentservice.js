'use strict';

describe('Service: getContentService', function () {

  // load the service's module
  beforeEach(module('madHatterApp'));

  // instantiate service
  var getContentService;
  beforeEach(inject(function (_getContentService_) {
    getContentService = _getContentService_;
  }));

  it('should do something', function () {
    expect(!!getContentService).toBe(true);
  });

});
