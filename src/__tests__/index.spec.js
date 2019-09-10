import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
// import app from '../app';

chai.use(chaiHttp);

describe('true or false', () => {
  it('true is true', () => {
    expect(true).to.eql(true);
  });
  it('false is false', () => {
    expect(false).to.eql(false);
  });
});