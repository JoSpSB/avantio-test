import sinon from 'ts-sinon';
import axios from 'axios';

import Database from '../src/db';
import { getFeeds } from '../src/feeds';
import Scrapper from '../src/feeds/services/scrapper';
import ScrapperElPais from '../src/feeds/services/scrapperElPais';
import ScrapperElMundo from '../src/feeds/services/scrapperElMundo';

let db: Database;

beforeAll(() => {
  db = new Database({ dbName: 'test' });
  return db.connect();
});

afterAll((): Promise<void> => {
  return new Promise((resolve) => {
    db.dropCollection('feeds', () => {
      db.close().then(() => resolve() );
    });
  });
});

describe('Feeds integration tests', () => {
  it('Should call getName and getNews from all scrappers', async () => {
    const scrapperGetNameStub = sinon.stub(Scrapper.prototype, 'getName');
    const scrapperGetNewsStub = sinon.stub(Scrapper.prototype, 'getNews');
    scrapperGetNameStub.returns('Mock Name');
    scrapperGetNewsStub.returns(Promise.resolve([{ title: 'Title 1', text: 'Text 1'}]));

    await getFeeds();

    sinon.assert.calledTwice(scrapperGetNameStub);
    sinon.assert.calledTwice(scrapperGetNewsStub);
    scrapperGetNameStub.restore();
    scrapperGetNewsStub.restore();
  });
});

describe('Scrapper tests', () => {
  it('Should ScrapperElPais call axios get in getNews', () => {
    const scrapperElPais = new ScrapperElPais({});
    const axiosGetStub = sinon.stub(axios, 'get');
    axiosGetStub.returns(Promise.resolve({ data: '' }));
    const scrapperParseNewsStub = sinon.stub(ScrapperElPais.prototype, 'parseNews');

    scrapperElPais.getNews();

    sinon.assert.calledOnce(axiosGetStub);
    axiosGetStub.restore();
    scrapperParseNewsStub.restore();
  });

  it('Should ScrapperElPais parse articles', async () => {
    const scrapperElPais = new ScrapperElPais({});
    const axiosGetStub = sinon.stub(axios, 'get');
    const title = 'El Pais News titles!';
    const text = 'El Pais News Texts!';
    axiosGetStub.returns(Promise.resolve({
      data: `<article><header><h2><a>${title}</a></h2></header><p>${text}</p></article>`,
    }));

    const news = await scrapperElPais.getNews();

    expect([{ title, text }]).toEqual(expect.arrayContaining(news));
    sinon.assert.calledOnce(axiosGetStub);
    axiosGetStub.restore();
  });

  it('Should ScrapperElMundo call axios get in getNews', () => {
    const scrapperElMundo = new ScrapperElMundo({});
    const axiosGetStub = sinon.stub(axios, 'get');
    axiosGetStub.returns(Promise.resolve({ data: '' }));
    const scrapperParseNewsStub = sinon.stub(ScrapperElMundo.prototype, 'parseNews');

    scrapperElMundo.getNews();

    sinon.assert.calledOnce(axiosGetStub);
    axiosGetStub.restore();
    scrapperParseNewsStub.restore();
  });

  it('Should ScrapperElMundo parse articles', async () => {
    const scrapperElMundo = new ScrapperElMundo({});
    const axiosGetStub = sinon.stub(axios, 'get');
    const title = 'El Mundo News titles!';
    const text = 'El Mundo News Texts!';
    axiosGetStub.returns(Promise.resolve({
      data: `<article><header><span>${title}</span><a>${text}</a></header></article>`,
    }));

    const news = await scrapperElMundo.getNews();

    expect([{ title, text }]).toEqual(expect.arrayContaining(news));
    sinon.assert.calledOnce(axiosGetStub);
    axiosGetStub.restore();
  });
});
