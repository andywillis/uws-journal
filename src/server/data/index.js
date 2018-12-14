const jsdom = require('jsdom');
const markdown = require('markdown-it')();

const { JSDOM } = jsdom;
const { document } = (new JSDOM('<div>')).window;
const div = document.querySelector('div');

function splitMarkdown(md, sep) {
  return md.split(sep).reverse();
}

function removeElement(el) {
  el.parentNode.removeChild(el);
}

function getTitle(parent) {
  const element = parent.querySelector('h1');
  const text = element.textContent;
  removeElement(element);
  return text;
}

function getDate(parent) {
  const element = parent.querySelector('h2');
  const text = element.textContent;
  removeElement(element);
  return text;
}

function getTags(parent) {
  const element = parent.querySelector('ul');
  const items = element.querySelectorAll('li');
  const tags = [...items].map((tag, i) => {
    return { id: i, txt: tag.textContent };
  });
  removeElement(element);
  return tags;
}

function getLink(id, title) {
  return (
    `${title}-${id}`
      .replace(/[.,/#!$%^&*;:'{}=_`~()]/g, '')
      .replace(/\s/g, '-')
      .toLowerCase()
  );
}

function getBody(el) {

  const selector = 'p, h2, h3, h4, blockquote, img, table';

  return [...el.querySelectorAll(selector)].reduce((p, c, i) => {

    switch (c.nodeName) {

      case 'TABLE': {
        p.push({ id: i, type: 'table', html: c.innerHTML });
        break;
      }

      case 'IMG': {
        p.push({ id: i, type: 'image', src: c.src, alt: c.alt });
        break;
      }

      case 'P': {
        if (c.firstChild.nodeName !== 'IMG') {
          const name = c.parentNode.nodeName;
          const type = name === 'BLOCKQUOTE' ? 'blockquote' : 'para';
          p.push({ id: i, type, html: c.innerHTML });
        }
        break;
      }

      case 'H2': {
        p.push({ id: i, type: 'h2', txt: c.textContent });
        break;
      }

      case 'H3': {
        p.push({ id: i, type: 'h3', txt: c.textContent });
        break;
      }

      case 'H4': {
        p.push({ id: i, type: 'h4', txt: c.textContent });
        break;
      }

    }
    return p;
  }, []);
}

function buildEntry(md, id) {
  const html = markdown.render(md);
  div.innerHTML = html;

  const title = getTitle(div);
  const date = getDate(div);
  const tags = getTags(div);
  const link = getLink(id, title);
  const body = getBody(div);
  const cdata = div.innerHTML.trim();

  const entry = {
    id: ++id,
    title,
    date,
    tags,
    link,
    body,
    cdata
  };

  return entry;

}

function buildTagList(entries) {
  return entries.reduce((acc, { tags }) => {
    tags.forEach(({ txt }) => {
      acc[txt] = (acc[txt] || 0) + 1;
    });
    return acc;
  }, {});
}

function processMarkdown(markdown) {
  return new Promise((resolve, reject) => {
    const sep = '\r\n\r\n----\r\n\r\n';
    const markdownArr = splitMarkdown(markdown, sep);
    const entries = markdownArr.map(buildEntry).reverse();
    const links = entries.map(entry => entry.link);
    const tags = buildTagList(entries);
    try {
      resolve({ entries, links, tags });
    } catch (e) {
      reject(e);
    }
  });
}

module.exports = processMarkdown;
