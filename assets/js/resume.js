class Resume {
    constructor(html) {
        let converter = new showdown.Converter();
        converter.setFlavor('github');
        converter.setOption('simpleLineBreaks', false);
        converter.setOption('openLinksInNewWindow', true);
        this.html = converter.makeHtml(html);
    }

    getHtmlNode() {
        let template = `<div>${this.html}</div>`;
        return $.parseHTML(template.trim())[0];
    }
}